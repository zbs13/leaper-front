import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import useEvents from '../hooks/useEvents';
import SB from '../components/search/SearchBar';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';
import { manageResponseUI } from '../context/actions/apiCall';
import EventCard from '../components/cards/EventCard';
import EventCardLoader from '../components/loaders/EventCardLoader';
import { RefreshViewList } from '../components/RefreshView';
import Title from '../components/Title';
import Cta from '../components/cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { cta } from '../assets/styles/styles';
import Txt from '../components/Txt';

/**
 * my events screen
 * 
 * @param {object} navigation for routing
 * @returns
 */
export default React.memo(function MyEventsScreen({navigation}) {

  const { actions: actionsApp, selectors: selectorsApp } = useApp();
  const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();

  const [mes, setMes] = useState({
      searchValue: "",
      offset: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    fetchData();
  }, [mes]);

  /**
   * fetch all my events
   */
  function fetchData(){
    actionsEvent.fetchAllMy(mes.offset).then((data) => {
      manageResponseUI(data,
          lang,
          function (res) {
            setIsLoaded(true)
          },
          function (error) {
              actionsApp.addPopupStatus(error);
              setIsLoaded(false)
          })
    })
  }

  return (
    <View style={globalStyles.mpm}>
        <Title>{t(selectorsApp.getLang()).event.MY_EVENTS}</Title>
        <SB
          placeholder={t(selectorsApp.getLang()).event.FIND_AN_EVENT}
          onChangeText={(val) => setMes({...mes, searchValue: val})}
          value={mes.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      <View style={[globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
        <Txt _style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).RESULTS} : {selectorsEvent.getNbMyFetched()}</Txt>
        <Cta
            onPress={() => navigation.navigate("Home")}
            underlayColor={global.colors.LIGHT_GREY}
            _style={[cta.main, cta.first]}
        >
            <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
        </Cta>
      </View>
      { isLoaded ?
        <RefreshViewList 
          data={selectorsEvent.getAllMy()}
          onRefresh={() => fetchData()}
          onEndReached={() => setMes({...mes, offset: mes.offset + global.MAX_RESULT_PER_LOADED_PAGE})}
          renderItem={({item}) => (
            <EventCard navigation={navigation} 
              isMyEvent={true}
              item={item}
            />
          )}
        />
      :
        <EventCardLoader />
      }
    </View>
  );
})