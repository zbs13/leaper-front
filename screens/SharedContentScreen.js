import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import { manageResponseUI } from '../context/actions/apiCall';
import SharedContentCard from '../components/cards/SharedContentCard';
import globalStyles from '../assets/styles/global';
import { RefreshViewList } from '../components/RefreshView';
import global from '../providers/global';
import SharedContentLoader from '../components/loaders/SharedContentLoader';

/**
 * shared content screen
 * 
 * @param {object} navigation for routing 
 * @param {object} route params => route.params -> id (event/group id), isEvent
 * @returns 
 */
export default function SharedContentScreen({navigation, route}) {

    const id = route.params.id;
    const isEvent = route.params.isEvent;

    const { actions: actionsApp, selectors: selectorsApp } = useApp();
    const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();
    const { actions: actionsGroup, selectors: selectorsGroup } = useGroups();

    const lang = selectorsApp.getLang();

    const [scOffset, setScOffset] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: t(lang).SHARED_CONTENT
        });
        fetchAllSharedContent();
    }, [scOffset])

    /**
     * fetch group/event shared content
     */
    function fetchAllSharedContent(){
        action.fetchAllSharedContent(id, scOffset).then((resp) => {
            manageResponseUI(resp,
                lang,
                function (res) {
                    setIsLoaded(true);
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                    setIsLoaded(false)
                }
            )
        })
    }

    let action = actionsGroup;
    let selector = selectorsGroup;
    if(isEvent){
        action = actionsEvent;
        selector = selectorsEvent;
    }

    return (
        isLoaded ?
            <View style={globalStyles.m_5}>
                <RefreshViewList
                    data={selector.getSharedContent()}
                    onRefresh={() => fetchAllSharedContent()}
                    noDataMessage={t(lang).NO_SHARED_CONTENT}
                    onEndReached={() => setScOffset(scOffset + global.MAX_RESULT_PER_LOADED_PAGE)}
                    renderItem={({item, index}) => <SharedContentCard content={item} index={index} />}
                />
            </View>
        :
            <SharedContentLoader />
        
    );
  }