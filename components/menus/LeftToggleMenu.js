import React, {useState} from 'react';
import { View, StyleSheet, Text, Dimensions, Button  } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import { header, logo } from '../../assets/styles/styles';
import Cta from '../Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import Logo from '../logo/Logo';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';


export default function LeftToggleMenu(props) {

    const  {selectors} = useApp();

    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };


    const windowHeight = Dimensions.get('window').height;

    return (
      <View>
        <View style={[globalStyles.m_10, globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Cta _style={[header.headerIcons]} 
                onPress={toggleBottomNavigationView}
                value={<Ionicons style={header.headerIcons} name="reorder-four-outline" />}
                underlayColor={global.colors.LIGHT_GREY}
            />
            <Logo _style={logo.header} />
        </View>
        <BottomSheet visible={visible} onBackButtonPress={() => toggleBottomNavigationView()} onBackdropPress={() => toggleBottomNavigationView()} >
        <View style={styles.container}>
          {/* <View
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
                    global.listSports(selectors.getLang()).map((value, index) => {
                        return (
                          <Button onPress={() => {}} 
                          title={value.name}
                          icon={
                            <Ionicons
                                  name= {value.icon}
                                  //size={size}
                                 //color={focused ? '#BDE023' : '#ccc'}
                            />
                          }
                          />
                        )  
                    })
                  }
              <Button onPress={() => {toggleBottomNavigationView()}} title={t(selectors.getLang()).CANCEL} />
              </View>
          </View> */}

        <ScrollBottomSheet 
          componentType="FlatList"
          snapPoints={[128, '50%', windowHeight - 200]}
          initialSnapIndex={2}
          renderHandle={() => (
            <View style={styles.header}>
              <View style={styles.panelHandle} />

              <Button onPress={() => {toggleBottomNavigationView()}} title={t(selectors.getLang()).CANCEL} />
            </View>
          )}
          data={global.listSports(selectors.getLang()).map((value) => value)}
          renderItem={({ item }) => (
            <View style={styles.item} >
              <Ionicons
                name= {item.icon}
                //size={size}
                //color={focused ? '#BDE023' : '#ccc'}
              />
              <Text> {item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
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

    container: {
      flex: 1,
    },
    contentContainerStyle: {
      padding: 16,
      backgroundColor: '#F3F4F9',
    },
    header: {
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20
    },
    panelHandle: {
      width: 40,
      height: 2,
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 4
    },
    item: {
      padding: 20,
      justifyContent: 'center',
      backgroundColor: 'white',
      alignItems: 'center',
      marginVertical: 10,
    },
  });