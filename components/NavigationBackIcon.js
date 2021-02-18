import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './../assets/styles/styles';

export default function NavigationBackIcon({navigation}) {
  return (
    <View>
        <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Ionicons style={[styles.headerIcons, styles.headerBackIcon]} name="chevron-back-outline" />
        </TouchableOpacity>
    </View>
  );
}