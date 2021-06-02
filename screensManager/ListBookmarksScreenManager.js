import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import { withBottomMenu } from '../routes';
import global from '../providers/global';
import ListBookmarksScreen from "../screens/ListBookmarksScreen";

const Stack = createStackNavigator();

export default function ListBookmarksScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.BOOKMARKS} component={ListBookmarksScreen} options={({navigation}) => (headerType.main())}/>
            {
                withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main()) : value.header}/>
                })
            }
        </Stack.Navigator>
    );
}
