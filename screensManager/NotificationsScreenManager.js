import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import NotificationsScreen from '../screens/NotificationsScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function NotificationsScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.NOTIFICATIONS} component={NotificationsScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
