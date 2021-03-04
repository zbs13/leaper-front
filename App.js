import React from 'react';
import LeftToggleMenu from './components/Menus/LeftToggleMenu';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from "./context/appContext";

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <LeftToggleMenu />
      </NavigationContainer>
    </AppProvider>
  );
}
