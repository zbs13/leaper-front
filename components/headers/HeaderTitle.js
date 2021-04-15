import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';

/**
 * Header title
 * 
 * @param {string} title title 
 * @returns 
 */
export default function HeaderTitle({title}) {
  return (
    <View>
        <Txt _style={[globalStyles.c_anth, globalStyles.f_bold, globalStyles.title_size]}>{title}</Txt>
    </View>
  );
}
