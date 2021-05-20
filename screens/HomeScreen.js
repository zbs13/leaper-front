import React from 'react';
import { ScrollView } from 'react-native';
import MyGroupsEventsCard from '../components/cards/MyGroupsEventsCard';

/**
 * home screen
 * 
 * @returns 
 */
export default function HomeScreen() {

    return (
      <ScrollView>
        <MyGroupsEventsCard type="groups"/>
        <MyGroupsEventsCard type="events"/>
      </ScrollView>
    );
}