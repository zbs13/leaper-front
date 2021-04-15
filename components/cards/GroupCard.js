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

/**
 * group card
 * 
 * @param {object} navigation navigation object for routing
 * @param {object} item group object => id, name, description, src, users 
 * @param {boolean} isMyGroup true if user is in group else false
 * @returns 
 */
export default function GroupCard({ navigation, item, isMyGroup = false }) {
    
    const {selectors} = useApp();

    /**
     * main options in options modal (for swipeable option)
     */
    const mainOptions = {
        style: {
            backgroundColor: global.colors.RED_ERROR,
            color: global.colors.WHITE
        },
        confirm: {
            title: t(selectors.getLang()).group.LEAVE_GROUP,
            content: `${t(selectors.getLang()).group.SURE_TO_LEAVE_GROUP} ${item.name}`,
        },
        icon: "log-out-outline",
        iconColor: global.colors.WHITE,
        action: () => navigation.navigate("Home", {caca: "caca"})
    }

    /**
     * options for options modal
     */
    const options = {
        title: ellipsisText(item.name, 30),
        options: [
            {
                value: t(selectors.getLang()).group.LEAVE_THIS_GROUP,
                ...mainOptions
            }
        ] 
    }

    /**
     * options for cta swipeable options
     */
    const swipeableOptions = [{
        ...mainOptions
    }]

    return (
        <View style={card.view}>
            <OptionsModal
                isActive={isMyGroup}
                {...options}
            >
                <Cta
                    onPress={() => navigation.navigate(isMyGroup ? global.screens.TCHAT : null, {title: item.name, id: item.id, isEvent: false})}
                    _style={card.cardContainer}
                    underlayColor={global.colors.WHITE}
                    swipeableRightOptions={swipeableOptions}
                >
                    <View
                        style={[card.cardContainer, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}
                    >
                        <View style={{flex: 1}}>
                            <ImageIcon _style={card.pic} src={item.src} />
                        </View>
                        <View style={[globalStyles.flexColumn, globalStyles.h_100, globalStyles.flexAround, globalStyles.p_5, {flex: 3}]}>
                            <Text style={[globalStyles.f_bold, globalStyles.c_anth, globalStyles.ta_j]}>{ellipsisText(item.name, 50)}</Text>
                            <Text style={[globalStyles.c_anth, globalStyles.ta_j]}>{ellipsisText(item.description, 80)}</Text>
                            <ListUsersIconCards users={item.users} />
                        </View>
                        <View style={[globalStyles.m_10]}>
                            {isMyGroup ?
                                <View>
                                    <OptionsModal buttonSize={25} 
                                        {...options}
                                    />
                                </View>
                            :
                                <Cta
                                    onPress={() => alert("aaa")}
                                    _style={[cta.main, cta.first]}
                                    confirm={{
                                        title: item.name,
                                        content: t(selectors.getLang()).CONFIRM_JOIN_GROUP
                                    }}
                                >
                                    <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
                                </Cta>
                            }
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}