import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import global from './global';
import headerType from '../components/headers/headers';
import BackHeaderCtas from './../components/headers/BackHeaderCtas';
import ListFriends from '../screens/ListFriends';

export default screensRouting = [
    {
        name: global.pages.HOME,
        component: HomeScreen,
        header: ({navigation}) => (headerType.main(navigation)) //({navigation}) => (headerType.back(navigation, "LE TITRE", <BackHeaderCtas type="menu" options={[{"aaa": "aaa"}]} />))
    },
    {
        name: "Friends",
        component: ListFriends,
        header: ({navigation}) => (headerType.back(navigation, "LE TITRE", <BackHeaderCtas type="menu" options={[{"aaa": "aaa"}]} />))
    }
]