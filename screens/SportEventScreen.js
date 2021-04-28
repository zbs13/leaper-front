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
import FiltersModal from '../components/modals/FiltersModal';
import Txt from '../components/Txt';

/**
 * Sport event screen
 * 
 * @param {object} navigation for routing 
 * @param {object} route params => route.params -> sportId
 * @returns 
 */
export default React.memo(function SportEventScreen({navigation, route}) {

  const sport = route.params.name;

  const { actions: actionsApp, selectors: selectorsApp } = useApp();
  const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();

  const [ses, setSes] = useState({
      searchValue: "",
      criteria: {
        sportId: route.params.sportId,
        place: null,
        startDate: null,
        endDate: null,
        startHour: null,
        endHour: null,
        offset: 0
      }
  });

  const [isLoaded, setIsLoaded] = useState(false);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: sport,
    });
    fetchData();
  }, [ses]);

  /**
   * set new criterias
   * 
   * @param {object} newCriteria new criterias
   */
  function setCriteria(newCriteria){
    setSes({
      ...ses,
      criteria: {
        ...ses.criteria,
        ...newCriteria
      }
    })
  }

  /**
   * fetch events by criterias
   */
  function fetchData(){
    actionsEvent.fetchByCriteria(ses.criteria).then((data) => {
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
      {/* <Title>
        {t(selectorsApp.getLang()).event.EVENTS} : {sport}
      </Title> */}
      <SB
          placeholder={t(selectorsApp.getLang()).event.FIND_EVENT_BY + " : " + sport}
          onChangeText={(val) => setSes({...ses, searchValue: val})}
          value={ses.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      <FiltersModal setCriteria={setCriteria} />
      <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
        <Txt _style={[globalStyles.f_bold, globalStyles.c_anth, {flex: 1}]}>
          {t(selectorsApp.getLang()).FILTERS} :
        </Txt>
        <View style={[globalStyles.flexColumn, {flex: 1}]}>
          <Txt _style={globalStyles.c_anth}>
            {t(selectorsApp.getLang()).PLACE} :
          </Txt>
          <Txt ellipsis={20} _style={globalStyles.c_anth}>
            {ses.criteria.place || "-"}
          </Txt>
        </View>
        <View style={[globalStyles.flexColumn, {flex: 1}]}>
          <Txt _style={globalStyles.c_anth}>
            {t(selectorsApp.getLang()).DATES} :
          </Txt>
          <Txt _style={globalStyles.c_anth}>
            {ses.criteria.startDate !== null ? t(selectorsApp.getLang()).formats.date(ses.criteria.startDate.dateString) : "-"}
          </Txt>
          {ses.criteria.endDate !== null ?
            <Txt _style={globalStyles.c_anth}>
              {t(selectorsApp.getLang()).formats.date(ses.criteria.endDate.dateString)}
            </Txt>
          : null
          }
        </View>
      </View>
      <View>
        <Txt _style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).RESULTS} : {selectorsEvent.getNbFetchedByCriteria()}</Txt>
      </View>
      { isLoaded ?
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
})