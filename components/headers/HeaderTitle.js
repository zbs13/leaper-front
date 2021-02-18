import React from 'react';
import { Text, View } from 'react-native';

export default function HeaderTitle({title}) {
  return (
    <View>
        <Text style={{color: "red"}}>{title}</Text>
    </View>
  );
}
