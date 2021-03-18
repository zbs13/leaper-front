import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import SportEventScreen from '../screens/SportEventScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function SportEventScreenManager() {

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={global.screens.SPORT_EVENTS} component={SportEventScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
