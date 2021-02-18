import React from 'react';
import { Text, View } from 'react-native';
import globalStyles from '../../assets/styles/global';

export default function HeaderTitle({title}) {
  return (
    <View>
        <Text style={[globalStyles.c_anth, globalStyles.f_bold, globalStyles.title_size]}>{title}</Text>
    </View>
  );
}
