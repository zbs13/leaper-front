import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import useEvents from '../hooks/useEvents';
import useUsers from '../hooks/useUsers';
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
import { getSportById, isInFav, isGEOwner } from '../utils/utils';

/**
 * sport event details screen
 * 
 * @param {object} navigation for routing
 * @param {object} route params => route.params -> title, isMyEvent, id
 * @returns 
 */
export default function SportEventDetailsScreen({navigation, route}) {

    const isMyEvent = route.params.isMyEvent;
    const title = route.params.title;
    const id = route.params.id;

    const { actions: actionsApp, selectors: selectorsApp } = useApp();
    const { selectors: selectorsEvent, actions: actionsEvent } = useEvents();
    const { actions: actionsUser, selectors: selectorsUser } = useUsers();

    const [details, setDetails] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const lang = selectorsApp.getLang();

    useEffect(() => {
        fetchEventDetails();
    }, []);

    useEffect(() => {
        navigation.setOptions({
          headerTitle: title,
          headerRight: () => isMyEvent ? <HeaderRightGroupEventOptions isEvent={true} geTitle={title} geId={id} /> : null
        });
    }, [isLoaded, selectorsUser.getConnectedUser().bookmarks]);

    /**
     * fetch event details by id
     */
    function fetchEventDetails(){
        actionsEvent.fetchById(id).then((data) => {
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
                        { isInFav(selectorsUser.getConnectedUser().bookmarks, id) ?
                            <Cta onPress={() => {
                                actionsUser.removeBookmark(id).then((data) => {
                                    manageResponseUI(data,
                                        lang,
                                        function (res) {
                                            actionsApp.addPopupStatus({
                                                type: "success",
                                                message: t(lang).bookmarks.UNBOOKMARK_SUCCESS
                                            });
                                        },
                                        function (error) {
                                            actionsApp.addPopupStatus(error);
                                            setIsLoaded(false)
                                        })
                                    })
                            }}>
                                <Ionicons name="star" size={30} color={global.colors.RED_LIKE}/>
                            </Cta>
                        :
                            <Cta onPress={() => {
                                actionsUser.addBookmark(id).then((data) => {
                                    manageResponseUI(data,
                                        lang,
                                        function (res) {
                                            actionsApp.addPopupStatus({
                                                type: "success",
                                                message: t(lang).bookmarks.BOOKMARK_SUCCESS
                                            });
                                        },
                                        function (error) {
                                            actionsApp.addPopupStatus(error);
                                            setIsLoaded(false)
                                        })
                                  })
                            }}>
                                <Ionicons name="star-outline" size={30} color={global.colors.ANTHRACITE}/>
                            </Cta>
                        }
                    </View>
                    <View style={eventDetailsMap.container}>
                        <Map
                            latitude={details.location[0].latitude}
                            longitude={details.location[0].longitude}
                        >
                            <MapPin
                                latitude={details.location[0].latitude}
                                longitude={details.location[0].longitude}
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
                                    {t(lang).FROM} : {t(lang).datetime.formats.hour(details.start_hour)}
                                </Txt>
                                <Txt _style={[globalStyles.c_anth]}>
                                    {t(lang).TO} : {t(lang).datetime.formats.hour(details.end_hour)}
                                </Txt>
                            </View>
                        </View>
                        <View style={[globalStyles.flexColumn, globalStyles.m_10, {flex: 1}]} >
                            <Txt _style={[globalStyles.c_anth, globalStyles.f_bold]}>
                                {t(lang).SPORT} :
                            </Txt>
                            <Txt _style={[globalStyles.c_anth]}>
                                {getSportById(lang, details.sportId).name}
                            </Txt>
                        </View>
                        <Txt _style={[globalStyles.c_anth, globalStyles.ta_j]}>{details.description}</Txt>
                    </View>
                    <View style={ctaJoinEventDetails.container}>
                        {
                            !isGEOwner(selectorsUser.getConnectedUser().id, details) ?
                                isMyEvent ?
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
                                        onPress={() => console.log("edojf")}
                                    />
                            :
                                null
                        }
                    </View>
                </RefreshViewScroll>
            :
                <EventDetailsLoader />
            }
        </>
    );
  }