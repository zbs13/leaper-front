import React, { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import useApp from "../hooks/useApp";
import { RefreshViewScroll } from "../components/RefreshView";
import Txt from '../components/Txt';

export default function TestScreen({navigation}) {

    const { actions } = useApp();
    const [a, setA] = useState([]);

    const b = async () => {
      let res = await actions.fetchUserParameters();
      setA(res);
    }

    useEffect(() => {
      navigation.setOptions({
        headerTitle: "ta mere",
      });
    });

    return (
      <RefreshViewScroll onRefresh={() => b()}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Txt>Teeeest</Txt>
          <Button 
              title="TESSSST"
                onPress={() => navigation.navigate("MyGroups")}
              />
        </View>
      </RefreshViewScroll>
    );
  }