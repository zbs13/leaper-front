import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import global from '../providers/global';
import BottomMenu from '../components/menus/BottomMenu';
import { withCustomHeaderOnly } from '../routes';

const Stack = createStackNavigator();

export default function AppScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.HOME} component={BottomMenu} options={{ headerShown: false }} />
            {
                withCustomHeaderOnly.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={value.header} />
                })
            }
        </Stack.Navigator>
    );
}
