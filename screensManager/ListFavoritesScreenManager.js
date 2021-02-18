import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import ListFavoritesScreen from '../screens/ListFavoritesScreen';
import global from '../providers/global';

const Stack = createStackNavigator();

export default function ListFavoritesScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.FAVORITES} component={ListFavoritesScreen} options={({navigation}) => (headerType.main(navigation))} />
        </Stack.Navigator>
    );
}
