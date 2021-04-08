import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { fields } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import Validator from '../../utils/validator';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';

export default function Field({type, placeholder = null, onChange, defaultValue, icon = null}){

    const {selectors} = useApp();

    const [fieldState, setFieldState] = useState({
        focus: false,
        fieldValue: "",
        errorXSS: false
    })

    function isFocus(isFocus){
        setFieldState({
            ...fieldState,
            focus: isFocus
        })
    }

    function onChangeValue(val){
        let isValid = Validator.checkXSS(val);
        if(isValid){
            onChange(val);
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorXSS: false
            })
        }else{
            setFieldState({
                ...fieldState,
                fieldValue: val,
                errorXSS: true
            })
        }
    }

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

    let _return = _Text();
    switch(type){
        case "text":
            _return = _Text(); 
        default:
            _return = _Text(); 
    }

    return(
        <View style={[globalStyles.flexRow, globalStyles.w_100, globalStyles.alignCenter, {backgroundColor: global.colors.WHITE}]}>
            {
                icon !== null ?
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
                {fieldState.errorXSS ?
                    <Text style={{color: global.colors.RED_ERROR}}>{t(selectors.getLang()).FIELD_INCORRECT_VALUES}</Text>
                :
                    null
                }
            </View>
        </View>
    )
}