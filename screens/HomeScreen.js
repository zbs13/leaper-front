import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import useApp from "../hooks/useApp";
import { RefreshViewScroll } from "../components/RefreshView";

export default function HomeScreen({ navigation }) {

    const { actions } = useApp();
    const [a, setA] = useState([]);
    console.log(a);

    const b = async () => {
      let res = await actions.fetchUserParameters();
      setA(res);
    }

    return (
      <RefreshViewScroll _style={styles.scrollView}
        onRefresh={() => b()}>
          <View>
              <Button title="GO" onPress={() => navigation.push("Home")} />
          </View>
      </RefreshViewScroll>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
