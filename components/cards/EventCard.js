import React from 'react';
import { View, Text } from 'react-native';
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

export default function EventCard({ navigation, item, isMyEvent = false }) {
    
    const {selectors} = useApp();

    const detailsOptions = {
        value: t(selectors.getLang()).DETAILS,
        action: () => navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {title: item.name, id: item.id}),
        icon: "add-outline",
    };

    const favMainOptions = {
        action: () => alert("aaaa"),
        icon: "star-outline"
    };

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
                            <Text style={globalStyles.ta_c}>{global.listSports(selectors.getLang())[item.sportId - 1].name}</Text>
                            <ImageIcon _style={card.pic} src={item.src} />
                        </View>
                        <View style={[globalStyles.flexColumn, globalStyles.h_100, globalStyles.flexAround, globalStyles.p_5, {flex: 3}]}>
                            <Text style={[globalStyles.f_bold, globalStyles.c_anth, globalStyles.ta_j]}>{ellipsisText(item.name, 50)}</Text>
                            <Text style={[globalStyles.c_anth, globalStyles.ta_j]}>{ellipsisText(item.description, 80)}</Text>
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
                            <Text style={[globalStyles.flex, globalStyles.alignCenter, globalStyles.c_anth, globalStyles.ta_l]}>
                                <Ionicons name="location-outline" size={20}/>
                                {item.postalCode}
                            </Text>
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}