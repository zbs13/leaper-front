import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PopupLeft from './components/PopupLeft';
import HomeScreen from './screens/HomeScreen';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import screensRouting from './providers/screensRouting';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
    <NavigationContainer>
      <PopupLeft />
    </NavigationContainer>
    </>
    <NavigationContainer>
      <Stack.Navigator>
        {screensRouting.map((screen, index) => {
          return <Stack.Screen key={index} name={screen.name} component={screen.component} options={screen.header} />
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
