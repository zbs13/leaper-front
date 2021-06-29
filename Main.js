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
import { RolesProvider } from './context/rolesContext';
import { deviceYearClass, modelName } from 'expo-device';
import { manageResponseUI } from './context/actions/apiCall';
import useFirebase from './hooks/useFirebase';
import _ from 'lodash';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function Main() {

    const [state, setState] = useState({
        isLoaded: false
    });

    const {actions, selectors} = useApp();
    const {selectors: selectorsUser, actions: actionsUser} = useUsers();
    const {actions: firebase} = useFirebase();

    /**
     * configure status bar height according to os
     */
    const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? deviceYearClass >= 2017 && modelName !== "iPhone 8" && modelName !== "iPhone 8 Plus" ? 44 : 30 : StatusBar.currentHeight;

    /**
     * register notification token
     * 
     * @param {function} callback called when notification token is getted
     * @returns 
     */
     async function registerForPushNotificationsAsync() {
        let token;
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        return token;
      }

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
                        async function (res) {
                            // const notifs = firebase.notifsListener(res.id, function(notif){
                            //     const data = notif.docs.map(doc => ({...doc.data(), id: doc.id}));
                            //     console.log(data);
                            //     actions.setNotifs(_.reverse(data));
                            // });
                            // registerForPushNotificationsAsync().then(token => {
                            //     firebase.setUserPushNotificationsToken(res.id, token);
                            // })
                            let profilePic = await firebase.getUserProfilePic(res.id);
                            actions.updateIsConnected(true);
                            actionsUser.update({
                                connectedUserProfilePic: profilePic
                            });
                            setState({
                                isLoaded: true
                            });
                            //return () => notifs();
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
    }, [selectors.isConnected(), selectors.isFirstLaunch()])

    useEffect(() => {
        if(selectorsUser.getConnectedUser().id !== undefined){
            firebase.notifsListener(selectorsUser.getConnectedUser().id, function(notifs){
                const data = notifs.docs.map(doc => ({...doc.data(), id: doc.id}));
                actions.setNotifs(_.reverse(data));
            })
            firebase.notifsWaitingStatusListener(selectorsUser.getConnectedUser().id, function(waitingNotifs){
                const data = waitingNotifs.docs.map(doc => ({...doc.data(), id: doc.id}));
                actions.setWaitingNotifs(data);
            })
        }
    }, [selectors.isConnected()])

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
                    <EventsProvider>
                        <GroupsProvider>
                            <RolesProvider>
                                <AppScreenManager />
                            </RolesProvider>
                        </GroupsProvider>
                    </EventsProvider>
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