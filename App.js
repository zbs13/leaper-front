import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from "./context/appContext";
import { UsersProvider } from './context/usersContext';

export default function App() {
  return (
    <AppProvider>
      <UsersProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </UsersProvider>
    </AppProvider>
  );
}
