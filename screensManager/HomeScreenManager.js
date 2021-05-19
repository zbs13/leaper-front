import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withBottomMenu } from '../routes';
import headerType from "../components/headers/headers";
import global from '../providers/global';
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function HomeScreenManager() {

    return (
        <Stack.Navigator initialRouteName={global.screens.HOME}>
            <Stack.Screen name={global.screens.HOME} component={HomeScreen} options={({navigation}) => (headerType.main(navigation))}/>
            {
                withBottomMenu.map((value, index) => {
                    return <Stack.Screen key={index} name={value.name} component={value.component} options={typeof value.header === "undefined" ? ({navigation}) => (headerType.main(navigation)) : value.header}/>
                })
            }
        </Stack.Navigator>
    );
}
