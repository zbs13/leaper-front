import React from 'react';
import { View } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useApp from '../../hooks/useApp';
import { manageResponseUI } from '../../context/actions/apiCall';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { personCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import t from '../../providers/lang/translations';
import TagNbGroupsEvents from '../tags/TagNbGroupsEvents';
import TagNbNotifs from '../tags/TagNbNotifs';
import ImageIcon from '../icons/ImageIcon';
import GroupsEventsCardLoader from "../loaders/GroupsEventsCardLoader";
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../BackgroundImage';
import OptionsModal from '../modals/OptionsModal';

/**
 * person card
 * 
 * @param {boolean} isMember is a card in member list of group/event
 * @param {object} datas person datas => firstname, lastname, roles, src...
 * @returns 
 */
export default function PersonCard({ 
    isMember = false, 
    datas
}) {

    const navigation = useNavigation();

    const personOptions = [
        {
            value: "ezfef"
        }
    ];

    return (
        <View style={personCard.view}>
            <Cta
                onPress={() => console.log("ao")}
            >
                <View style={[globalStyles.w_100, globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
                    <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                        <View style={personCard.profilePic}>
                            <BackgroundImage isRound image={{uri: datas.src}}/>
                        </View>
                        <View style={globalStyles.p_5}>
                            <Txt ellipsis={35}>
                                {`${datas.firstname} ${datas.lastname}`}
                            </Txt>
                        </View>
                    </View>
                    <View>
                        <OptionsModal options={personOptions} icon="ellipsis-horizontal-outline" buttonColor={global.colors.MAIN_COLOR} buttonSize={25} />
                    </View>
                </View>
            </Cta>
        </View>
    );
}