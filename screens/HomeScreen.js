import React, { useState } from 'react';
import { View } from 'react-native';
// import useApp from "../hooks/useApp";
// import { RefreshViewScroll } from "../components/RefreshView";
import MyGroupsEventsCard from '../components/cards/MyGroupsEventsCard';
import { GroupsProvider } from "../context/groupsContext";
import { EventsProvider } from "../context/eventsContext";
import { Button } from 'react-native';

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
            <Button 
            title="TESSSST"
              onPress={() => navigation.navigate("test")}
            />
          </View>
        </GroupsProvider>
      </EventsProvider>
      // </RefreshViewScroll>
    );
}