import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import LeftToggleMenu from '../menus/LeftToggleMenu';

export default function MainHeaderLeft({navigation}) {

    return (
        <View style={[globalStyles.m_10, globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <LeftToggleMenu navigation={navigation}/>
        </View>
    );
}
