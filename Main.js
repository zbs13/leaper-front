import React, {useEffect, useState} from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from './hooks/useApp';
import Search from './components/Search';
import HomeLoader from './components/loaders/HomeLoader';
import PopupStatus from './components/PopupStatus';
import AppScreenManager from './screensManager/AppScreenManager';

export default function Main() {

    const [state, setState] = useState({
        lang: "fr",
        isLoaded: false
    });

    const {actions, selectors} = useApp();
    useEffect(() => {
        if(Platform.OS === 'ios'){
            actions.updateUserParameters({
                os: 'ios'
            })
        }

        AsyncStorage.getItem("lang").then(val => {
            if(val !== state.lang){
                AsyncStorage.setItem("lang", "en").then(() => {
                    setState({
                        lang: "en",
                        isLoaded: true
                    });
                    actions.updateUserParameters({
                        lang: "en"
                    })
                });
            }else{
                setState({
                    ...state,
                    isLoaded: true
                });
            }
        })
    }, [])

    if(state.isLoaded){
        return (
            <>
                <AppScreenManager />
                {selectors.getSearchBar() !== null 
                    ?
                        <Search type={selectors.getSearchBar()} />
                    :
                        null
                }
                <PopupStatus />
            </>
        );
    }else{
        return(
            <HomeLoader />
        )
    }
}