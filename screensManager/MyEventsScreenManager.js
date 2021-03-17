import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import MyEventsScreen from '../screens/MyEventsScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function MyEventsScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.MY_EVENTS} component={MyEventsScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
