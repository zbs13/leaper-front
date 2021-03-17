import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import MyGroupsScreen from '../screens/MyGroupsScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function MyGroupsScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.MY_GROUPS} component={MyGroupsScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
