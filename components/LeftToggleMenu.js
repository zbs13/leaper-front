import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SportEventScreenManager from '../screensManager/SportEventScreenManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomMenu from './BottomMenu';
import global from '../providers/global';
import useApp from '../hooks/useApp';

const Drawer = createDrawerNavigator();

export default function LeftToggleMenu() {

    const { selectors } = useApp();

    return (
        <Drawer.Navigator drawerStyle={{ backgroundColor: '#ffff', width: 260 }}>
            {
                global.listSports(selectors.getLang()).map((value, index) => {
                    return (
                        <Drawer.Screen
                            key={index}
                            name={value.name}
                            component={typeof value.component === "undefined" ? SportEventScreenManager : value.component === global.screens.HOME ? BottomMenu : null}
                            options={{

                                title: value.name,
                                drawerIcon: ({ focused, size }) => (
                                    <Ionicons
                                        name={value.icon}
                                        size={size}
                                        color={focused ? '#BDE023' : '#ccc'}
                                    />
                                ),
                            }}
                        />
                    )
                })
            }
        </Drawer.Navigator>
    );
}