import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import { RefreshViewList } from '../components/RefreshView';
import { manageResponseUI } from '../context/actions/apiCall';
import PersonCard from '../components/cards/PersonCard';
import Txt from '../components/Txt';
import globalStyles from '../assets/styles/global';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { cta } from '../assets/styles/styles';
import NotificationCard from '../components/cards/NotificationCard';
import NoData from '../components/NoData';
import { getNbGENotif, getGENotifs } from '../utils/utils';

/**
 * people list screen
 * 
 * @param {object} navigation for navigation
 * @param {object} route params => isEvent, id
 * @returns 
 */
export default function PeopleListScreen({navigation, route}) {

    const isEvent = route.params.isEvent;
    const id = route.params.id;

    const {selectors: selectorsEvent, actions: actionsEvent} = useEvents();
    const {selectors: selectorsGroup, actions: actionsGroup} = useGroups();
    const {selectors: selectorsApp, actions: actionsApp} = useApp();

    const [activeDot, setActiveDot] = useState(0);
    const swipeRef = React.createRef();

    let selectors = selectorsGroup;
    let actions = actionsGroup;
    if(isEvent){
        selectors = selectorsEvent;
        actions = actionsEvent;
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEvent ? t(selectorsApp.getLang()).event.EVENT_MEMBERS : t(selectorsApp.getLang()).group.GROUP_MEMBERS,
            headerRight: () => selectors.hasRight(global.rights.ADD_USER) &&
                <Cta onPress={() => navigation.navigate(global.screens.ADD_PERSON, {asFriend: false, isEvent: isEvent, geId: id})} >
                    <Ionicons name="add-outline" color={global.colors.MAIN_COLOR} size={30} />
                </Cta>
        });
    }, [])

   /**
   * fetch all group/event members
   */
    function fetchMembers(){
        actions.fetchById(id).then((data) => {
        manageResponseUI(data,
            selectorsApp.getLang(),
            function (res) {
                return;
            },
            function (error) {
                actionsApp.addPopupStatus(error);
            })
        })
    }

    /**
     * members part
     * 
     * @returns 
     */
    function membersPart(){
        return (
            <View>
                <View style={globalStyles.m_10}>
                    <Txt _style={globalStyles.f_bold}>
                        {`${t(selectorsApp.getLang()).MEMBERS} : ${selectors.getFetchedById().users.length}`}
                    </Txt>
                </View>
                <RefreshViewList
                    onRefresh={() => fetchMembers()}
                    noDataMessage={t(selectorsApp.getLang()).NO_MEMBER}
                    data={selectors.getFetchedById().users}
                    renderItem={({item}) => <PersonCard isMember isEvent={isEvent} datas={item} />}
                />
            </View>
        )
    }

    return (
        selectors.hasRight(global.rights.ADD_USER) ?
            <>
                <View style={[globalStyles.flexRow, globalStyles.mb_20, globalStyles.alignCenter]}>
                    <View style={{flex: 1}}>
                        <Cta 
                            value={t(selectorsApp.getLang()).MEMBERS}
                            _style={[cta.main, activeDot === 0 ? cta.globalSearch_in : cta.globalSearch]} 
                            onPress={() => {
                                if(activeDot !== 0){
                                    swipeRef.current.scrollBy(-1, true);
                                    setActiveDot(0);
                                }
                            }}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <Cta 
                            tag={selectors.hasRight(global.rights.ADD_USER) ? getNbGENotif(selectorsApp.getGeNotifs(), id) : 0}
                            value={t(selectorsApp.getLang()).WAITING}
                            _style={[cta.main, activeDot === 1 ? cta.globalSearch_in : cta.globalSearch]}
                            onPress={() => {
                                if(activeDot === 0){
                                    swipeRef.current.scrollBy(1, true);
                                    setActiveDot(1);
                                }
                            }}
                        />
                    </View>
                </View>
                <Swiper
                    ref={swipeRef}
                    dotColor={global.colors.LIGHT_MAIN_COLOR} 
                    activeDotColor={global.colors.MAIN_COLOR}
                    onIndexChanged={(index) => setActiveDot(index)}
                >
                    {membersPart()}
                    <View>
                        <FlatList
                            data={getGENotifs(selectorsApp.getGeNotifs(), id)}
                            renderItem={({item}) => (
                                <NotificationCard data={item} />
                            )}
                            ListEmptyComponent={() => <NoData message={t(selectorsApp.getLang()).notifications.NO_REQUEST} />}
                            keyExtractor={(data, index) => index.toString()}
                            onEndReachedThreshold={0.3}
                            removeClippedSubviews
                        />
                    </View>
                </Swiper>
            </>
        :
            membersPart()
    );
}
