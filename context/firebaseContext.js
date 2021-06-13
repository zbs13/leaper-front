import React, { createContext } from "react";
import global from '../providers/global';
import firebase from 'firebase';
import 'firebase/firestore';

const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {

    if (!firebase.apps.length) {
        firebase.initializeApp(global.firebase);
    }else{
        firebase.app();
    }

    let fb = {
        firestore: firebase.firestore(),
        storage: firebase.storage()
    }

    return (
        <FirebaseContext.Provider value={{ fb }}>
            {children}
        </FirebaseContext.Provider>
    );
};

export default FirebaseContext;
