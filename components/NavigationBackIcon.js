import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { header } from './../assets/styles/styles';

/**
 * navigation back icon
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function NavigationBackIcon({navigation}) {
  return (
    <View>
        <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Ionicons style={[header.headerIcons, header.headerBackIcon]} name="chevron-back-outline" />
        </TouchableOpacity>
    </View>
  );
}