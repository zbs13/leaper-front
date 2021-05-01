import React from 'react';
import { Text, View } from 'react-native';
import Txt from '../components/Txt';

/**
 * settings screen
 * 
 * @returns 
 */
export default function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Txt>Settings!</Txt>
      </View>
    );
  }