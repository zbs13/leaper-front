import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import useFirebase from '../../hooks/useFirebase';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { home, card } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import t from '../../providers/lang/translations';
import TagNbGroupsEvents from '../tags/TagNbGroupsEvents';
import TagNbNotifs from '../tags/TagNbNotifs';
import ImageIcon from '../icons/ImageIcon';
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';

/**
 * group or event card to summarize groups/events where user is in
 * 
 * @param {string} type if for group card = "groups" else if for event card = "events"
 * @returns 
 */
export default function MyGroupsEventsCards({ type }) {

    const { actions: actionsGroups, selectors: selectorsGroups } = useGroups();
    const { actions: actionsEvents, selectors: selectorsEvents } = useEvents();
    const { selectors: selectorsApp } = useApp();
    const { selectors: selectorsUser } = useUsers();
    const { actions: firebase } = useFirebase();
    const navigation = useNavigation();

    const [groupEvent, setGroupEvent] = useState({
        nbGroups: 0,
        nbEvents: 0,
        nbNotifsGroups: 0,
        nbNotifsEvents: 0
    });

    const [logoUrls, setLogoUrls] = useState([]);

    let lang = selectorsApp.getLang();
    let action;
    var selector;
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

    /**
     * page is loading => get groups/events where user is in 
     */
    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            setGroupEvent({
                ...groupEvent,
                isLoaded: true,
                [nb]: selectorsUser.getConnectedUser()[type].length
            })
        }
        return () => { isMounted = false };
    }, [selectorsUser.getConnectedUser()[type]])

    useEffect(() => {
        let res = logoUrls;
        let isMounted = true;
        if (isMounted) {
            selectorsUser.getConnectedUser()[type].map((value, index) => {
                if (index < 10 && res.length < selectorsUser.getConnectedUser()[type].length) {
                    firebase.getGELogo(value.id).then(function(url){
                        res.push(url)
                        setLogoUrls(res);
                    })
                }
            })
        }
        return () => { isMounted = false };
    }, [])

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
                        <Txt _style={[globalStyles.f_bold, globalStyles.c_anth]}>{type === "groups" ? t(lang).group.MY_GROUPS.toUpperCase() : t(lang).event.MY_EVENTS.toUpperCase()}</Txt>
                    </View>
                    <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.w_100]}>
                        {
                            logoUrls.map((url, index) => <ImageIcon key={index} src={url || require("../../assets/img/logos/Mini_Leaper_Logo.png")} />)
                        }
                        {
                            groupEvent[nb] > 10 ? <TagNbGroupsEvents>+{groupEvent[nb] - 10}</TagNbGroupsEvents> : null
                        }
                    </View>
                </View>
            </Cta>
        </View>
    );
}