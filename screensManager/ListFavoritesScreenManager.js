import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import { withBottomMenu } from '../routes';
import global from '../providers/global';
import ListFavoritesScreen from "../screens/ListFavoritesScreen";

const Stack = createStackNavigator();

export default function ListFavoritesScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.FAVORITES} component={ListFavoritesScreen} options={({navigation}) => (headerType.main(navigation))}/>
            {
                withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main(navigation)) : value.header}/>
                })
            }
        </Stack.Navigator>
    );
}
