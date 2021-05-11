import React, { useState, useEffect, memo, useCallback } from 'react';
import { TextInput, View, FlatList, SafeAreaView } from 'react-native';
import { fields, select as dropdown, fieldDate} from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import Validator from '../../utils/validator';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import { getDatesBetweenTwoDates } from '../../utils/utils';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import { addDays, format } from 'date-fns';
import Title from '../Title';
import Txt from '../Txt';
import { BottomSheet } from 'react-native-btr';
import Cta from '../cta/Cta';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

/**
 * Fields management => text, password, calendar, username...
 * 
 * @param {string} type field type => firstname, lastname, password, username, text, calendar-period 
 * @param {string|null} placeholder field placeholder
 * @param {function} onChange function calling each time value change 
 * @param {string} defaultValue default value in field
 * @param {string|null} label value to be displayed as field title
 * @param {string|null} icon icon name 
 * @param {number} min min char allowed
 * @param {number} max max char allowed
 * @param {function|null} onChangeSelect function called on value change
 * @param {function|null} keyExtractor key to extract for each items (unique id)
 * @param {function|null} defaultSelectValue default selected value
 * @param {object|null} items object with each items
 * @param {function|null} renderItem render of each item
 * @param {date|null} datetime default date
 * @param {function|null} onChangeDate called when date is changed
 * @returns 
 */
export default memo(function Field({
    type, 
    placeholder = null, 
    onChange = null,
    defaultValue, 
    label = null, 
    icon = null,
    min = 0, 
    max = 255,
    // if type = select :
    onChangeSelect = null,
    keyExtractor = null,
    defaultSelectValue = null,
    items = null,
    renderItem = null,
    /////
    // if type = date :
    datetime = null,
    onChangeDate = null
    /////
}){

    const {selectors} = useApp();

    const [fieldState, setFieldState] = useState({
        defaultValue: defaultValue,
        focus: false,
        fieldValue: "",
        errorXSS: false,
        errorPassword: false,
        errorMail: false,
        errorUsername: false,
        errorMaxLength: false,
        errorMinLength: false,
        errorLettersOnly: false,
        calendarPeriod: {
            isStartDay: true,
            startDay: null,
            endDay: null
        }
    })

    const [select, setSelect] = useState({
        isVisible: false,
        selectedValue: null
    });

    const [dateState, setDateState] = useState({
        isVisible: false,
        date: datetime
    });

    useEffect(() => {
        if(onChange !== null){
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
        if(type === "firstname" || type === "lastname"){
            isOnlyLetters = Validator.checkOnlyLetters(val);
            max = 50;
        }

        let isUsernameValid = true;
        if(type === "username"){
            isUsernameValid = Validator.checkUsername(val);
            max = 50;
        }

        if(type === "textarea"){
            max = null;
        }
        let isMinLengthOk = Validator.checkMinLength(val, min);
        let isMaxLengthOk = max !== null ? Validator.checkMaxLength(val, max) : true;

        if(isValid){
            if(isOnlyLetters){
                if(isMinLengthOk){
                    if(isMaxLengthOk){
                        if(isUsernameValid){
                            onChange(val);
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
                        }else{
                            setFieldState({
                                ...fieldState,
                                defaultValue: null,
                                fieldValue: val,
                                errorUsername: true
                            })
                        }
                    }else{
                        setFieldState({
                            ...fieldState,
                            defaultValue: null,
                            fieldValue: val,
                            errorMaxLength: true
                        })
                    }
                }else{
                    setFieldState({
                        ...fieldState,
                        defaultValue: null,
                        fieldValue: val,
                        errorMinLength: true
                    })
                }
            }else{
                setFieldState({
                    ...fieldState,
                    defaultValue: null,
                    fieldValue: val,
                    errorLettersOnly: true
                })
            }
        }else{
            setFieldState({
                ...fieldState,
                defaultValue: null,
                fieldValue: val,
                errorXSS: true
            })
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
        }else{
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorPassword: true
            })
        }
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
            }else{
                setFieldState({
                    ...fieldState,
                    fieldValue: val,
                    errorMaxLength: true
                })
            }
        }else{
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorMail: true
            })
        }
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
                style={fields.text}
                onFocus={() => isFocus(true)}
                onBlur={() => isFocus(false)}
            />
        )
    }

    /**
     * component returned for select
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
     * component returned for date
     * @returns 
     */
     function _Date(){
         /**
          * date picker component
          * @returns 
          */
        function datePicker(){
            return(
                <DateTimePicker
                    value={dateState.date || new Date()}
                    mode="date"
                    onChange={(event, date) => {
                        if(date !== undefined){
                            setDateState({date: date, isVisible: false});
                            onChangeDate(date);
                            
                        }else{
                            setDateState({...dateState, isVisible: false})
                        }
                    }}
                    style={{flex: 1}}
                    locale={selectors.getLang()}
                />
            )
        }

        return (
            <>
                <Cta value={t(selectors.getLang()).datetime.formats.date(dateState.date)} onPress={() => setDateState({...dateState, isVisible: true})} />
                {Platform.OS === "ios" ?
                    <BottomSheet 
                        visible={dateState.isVisible}
                        onBackButtonPress={() => setDateState({...dateState, isVisible: false})} 
                        onBackdropPress={() => setDateState({...dateState, isVisible: false})}
                    >
                        <View style={[globalStyles.w_100, fieldDate.container, globalStyles.justifyCenter]}>
                            {datePicker()}
                        </View>
                    </BottomSheet>
                :
                    dateState.isVisible && datePicker()
                }
            </>
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
            _return = _Date();
            break;
        case "password":
            _return = _Password();
            icon = "lock-closed-outline"
            placeholder = t(selectors.getLang()).fields.PASSWORD 
            break;
        case "mail":
            _return = _Mail();
            icon = "mail-outline"
            placeholder = t(selectors.getLang()).fields.MAIL
            break;
        case "username":
            _return = _Text();
            icon = "person-outline"
            placeholder = t(selectors.getLang()).fields.USERNAME 
            break;
        case "firstname":
            _return = _Text();
            icon = "newspaper-outline"
            placeholder = t(selectors.getLang()).fields.FIRSTNAME 
            break;
        case "lastname":
            _return = _Text();
            icon = "newspaper-outline"
            placeholder = t(selectors.getLang()).fields.LASTNAME 
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
                    <View style={globalStyles.m_10}>
                        <Title type="third">
                            {label} :
                        </Title>
                    </View>
                :
                    null
            }
            <View style={[globalStyles.flexRow, globalStyles.w_100, globalStyles.alignCenter, {backgroundColor: global.colors.WHITE}]}>
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
                        <Txt _style={{position: "absolute", zIndex: -1, top: fieldState.focus || (fieldState.fieldValue !== "" && fieldState.fieldValue !== null) || (fieldState.defaultValue !== "" && fieldState.defaultValue !== null) ? -5 : 15, left: 0, color: global.colors.ANTHRACITE}}>
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
                    ?
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
                            : 
                                t(selectors.getLang()).fields.FIELD_INCORRECT_LETTERS_ONLY
                            }
                        </Txt>
                    :
                        null
                    }
                </View>
            </View>
        </View>
    )
})