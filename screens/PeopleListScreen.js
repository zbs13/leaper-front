import React, { useEffect } from 'react';
import { View } from 'react-native';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import { RefreshViewList } from '../components/RefreshView';
import { manageResponseUI } from '../context/actions/apiCall';
import PersonCard from '../components/cards/PersonCard';

/**
 * people list screen
 * 
 * @returns 
 */
export default function PeopleListScreen({navigation, route}) {

    const isEvent = route.params.isEvent;
    const id = route.params.id;

    const {selectors: selectorsEvent, actions: actionsEvent} = useEvents();
    const {selectors: selectorsGroup, actions: actionsGroup} = useGroups();
    const {selectors: selectorsApp, actions: actionsApp} = useApp();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEvent ? t(selectorsApp.getLang()).event.EVENT_MEMBERS : t(selectorsApp.getLang()).group.GROUP_MEMBERS,
        });
    }, [])

    let selectors = selectorsGroup;
    let actions = actionsGroup;
    if(isEvent){
        selectors = selectorsEvent;
        actions = actionsEvent;
    }

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

    return (
      <View>
        <RefreshViewList
            onRefresh={() => fetchMembers()}
            noDataMessage={t(selectorsApp.getLang()).NO_MEMBER}
            data={selectors.getFetchedById().users}
            renderItem={({item}) => <PersonCard isMember datas={item} />}
        />
      </View>
    );
}
