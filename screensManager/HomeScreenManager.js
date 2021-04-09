import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withBottomMenu, HOME_withBottomMenu } from '../routes';
import headerType from "../components/headers/headers";

const Stack = createStackNavigator();

export default function HomeScreenManager() {

    return (
        <Stack.Navigator>
            {
                HOME_withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main(navigation)) : value.header}/>
                })
            }
            {
                withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main(navigation)) : value.header}/>
                })
            }
        </Stack.Navigator>
    );
}
