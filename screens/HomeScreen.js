import React from 'react';
import { View, Button } from 'react-native';
import useApp from "../hooks/useApp";

export default function HomeScreen({ navigation }) {

    const { actions } = useApp();

    return (
        <View>
            <Button title="GO" onPress={() => navigation.push("Home")} />
        </View>
    );
}
