import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import useFirebase from '../hooks/useFirebase';
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
    const { actions: firebase } = useFirebase();

    const lang = selectorsApp.getLang();

    const [scLimit, setScLimit] = useState(global.MAX_RESULT_PER_LOADED_PAGE);
    const [isLoaded, setIsLoaded] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        let isMounted = true;
        navigation.setOptions({
            headerTitle: t(lang).SHARED_CONTENT
        });
        if(isMounted){
            fetchAllSharedContent();
        }
        return () => {isMounted = false}
    }, [])

    /**
     * fetch group/event shared content
     * 
     * @param offset
     */
    function fetchAllSharedContent(offset = global.MAX_RESULT_PER_LOADED_PAGE){
        let results = []
        return firebase.getSharedContent(id, offset, function(result){
            if(result !== null){
                results.push(result);
                setResults(results);
            }
            setIsLoaded(true);
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
                    data={results}
                    onRefresh={() => fetchAllSharedContent()}
                    noDataMessage={t(lang).NO_SHARED_CONTENT}
                    onEndReached={() => {
                        if(results.length >= scLimit + global.MAX_RESULT_PER_LOADED_PAGE){
                            fetchAllSharedContent(scLimit + global.MAX_RESULT_PER_LOADED_PAGE);
                            setScLimit(scLimit + global.MAX_RESULT_PER_LOADED_PAGE);
                        }
                    }}
                    renderItem={({item, index}) => <SharedContentCard content={item} index={index} />}
                />
            </View>
        :
            <SharedContentLoader />
        
    );
  }