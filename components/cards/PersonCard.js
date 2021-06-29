import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useUsers from '../../hooks/useUsers';
import useFirebase from '../../hooks/useFirebase';
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
import { cta } from '../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { isMyFriend, isUserInEventGroup, isFriendRequestWaiting } from '../../utils/utils';

/**
 * person card
 * 
 * @param {boolean} isMember is a card in member list of group/event
 * @param {boolean} isEvent is an event card
 * @param {object} datas person datas => firstname, lastname, roles, src...
 * @param {boolean} addToGE true if card for add user in group/event
 * @param {boolean} addAsFriend true if card for add user as friend
 * @param {string} geId group/event id (if addToGE is true)
 * @param {boolean} inWaiting is add request sended
 * @returns 
 */
export default function PersonCard({ 
    isMember = false, 
    isEvent = false,
    datas,
    addToGE = false,
    addAsFriend = false,
    geId = null,
    inWaiting = false
}) {
    
    const navigation = useNavigation();
    const {selectors: selectorsEvent, actions: actionsEvent} = useEvents();
    const {selectors: selectorsGroup, actions: actionsGroup} = useGroups();
    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const {actions: firebase} = useFirebase();
    const { selectors: selectorsUser } = useUsers();

    const [userProfilePic, setUserProfilePic] = useState(null);
    const [friendRequestWaiting, setFriendRequestWaiting] = useState(false);

    let selector = selectorsGroup;
    let action = actionsGroup;
    if(isEvent){
        selector = selectorsEvent;
        action = actionsEvent;
    }

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            firebase.getUserProfilePic(datas.id).then(function(url){
                setUserProfilePic(url);
            })
        }
        return () => {isMounted = false};
    }, [])

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            setFriendRequestWaiting(addAsFriend && inWaiting);
        }
        return () => { isMounted = false };
    }, [datas])

    const personOptions = [
        {
            value: t(selectorsApp.getLang()).SEE_PROFILE,
            icon: "person-outline",
            action: () => navigation.navigate(global.screens.USER_PROFILE, {userId: datas.id, userFirstname: datas.firstname})
        }
    ];

    let roleIndex = -1;

    let myId = selectorsUser.getConnectedUser().id;
    if(isMember){

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

        roleIndex = datas.roles.findIndex((role) => (isEvent ? role.event.id : role.group.id) === selector.getFetchedById().id);

        /**
         * if user is the group/event owner
         */
        if(selector.isOwner() && myId !== datas.id){
            personOptions.splice(1, 0, {
                value: t(selectorsApp.getLang()).MANAGE_ROLE,
                icon: "lock-closed-outline",
                action: () => navigation.navigate(global.screens.ALLOCATE_ROLE, {isEvent: isEvent, userId: datas.id, userFirstname: datas.firstname, currentRoleId: roleIndex !== -1 ? datas.roles[roleIndex].id : null})
            })
        }
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
                                <BackgroundImage isRound image={userProfilePic !== null ? {uri: userProfilePic} : require("../../assets/img/icons/default_profile_pic.png")}/>
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
                            {
                                addAsFriend || addToGE ?
                                    (addAsFriend && isMyFriend(selectorsUser.getConnectedUser().id, datas.friends))
                                    || (addToGE && isEvent && isUserInEventGroup(datas.events, geId))
                                    || (addToGE && !isEvent && isUserInEventGroup(datas.groups, geId))
                                    || selectorsUser.getConnectedUser().id === datas.id
                                    ?
                                        null
                                    :
                                        <Cta
                                            onPress={async () => {
                                                // const message = {
                                                //   to: "ExponentPushToken[QXsSLQEoZMe8U1cp9xDuwz]",
                                                //   sound: 'default',
                                                //   title: 'Original Title',
                                                //   body: 'And here is the body!',
                                                //   data: { someData: 'goes here' },
                                                // };
                                                
                                                // await fetch('https://exp.host/--/api/v2/push/send', {
                                                //   method: 'POST',
                                                //   headers: {
                                                //     Accept: 'application/json',
                                                //     'Accept-encoding': 'gzip, deflate',
                                                //     'Content-Type': 'application/json',
                                                //   },
                                                //   body: JSON.stringify(message),
                                                // });
                                                if(addAsFriend){
                                                    firebase.sendNotif(global.notifications.ASK_FRIEND, datas.id, {
                                                        id: selectorsUser.getConnectedUser().id,
                                                        firstname: selectorsUser.getConnectedUser().firstname,
                                                        lastname: selectorsUser.getConnectedUser().lastname
                                                    });
                                                    setFriendRequestWaiting(true);
                                                    return;
                                                }

                                                firebase.sendNotif(isEvent ? global.notifications.ADD_EVENT : global.notifications.ADD_GROUP, datas.id, {
                                                    id: selectorsUser.getConnectedUser().id,
                                                    firstname: selectorsUser.getConnectedUser().firstname,
                                                    lastname: selectorsUser.getConnectedUser().lastname
                                                }, geId);
                                            }}
                                            _style={[cta.main, friendRequestWaiting ? cta.second : {}]}
                                            underlayColor="transparent"
                                            disabled={friendRequestWaiting}
                                            confirm={{
                                                title: addAsFriend ? t(selectorsApp.getLang()).friends.SEND_A_FRIEND_REQUEST : t(selectorsApp.getLang()).INVITE,
                                                content: addAsFriend ? `${t(selectorsApp.getLang()).friends.CONFIRM_SEND_A_FRIEND_REQUEST} ${datas.firstname}` : isEvent ? t(selectorsApp.getLang()).event.sureToInviteUserToEvent(datas.firstname) : t(selectorsApp.getLang()).group.sureToInviteUserToGroup(datas.firstname) 
                                            }}
                                        >
                                            {
                                                friendRequestWaiting ?
                                                    <View style={globalStyles.alignCenter}>
                                                        <Ionicons name="mail-outline" color={global.colors.ANTHRACITE} size={30} />
                                                    </View>
                                                :
                                                    <View style={globalStyles.alignCenter}>
                                                        <Ionicons name="add-outline" color={global.colors.MAIN_COLOR} size={30} />
                                                    </View>
                                            }
                                        </Cta>
                                :
                                    <OptionsModal options={personOptions} icon="ellipsis-horizontal-outline" buttonColor={global.colors.MAIN_COLOR} buttonSize={25} />
                            }
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}