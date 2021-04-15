import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import Logo from '../logo/Logo';
import { logo } from '../../assets/styles/styles';

/**
 * home loader
 * 
 * @returns 
 */
export default function HomeLoader() {
  return (
    <View style={[globalStyles.justifyCenter, globalStyles.w_100, globalStyles.h_100, globalStyles.alignCenter]}>
        <Logo _style={logo.loading} />
    </View>
  );
}