import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import headerType from '../components/headers/headers';
import { ADD_withBottomMenu } from '../routes';

const Stack = createStackNavigator();

export default function AddListScreenManager() {

    return (
        <Stack.Navigator>
            {
                ADD_withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({ navigation }) => (headerType.main(navigation)) : value.header} />
                })
            }
        </Stack.Navigator>
    );
}
