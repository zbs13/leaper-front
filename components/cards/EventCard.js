import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { card, cta } from '../../assets/styles/styles';
import ImageIcon from '../icons/ImageIcon';
import globalStyles from '../../assets/styles/global';
import { ellipsisText, getSportById, isInFav } from '../../utils/utils';
import useApp from '../../hooks/useApp';
import useFirebase from '../../hooks/useFirebase';
import useUsers from '../../hooks/useUsers';
import t from '../../providers/lang/translations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionsModal from '../modals/OptionsModal';
import ListUsersIconCards from '../icons/ListUsersIconCards';
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * Event Cards
 * 
 * @param {object} item event object => id, name, owner, sportId, description, src, users, postalCode
 * @param {boolean} isMyEvent true if user is in event else false
 * @param {object|null} navigation only used in global search to access to navigation
 * @param {function|null} onPress only used in global search to close search modal while pressing cta  
 * @returns 
 */
export default function EventCard({ item, isMyEvent = false, navigation = null, onPress = null }) {
    
    const {selectors, actions} = useApp();
    const {selectors: selectorsUser, actions: actionsUser} = useUsers();
    const {actions: firebase} = useFirebase();
    if(navigation === null){
        navigation = useNavigation();
    }

    const inFav = isInFav(selectorsUser.getConnectedUser().bookmarks, item.id);

    const [eventLogo, setEventLogo] = useState(null);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            firebase.getGELogo(item.id).then(function(url){
                setEventLogo(url);
            })
        }
        return () => { isMounted = false };
    }, [])

    /**
     * details options for option modal
     */
    const detailsOptions = {
        value: t(selectors.getLang()).DETAILS,
        action: () => navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {title: item.name, id: item.id, isMyEvent: isMyEvent}),
        icon: "add-outline",
    };

    /**
     * main fav options for option modal
     */
    const favMainOptions = {
        action: () => {
            if(!inFav){
                actionsUser.addBookmark(item.id).then((data) => {
                    manageResponseUI(data,
                        selectors.getLang(),
                        function (res) {
                            actions.addPopupStatus({
                                type: "success",
                                message: t(selectors.getLang()).bookmarks.BOOKMARK_SUCCESS
                            });
                        },
                        function (error) {
                            actions.addPopupStatus(error);
                        })
                })
            }else{
                actionsUser.removeBookmark(item.id).then((data) => {
                    manageResponseUI(data,
                        selectors.getLang(),
                        function (res) {
                            actions.addPopupStatus({
                                type: "success",
                                message: t(selectors.getLang()).bookmarks.UNBOOKMARK_SUCCESS
                            });
                        },
                        function (error) {
                            actions.addPopupStatus(error);
                        })
                    })
            }
        },
        icon: inFav ? "star" : "star-outline",
        iconColor: inFav ? global.colors.RED_LIKE : global.colors.ANTHRACITE
    };

    /**
     * main leave event option for option modal
     */
    const logOutMainOptions = {
        style: {
            backgroundColor: global.colors.RED_ERROR,
            color: global.colors.WHITE
        },
        confirm: {
            title: t(selectors.getLang()).event.LEAVE_EVENT,
            content: `${t(selectors.getLang()).event.SURE_TO_LEAVE_EVENT} ${item.name}`,
        },
        icon: "log-out-outline",
        iconColor: global.colors.WHITE,
        action: () => navigation.navigate("Home", {caca: "caca"})
    };

    /**
     * all options for options modal
     */
    const options = {
        title: ellipsisText(item.name, 30),
        options: [
            detailsOptions,
            {
                value: inFav ? t(selectors.getLang()).UNBOOKMARK_THIS_PLACE : t(selectors.getLang()).BOOKMARK_THIS_PLACE,
                ...favMainOptions
            }
        ] 
    };

    selectorsUser.getConnectedUser().id !== item.owner.id && 
        options.options.push({
            value: t(selectors.getLang()).event.LEAVE_THIS_EVENT,
            ...logOutMainOptions
        })

    /**
     * options for cta swipeable menu
     */
    const swipeableOptions = [detailsOptions, favMainOptions];
    selectorsUser.getConnectedUser().id !== item.owner.id && swipeableOptions.push(logOutMainOptions);
    
    return (
        <View style={card.view}>
            <OptionsModal
                isActive={isMyEvent}
                {...options}
            >
                <Cta
                    onPress={() => {
                        navigation.navigate(isMyEvent ? global.screens.TCHAT : global.screens.SPORT_EVENT_DETAILS, {title: item.name, id: item.id, isEvent: true});
                        onPress !== null ? onPress() : null;
                    }}
                    _style={card.cardContainer}
                    underlayColor={global.colors.WHITE}
                    swipeableRightOptions={isMyEvent ? swipeableOptions : null}
                >
                    <View
                        style={[card.cardContainer, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}
                    >
                        <View style={[globalStyles.flexColumn, {flex: 1}]}>
                            <Txt _style={globalStyles.ta_c}>{getSportById(selectors.getLang(), item.sportId).name}</Txt>
                            <ImageIcon _style={card.pic} src={eventLogo || require("../../assets/img/logos/Mini_Leaper_Logo.png")} />
                        </View>
                        <View style={[globalStyles.flexColumn, globalStyles.h_100, globalStyles.flexAround, globalStyles.p_5, {flex: 3}]}>
                            <Txt ellipsis={50} _style={[globalStyles.f_bold, globalStyles.c_anth, globalStyles.ta_j]}>{item.name}</Txt>
                            <Txt ellipsis={80} _style={[globalStyles.c_anth, globalStyles.ta_j]}>{item.description}</Txt>
                            <ListUsersIconCards users={item.users} />
                        </View>
                        <View style={[globalStyles.m_10, globalStyles.flexColumn, globalStyles.h_100, globalStyles.flexAround]}>
                            {isMyEvent ?
                                <View>
                                    <OptionsModal buttonSize={25} 
                                        {...options}
                                    />
                                </View>
                            :
                                <Cta
                                    onPress={() => alert("aaa")}
                                    _style={[cta.main, cta.first]}
                                    value={t(selectors.getLang()).JOIN}
                                    confirm={{
                                        title: item.name,
                                        content: t(selectors.getLang()).event.CONFIRM_JOIN_EVENT
                                    }}
                                />
                            }
                            <Txt _style={[globalStyles.flex, globalStyles.alignCenter, globalStyles.c_anth, globalStyles.ta_l]}>
                                <Ionicons name="location-outline" size={20}/>
                            </Txt>
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}