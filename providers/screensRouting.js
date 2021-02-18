import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import global from './global';
import headerType from '../components/headers/headers';
import BackHeaderCtas from './../components/headers/BackHeaderCtas';

export default screensRouting = [
    {
        name: global.pages.HOME,
        component: HomeScreen,
        header: ({navigation}) => (headerType.back(navigation, "la bite", <BackHeaderCtas type="menu" options={[{"aaa": "aaa"}]} />))
    }
]