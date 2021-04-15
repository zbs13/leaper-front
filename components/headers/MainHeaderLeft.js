import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import LeftToggleMenu from '../menus/LeftToggleMenu';

/**
 * main at the left of the header
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function MainHeaderLeft({navigation}) {

    return (
        <View style={[globalStyles.m_10, globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <LeftToggleMenu navigation={navigation}/>
        </View>
    );
}
