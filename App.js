import React from 'react';
import Main from './Main';
import { NavigationContainer } from '@react-navigation/native';
import { AppProvider } from "./context/appContext";
import { UsersProvider } from './context/usersContext';
import { FirebaseProvider } from './context/firebaseContext';

export default function App() {

  return (
    <AppProvider>
      <FirebaseProvider>
        <UsersProvider>
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </UsersProvider>
      </FirebaseProvider>
    </AppProvider>
  );
}
