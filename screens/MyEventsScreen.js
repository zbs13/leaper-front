import React, {useState} from 'react';
import { View } from 'react-native';
import useEvents from '../hooks/useEvents';
import SB from '../components/search/SearchBar';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';
import { manageResponseUI } from '../context/actions/apiCall';
import EventCard from '../components/cards/EventCard';
import { RefreshViewList } from '../components/RefreshView';
import Title from '../components/Title';
import Cta from '../components/cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { cta } from '../assets/styles/styles';
import Txt from '../components/Txt';
import { sortMyGEBySearchCriteria } from '../utils/utils';

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
      results: selectorsEvent.getAllMy(),
      sortedResults: null,
      searchValue: "",
  });

  let lang = selectorsApp.getLang();

  /**
   * fetch all my events
   */
  function fetchMyEvents(){
    actionsEvent.fetchAllMy().then((data) => {
      manageResponseUI(data,
          lang,
          function (res) {
            setMes({
              ...mes,
              results: res
            });
          },
          function (error) {
              actionsApp.addPopupStatus(error);
          })
    })
  }

  return (
    <View style={globalStyles.mpm}>
        <Title>{t(selectorsApp.getLang()).event.MY_EVENTS}</Title>
        <SB
          placeholder={t(selectorsApp.getLang()).event.FIND_AN_EVENT}
          onChangeText={(val) => setMes(
            {
              ...mes, 
              searchValue: val,
              sortedResults: sortMyGEBySearchCriteria(mes.results, val)
            })}
          value={mes.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      <View style={[globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
        <Txt _style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).RESULTS} : {mes.sortedResults && mes.sortedResults.length || mes.results.length}</Txt>
        <Cta
            onPress={() => navigation.navigate(global.screens.CREATE_GROUP_EVENT, {isEvent: true})}
            underlayColor={global.colors.LIGHT_GREY}
            _style={[cta.main, cta.first]}
        >
            <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
        </Cta>
      </View>
      <RefreshViewList 
        data={mes.sortedResults || mes.results}
        onRefresh={() => fetchMyEvents()}
        renderItem={({item}) => (
          <EventCard
            isMyEvent={true}
            item={item}
          />
        )}
      />
    </View>
  );
})