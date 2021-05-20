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
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import BackgroundImage from '../BackgroundImage';
import OptionsModal from '../modals/OptionsModal';

/**
 * person card
 * 
 * @param {boolean} isMember is a card in member list of group/event
 * @param {boolean} isEvent is an event card
 * @param {object} datas person datas => firstname, lastname, roles, src...
 * @returns 
 */
export default function PersonCard({ 
    isMember = false, 
    isEvent = false,
    datas
}) {

    const navigation = useNavigation();
    const {selectors: selectorsEvent, actions: actionsEvent} = useEvents();
    const {selectors: selectorsGroup, actions: actionsGroup} = useGroups();
    const {selectors: selectorsApp, actions: actionsApp} = useApp();

    let selector = selectorsGroup;
    let action = actionsGroup;
    if(isEvent){
        selector = selectorsEvent;
        action = actionsEvent;
    }

    const personOptions = [
        {
            value: t(selectorsApp.getLang()).SEE_PROFILE,
            icon: "person-outline",
            action: () => navigation.navigate(global.screens.USER_PROFILE, {userId: datas.id, userFirstname: datas.firstname})
        }
    ];

    let roleIndex = -1;

    if(isMember){
        let myId = 2; //TODO get real own id

        /**
         * if user has right "remove user" and its not his person card
         */
        if(selector.hasRight(global.rights.REMOVE_USER) && myId !== datas.id){
            personOptions.splice(1, 0, {
                value: t(selectorsApp.getLang()).EXCLUDE,
                icon: "close-outline",
                confirm: {
                    title: t(selectorsApp.getLang()).EXCLUDE,
                    content: `${t(selectorsApp.getLang()).SURE_TO_EXCLUDE} ${datas.firstname} ${datas.lastname} ?`
                },
                action: () => action.removeUser(datas.id, selector.getFetchedById().id).then((data) => {
                    manageResponseUI(data,
                        selectorsApp.getLang(),
                        function (res) {
                            return;
                        },
                        function (error) {
                            actionsApp.addPopupStatus(error);
                        })
                    })
            })
        }

        /**
         * if user is the group/event owner
         */
        if(selector.isOwner()){
            personOptions.splice(1, 0, {
                value: t(selectorsApp.getLang()).MANAGE_ROLE,
                icon: "lock-closed-outline",
                action: () => alert("roles")
            })
        }

        roleIndex = datas.roles.findIndex((role) => (isEvent ? role.event.id : role.group.id) === selector.getFetchedById().id);
    }

    return (
        <View style={personCard.view}>
            <OptionsModal
                options={personOptions}
            >
                <Cta
                    onPress={() => navigation.navigate(global.screens.USER_PROFILE, {userId: datas.id, userFirstname: datas.firstname})}
                >
                    <View style={[globalStyles.w_100, globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
                        <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                            <View style={personCard.profilePic}>
                                <BackgroundImage isRound image={{uri: datas.src}}/>
                            </View>
                            <View style={globalStyles.flexColumn}>
                                <View style={globalStyles.p_5}>
                                    <Txt ellipsis={35}>
                                        {`${datas.firstname} ${datas.lastname}`}
                                    </Txt>
                                </View>
                                {
                                    isMember && roleIndex !== -1 &&
                                        <View style={globalStyles.pl_5}>
                                            <Txt 
                                                ellipsis={25} 
                                                _style={globalStyles.fs_10} 
                                                color={global.colors.LIGHT_GREY}
                                            >
                                                {datas.roles[roleIndex].name}
                                            </Txt>
                                        </View>
                                }
                            </View>
                        </View>
                        <View>
                            <OptionsModal options={personOptions} icon="ellipsis-horizontal-outline" buttonColor={global.colors.MAIN_COLOR} buttonSize={25} />
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}