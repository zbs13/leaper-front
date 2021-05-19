import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import { withBottomMenu, NOTIFICATIONS_withBottomMenu } from '../routes';
import global from '../providers/global';
import NotificationsScreen from "../screens/NotificationsScreen";

const Stack = createStackNavigator();

export default function NotificationsScreenManager() {

    return (
        <Stack.Navigator>
            <Stack.Screen name={global.screens.NOTIFICATIONS} component={NotificationsScreen} options={({navigation}) => (headerType.main())}/>
            {
                withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main()) : value.header}/>
                })
            }
        </Stack.Navigator>
    );
}
