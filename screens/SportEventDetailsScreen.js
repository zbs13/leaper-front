import React, {useEffect, useState} from 'react';
import { Text, View } from 'react-native';
import useEvents from '../hooks/useEvents';
import useApp from '../hooks/useApp';
import { eventDetailsMap, cta, ctaJoinEventDetails } from '../assets/styles/styles';
import { manageResponseUI } from '../context/actions/apiCall';
import Map, { MapPin } from '../components/maps/Map';
import t from '../providers/lang/translations';
import global from '../providers/global';
import globalStyles from '../assets/styles/global';
import Cta from '../components/Cta';
import { RefreshViewScroll } from '../components/RefreshView';
import Title from '../components/Title';
import EventDetailsLoader from '../components/loaders/EventDetailsLoader';

export default function SportEventDetailsScreen({navigation, route}) {

    const { actions: actionsApp, selectors: selectorsApp } = useApp();
    const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();

    const [details, setDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const lang = selectorsApp.getLang();

    useEffect(() => {
        navigation.setOptions({
          headerTitle: route.params.eventTitle,
        });
        fetchEventDetails();
    }, []);

    function fetchEventDetails(){
        actionsEvent.fetchById(route.params.eventId).then((data) => {
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
                    <View style={eventDetailsMap.container}>
                        <Map
                            latitude={details.location.latitude}
                            longitude={details.location.longitude}
                        >
                            <MapPin
                                latitude={details.location.latitude}
                                longitude={details.location.longitude}
                                pinColor={global.colors.MAIN_COLOR}
                                title={route.params.eventTitle}
                                description={t(lang).HERE_EVENT_PLACE}
                            />
                        </Map>
                    </View>
                    <View style={[globalStyles.m_10, globalStyles.flexColumn, globalStyles.mb_50]}>
                        <Title style={[globalStyles.c_anth, globalStyles.ta_j]}>{route.params.eventTitle}</Title>
                        <View style={[globalStyles.flexRow, globalStyles.m_10]}>
                            <View style={[globalStyles.flexColumn, {flex: 1}]}>
                                <Text style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                    {t(lang).ADDRESS} :
                                </Text>
                                <Text style={[globalStyles.c_anth]}>
                                    {details.address}
                                </Text>
                            </View>
                            <View style={[globalStyles.flexColumn, {flex: 1}]} >
                                <Text style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                    {t(lang).DATE} :
                                </Text>
                                <Text style={[globalStyles.c_anth]}>
                                    {t(lang).formats.date(details.date)}
                                </Text>
                            </View>
                            <View style={[globalStyles.flexColumn, {flex: 1}]} >
                                <Text style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                    {t(lang).HOURS} :
                                </Text>
                                <Text style={[globalStyles.c_anth]}>
                                    {t(lang).FROM} : {t(lang).formats.hour(details.startHour)}
                                </Text>
                                <Text style={[globalStyles.c_anth]}>
                                    {t(lang).TO} : {t(lang).formats.hour(details.endHour)}
                                </Text>
                            </View>
                        </View>
                        <Text style={[globalStyles.c_anth, globalStyles.ta_j]}>{details.description}</Text>
                    </View>
                    <View style={ctaJoinEventDetails.container}>
                        <Cta value={t(lang).JOIN} 
                            _style={[cta.main, cta.first_nr, globalStyles.f_bold]}
                            confirm={{
                                title: route.params.eventTitle,
                                content: t(lang).CONFIRM_JOIN_EVENT
                            }}
                            onPress={() => console.log("aaa")}
                        />
                    </View>
                </RefreshViewScroll>
            :
                <EventDetailsLoader />
            }
        </>
    );
  }