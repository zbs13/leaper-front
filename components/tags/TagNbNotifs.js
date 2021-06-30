import React from 'react';
import { View } from 'react-native';
import { tag } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';

/**
 * tag nb notifs
 * 
 * @param {object} children for routing 
 * @param {number} size font size
 * @returns 
 */
export default function TagNbNotifs({children, size = null, padding = null}) {
    return (
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter, tag.container, tag.notifs, padding !== null ? {height: padding, minWidth: padding} : {}]}>
            <Txt _style={[tag.notifsText, size !== null ? {fontSize: size} : {}]}>
                {children > 9 ? "9+" : children}
            </Txt>
        </View>
    );
}
