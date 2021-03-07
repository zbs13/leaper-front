import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SportEventScreenManager from '../../screensManager/SportEventScreenManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomMenu from './BottomMenu';
import global from '../../providers/global';
import useApp from '../../hooks/useApp';

const Drawer = createDrawerNavigator();

export default function LeftToggleMenu() {

    const {selectors} = useApp();

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
}