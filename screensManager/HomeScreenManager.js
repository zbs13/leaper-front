import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import HomeScreen from '../screens/HomeScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function HomeScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.HOME} component={HomeScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
