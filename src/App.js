import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from "../context/appContext";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </AppProvider>
  );
}
