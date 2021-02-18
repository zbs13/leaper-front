import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import { getUserLang } from '../utils';
import useApp from "../hooks/useApp";

export default function HomeScreen({ navigation }) {

    const { actions } = useApp();

    useEffect(() => {
        // actions.updateUserParameters({
        //     lang: "en"
        // });
    })

    return (
        <View>
            <Button title="GO" onPress={() => navigation.push("Home")} />
        </View>
    );
}
