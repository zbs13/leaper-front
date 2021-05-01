import React from 'react';
import { View } from 'react-native';
import { tag } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';

/**
 * tag nb notifs
 * 
 * @param {object} children for routing 
 * @returns 
 */
export default function TagNbNotifs({children}) {
    return (
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter, tag.container, tag.notifs]}>
            <Txt _style={tag.notifsText}>
                {children > 9 ? "9+" : children}
            </Txt>
        </View>
    );
}
