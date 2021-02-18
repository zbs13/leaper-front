import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SportEventScreen from '../screens/SportEventScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomMenu from './BottomMenu';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

const listSports = 
    [
        {
            name: 'Home',
            icon: 'md-home',
            component: 'Home'
        },{
            name: 'Biathlon',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Courses',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Cyclisme',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Lancers',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Marche',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Marathon',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Sauts',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },{
            name: 'Triathlon',
            icon: 'md-stopwatch',
            component: 'SportEventScreen'
        },
        
        {
            name: 'Crossfit',
            icon: 'md-barbell',
            component: 'SportEventScreen'
        },{
            name: 'Halterophilie',
            icon: 'md-barbell',
            component: 'SportEventScreen'
        },{
            name: 'Parkour',
            icon: 'md-barbell',
            component: 'SportEventScreen'
        },{
            name: 'Pilate',
            icon: 'md-barbell',
            component: 'SportEventScreen'
        },{
            name: 'Step',
            icon: 'md-barbell',
            component: 'SportEventScreen'
        },{
            name: 'Yoga',
            icon: 'md-barbell',
            component: 'SportEventScreen'
        },{
            name: 'Gymnastique',
            icon: 'md-medal',
            component: 'SportEventScreen'
        },{
            name: 'Airsoft',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Baby-foot',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Billard',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Bowling',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Danse',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Echecs',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Equitation',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Karting',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Paintball',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Pétanque',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Tir à l’arc',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Ultimate',
            icon: 'md-pint',
            component: 'SportEventScreen'
        },{
            name: 'Badminton',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Baseball',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Basketball',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Cricket',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Football',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Football americain',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Futsal',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Golf',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Handball',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Hockey sur gazon',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Squash',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Pelote basque',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Tennis',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Tennis de table',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Polo',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Rugby',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Volley ball',
            icon: 'md-football',
            component: 'SportEventScreen'
        },{
            name: 'Water polo',
            icon: 'md-football',
            component: 'SportEventScreen'
        },
        {
            name: 'Aikido',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Boxe',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Capoeira',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Catch',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Escrime',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Ju-jitsu',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Judo',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Karaté',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Kendo',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Kenjutsu',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Kick boxing',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Kung-fu',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Krav maga',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'MMA',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },{
            name: 'Taekwondo',
            icon: 'md-shield',
            component: 'SportEventScreen'
        },
        
        
        {
            name: 'Bmx',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Hockey sur glace',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Kitesurfing',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Patinage',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Planche à voile',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Roller',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Skateboard',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Ski alpin',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Ski nautique',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Snowboard',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Surf',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },{
            name: 'Wakeboard',
            icon: 'md-trending-down',
            component: 'SportEventScreen'
        },

        {
            name: 'Aviron',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Canoe',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Canyoning',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Kayak',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Natation',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Pêche',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Plongée',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },{
            name: 'Rafting',
            icon: 'md-boat',
            component: 'SportEventScreen'
        },

        {
            name: 'Base jump',
            icon: 'md-warning',
            component: 'SportEventScreen'
        },{
            name: 'Escalade',
            icon: 'md-warning',
            component: 'SportEventScreen'
        },{
            name: 'Parachutisme',
            icon: 'md-warning',
            component: 'SportEventScreen'
        },{
            name: 'Parapente',
            icon: 'md-warning',
            component: 'SportEventScreen'
        },{
            name: 'Quad',
            icon: 'md-warning',
            component: 'SportEventScreen'
        },{
            name: 'Rallye Automobile',
            icon: 'md-warning',
            component: 'SportEventScreen'
        }
    ];

export default function PopupLeft() {
  return (
    <>
        <Drawer.Navigator drawerStyle={{ backgroundColor: '#ffff', width: 260, }}>
            {
                listSports.map((value, index) => {
                    if(value.component === 'SportEventScreen') {
                        return (
                            <Drawer.Screen 
                            key={index}
                            name= {value.name}
                            component={SportEventScreen} 
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
                    if(value.component === 'Home') {
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
    </>
  );
}

const styles = StyleSheet.create({
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 350,
      justifyContent: 'center',
      alignItems: 'center',
    },
});