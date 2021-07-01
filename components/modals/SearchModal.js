import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import SB from '../search/SearchBar';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import t from '../../providers/lang/translations';
import globalStyles from '../../assets/styles/global';
import{ text, cta } from '../../assets/styles/styles';
import Txt from '../Txt';
import { manageResponseUI } from '../../context/actions/apiCall';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modalbox';
import global from '../../providers/global';
import Cta from '../cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { 
    isUserInEventGroup, 
    isEventRequestWaiting, 
    isGroupRequestWaiting 
} from '../../utils/utils';
import NoData from '../NoData';
import EventCard from '../cards/EventCard';
import GroupCard from '../cards/GroupCard';
import * as RootNavigation from '../../RootNavigation.js';

/**
 * search modal
 * 
 * @param {string} type search modal type => global 
 * @returns 
 */
export default function SearchModal({type}) {

    const {actions, selectors} = useApp();
    const {selectors: selectorsUser} = useUsers();
    const navigation = RootNavigation;

    const [search, setSearch] = useState({
        value: "",
        res: {
            events: [],
            groups: []
        },
        offsetEvents: 0,
        offsetGroups: 0
    });

    const [activeDot, setActiveDot] = useState(0);

    const swipeRef = React.createRef();

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            actions.fetchGlobal(search.value, search.offsetEvents, search.offsetGroups).then((data) => {
                manageResponseUI(data,
                    selectors.getLang(),
                    function (res) {
                        let eRes = res.events;
                        let previousEventRes = search.res.events;
                        if(search.offsetEvents !== 0){
                            previousEventRes.concat(eRes);
                        }
                        let gRes = res.groups;
                        let previousGroupRes = search.res.groups;
                        if(search.offsetGroups !== 0){
                            previousGroupRes.concat(gRes);
                        }
                        let resE = search.offsetEvents !== 0 ? previousEventRes : eRes;
                        let resG = search.offsetGroups !== 0 ? previousGroupRes : gRes;
                        setSearch({
                            ...search,
                            res: {
                                events: resE,
                                groups: resG
                            }
                        })
                    },
                    function (error) {
                        actions.addPopupStatus(error);
                    })
            })
        }
        return () => {isMounted = false};
    }, [search.value, search.offsetEvents, search.offsetGroups])

    function onChangeFieldValue(value){
        setSearch({
            ...search,
            value: value
        })
    }

    return (
        <View>
            <Modal
                style={{flex: 1, alignItems: "center"}}
                isOpen={true}
                position="center"
                onClosed={() => {
                    actions.updateUserParameters({
                        searchBar: null
                    })
                }}
                coverScreen={true}
                animationDuration={200}
            >
                <View>
                    <View style={[globalStyles.mt_20, globalStyles.flexRow, globalStyles.flexBetween]}>
                        <View style={{flex: 6}}>
                            <SB
                                placeholder={t(selectors.getLang()).search.GLOBAL}
                                onChangeText={_.debounce((value) => onChangeFieldValue(value), 500)}
                                cancelButtonTitle={t(selectors.getLang()).CANCEL}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Cta 
                                _style={[cta.main, cta.first, globalStyles.m_5, globalStyles.alignCenter]} 
                                onPress={() => {
                                    actions.updateUserParameters({
                                        searchBar: null
                                    })
                                }}
                            >
                                <Ionicons name="close" size={20}/>
                            </Cta>
                        </View>
                    </View>
                    <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter, globalStyles.p_5]}>
                        <Txt _style={text.searchTitle}>{t(selectors.getLang()).SEARCH} : "{search.value}"</Txt>
                    </View>
                    <View style={[globalStyles.flexRow, globalStyles.mb_20]}>
                        <View style={{flex: 1}}>
                            <Cta 
                                value={t(selectors.getLang()).event.EVENTS}
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
                                value={t(selectors.getLang()).group.GROUPS}
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
                        <View>
                            <FlatList
                                data={search.res.events}
                                onEndReached={() => {
                                    if(search.res.events.length < search.offsetEvents + global.MAX_RESULT_PER_LOADED_PAGE) return;
                                    setSearch({
                                        ...search,
                                        offsetEvents: search.res.offsetEvents + global.MAX_RESULT_PER_LOADED_PAGE
                                    });
                                }}
                                renderItem={({item}) => (
                                    <EventCard
                                        isMyEvent={isUserInEventGroup(selectorsUser.getConnectedUser().events, item.id)}
                                        item={item}
                                        navigation={navigation}
                                        onPress={() => actions.updateUserParameters({
                                            searchBar: null
                                        })}
                                        inWaiting={isEventRequestWaiting(selectors.getWaitingNotifs(), item.id)}
                                    />
                                )}
                                ListEmptyComponent={() => <NoData />}
                                keyExtractor={(data, index) => index.toString()}
                                onEndReachedThreshold={0.3}
                                removeClippedSubviews
                            />
                        </View>
                        <View>
                            <FlatList
                                data={search.res.groups}
                                onEndReached={() => {
                                    if(search.res.groups.length < search.offsetGroups + global.MAX_RESULT_PER_LOADED_PAGE) return;
                                    setSearch({
                                        ...search,
                                        offsetGroups: search.res.offsetGroups + global.MAX_RESULT_PER_LOADED_PAGE
                                    });
                                }}
                                renderItem={({item}) => (
                                    <GroupCard
                                        isMyGroup={isUserInEventGroup(selectorsUser.getConnectedUser().groups, item.id)}
                                        item={item}
                                        navigation={navigation}
                                        onPress={() => actions.updateUserParameters({
                                            searchBar: null
                                        })}
                                        inWaiting={isGroupRequestWaiting(selectors.getWaitingNotifs(), item.id)}
                                    />
                                )}
                                ListEmptyComponent={() => <NoData />}
                                keyExtractor={(data, index) => index.toString()}
                                onEndReachedThreshold={0.3}
                                removeClippedSubviews
                            />
                        </View>
                    </Swiper>
                </View>
            </Modal>
        </View>
    );
}
