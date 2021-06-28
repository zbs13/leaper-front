import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import global from '../providers/global';
import BottomMenu from '../components/menus/BottomMenu';
import { withCustomHeaderOnly, auth } from '../routes';
import useApp from '../hooks/useApp';

const Stack = createStackNavigator();

export default function AppScreenManager() {

    const {selectors: selectorsApp} = useApp();

    return (
        selectorsApp.isConnected() ?
            <Stack.Navigator initialRouteName={global.routing.BOTTOM_MENU_ROUTING}>
                <Stack.Screen name={global.routing.BOTTOM_MENU_ROUTING} component={BottomMenu} options={{ headerShown: false }} />
                {
                    withCustomHeaderOnly.map((value, index) => {
                        return <Stack.Screen key={index} name={value.name} component={value.component} options={value.header} />
                    })
                }
            </Stack.Navigator>
        :
            <Stack.Navigator 
                initialRouteName={selectorsApp.isFirstLaunch() ? global.screens.WELCOME_LANGUAGE_SELECTION : global.screens.LOGIN} 
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
