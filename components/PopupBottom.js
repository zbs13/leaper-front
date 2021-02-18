import React, {useState} from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { BottomSheet } from 'react-native-btr';


export default function PopupBottom(props) {
    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };
    return (
      <View>
        <Button onPress={toggleBottomNavigationView} title="Afficher un bottomSheet" />
        <BottomSheet visible={visible} onBackButtonPress={() => toggleBottomNavigationView()} onBackdropPress={() => toggleBottomNavigationView()} >
        <View style={styles.bottomNavigationView}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} >
                  <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                      {props.title}
                  </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                  {
                  props.arrayValue.map((value, index) => {
                    return (
                    <Text key={index} style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                      {value.value}
                    </Text>
                    )
                  })
                  }
                  <Button onPress={() => {toggleBottomNavigationView()}
                  } title="Retour" />
              </View>
             
          </View>
        </View>
      </BottomSheet>
      </View>
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