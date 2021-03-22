import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreenManager from '../../screensManager/HomeScreenManager';
import AddListScreenManager from '../../screensManager/AddListScreenManager';
import ListFriendsScreenManager from '../../screensManager/ListFriendsScreenManager';
import NotificationsScreenManager from '../../screensManager/NotificationsScreenManager';
import ListFavoritesScreenManager from '../../screensManager/ListFavoritesScreenManager';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';

const Tab = createBottomTabNavigator();

export default function BottomMenu() {

  const { selectors } = useApp();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case t(selectors.getLang()).HOME:
              iconName = 'ios-home';
              size = 35;
              break;
            case t(selectors.getLang()).ADD:
              iconName = 'ios-add-outline';
              break;
            case t(selectors.getLang()).FRIENDS:
              iconName = 'ios-people-outline';
              break;
            case t(selectors.getLang()).NOTIFICATIONS:
              iconName = 'ios-notifications-outline';
              break;
            case t(selectors.getLang()).FAVORITES:
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
      <Tab.Screen name={t(selectors.getLang()).ADD} component={AddListScreenManager} />
      <Tab.Screen name={t(selectors.getLang()).FRIENDS} component={ListFriendsScreenManager} />
      <Tab.Screen name={t(selectors.getLang()).HOME} component={HomeScreenManager} />
      <Tab.Screen name={t(selectors.getLang()).NOTIFICATIONS} component={NotificationsScreenManager} options={{ tabBarBadge: 3 }} />
      <Tab.Screen name={t(selectors.getLang()).FAVORITES} component={ListFavoritesScreenManager} />
    </Tab.Navigator>
  );
}

