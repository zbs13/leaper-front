import React, {useEffect, useState} from 'react';
import { Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SportEventScreenManager from '../../screensManager/SportEventScreenManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomMenu from './BottomMenu';
import global from '../../providers/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from '../../hooks/useApp';

const Drawer = createDrawerNavigator();

export default function LeftToggleMenu() {

    const [state, setState] = useState({
        lang: "fr",
        isLoaded: false
    });

    const {actions, selectors} = useApp();

    useEffect(() => {
        AsyncStorage.getItem("lang").then(val => {
            if(val !== state.lang){
            AsyncStorage.setItem("lang", "fr").then(() => {
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
    }, [state.lang])

    if(state.isLoaded){
        return (
            <Drawer.Navigator drawerStyle={{ backgroundColor: '#ffff', width: 260 }}>
                {
                    global.listSports(selectors.getLang()).map((value, index) => {
                        if(typeof value.component === "undefined") {
                            return (
                                <Drawer.Screen 
                                key={index}
                                name= {value.name}
                                component={SportEventScreenManager} 
                                options={{
                                    title: value.name,
                                    drawerIcon: ({focused, size}) => (
                                        <Ionicons
                                            name= {value.icon}
                                            size={size}
                                            color={focused ? '#BDE023' : '#ccc'}
                                        />
                                    ),
                                }}
                            />
                            )  
                        }
                        if(value.component === global.screens.HOME) {
                            return (
                                <Drawer.Screen 
                                key={index}
                                name= {value.name}
                                component={BottomMenu} 
                                options={{
                                    title: value.name,
                                    drawerIcon: ({focused, size}) => (
                                        <Ionicons
                                            name= {value.icon}
                                            size={size}
                                            color={focused ? '#BDE023' : '#ccc'}
                                        />
                                    ),
                                }}
                            />
                            ) 
                        }
                    })
                }
            </Drawer.Navigator>
        );
    }else{
        return(<Text>aaa</Text>)
    }
}