import React, {useState} from 'react';
import { View, Modal  } from 'react-native';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import { cta, header, logo, toggleLeftMenu } from '../../assets/styles/styles';
import Cta from '../cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import Logo from '../logo/Logo';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import { sortListSport } from '../../utils/utils';
import SB from '../search/SearchBar';
import { sortSportsSearchCriteria } from '../../utils/utils';

/**
 * left menu (sports)
 * 
 * @returns 
 */
export default function LeftToggleMenu() {

    const  {selectors} = useApp();
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
      setVisible(!visible);
    };

    const [search, setSearch] = useState({
      searchValue: "",
      sportsList: global.listSports(selectors.getLang()),
      sortedSports: null
    })

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
                <View style={[toggleLeftMenu.header, globalStyles.flexRow, globalStyles.flexBetween]}>
                  <View style={{flex: 6}}>
                    <SB
                      placeholder={t(selectors.getLang()).search.SEARCH_A_SPORT}
                      onChangeText={(val) => setSearch({
                        ...search, 
                        searchValue: val,
                        sortedSports: sortSportsSearchCriteria(search.sportsList, val)
                      })}
                      value={search.searchValue}
                      cancelButtonTitle={t(selectors.getLang()).CANCEL}
                      containerStyle={{backgroundColor: "transparent"}}
                      cancelButtonProps={{color: global.colors.MAIN_COLOR}}
                    />
                  </View>
                  <View style={{flex: 1}}>
                    <Cta 
                      _style={[cta.main, cta.first, globalStyles.m_5, globalStyles.alignCenter]} 
                      onPress={() => {toggleBottomNavigationView()}}
                    >
                      <Ionicons name="close" size={20}/>
                    </Cta>
                  </View>
                </View>
              )}
              data={(search.sortedSports || search.sportsList).sort(sortListSport).map((value) => value)}
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
                        size={25}
                        style={{marginRight: 30}}
                        color={global.colors.MAIN_COLOR}
                      />
                      <View style={globalStyles.justifyCenter}>
                        <Txt _style={globalStyles.title_size}>{item.name}</Txt>
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