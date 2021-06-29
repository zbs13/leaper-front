import React, {useEffect, useState} from 'react';
import { View, FlatList } from 'react-native';
import useApp from '../hooks/useApp';
import useUsers from '../hooks/useUsers';
import t from '../providers/lang/translations';
import globalStyles from '../assets/styles/global';
import { manageResponseUI } from '../context/actions/apiCall';
import global from '../providers/global';
import SB from '../components/search/SearchBar';
import NoData from '../components/NoData';
import PersonCard from '../components/cards/PersonCard';
import { isFriendRequestWaiting } from '../utils/utils';

/**
 * add person (friend or add person to group/event) screen
 * 
 * @param {object} navigation for navigation
 * @param {boolean} route params => asFriend, geId, isEvent
 * @returns 
 */
export default function AddPersonScreen({navigation, route}) {
    const asFriend = route.params.asFriend;
    const geId = route.params.geId;
    const isEvent = route.params.isEvent;

    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const {selectors: selectorsUser, actions: actionsUser} = useUsers();

    const [ap, setAp] = useState({
        value: "",
        offset: 0
    });
    const [apRes, setApRes] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: !asFriend ? isEvent ? t(selectorsApp.getLang()).addPerson.ADD_TO_EVENT : t(selectorsApp.getLang()).addPerson.ADD_TO_GROUP : t(selectorsApp.getLang()).addPerson.ADD_TO_CONTACT
        });
    }, [])

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            fetchDatas();
        }
        return () => {isMounted = false};
    }, [ap])

    /**
     * called to fetch datas by value and offset
     */
    function fetchDatas(){
        actionsUser.fetchUsersByName(ap.value, ap.offset).then((data) => {
            manageResponseUI(data,
                selectorsApp.getLang(),
                function (res) {
                    if(ap.offset !== 0){
                        if(apRes.length < ap.offset) return;
                        setApRes(apRes.concat(res));
                        return;
                    }
                    setApRes(res);
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                })
            })
    }

    return (
        <View style={globalStyles.flexColumn}>
            <SB
                placeholder={t(selectorsApp.getLang()).addPerson.SEARCH_USER}
                onChangeText={(value) => setAp({value: value, offset: 0})}
                value={ap.value}
                cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
                containerStyle={{backgroundColor: "transparent"}}
                cancelButtonProps={{color: global.colors.MAIN_COLOR}}
            />
            <View>
                <FlatList
                    data={apRes}
                    renderItem={({item}) => (
                        <PersonCard 
                            isEvent={asFriend ? false : isEvent} 
                            addAsFriend={asFriend} 
                            addToGE={!asFriend} 
                            geId={!asFriend ? geId : null} 
                            inWaiting={asFriend ? isFriendRequestWaiting(selectorsApp.getWaitingNotifs(), item.id) : false} 
                            datas={item} 
                        />
                    )}
                    ListEmptyComponent={() => <NoData />}
                    keyExtractor={(data, index) => index.toString()}
                    onEndReachedThreshold={0.3}
                    removeClippedSubviews
                    onEndReached={() => setAp({...ap, offset: ap.offset + global.MAX_RESULT_PER_LOADED_PAGE})}
                />
            </View>
        </View>
    );
}