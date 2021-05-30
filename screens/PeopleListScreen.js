import React, { useEffect } from 'react';
import { View } from 'react-native';
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
                <Cta onPress={() => console.log("page add user")} >
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
    );
}
