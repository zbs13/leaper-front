import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import { TextInput, View, FlatList, SafeAreaView } from 'react-native';
import { fields, select as dropdown, fieldDate} from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import Validator from '../../utils/validator';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import { getDatesBetweenTwoDates, lessThanHour, lessThanDate, getAddressByLatLng, getLatLngByAddress } from '../../utils/utils';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import { addDays, format, parseISO } from 'date-fns';
import Title from '../Title';
import Txt from '../Txt';
import { BottomSheet } from 'react-native-btr';
import Cta from '../cta/Cta';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import Map, { MapPin } from '../maps/Map';
import _ from "lodash";
import PhoneInput, { isValidNumber } from "react-native-phone-number-input";

/**
 * Fields management => text, password, calendar, username...
 * 
 * @param {string} type field type => firstname, lastname, password, username, text, calendar-period 
 * @param {string|null} placeholder field placeholder
 * @param {function} onChange function calling each time value change 
 * @param {string|null} defaultValue default value in field
 * @param {string|null} label value to be displayed as field title
 * @param {string|null} labelIcon icon name for label (ionicons)
 * @param {string|null} icon icon name 
 * @param {number} min min char allowed
 * @param {number} max max char allowed
 * @param {function|null} isError called when field changed => parameter 1 is true if field is in error and false if not
 * @param {function|null} onChangeSelect function called on value change
 * @param {function|null} keyExtractor key to extract for each items (unique id)
 * @param {function|null} defaultSelectValue default selected value
 * @param {object|null} items object with each items for select type
 * @param {function|null} renderItem render of each item
 * @param {string|null} datetime default date/hour
 * @param {function|null} onChangeDateTime called when date/hour is changed
 * @param {string|null} lessThan date/hour must be less than an other date/hour
 * @param {string|null} greaterThan date/hour must be greater than an other date/hour
 * @param {object|null} location address location => latitude, longitude
 * @param {string} defaultCountry json stringify with country datas
 * @param {function|null} onChangePhone called when phone number/country changed
 * @returns 
 */
