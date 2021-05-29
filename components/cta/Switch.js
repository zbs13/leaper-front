import React from 'react';
import { View, Switch as RNSwitch} from 'react-native';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';
import global from '../../providers/global';

/**
 * Switch rendering
 * 
 * @param {function} onValueChange called when switch value changed
 * @param {boolean} value true if checked or false
 * @param {string} label switch label
 * @param {number} size switch size
 * @returns 
 */
export default function Switch({
    onValueChange, 
    value, 
    label,
    size = null
}){
    return (
        <View style={[globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween, globalStyles.w_100]}>
            <Txt>
                {label}
            </Txt>
            <RNSwitch
                trackColor={{ false: global.colors.LIGHT_GREY, true: global.colors.LIGHT_MAIN_COLOR }}
                thumbColor={value ? global.colors.MAIN_COLOR : global.colors.WHITE}
                ios_backgroundColor={global.colors.LIGHT_GREY}
                onValueChange={onValueChange}
                value={value}
                style={{ transform: [{ scaleX: size || 1.2 }, { scaleY: size || 1.2 }] }}
            />
        </View>
    )
}