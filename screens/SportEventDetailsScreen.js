import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import useEvents from '../hooks/useEvents';
import useApp from '../hooks/useApp';
import { eventDetailsMap, cta, ctaJoinEventDetails } from '../assets/styles/styles';
import { manageResponseUI } from '../context/actions/apiCall';
import Map, { MapPin } from '../components/maps/Map';
import t from '../providers/lang/translations';
import global from '../providers/global';
import globalStyles from '../assets/styles/global';
import Cta from '../components/cta/Cta';
import { RefreshViewScroll } from '../components/RefreshView';
import Title from '../components/Title';
import EventDetailsLoader from '../components/loaders/EventDetailsLoader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Txt from '../components/Txt';
import HeaderRightGroupEventOptions from '../components/headers/HeaderRightGroupEventOptions';

/**
 * 
 * @param {object} navigation for routing
 * @param {object} route params => route.params -> title, id
 * @returns 
 */
export default function SportEventDetailsScreen({navigation, route}) {

    const isMyEvent = route.params.isMyEvent;
    const title = route.params.title;

    const { actions: actionsApp, selectors: selectorsApp } = useApp();
    const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();

    const [details, setDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const lang = selectorsApp.getLang();

    useEffect(() => {
        fetchEventDetails();
    }, []);

    useEffect(() => {
        navigation.setOptions({
          headerTitle: title,
          headerRight: () => isMyEvent ? <HeaderRightGroupEventOptions navigation={navigation} isEvent={true} geTitle={title} /> : null
        });
    }, [isLoaded]);

    /**
     * fetch event details by id
     */
    function fetchEventDetails(){
        actionsEvent.fetchById(route.params.id).then((data) => {
          manageResponseUI(data,
              lang,
              function (res) {
                setIsLoaded(true);
                setDetails(data);
              },
              function (error) {
                  actionsApp.addPopupStatus(error);
                  setIsLoaded(false)
              })
        })
    }

    return (
        <>
            {isLoaded && details !== null ?
                <RefreshViewScroll 
                    _style={[globalStyles.flexColumn, globalStyles.mh_100]}
                    onRefresh={() => fetchEventDetails()}
                >
                    <View style={{position: "absolute", zIndex: 1, top: 10, right: 10}}>
                        <Cta onPress={() => alert("mettre en fav")}>
                            <Ionicons name="star-outline" size={30} color={global.colors.ANTHRACITE}/>
                        </Cta>
                    </View>
                    <View style={eventDetailsMap.container}>
                        <Map
                            latitude={details.location.latitude}
                            longitude={details.location.longitude}
                        >
                            <MapPin
                                latitude={details.location.latitude}
                                longitude={details.location.longitude}
                                pinColor={global.colors.MAIN_COLOR}
                                title={title}
                                description={t(lang).event.HERE_EVENT_PLACE}
                            />
                        </Map>
                    </View>
                    <View style={[globalStyles.m_10, globalStyles.flexColumn, globalStyles.mb_50]}>
                        <Title style={[globalStyles.c_anth, globalStyles.ta_j]}>{title}</Title>
                        <View style={[globalStyles.flexRow, globalStyles.m_10]}>
                            <View style={[globalStyles.flexColumn, {flex: 1}]}>
                                <Txt _style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                    {t(lang).ADDRESS} :
                                </Txt>
                                <Txt _style={[globalStyles.c_anth]}>
                                    {details.address}
                                </Txt>
                            </View>
                            <View style={[globalStyles.flexColumn, {flex: 1}]} >
                                <Txt _style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                    {t(lang).DATE} :
                                </Txt>
                                <Txt _style={[globalStyles.c_anth]}>
                                    {t(lang).datetime.formats.date(details.date)}
                                </Txt>
                            </View>
                            <View style={[globalStyles.flexColumn, {flex: 1}]} >
                                <Txt _style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                    {t(lang).HOURS} :
                                </Txt>
                                <Txt _style={[globalStyles.c_anth]}>
                                    {t(lang).FROM} : {t(lang).datetime.formats.hour(details.startHour)}
                                </Txt>
                                <Txt _style={[globalStyles.c_anth]}>
                                    {t(lang).TO} : {t(lang).datetime.formats.hour(details.endHour)}
                                </Txt>
                            </View>
                        </View>
                        <Txt _style={[globalStyles.c_anth, globalStyles.ta_j]}>{details.description}</Txt>
                    </View>
                    <View style={ctaJoinEventDetails.container}>
                        {isMyEvent ?
                            <Cta value={t(lang).event.LEAVE_THIS_EVENT} 
                                _style={[cta.main, cta.b_red_nr, globalStyles.f_bold]}
                                confirm={{
                                    title: title,
                                    content: t(lang).event.SURE_TO_LEAVE_EVENT
                                }}
                                onPress={() => console.log("quitter event")}
                            />
                        :
                            <Cta value={t(lang).JOIN} 
                                _style={[cta.main, cta.first_nr, globalStyles.f_bold]}
                                confirm={{
                                    title: title,
                                    content: t(lang).event.CONFIRM_JOIN_EVENT
                                }}
                                onPress={() => console.log("join event")}
                            />
                        }
                    </View>
                </RefreshViewScroll>
            :
                <EventDetailsLoader />
            }
        </>
    );
  }