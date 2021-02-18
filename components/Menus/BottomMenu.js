import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreenManager from '../../screensManager/HomeScreenManager';
import AddListScreenManager from '../../screensManager/AddListScreenManager';
import ListFriendsScreenManager from '../../screensManager/ListFriendsScreenManager';
import NotificationsScreenManager from '../../screensManager/NotificationsScreenManager';
import ListFavoritesScreenManager from '../../screensManager/ListFavoritesScreenManager';
import global from '../../providers/global';
import { langs, getUserLang } from '../../providers/langs';

const Tab = createBottomTabNavigator();

export default function BottomMenu() {
    return (
      <Tab.Navigator
        initialRouteName={global.screens.HOME}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                  case langs[getUserLang()].HOME : 
                      iconName = 'ios-home';
                      size = 35;
                      break;
                  case langs[getUserLang()].ADD :
                      iconName = 'ios-add-outline';
                      break;
                  case langs[getUserLang()].FRIENDS :
                      iconName = 'ios-people-outline';
                      break;
                  case langs[getUserLang()].NOTIFICATIONS :
                      iconName = 'ios-notifications-outline';
                      break;
                  case langs[getUserLang()].FAVORITES :
                      iconName = 'ios-location-outline';
                      break;
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            }
        })}
      tabBarOptions={{
        activeTintColor: '#BDE023',
        inactiveTintColor: 'gray',
      }}
      >
        <Tab.Screen name={langs[getUserLang()].ADD} component={AddListScreenManager}/>
        <Tab.Screen name={langs[getUserLang()].FRIENDS} component={ListFriendsScreenManager}/>
        <Tab.Screen name={langs[getUserLang()].HOME} component={HomeScreenManager} />
        <Tab.Screen name={langs[getUserLang()].NOTIFICATIONS} component={NotificationsScreenManager} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name={langs[getUserLang()].FAVORITES} component={ListFavoritesScreenManager} />
      </Tab.Navigator>
    );
  }

