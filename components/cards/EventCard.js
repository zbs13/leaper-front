import React from 'react';
import { View, Text } from 'react-native';
import Cta from '../Cta';
import global from '../../providers/global';
import { card, cta } from '../../assets/styles/styles';
import ImageIcon from '../icons/ImageIcon';
import globalStyles from '../../assets/styles/global';
import { randId, ellipsisText } from '../../utils/utils';
import TagNbGroupsEvents from '../tags/TagNbGroupsEvents';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function EventCards({ navigation, item }) {
    
    const {selectors} = useApp();

    return (
        <View style={card.view}>
            <Cta
                onPress={() => navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {eventTitle: item.name, eventId: item.id})}
                _style={card.cardContainer}
                underlayColor={global.colors.WHITE}
            >
                <View
                    style={[card.cardContainer, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}
                >
                    <View style={[globalStyles.flexColumn, {flex: 1}]}>
                        <Text style={globalStyles.ta_c}>{global.listSports(selectors.getLang())[item.sportId - 1].name}</Text>
                        <ImageIcon _style={card.pic} src={item.src} />
                    </View>
                    <View style={[globalStyles.flexColumn, globalStyles.p_5, {flex: 3}]}>
                        <Text style={[globalStyles.f_bold, globalStyles.c_anth, globalStyles.ta_j]}>{ellipsisText(item.name, 50)}</Text>
                        <Text style={[globalStyles.c_anth, globalStyles.ta_j]}>{ellipsisText(item.description, 80)}</Text>
                        <View style={globalStyles.flexRow}>
                            {item.users.map((val, idx) => idx > item.users.length - 6 ? <ImageIcon key={randId()} src={val.src} /> : null)}
                            {item.users.length > 5 ? <TagNbGroupsEvents>+{item.users.length - 5}</TagNbGroupsEvents> : null}
                        </View>
                    </View>
                    <View style={[globalStyles.m_10, globalStyles.flexColumn, {flex: 1.3}]}>
                        <Cta
                            onPress={() => alert("aaa")}
                            _style={[cta.main, cta.first]}
                            value={t(selectors.getLang()).JOIN}
                            confirm={{
                                title: item.name,
                                content: t(selectors.getLang()).CONFIRM_JOIN_EVENT
                            }}
                        />
                        <Text style={[globalStyles.flex, globalStyles.alignCenter, globalStyles.c_anth, globalStyles.ta_l]}>
                            <Ionicons name="location-outline" size={20}/>
                            {item.postalCode}
                        </Text>
                    </View>
                </View>
            </Cta>
        </View>
    );
}