import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { header } from './../assets/styles/styles';
import { useNavigation } from '@react-navigation/native';

/**
 * navigation back icon
 * 
 * @returns 
 */
export default function NavigationBackIcon() {

  const navigation = useNavigation();

  return (
    <View>
        <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Ionicons style={[header.headerIcons, header.headerBackIcon]} name="chevron-back-outline" />
        </TouchableOpacity>
    </View>
  );
}