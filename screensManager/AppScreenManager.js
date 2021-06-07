import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import global from '../providers/global';
import BottomMenu from '../components/menus/BottomMenu';
import { withCustomHeaderOnly, auth } from '../routes';
import useUsers from '../hooks/useUsers';

const Stack = createStackNavigator();

export default function AppScreenManager() {

    const {selectors} = useUsers();

    return (
        selectors.isConnected() ?
            <Stack.Navigator initialRouteName={global.screens.BOTTOM_MENU_ROUTING}>
                <Stack.Screen name={global.routing.BOTTOM_MENU_ROUTING} component={BottomMenu} options={{ headerShown: false }} />
                {
                    withCustomHeaderOnly.map((value, index) => {
                        return <Stack.Screen key={index} name={value.name} component={value.component} options={value.header} />
                    })
                }
            </Stack.Navigator>
        :
            <Stack.Navigator 
                initialRouteName={global.screens.LOGIN} 
                screenOptions={{
                    headerShown: false
                }}
            >
                {
                    auth.map((value, index) => {
                        return <Stack.Screen key={index} name={value.name} component={value.component} />
                    })
                }
            </Stack.Navigator> 
    );
}