export default memo(function Field({
    type, 
    placeholder = null,
    onChange = null,
    defaultValue = null, 
    label = null, 
    labelIcon = null,
    icon = null,
    min = 0, 
    max = 255,
    isError = null,
    // if type = select :
    onChangeSelect = null,
    keyExtractor = null,
    defaultSelectValue = null,
    items = null,
    renderItem = null,
    /////
    // if type = date or hour :
    datetime = null,
    onChangeDateTime = null,
    lessThan = null,
    greaterThan = null,
    // if type = address :
    location = null,
    // if type = phone :
    defaultCountry = `{"callingCode": [
        "33"
      ],
      "cca2": "FR",
      "currency": [
        "EUR"
      ],
      "flag": "flag-fr",
      "name": "France",
      "region": "Europe",
      "subregion": "Western Europe"
    }`,
    onChangePhone = null
}){

    const {actions, selectors} = useApp();
    const phoneInput = useRef(null);

    const [fieldState, setFieldState] = useState({
        defaultValue: defaultValue,
        countryValue: defaultCountry,
        focus: false,
        fieldValue: "",
        errorXSS: false,
        errorPassword: false,
        errorMail: false,
        errorUsername: false,
        errorMaxLength: false,
        errorMinLength: false,
        errorLettersOnly: false,
        errorLessThanHour: false,
        errorLessThanDate: false,
        errorGreaterThanHour: false,
        errorGreaterThanDate: false,
        errorPhoneNumber: false,
        calendarPeriod: {
            isStartDay: true,
            startDay: null,
            endDay: null
        },
        location: location
    })

    const [select, setSelect] = useState({
        isVisible: false,
        selectedValue: null
    });

    const [dateTimeState, setDateTimeState] = useState({
        isVisible: false,
        dateTime: datetime || new Date()
    });

    useEffect(() => {
        if(type === "calendar-period" && onChange !== null){
            onChange(fieldState.calendarPeriod.startDay, fieldState.calendarPeriod.endDay);
        }
    }, [fieldState.calendarPeriod.startDay, fieldState.calendarPeriod.endDay])

    /**
     * calendar config
     */
    LocaleConfig.locales[selectors.getLang()] = {
        monthNames: t(selectors.getLang()).fields.MONTHS,
        monthNamesShort: t(selectors.getLang()).fields.SHORT_MONTHS,
        dayNames: t(selectors.getLang()).fields.DAYS,
        dayNamesShort: t(selectors.getLang()).fields.SHORT_DAYS,
        today: t(selectors.getLang()).fields.TODAY
      };
    LocaleConfig.defaultLocale = selectors.getLang();

    /**
     * set state is field focused
     * 
     * @param {boolean} isFocus true if field is focus
     */
    function isFocus(isFocus){
        setFieldState({
            ...fieldState,
            focus: isFocus
        })
    }

    /**
     * function called while value changed
     * 
     * @param {string} val new value after change
     */
    function onChangeValue(val){
        let isValid = Validator.checkXSS(val);

        let isOnlyLetters = true;
        let isUsernameValid = true;

        switch(type){
            case "firstname":
            case "lastname":
                isOnlyLetters = Validator.checkOnlyLetters(val);
                min = 1;
                max = 50;
                break;
            case "username":
                isUsernameValid = Validator.checkUsername(val);
                min = 1;
                max = 50;
                break;
            case "textarea":
                max = null;
                break;
            case "address":
                min = 1;
        }

        let isMinLengthOk = Validator.checkMinLength(val, min);
        let isMaxLengthOk = max !== null ? Validator.checkMaxLength(val, max) : true;

        if(isValid){
            if(isOnlyLetters){
                if(isMinLengthOk){
                    if(isMaxLengthOk){
                        if(isUsernameValid){
                            if(type === "address"){
                                onChangeAddress(val);
                            }else{
                                onChange(val);
                            }
                            setFieldState({
                                ...fieldState,
                                defaultValue: null,
                                fieldValue: val,
                                errorXSS: false,
                                errorUsername: false,
                                errorMaxLength: false,
                                errorMinLength: false,
                                errorLettersOnly: false
                            })
                            isError !== null && isError(false)
                        }else{
                            setFieldState({
                                ...fieldState,
                                defaultValue: null,
                                fieldValue: val,
                                errorUsername: true
                            })
                            isError !== null && isError(true)
                        }
                    }else{
                        setFieldState({
                            ...fieldState,
                            defaultValue: null,
                            fieldValue: val,
                            errorMaxLength: true
                        })
                        isError !== null && isError(true)
                    }
                }else{
                    setFieldState({
                        ...fieldState,
                        defaultValue: null,
                        fieldValue: val,
                        errorMinLength: true
                    })
                    isError !== null && isError(true)
                }
            }else{
                setFieldState({
                    ...fieldState,
                    defaultValue: null,
                    fieldValue: val,
                    errorLettersOnly: true
                })
                isError !== null && isError(true)
            }
        }else{
            setFieldState({
                ...fieldState,
                defaultValue: null,
                fieldValue: val,
                errorXSS: true
            })
            isError !== null && isError(true)
        }
    }

    /**
     * function called while password value changed
     * 
     * @param {string} val new value after change
     */
    function onChangePassword(val){
        let isValid = Validator.checkPassword(val);
        if(isValid){
            onChange(val);
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorPassword: false
            })
            isError !== null && isError(false)
        }else{
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorPassword: true
            })
            isError !== null && isError(true)
        }
    }

    /**
     * called if address is changed
     * 
     * @param {string} address address value
     */
    function onChangeAddress(address){
        getLatLngByAddress(address,
            function(location){
                if(typeof location === "object"){
                    if(location.error){
                        actions.addPopupStatus({
                            type: "error",
                            message: t(selectors.getLang()).errors.ERROR_API
                        })
                        isError !== null && isError(true)
                        return;
                    }
                }
                setFieldState({
                    ...fieldState,
                    defaultValue: null,
                    fieldValue: address,
                    location: location
                })
                onChange(address, location);
                isError !== null && isError(false);
            }
        )
    }

    /**
     * function called while mail value changed
     * 
     * @param {string} val new value after change
     */
    function onChangeMail(val){
        let isValid = Validator.checkMail(val);
        let isMaxLengthOk = Validator.checkMaxLength(val, 100);
        if(isValid){
            if(isMaxLengthOk){
                onChange(val);
                setFieldState({
                    ...fieldState,
                    fieldValue: val,
                    errorMail: false
                })
                isError !== null && isError(false)
            }else{
                setFieldState({
                    ...fieldState,
                    fieldValue: val,
                    errorMaxLength: true
                })
                isError !== null && isError(true)
            }
        }else{
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorMail: true
            })
            isError !== null && isError(true)
        }
    }

    /**
     * called when phone value changed
     * 
     * @param {number} number phone number
     * @returns 
     */
     function onChangePhoneValue(number){
        let isPhoneValid = phoneInput.current.isValidNumber(number);
        if(isPhoneValid){
            onChangePhone(number, fieldState.countryValue);
            setFieldState({
                ...fieldState,
                defaultValue: null,
                fieldValue: number,
                errorPhoneNumber: false
            });
            isError !== null && isError(false);
            return;
        }
        setFieldState({
            ...fieldState,
            defaultValue: null,
            fieldValue: number,
            errorPhoneNumber: true
        });
        isError !== null && isError(true);
    }

    /**
     * called when phone country is changed
     * 
     * @param {object} country selected country
     */
    function onChangeCountry(country){
        let val = fieldState.defaultValue || fieldState.fieldValue;
        let isPhoneValid = isValidNumber(val, country.cca2);
        if(isPhoneValid){
            onChangePhone(val, JSON.stringify(country))
            setFieldState({
                ...fieldState,
                countryValue: JSON.stringify(country),
                errorPhoneNumber: false
            });
            isError !== null && isError(false);
            return;
        }
        setFieldState({
            ...fieldState,
            countryValue: JSON.stringify(country),
            errorPhoneNumber: true
        });
        isError !== null && isError(true);
    }

    /**
     * function called if a calendar day is pressed
     * 
     * @param {object} day calendar day object
     */
    function onCalendarDayPress(day){
        let _day;
        if(fieldState.calendarPeriod.isStartDay){
            _day = "startDay"
        }else{
            _day = "endDay"
        }
        if(_day === "startDay"){
            if(fieldState.calendarPeriod.endDay !== null){
                if(day.timestamp < fieldState.calendarPeriod.endDay.timestamp){
                    setFieldState({
                        ...fieldState,
                        calendarPeriod: {
                            ...fieldState.calendarPeriod,
                            isStartDay: !fieldState.calendarPeriod.isStartDay,
                            [_day]: day
                        }
                    })
                    return;
                }

                setFieldState({
                    ...fieldState,
                    calendarPeriod: {
                        ...fieldState.calendarPeriod,
                        isStartDay: true,
                        endDay: day
                    }
                })
                return;
            }

            let addDayToCurrentDate = addDays(day.timestamp, 1);
            setFieldState({
                ...fieldState,
                calendarPeriod: {
                    ...fieldState.calendarPeriod,
                    isStartDay: !fieldState.calendarPeriod.isStartDay,
                    [_day]: day,
                    endDay: {
                        dateString: format(addDayToCurrentDate, 'yyyy-MM-dd'),
                        timestamp: addDayToCurrentDate
                    }
                }
            })
        }else{
            if(day.timestamp < fieldState.calendarPeriod.startDay.timestamp){
                setFieldState({
                    ...fieldState,
                    calendarPeriod: {
                        ...fieldState.calendarPeriod,
                        isStartDay: false,
                        startDay: day
                    }
                })
            }else{
                setFieldState({
                    ...fieldState,
                    calendarPeriod: {
                        ...fieldState.calendarPeriod,
                        isStartDay: !fieldState.calendarPeriod.isStartDay,
                        [_day]: day
                    }
                })
            }
        }
    }

    /**
     * function called if a calendar day is long pressed
     */
    function onCalendarDayLongPress(){
        setFieldState({
            ...fieldState,
            calendarPeriod: {
                isStartDay: true,
                startDay: null,
                endDay: null
            }
        })
        onChange(null, null);
    }

    /**
     * component returned for text
     * @returns 
     */
    function _Text(){
        return (
            <TextInput 
                onChangeText={value => onChangeValue(value)}
                defaultValue={defaultValue}
                style={fields.text}
                onFocus={() => isFocus(true)}
                onBlur={() => isFocus(false)}
            />
        )
    }

    /**
     * component returned for textarea
     * @returns 
     */
     function _TextArea(){
        return (
            <TextInput 
                onChangeText={value => onChangeValue(value)}
                defaultValue={defaultValue}
                multiline
                numberOfLines={10}
                style={fields.textarea}
                onFocus={() => isFocus(true)}
                onBlur={() => isFocus(false)}
            />
        )
    }

    /**
     * component returned for password
     * @returns 
     */
    function _Password(){
        let attr = {};
        if(selectors.getOS() === "android"){
            attr = {
                autoCompleteType: "password",
            }
        }

        return (
            <TextInput 
                onChangeText={value => onChangePassword(value)}
                secureTextEntry={true}
                {...attr}
                style={fields.text}
                onFocus={() => isFocus(true)}
                onBlur={() => isFocus(false)}
            />
        )
    }

    /**
     * component returned for mail
     * @returns 
     */
    function _Mail(){
        let attr = {};
        if(selectors.getOS() === "android"){
            attr = {
                autoCompleteType: "email"
            }
        }

        return (
            <TextInput 
                onChangeText={value => onChangeMail(value)}
                {...attr}
                keyboardType="email-address"
                defaultValue={defaultValue}
                style={fields.text}
                onFocus={() => isFocus(true)}
                onBlur={() => isFocus(false)}
            />
        )
    }

    /**
     * component returned for select
     * 
     * @returns 
     */
     function _Select(){
        const ITEM_HEIGHT = 40;
        const getItemLayout = useCallback((data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index
        }),
        [])

        return (
            <>
                <Cta onPress={() => setSelect({...select, isVisible: true})} >
                    <View style={[dropdown.cta, globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
                        {renderItem(select.selectedValue || items[items.findIndex(defaultSelectValue)])}
                        <Ionicons name="chevron-down-outline" size={20} color={global.colors.ANTHRACITE}/>
                    </View>
                </Cta>
                <BottomSheet 
                    visible={select.isVisible}
                    onBackButtonPress={() => setSelect({...select, isVisible: false})} 
                    onBackdropPress={() => setSelect({...select, isVisible: false})}
                >
                    <SafeAreaView  style={dropdown.list}>
                        <FlatList
                            removeClippedSubviews
                            data={items}
                            renderItem={({item}) => <Cta onPress={() => {setSelect({isVisible: false, selectedValue: item}); onChangeSelect(item)}}><View style={[{height: ITEM_HEIGHT}, globalStyles.p_10, globalStyles.justifyCenter]}>{renderItem(item)}</View></Cta>}
                            keyExtractor={keyExtractor}
                            windowSize={15}
                            maxToRenderPerBatch={11}
                            getItemLayout={getItemLayout}
                            ItemSeparatorComponent={() => <View style={dropdown.separator}></View>}
                        />
                    </SafeAreaView >
                </BottomSheet>
            </>
        )
    }

    /**
     * component returned for date/hour
     * 
     * @param {boolean} isHour is an hour field
     * @returns 
     */
     function _DateTime(isHour = false){
         /**
          * date/time picker component
          * @returns 
          */
        function dateTimePicker(){
            return(
                <DateTimePicker
                    value={dateTimeState.dateTime instanceof Date ? dateTimeState.dateTime : parseISO(dateTimeState.dateTime)}
                    mode={isHour ? "time" : "date"}
                    onChange={(event, dateTime) => {
                        if(dateTime !== undefined){
                            if(lessThan !== null){
                                if(!(lessThan instanceof Date)){
                                    lessThan = parseISO(lessThan);
                                }
                                let lessThanHourDate = format(lessThan, isHour ? "HH:mm:ss" : "yyyy-MM-dd");
                                let dateTimeHourDate = format(dateTime, isHour ? "HH:mm:ss" : "yyyy-MM-dd");
                                if(isHour ? !lessThanHour(dateTimeHourDate, lessThanHourDate) : !lessThanDate(dateTimeHourDate, lessThanHourDate)){
                                    setDateTimeState({dateTime: dateTime, isVisible: false});
                                    isHour ? 
                                        setFieldState({
                                            ...fieldState,
                                            errorLessThanHour: true
                                        })
                                    :
                                        setFieldState({
                                            ...fieldState,
                                            errorLessThanDate: true
                                        })
                                    isError !== null && isError(true)
                                    return;
                                }
                            }

                            if(greaterThan !== null){
                                if(!(greaterThan instanceof Date)){
                                    greaterThan = parseISO(greaterThan);
                                }
                                let greaterThanHourDate = format(greaterThan, isHour ? "HH:mm:ss" : "yyyy-MM-dd");
                                let dateTimeHourDate = format(dateTime, isHour ? "HH:mm:ss" : "yyyy-MM-dd");
                                if(isHour ? lessThanHour(dateTimeHourDate, greaterThanHourDate) : lessThanDate(dateTimeHourDate, greaterThanHourDate)){
                                    setDateTimeState({dateTime: dateTime, isVisible: false});
                                    isHour ? 
                                        setFieldState({
                                            ...fieldState,
                                            errorGreaterThanHour: true
                                        })
                                    :
                                        setFieldState({
                                            ...fieldState,
                                            errorGreaterThanDate: true
                                        })
                                    isError !== null && isError(true)
                                    return;
                                }
                            }
            
                            setDateTimeState({dateTime: dateTime, isVisible: false});
                            onChangeDateTime(format(dateTime, "yyyy-MM-dd HH:mm:ss"));
                            setFieldState({
                                ...fieldState,
                                errorLessThanHour: false,
                                errorLessThanDate: false,
                                errorGreaterThanHour: false,
                                errorGreaterThanDate: false
                            })
                            isError !== null && isError(false)
                        }else{
                            setDateTimeState({...dateTimeState, isVisible: false})
                        }
                    }}
                    style={{flex: 1}}
                    locale={selectors.getLang()}
                />
            )
        }

        return (
            <>
                <Cta 
                    value={
                        isHour ?
                            t(selectors.getLang()).datetime.formats.hour(dateTimeState.dateTime)
                        :
                            t(selectors.getLang()).datetime.formats.readableDate(dateTimeState.dateTime)
                    } 
                    onPress={() => setDateTimeState({...dateTimeState, isVisible: true})} 
                    _style={[fieldDate.cta, globalStyles.justifyCenter]}
                />
                {Platform.OS === "ios" ?
                    <BottomSheet 
                        visible={dateTimeState.isVisible}
                        onBackButtonPress={() => setDateTimeState({...dateTimeState, isVisible: false})} 
                        onBackdropPress={() => setDateTimeState({...dateTimeState, isVisible: false})}
                    >
                        <View style={[globalStyles.w_100, fieldDate.container, globalStyles.justifyCenter]}>
                            {dateTimePicker()}
                        </View>
                    </BottomSheet>
                :
                    dateTimeState.isVisible && dateTimePicker()
                }
            </>
        )
    }

    /**
     * component returned for address
     * @returns 
     */
     function _Address(){
        return (
            <View>
                <TextInput 
                    onChangeText={_.debounce((value) => onChangeValue(value), 500)}
                    style={fields.text}
                    defaultValue={fieldState.defaultValue || fieldState.fieldValue}
                    onFocus={() => isFocus(true)}
                    onBlur={() => isFocus(false)}
                />
                <View style={{height: 200}}>
                    <Map
                        latitude={fieldState.location !== null ? fieldState.location.latitude : global.map.DEFAULT_NOT_ZOOM_LATITUDE} 
                        longitude={fieldState.location !== null ? fieldState.location.longitude : global.map.DEFAULT_NOT_ZOOM_LONGITUDE}
                        latitudeDelta={fieldState.location !== null ? null : global.map.DEFAULT_NOT_ZOOM_LATITUDE_DELTA}
                        longitudeDelta={fieldState.location !== null ? null : global.map.DEFAULT_NOT_ZOOM_LONGITUDE_DELTA}
                        onPress={(event) => {
                                let coordinate = event.nativeEvent.coordinate;
                                getAddressByLatLng(coordinate.latitude, coordinate.longitude,
                                    function(address){
                                        if(typeof address === "object"){
                                            if(address.error){
                                                actions.addPopupStatus({
                                                    type: "error",
                                                    message: t(selectors.getLang()).errors.ERROR_API
                                                })
                                                return;
                                            }
                                        }
                                        setFieldState({
                                            ...fieldState,
                                            defaultValue: null,
                                            fieldValue: address,
                                            location: coordinate
                                        })
                                        onChange(address, coordinate);
                                        isError !== null && isError(false);
                                    }
                                )}
                        }
                    >
                        {fieldState.location !== null &&
                            <MapPin 
                                latitude={fieldState.location.latitude}
                                longitude={fieldState.location.longitude}
                            />
                        }
                    </Map>
                </View>
            </View>
        )
    }

    /**
     * component returned for period calendar
     * @returns 
     */
    function _CalendarPeriod(){
        let datesBetween = {}
        if(fieldState.calendarPeriod.startDay !== null && fieldState.calendarPeriod.endDay !== null){
            getDatesBetweenTwoDates(fieldState.calendarPeriod.startDay.dateString, fieldState.calendarPeriod.endDay.dateString).map((value, index) => {
                datesBetween[value] = {
                    color: global.colors.LIGHT_MAIN_COLOR
                }
            })
        }

        return (
            <CalendarList 
                markingType={'period'}
                onDayPress={(day) => onCalendarDayPress(day)}
                showScrollIndicator={true}
                scrollEnabled={true}
                pastScrollRange={0}
                futureScrollRange={5}
                minDate={new Date()}
                onDayLongPress={() => onCalendarDayLongPress()}
                theme={{
                    dayTextColor: global.colors.ANTHRACITE,
                    monthTextColor: global.colors.ANTHRACITE
                }}
                markedDates={
                    fieldState.calendarPeriod.startDay !== null && fieldState.calendarPeriod.endDay !== null ?
                    {
                        [fieldState.calendarPeriod.startDay.dateString]: {startingDay: true, color: global.colors.MAIN_COLOR},
                        ...datesBetween,
                        [fieldState.calendarPeriod.endDay.dateString]: {endingDay: true, color: global.colors.MAIN_COLOR}
                    }
                    : fieldState.calendarPeriod.startDay !== null ?
                    {
                        [fieldState.calendarPeriod.startDay.dateString]: {startingDay: true, color: global.colors.MAIN_COLOR}
                    }
                    : {}
                }
            />
        )
    }

    /**
     * component returned for phone field
     * @returns 
     */
    function _Phone(){
        return (
            <PhoneInput
                ref={phoneInput}
                defaultValue={fieldState.defaultValue || fieldState.fieldValue}
                defaultCode={JSON.parse(fieldState.countryValue).cca2}
                layout="first"
                onChangeText={(number) => {
                    onChangePhoneValue(number)
                }}
                onChangeCountry={(country) => {
                    onChangeCountry(country);
                }}
                containerStyle={{borderBottomWidth: 2, borderBottomColor: global.colors.MAIN_COLOR, width: "100%"}}
                placeholder={t(selectors.getLang()).fields.PHONE_NUMBER}
                textInputStyle={{color: global.colors.ANTHRACITE}}
                codeTextStyle={{color: global.colors.ANTHRACITE}}
            />
        )
    }

    let _return = _Text();
    switch(type){
        case "text":
            _return = _Text();
            break; 
        case "textarea":
            _return = _TextArea();
            break; 
        case "select":
            _return = _Select();
            break; 
        case "date":
            _return = _DateTime();
            break;
        case "hour":
            _return = _DateTime(true);
            break;
        case "address":
            _return = _Address();
            break;
        case "phone":
            _return = _Phone();
            break;
        case "password":
            _return = _Password();
            icon = icon || "lock-closed-outline"
            placeholder = placeholder || t(selectors.getLang()).fields.PASSWORD 
            break;
        case "mail":
            _return = _Mail();
            icon = icon || "mail-outline"
            placeholder = placeholder || t(selectors.getLang()).fields.MAIL
            break;
        case "username":
            _return = _Text();
            icon = icon || "person-outline"
            placeholder = placeholder || t(selectors.getLang()).fields.USERNAME 
            break;
        case "firstname":
            _return = _Text();
            icon = icon || "newspaper-outline"
            placeholder = placeholder || t(selectors.getLang()).fields.FIRSTNAME 
            break;
        case "lastname":
            _return = _Text();
            icon = icon || "newspaper-outline"
            placeholder = placeholder || t(selectors.getLang()).fields.LASTNAME 
            break;
        case "calendar-period":
            _return = _CalendarPeriod();
            break;
        default:
            _return = _Text(); 
    }

    return(
        <View style={globalStyles.flexColumn}>
            {
                label !== null ?
                    <View style={[globalStyles.m_10, globalStyles.flexRow, globalStyles.alignCenter]}>
                        {
                            labelIcon !== null && (
                                <View style={[globalStyles.mr_5, globalStyles.mb_10]}>
                                    <Ionicons name={labelIcon} size={20} color={global.colors.ANTHRACITE}/>
                                </View>
                            )
                        }
                        <Title type="third">
                            {label} :
                        </Title>
                    </View>
                :
                    null
            }
            <View style={[globalStyles.flexRow, globalStyles.w_100, globalStyles.alignCenter]}>
                {
                    icon !== null || ["password", "mail", "username"].includes(type) ?
                        <View style={[{width: "10%"}, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                            <Ionicons size={25} name={icon} color={global.colors.ANTHRACITE} />
                        </View>
                    :
                        null
                }
                <View style={{width: icon !== null ? "90%" : "100%", position: "relative"}}>
                    {placeholder !== null ?
                        <Txt _style={{position: "absolute", zIndex: -1, top: fieldState.focus || (fieldState.fieldValue !== "" && fieldState.fieldValue !== null) || (fieldState.defaultValue !== "" && fieldState.defaultValue !== null) ? -5 : 15, left: 0, color: global.colors.LIGHT_GREY}}>
                            {placeholder}
                        </Txt>
                    :
                        null
                    }
                    {_return}
                    {fieldState.errorXSS 
                    || fieldState.errorPassword 
                    || fieldState.errorMail
                    || fieldState.errorMaxLength 
                    || fieldState.errorMinLength
                    || fieldState.errorLettersOnly
                    || fieldState.errorUsername
                    || fieldState.errorLessThanHour
                    || fieldState.errorLessThanDate
                    || fieldState.errorGreaterThanHour
                    || fieldState.errorGreaterThanDate
                    || fieldState.errorPhoneNumber
                    ?
                        <View style={globalStyles.flexRow}>
                            <Ionicons name="warning-outline" size={17} color={global.colors.RED_ERROR} />
                            <View style={globalStyles.ml_5}>
                                <Txt _style={{color: global.colors.RED_ERROR}}>
                                    {fieldState.errorXSS || fieldState.errorUsername ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_VALUES
                                    : fieldState.errorPassword ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_PASSWORD
                                    : fieldState.errorMail ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_MAIL
                                    : fieldState.errorMaxLength ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_MAX_LENGTH
                                    : fieldState.errorMinLength ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_MIN_LENGTH
                                    : fieldState.errorLessThanHour ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_LESS_THAN_HOUR
                                    : fieldState.errorLessThanDate ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_LESS_THAN_DATE
                                    : fieldState.errorGreaterThanHour ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_GREATER_THAN_HOUR
                                    : fieldState.errorGreaterThanDate ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_GREATER_THAN_DATE
                                    : fieldState.errorPhoneNumber ?
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_PHONE_NUMBER
                                    :
                                        t(selectors.getLang()).fields.FIELD_INCORRECT_LETTERS_ONLY
                                    }
                                </Txt>
                            </View>
                        </View>
                    :
                        null
                    }
                </View>
            </View>
        </View>
    )
})