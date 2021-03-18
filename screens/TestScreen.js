import React from 'react';
import { Text, View, Button } from 'react-native';


export default function TestScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Teeeest</Text>
        <Button 
            title="TESSSST"
              onPress={() => navigation.navigate("MyGroups")}
            />
      </View>
    );
  }