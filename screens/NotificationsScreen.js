import React from 'react';
import { Text, View, Button } from 'react-native';

export default function NotificationsScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Listes les notifications</Text>
        <Button 
            title="TESSSST"
              onPress={() => navigation.navigate("test")}
            />
      </View>
    );
  }

