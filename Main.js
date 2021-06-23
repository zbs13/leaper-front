import React, {useEffect, useState} from 'react';
import { Platform, StatusBar, View, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from './hooks/useApp';
import useUsers from './hooks/useUsers';
import SearchModal from './components/modals/SearchModal';
import AddModal from './components/modals/AddModal';
import HomeLoader from './components/loaders/HomeLoader';
import PopupStatus from './components/PopupStatus';
import AppScreenManager from './screensManager/AppScreenManager';
import { GroupsProvider } from "./context/groupsContext";
import { EventsProvider } from "./context/eventsContext";
import { FirebaseProvider } from "./context/firebaseContext";
import { RolesProvider } from './context/rolesContext';
import { deviceYearClass, modelName } from 'expo-device';
import { manageResponseUI } from './context/actions/apiCall';

export default function Main() {

    const [state, setState] = useState({
        isLoaded: false
    });

    const {actions, selectors} = useApp();
    const {selectors: selectorsUser, actions: actionsUser} = useUsers();

    /**
     * configure status bar height according to os
     */
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? deviceYearClass >= 2017 && modelName !== "iPhone 8" && modelName !== "iPhone 8 Plus" ? 44 : 30 : StatusBar.currentHeight;
    
    /**
     * configure app os and language
     */
    useEffect(() => {
        let isMounted = true;
        /**
         * get user language / set user language
         */
        async function getLang(){
            await AsyncStorage.getItem("lang").then(val => {
                if(val === null){
                    AsyncStorage.setItem("lang", "{'lang': 'en', flag: 'GB'}");
                }else{
                    if(isMounted){
                        actions.updateUserParameters({
                            lang: JSON.parse(val)
                        })
                    }
                }
            })
        }

        /**
         * check if first app launch
         */
        async function isFirstAppLaunch(){
            await AsyncStorage.getItem("isFirstLaunch").then(val => {
                if(val === null){
                    AsyncStorage.setItem("isFirstLaunch", "true");
                }else{
                    if(isMounted){
                        actions.updateUserParameters({
                            isFirstLaunch: val === "true"
                        })
                    }
                }
            })
        }

        getLang();
        isFirstAppLaunch();

        AsyncStorage.getItem("isConnected").then(isConnected => {
            if(isConnected === null){
                AsyncStorage.setItem("isConnected", "false").then(() => {
                    if(isMounted){
                        setState({
                            isLoaded: true
                        });
                    }
                });
            }else{
                if(isConnected === "true"){
                    actionsUser.fetchConnectedUser().then((data) => {
                        manageResponseUI(data,
                          selectors.getLang(),
                          function (res) {
                            if(isMounted){
                                actionsUser.updateIsConnected(true)
                                setState({
                                    isLoaded: true
                                });
                            }
                          },
                          function (error) {
                            if(isMounted){
                                actions.addPopupStatus(error);
                            }
                          })
                    })
                }else{
                    if(isMounted){
                        setState({
                            isLoaded: true
                        });
                    }
                }
            }
        })
        return () => { isMounted = false };
    }, [selectorsUser.isConnected(), selectors.isFirstLaunch()])

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
                <KeyboardAvoidingView
                    behavior={(Platform.OS === 'ios') ? "padding" : ""}
                    style={{flex: 1}}
                >
                    <FirebaseProvider>
                        <EventsProvider>
                            <GroupsProvider>
                                <RolesProvider>
                                    <AppScreenManager />
                                </RolesProvider>
                            </GroupsProvider>
                        </EventsProvider>
                    </FirebaseProvider>
                </KeyboardAvoidingView>
                {selectors.getSearchBar() !== null 
                    &&
                        <SearchModal type={selectors.getSearchBar()} />
                }
                {selectors.getAddModal().isOpen
                    &&
                        <AddModal />
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