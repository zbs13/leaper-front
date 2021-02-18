import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import ListFriendsScreen from '../screens/ListFriendsScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function ListFriendsScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.FRIENDS} component={ListFriendsScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
