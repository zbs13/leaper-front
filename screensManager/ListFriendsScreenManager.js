import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import { withBottomMenu, FRIENDS_withBottomMenu } from '../routes';
import global from '../providers/global';
import ListFriendsScreen from "../screens/ListFriendsScreen";

const Stack = createStackNavigator();

export default function ListFriendsScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.FRIENDS} component={ListFriendsScreen} options={({navigation}) => (headerType.main(navigation))}/>
            {
                withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main(navigation)) : value.header}/>
                })
            }
        </Stack.Navigator>
    );
}
