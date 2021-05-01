import React from 'react';
import { View, Button } from 'react-native';
import Txt from '../components/Txt';

/**
 * notifications screen
 * 
 * @returns 
 */
export default function NotificationsScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Txt>Listes les notifications</Txt>
        <Button 
            title="TESSSST"
              onPress={() => navigation.navigate("test")}
            />
      </View>
    );
  }

