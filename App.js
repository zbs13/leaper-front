import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from "./context/appContext";
import { UsersProvider } from './context/usersContext';
import { FirebaseProvider } from './context/firebaseContext';
import { navigationRef } from './RootNavigation';

export default function App() {

  return (
    <AppProvider>
      <FirebaseProvider>
        <UsersProvider>
          <NavigationContainer ref={navigationRef}>
            <Main />
          </NavigationContainer>
        </UsersProvider>
      </FirebaseProvider>
    </AppProvider>
  );
}
