import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import AddListScreen from '../screens/AddListScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function AddListScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.ADD} component={AddListScreen} options={({navigation}) => (headerType.back(navigation, "ahaha"))} />
        </Stack.Navigator>
    );
}
