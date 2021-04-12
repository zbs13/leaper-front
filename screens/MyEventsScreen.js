import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
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
        <Title>{t(selectorsApp.getLang()).MY_EVENTS}</Title>
        <SB
          placeholder={t(selectorsApp.getLang()).FIND_EVENT_BY}
          onChangeText={(val) => setMes({...mes, searchValue: val})}
          value={mes.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      <View>
        <Text style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).RESULTS} : {selectorsEvent.getNbMyFetched()}</Text>
      </View>
      { isLoaded ?
        <RefreshViewList 
          data={selectorsEvent.getAllMy()}
          onRefresh={() => fetchData()}
          onEndReached={() => {
            setMes({...mes, offset: mes.offset += global.MAX_RESULT_PER_LOADED_PAGE});
            fetchData();
          }}
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