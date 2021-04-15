import React, {useEffect, useState} from 'react';
import { Platform, StatusBar, View, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from './hooks/useApp';
import SearchModal from './components/modals/SearchModal';
import HomeLoader from './components/loaders/HomeLoader';
import PopupStatus from './components/PopupStatus';
import AppScreenManager from './screensManager/AppScreenManager';
import { GroupsProvider } from "./context/groupsContext";
import { EventsProvider } from "./context/eventsContext";
import { deviceYearClass, modelName } from 'expo-device';

export default function Main() {

    const [state, setState] = useState({
        lang: "fr",
        isLoaded: false
    });

    const {actions, selectors} = useApp();

    /**
     * configure status bar height according to os
     */
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? deviceYearClass >= 2017 && modelName !== "iPhone 8" && modelName !== "iPhone 8 Plus" ? 44 : 30 : StatusBar.currentHeight;

    /**
     * configure app os and language
     */
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
                <View style={{ height: STATUS_BAR_HEIGHT }}>
                    <StatusBar
                        animated={true}
                        backgroundColor="transparent"
                        barStyle="dark-content"
                    />
                </View>
                {(Platform.OS === 'ios') ?
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{flex: 1}}
                    >
                        <EventsProvider>
                            <GroupsProvider>
                                <AppScreenManager />
                            </GroupsProvider>
                        </EventsProvider>
                    </KeyboardAvoidingView>
                :
                    <EventsProvider>
                        <GroupsProvider>
                            <AppScreenManager />
                        </GroupsProvider>
                    </EventsProvider>
                }
                {selectors.getSearchBar() !== null 
                    ?
                        <SearchModal type={selectors.getSearchBar()} />
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