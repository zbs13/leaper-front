import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ListFriends from '../screens/ListFriends';
import Notifications from '../screens/Notifications';
import ListFavorites from '../screens/ListFavorites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddList from '../screens/AddList';

const Tab = createBottomTabNavigator();

export default function BottomMenu() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
                case 'Home' : 
                    iconName = 'ios-home';
                    size = 35;
                    break;
                case 'Add' :
                    iconName = 'ios-add-outline';
                    break;
                case 'Friends' :
                    iconName = 'ios-people-outline';
                    break;
                case 'Notifications' :
                    iconName = 'ios-notifications-outline';
                    break;
                case 'Favorites' :
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
        <Tab.Screen name="Add" component={AddList}/>
        <Tab.Screen name="Friends" component={ListFriends}/>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notifications" component={Notifications} options={{ tabBarBadge: 3 }} />
        <Tab.Screen name="Favorites" component={ListFavorites} />
      </Tab.Navigator>
    );
  }

