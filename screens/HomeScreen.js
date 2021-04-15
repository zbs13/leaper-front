import React from 'react';
import { ScrollView } from 'react-native';
import MyGroupsEventsCard from '../components/cards/MyGroupsEventsCard';

/**
 * home screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function HomeScreen({navigation}) {

    return (
      <ScrollView>
        <MyGroupsEventsCard navigation={navigation} type="groups"/>
        <MyGroupsEventsCard navigation={navigation} type="events"/>
      </ScrollView>
    );
}