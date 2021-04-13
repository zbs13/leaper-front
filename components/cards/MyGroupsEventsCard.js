import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useApp from '../../hooks/useApp';
import { manageResponseUI } from '../../context/actions/apiCall';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { home, card } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import t from '../../providers/lang/translations';
import TagNbGroupsEvents from '../tags/TagNbGroupsEvents';
import TagNbNotifs from '../tags/TagNbNotifs';
import ImageIcon from '../icons/ImageIcon';
import GroupsEventsCardLoader from "../loaders/GroupsEventsCardLoader";

export default function MyGroupsEventsCards({ type, navigation }) {

    const { actions: actionsGroups, selectors: selectorsGroups } = useGroups();
    const { actions: actionsEvents, selectors: selectorsEvents } = useEvents();
    const { actions: actionsApp, selectors: selectorsApp } = useApp();

    const [groupEvent, setGroupEvent] = useState({
        isLoaded: false,
        nbGroups: 0,
        nbEvents: 0,
        nbNotifsGroups: 0,
        nbNotifsEvents: 0
    });

    let lang = selectorsApp.getLang();
    let action;
    let selector;
    let nb;
    if (type === "groups") {
        action = actionsGroups;
        selector = selectorsGroups;
        nb = "nbGroups";
    } else if (type === "events") {
        action = actionsEvents;
        selector = selectorsEvents;
        nb = "nbEvents";
    }
    useEffect(() => {
        action.fetchAllMy().then((data) => {
            manageResponseUI(data,
                lang,
                function (res) {
                    setGroupEvent({
                        ...groupEvent,
                        isLoaded: true,
                        [nb]: res.length
                    })
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                    setGroupEvent({
                        ...groupEvent,
                        isLoaded: false
                    })
                })
        })
    }, [])

    if (groupEvent.isLoaded) {
        return (
            <View style={home.view}>
                <Cta
                    onPress={() => navigation.navigate(type === "groups" ? global.screens.MY_GROUPS : global.screens.MY_EVENTS)}
                    _style={card.cardContainer}
                    underlayColor={global.colors.WHITE}
                >
                    <View style={[globalStyles.p_10, globalStyles.h_100, globalStyles.flexAround, globalStyles.alignStretch, globalStyles.flex, globalStyles.alignAround]}>
                        <View style={[globalStyles.flexRow, globalStyles.flexBetween]}>
                            <TagNbGroupsEvents>
                                {type === "groups" ? groupEvent.nbGroups : groupEvent.nbEvents}
                            </TagNbGroupsEvents>
                            <TagNbNotifs>
                                {type === "groups" ?
                                    groupEvent.nbNotifsGroups
                                    :
                                    groupEvent.nbNotifsEvents
                                }
                            </TagNbNotifs>
                        </View>
                        <View>
                            <Text style={[globalStyles.f_bold, globalStyles.c_anth]}>{type === "groups" ? t(lang).MY_GROUPS.toUpperCase() : t(lang).MY_EVENTS.toUpperCase()}</Text>
                        </View>
                        <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.w_100]}>
                            {(selector.getAllMy()).map((value, index) => {
                                if (index > groupEvent[nb] - 11) {
                                    return <ImageIcon key={index} src={value.src} />
                                }
                            })}
                            {
                                groupEvent[nb] > 10 ? <TagNbGroupsEvents>+{groupEvent[nb] - 10}</TagNbGroupsEvents> : null
                            }
                        </View>
                    </View>
                </Cta>
            </View>
        );
    } else {
        return (
            <GroupsEventsCardLoader />
        );
    }
}