import React, { useState, useEffect } from 'react';
import { TextInput, View, Text } from 'react-native';
import { fields } from '../../assets/styles/styles';
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
 * @returns 
 */
export default function Field({
    type, 
    placeholder = null, 
    onChange, 
    defaultValue, 
    label = null, 
    icon = null, 
    min = 0, 
    max = 255
}){

    const {selectors} = useApp();

    const [fieldState, setFieldState] = useState({
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

    useEffect(() => {
        onChange(fieldState.calendarPeriod.startDay, fieldState.calendarPeriod.endDay)
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

        let isMinLengthOk = Validator.checkMinLength(val, min);
        let isMaxLengthOk = Validator.checkMaxLength(val, max);

        if(isValid){
            if(isOnlyLetters){
                if(isMinLengthOk){
                    if(isMaxLengthOk){
                        if(isUsernameValid){
                            onChange(val);
                            setFieldState({
                                ...fieldState,
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
                                fieldValue: val,
                                errorUsername: true
                            })
                        }
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
                        errorMinLength: true
                    })
                }
            }else{
                setFieldState({
                    ...fieldState,
                    fieldValue: val,
                    errorLettersOnly: true
                })
            }
        }else{
            setFieldState({
                ...fieldState,
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
                        <Text style={{position: "absolute", zIndex: -1, top: fieldState.focus || (fieldState.fieldValue !== "" && fieldState.fieldValue !== null) ? -5 : 15, left: 0, color: global.colors.ANTHRACITE}}>
                            {placeholder}
                        </Text>
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
                        <Text style={{color: global.colors.RED_ERROR}}>
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
                        </Text>
                    :
                        null
                    }
                </View>
            </View>
        </View>
    )
}