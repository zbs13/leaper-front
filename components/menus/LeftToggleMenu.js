import React, {useState} from 'react';
import { View, Text, Button, Modal  } from 'react-native';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import { header, logo, toggleLeftMenu } from '../../assets/styles/styles';
import Cta from '../cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import Logo from '../logo/Logo';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import globalStyles from '../../assets/styles/global';

/**
 * left menu (sports)
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function LeftToggleMenu({navigation}) {

    const  {selectors} = useApp();

    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };

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
        <Modal
          animationType="slide"
          transparent={false}
          visible={visible}
        >
          <View style={toggleLeftMenu.container}>
            <ScrollBottomSheet 
              componentType="FlatList"
              snapPoints={[0, '50%', 20]}
              initialSnapIndex={2}
              renderHandle={() => (
                <View style={toggleLeftMenu.header}>
                  <View style={toggleLeftMenu.panelHandle} />
                  <Button style={{color: global.colors.MAIN_COLOR}} onPress={() => {toggleBottomNavigationView()}} title={t(selectors.getLang()).CLOSE} />
                </View>
              )}
              data={global.listSports(selectors.getLang()).map((value) => value)}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <Cta onPress={() => {
                    toggleBottomNavigationView()
                    navigation.navigate(global.screens.SPORT_EVENTS, {sportId: item.id, name: item.name})
                  }}
                  underlayColor="transparent"
                >
                  <View style={toggleLeftMenu.item}>
                    <View style={globalStyles.flex, globalStyles.flexRow}>
                      <Ionicons
                        name= {item.icon}
                        size={40}
                        style={{marginRight: 30}}
                      />
                      <View style={globalStyles.justifyCenter}>
                        <Text style={globalStyles.title_size}> {item.name}</Text>
                      </View>
                    </View>
                  </View>
                </Cta>
              )}
              contentContainerStyle={toggleLeftMenu.contentContainerStyle}
            />
          </View>
        </Modal>
      </View>
    );
  }