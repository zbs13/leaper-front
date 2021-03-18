import React, { useState } from 'react';
import { View } from 'react-native';
import MyGroupsEventsCard from '../components/cards/MyGroupsEventsCard';
import { GroupsProvider } from "../context/groupsContext";
import { EventsProvider } from "../context/eventsContext";

export default function HomeScreen({navigation}) {

    return (
      <EventsProvider>
        <GroupsProvider>
          <View>
            <MyGroupsEventsCard navigation={navigation} type="groups"/>
            <MyGroupsEventsCard navigation={navigation} type="events"/>
          </View>
        </GroupsProvider>
      </EventsProvider>
    );
}