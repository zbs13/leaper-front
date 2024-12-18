import React from 'react';
import { View } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import useFirebase from '../../hooks/useFirebase';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { card, cta, notificationCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import t from '../../providers/lang/translations';
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import Title from '../Title';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * group or event card to summarize groups/events where user is in
 * 
 * @param {object} data notification datas => id, type, from, to, isSeen
 * @returns 
 */
export default function MyGroupsEventsCards({ data }) {

    const {actions, selectors} = useApp();
    const {actions: actionsUser, selectors: selectorsUser} = useUsers();
    const {actions: actionsEvent} = useEvents();
    const {actions: actionsGroup} = useGroups();
    const {actions: firebase} = useFirebase();
    const navigation = useNavigation();

    return (
        <View style={[globalStyles.flexRow, card.view, globalStyles.mpp]}>
            <View style={[{flex: 1.5}, globalStyles.flexColumn, notificationCard.view]}>
                <Title type="third">
                    { 
                        data.type === global.notifications.ASK_FRIEND 
                        ? t(selectors.getLang()).notifications.ASK_FRIEND_TITLE 
                        : data.type === global.notifications.ASK_EVENT 
                        ? t(selectors.getLang()).notifications.ASK_EVENT_TITLE 
                        : data.type === global.notifications.ASK_GROUP
                        ? t(selectors.getLang()).notifications.ASK_GROUP_TITLE  
                        : data.type === global.notifications.ADD_EVENT 
                        ? t(selectors.getLang()).notifications.ADD_EVENT_TITLE 
                        : t(selectors.getLang()).notifications.ADD_GROUP_TITLE 
                    }
                </Title>
                <View>
                    <Txt>
                        {data.type === global.notifications.ASK_FRIEND 
                        ? `${data.from.firstname} ${data.from.lastname} ${t(selectors.getLang()).notifications.ASK_FRIEND_CONTENT}`
                        : data.type === global.notifications.ASK_EVENT 
                        ? `${data.from.firstname} ${data.from.lastname} ${t(selectors.getLang()).notifications.ASK_EVENT_CONTENT}`
                        : data.type === global.notifications.ASK_GROUP
                        ? `${data.from.firstname} ${data.from.lastname} ${t(selectors.getLang()).notifications.ASK_GROUP_CONTENT}`
                        : data.type === global.notifications.ADD_EVENT 
                        ? t(selectors.getLang()).notifications.ADD_EVENT_CONTENT
                        : t(selectors.getLang()).notifications.ADD_GROUP_CONTENT}
                    </Txt>
                </View>
            </View>
            <View style={[{flex: 1}, globalStyles.flexRow, globalStyles.alignCenter]}>
                {data.type !== global.notifications.ADD_GROUP &&
                    <View style={{flex: 1}}>
                        <Cta _style={[cta.main, cta.notificationSee, globalStyles.w_100, globalStyles.h_100, globalStyles.justifyCenter]}
                            value={t(selectors.getLang()).notifications.SEE}
                            onPress={() => {
                                if(data.type === global.notifications.ASK_FRIEND
                                || data.type === global.notifications.ASK_EVENT
                                || data.type === global.notifications.ASK_GROUP){
                                    navigation.navigate(global.screens.USER_PROFILE, {userId: data.from.id})
                                }else{
                                    navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {isMyEvent: false, id: data.geId})
                                }
                            }}
                        />
                    </View>
                }
                <View style={{flex: 1}}>
                    <Cta _style={[cta.main, cta.notificationAccept, globalStyles.w_100, globalStyles.h_100, globalStyles.justifyCenter, globalStyles.alignCenter]}
                        onPress={() => {
                            switch(data.type){
                                case global.notifications.ASK_FRIEND:
                                    actionsUser.addFriend(data.from.id).then((ds) => {
                                        manageResponseUI(ds,
                                            selectors.getLang(),
                                            function (res) {
                                                firebase.deleteNotif(data.id, selectorsUser.getConnectedUser().id, data.from.id, function(){
                                                    actions.addPopupStatus({
                                                        type: "error"
                                                    });
                                                });
                                                return;
                                            },
                                            function (error) {
                                                actions.addPopupStatus(error);
                                            })
                                        })
                                    break;
                                case global.notifications.ADD_EVENT:
                                case global.notifications.ASK_EVENT:
                                    actionsUser.addUserToEvent(data.type === global.notifications.ASK_EVENT ? data.from.id : selectorsUser.getConnectedUser().id, data.geId).then((ds) => {
                                        manageResponseUI(ds,
                                            selectors.getLang(),
                                            function (res) {
                                                if(data.type === global.notifications.ASK_EVENT){
                                                    firebase.deleteNotif(data.id, data.geId, data.from.id, function(){
                                                        actions.addPopupStatus({
                                                            type: "error"
                                                        });
                                                    });
                                                }else{
                                                    firebase.deleteNotif(data.id, selectorsUser.getConnectedUser().id, data.from.id, function(){
                                                        actions.addPopupStatus({
                                                            type: "error"
                                                        });
                                                    });
                                                    actionsEvent.updateNeedReload(true);
                                                }
                                                return;
                                            },
                                            function (error) {
                                                actions.addPopupStatus(error);
                                            })
                                        })
                                    break;
                                case global.notifications.ADD_GROUP:
                                case global.notifications.ASK_GROUP:
                                    actionsUser.addUserToGroup(data.type === global.notifications.ASK_GROUP ? data.from.id : selectorsUser.getConnectedUser().id, data.geId).then((ds) => {
                                        manageResponseUI(ds,
                                            selectors.getLang(),
                                            function (res) {
                                                if(data.type === global.notifications.ASK_GROUP){
                                                    firebase.deleteNotif(data.id, data.geId, data.from.id, function(){
                                                        actions.addPopupStatus({
                                                            type: "error"
                                                        });
                                                    });
                                                }else{
                                                    firebase.deleteNotif(data.id, selectorsUser.getConnectedUser().id, data.from.id, function(){
                                                        actions.addPopupStatus({
                                                            type: "error"
                                                        });
                                                    });
                                                    actionsGroup.updateNeedReload(true);
                                                }
                                                return;
                                            },
                                            function (error) {
                                                actions.addPopupStatus(error);
                                            })
                                        })
                                    break;
                            }
                        }}
                    >
                        <Ionicons name="checkmark-outline" size={30} color={global.colors.ANTHRACITE} />
                    </Cta>
                </View>
                <View style={{flex: 1}}>
                    <Cta _style={[cta.main, cta.notificationRefuse, globalStyles.w_100, globalStyles.h_100, globalStyles.justifyCenter, globalStyles.alignCenter]} 
                        onPress={() => {
                            switch(data.type){
                                case global.notifications.ASK_FRIEND:
                                case global.notifications.ADD_EVENT:
                                case global.notifications.ADD_GROUP:
                                    firebase.deleteNotif(data.id, selectorsUser.getConnectedUser().id, data.from.id, function(){
                                        actions.addPopupStatus({
                                            type: "error"
                                        });
                                    });
                                    break;
                                case global.notifications.ASK_GROUP:
                                case global.notifications.ASK_EVENT:
                                    firebase.deleteNotif(data.id, data.geId, data.from.id, function(){
                                        actions.addPopupStatus({
                                            type: "error"
                                        });
                                    });
                                    break;
                            }
                        }}
                    >
                        <Ionicons name="close-outline" size={30} color={global.colors.RED_ERROR_TEXT} />
                    </Cta>
                </View>
            </View>
        </View>
    );
}