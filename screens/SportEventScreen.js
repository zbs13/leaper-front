import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import useEvents from '../hooks/useEvents';
import SB from '../components/search/SearchBar';
import Title from '../components/Title';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';
import { manageResponseUI } from '../context/actions/apiCall';
import EventCard from '../components/cards/EventCard';
import EventCardLoader from '../components/loaders/EventCardLoader';
import Cta from '../components/Cta';
import { cta } from '../assets/styles/styles';
import { RefreshViewList } from '../components/RefreshView';
import FiltersModal from '../components/modals/FiltersModal';

export default function SportEventScreen({navigation, route}) {

  const sport = route.params.name 

  const { actions: actionsApp, selectors: selectorsApp } = useApp();
  const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();

  const [ses, setSes] = useState({
      searchValue: "",
      isLoaded: false,
      criteria: {
        sportId: route.params.sportId,
        place: "",
        date: "",
        hour: "",
        offset: 0
      }
  });

  let lang = selectorsApp.getLang();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: sport,
    });
    fetchData();
  }, []);

  function setCriteria(newCriteria){
    setSes({
      ...ses,
      criteria: {...newCriteria}
    })
  }

  function fetchData(){
    actionsEvent.fetchByCriteria(ses.criteria).then((data) => {
      manageResponseUI(data,
          lang,
          function (res) {
              setSes({
                  ...ses,
                  isLoaded: true,
              })
          },
          function (error) {
              actionsApp.addPopupStatus(error);
              setSes({
                  ...ses,
                  isLoaded: false
              })
          })
    })
  }

  return (
    <View style={globalStyles.mpm}>
      <Title>
        {t(selectorsApp.getLang()).EVENTS} : {sport}
      </Title>
      <SB
          placeholder={t(selectorsApp.getLang()).FIND_EVENT_BY + " : " + sport}
          onChangeText={(val) => setSes({...ses, searchValue: val})}
          value={ses.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      {/* <View style={globalStyles.justifyEnd}>
        <Cta 
          _style={[cta.main, cta.first]}
          value={t(selectorsApp.getLang()).FILTERS}
          onPress={() => sheetRef.current.snapTo(20)}
        />
      </View> */}
      <FiltersModal setCriteria={setCriteria} />
      <View>
        <Text>{t(selectorsApp.getLang()).RESULTS} : {selectorsEvent.getNbFetchedByCriteria()}</Text>
      </View>
      { ses.isLoaded ?
        <RefreshViewList 
          data={selectorsEvent.getFetchedByCriteria()}
          onRefresh={() => fetchData()}
          onEndReached={() => {
            setSes({...ses, 
              criteria: {
                ...ses.criteria,
                offset: ses.criteria.offset += global.MAX_RESULT_PER_LOADED_PAGE
              }
            });
            fetchData();
          }}
          renderItem={({item}) => (
            <EventCard navigation={navigation} 
              item={item}
            />
          )}
        />
      :
        <EventCardLoader />
      }
    </View>
  );
}