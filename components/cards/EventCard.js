import React from 'react';
import { View } from 'react-native';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { card, cta } from '../../assets/styles/styles';
import ImageIcon from '../icons/ImageIcon';
import globalStyles from '../../assets/styles/global';
import { ellipsisText } from '../../utils/utils';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionsModal from '../modals/OptionsModal';
import ListUsersIconCards from '../icons/ListUsersIconCards';
import Txt from '../Txt';

/**
 * Event Cards
 * 
 * @param {object} navigation navigation object for routing
 * @param {object} item event object => id, name, sportId, description, src, users, postalCode
 * @param {boolean} isMyEvent true if user is in event else false
 * @returns 
 */
export default function EventCard({ navigation, item, isMyEvent = false }) {
    
    const {selectors} = useApp();

    /**
     * details options for option modal
     */
    const detailsOptions = {
        value: t(selectors.getLang()).DETAILS,
        action: () => navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {title: item.name, id: item.id}),
        icon: "add-outline",
    };

    /**
     * main fav options for option modal
     */
    const favMainOptions = {
        action: () => alert("aaaa"),
        icon: "star-outline"
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
                value: t(selectors.getLang()).BOOKMARK_THIS_PLACE,
                ...favMainOptions
            },
            {
                value: t(selectors.getLang()).event.LEAVE_THIS_EVENT,
                ...logOutMainOptions
            }
        ] 
    };

    /**
     * options for cta swipeable menu
     */
    const swipeableOptions = [detailsOptions, favMainOptions, logOutMainOptions];
    
    return (
        <View style={card.view}>
            <OptionsModal
                isActive={isMyEvent}
                {...options}
            >
                <Cta
                    onPress={() => navigation.navigate(isMyEvent ? global.screens.TCHAT : global.screens.SPORT_EVENT_DETAILS, {title: item.name, id: item.id, isEvent: true})}
                    _style={card.cardContainer}
                    underlayColor={global.colors.WHITE}
                    swipeableRightOptions={isMyEvent ? swipeableOptions : null}
                >
                    <View
                        style={[card.cardContainer, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}
                    >
                        <View style={[globalStyles.flexColumn, {flex: 1}]}>
                            <Txt _style={globalStyles.ta_c}>{global.listSports(selectors.getLang())[item.sportId - 1].name}</Txt>
                            <ImageIcon _style={card.pic} src={item.src} />
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
                                {item.postalCode}
                            </Txt>
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}