import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreenManager from '../../screensManager/HomeScreenManager';
import ListFriendsScreenManager from '../../screensManager/ListFriendsScreenManager';
import NotificationsScreenManager from '../../screensManager/NotificationsScreenManager';
import ListBookmarksScreenManager from '../../screensManager/ListBookmarksScreenManager';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import global from '../../providers/global';

const Tab = createBottomTabNavigator();

/**
 * bottom menu
 * @returns 
 */
export default function BottomMenu() {

  const { selectors, actions } = useApp();

  return (
    <Tab.Navigator
      initialRouteName={global.routing.HOME_ROUTING}
      tabBarOptions={{
        activeTintColor: global.colors.MAIN_COLOR,
        inactiveTintColor: global.colors.GREY,
      }}
    >
      <Tab.Screen name={global.routing.ADD_ROUTING} children={() => {}} options={
        {
          tabBarLabel: t(selectors.getLang()).ADD,
          tabBarIcon: ({color, size}) => <Ionicons name="ios-add-outline" size={size} color={color} />
        }} 
        listeners={({navigation}) => ({
          tabPress: (e) => {
            e.preventDefault();
            actions.toggleAddModal(navigation);
          }
        })}  
      />
      <Tab.Screen name={global.routing.FRIENDS_ROUTING} component={ListFriendsScreenManager} options={
        {
          tabBarLabel: t(selectors.getLang()).FRIENDS,
          tabBarIcon: ({color, size}) => <Ionicons name="ios-people-outline" size={size} color={color} />
        }} />
      <Tab.Screen name={global.routing.HOME_ROUTING} component={HomeScreenManager} options={
        {
          tabBarLabel: t(selectors.getLang()).HOME,
          tabBarIcon: ({color, size}) => <Ionicons name="ios-home" size={35} color={color} />
        }} />
      <Tab.Screen name={global.routing.NOTIFICATIONS_ROUTING} component={NotificationsScreenManager} options={{ tabBarBadge: 3 }} options={
        {
          tabBarLabel: t(selectors.getLang()).NOTIFICATIONS,
          tabBarIcon: ({color, size}) => <Ionicons name="ios-notifications-outline" size={size} color={color} />
        }} />
      <Tab.Screen name={global.routing.BOOKMARKS_ROUTING} component={ListBookmarksScreenManager} options={
        {
          tabBarLabel: t(selectors.getLang()).BOOKMARKS,
          tabBarIcon: ({color, size}) => <Ionicons name="ios-location-outline" size={size} color={color} />
        }} />
    </Tab.Navigator>
  );
}

