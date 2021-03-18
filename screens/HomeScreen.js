import React from 'react';
import { ScrollView } from 'react-native';
import MyGroupsEventsCard from '../components/cards/MyGroupsEventsCard';
import { GroupsProvider } from "../context/groupsContext";
import { EventsProvider } from "../context/eventsContext";

export default function HomeScreen({navigation}) {

    return (
      <EventsProvider>
        <GroupsProvider>
          <ScrollView>
            <MyGroupsEventsCard navigation={navigation} type="groups"/>
            <MyGroupsEventsCard navigation={navigation} type="events"/>
          </ScrollView>
        </GroupsProvider>
      </EventsProvider>
    );
}