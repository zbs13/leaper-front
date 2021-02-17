import React from 'react';
import { Text, View, Button } from 'react-native';
import langs from '../providers/langs';

export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Button title="PIPI" onPress={() => navigation.push("Home")} />
        </View>
    );
}
