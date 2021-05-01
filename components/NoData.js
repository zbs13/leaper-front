import React from 'react';
import { View } from 'react-native';
import globalStyles from '../assets/styles/global';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../providers/global';
import Txt from './Txt';

/**
 * component if no data
 * 
 * @param {string} message message to display if no data 
 * @returns 
 */
export default function NoData({message = null}) {

    const {selectors} = useApp();

    return (
        <View style={[globalStyles.flexColumn, globalStyles.w_100, globalStyles.mt_20, globalStyles.alignCenter]}>
            <Ionicons name="rainy-outline" size={90} color={global.colors.ANTHRACITE} />      
            <Txt _style={[globalStyles.c_anth, globalStyles.f_bold]} >{message !== null ? message : t(selectors.getLang()).NO_DATA}</Txt>
        </View>
    );
}