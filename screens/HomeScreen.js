import React, { useState } from 'react';
import { View } from 'react-native';
// import useApp from "../hooks/useApp";
// import { RefreshViewScroll } from "../components/RefreshView";
import MyGroupsEventsCard from '../components/cards/MyGroupsEventsCard';
import { GroupsProvider } from "../context/groupsContext";
import { EventsProvider } from "../context/eventsContext";

export default function HomeScreen({navigation}) {

    // const { actions } = useApp();
    // const [a, setA] = useState([]);
    // console.log(a);

    // const b = async () => {
    //   let res = await actions.fetchUserParameters();
    //   setA(res);
    // }

    return (
      // <RefreshViewScroll onRefresh={() => b()}>
      <EventsProvider>
        <GroupsProvider>
          <View>
            <MyGroupsEventsCard navigation={navigation} type="groups"/>
            <MyGroupsEventsCard navigation={navigation} type="events"/>
          </View>
        </GroupsProvider>
      </EventsProvider>
      // </RefreshViewScroll>
    );
}