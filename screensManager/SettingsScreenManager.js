import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import SettingsScreen from '../screens/SettingsScreenManager';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function SettingsScreenManager() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={global.screens.SETTINGS} component={SettingsScreenManager} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
