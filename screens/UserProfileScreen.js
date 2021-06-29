import React, {useEffect, useState} from 'react';
import { View, Linking, Platform } from 'react-native';
import useApp from '../hooks/useApp';
import useFirebase from '../hooks/useFirebase';
import globalStyles from '../assets/styles/global';
import { manageResponseUI } from '../context/actions/apiCall';
import { 
    getSportById, 
    isMyFriend, 
    isUserInEventGroup, 
    isFriendRequestWaiting 
} from '../utils/utils';
import Cta from '../components/cta/Cta';
import Txt from '../components/Txt';
import t from '../providers/lang/translations';
import useUsers from '../hooks/useUsers';
import BackgroundImage from '../components/BackgroundImage';
import { ScrollView } from 'react-native-gesture-handler';
import { differenceInYears, parseISO } from 'date-fns';
import Title from '../components/Title';
import { Flag } from 'react-native-svg-flagkit';
import { formatPhoneNumber } from 'react-phone-number-input';
import EventCard from '../components/cards/EventCard';
import { cta, profile } from '../assets/styles/styles';
import UserProfileLoader from '../components/loaders/UserProfileLoader';
import global from '../providers/global';

/**
 * user profile screen
 * 
 * @param {object} navigation for routing 
 * @param {object} route params => route.params -> userId, userFirstname
 * @returns 
 */
export default function UserProfileScreen({navigation, route}) {

    let userId = route.params.userId;
    let userFirstname = route.params.userFirstname || "...";

    const {selectors: selectorsUser, actions: actionsUser} = useUsers();
    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const {actions: firebase} = useFirebase();

    const [isLoaded, setIsLoaded] = useState(false);
    const [friendRequestWaiting, setFriendRequestWaiting] = useState(false);
    const [user, setUser] = useState(null);
    const [userProfilePic, setUserProfilePic] = useState(null);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: t(selectorsApp.getLang()).profile.title(userFirstname)
        });
        let isMounted = true;
        if(isMounted){
            fetchProfile();
            firebase.getUserProfilePic(userId).then(function(url){
                setUserProfilePic(url);
            })
        }
        return () => {isMounted = false};
    }, [])

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            let userRequestWaiting = isFriendRequestWaiting(selectorsApp.getWaitingNotifs(), userId);
            setFriendRequestWaiting(userRequestWaiting);
        }
        return () => {isMounted = false}
    }, [selectorsApp.getWaitingNotifs()])

    /**
     * get user datas
     */
    function fetchProfile(){
        actionsUser.fetchUserById(userId).then((data) => {
            manageResponseUI(data,
                selectorsApp.getLang(),
                function (res) {
                    setUser(res);
                    setIsLoaded(true);
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                    setIsLoaded(false);
                })
            })
    }

    return (
        <>
            {isLoaded ?
                <ScrollView style={globalStyles.mpm}>
                    <View style={[globalStyles.flexColumn, globalStyles.w_100, globalStyles.alignCenter, globalStyles.p_10, profile.header]}>
                        <View style={[profile.headerPicContainer, globalStyles.m_10]}>
                            <BackgroundImage 
                                image={userProfilePic !== null ? {uri: userProfilePic} : require("../assets/img/icons/default_profile_pic.png")} 
                                isRound 
                                _style={profile.headerPic}
                            />
                        </View>
                        <View>
                            <Txt _style={profile.headerName}>
                                {`${user.firstname} ${user.lastname}, ${differenceInYears(new Date(), parseISO(user.birthdate))}`}
                            </Txt>
                        </View>
                        <View style={globalStyles.mt_10}>
                            {
                                userId !== selectorsUser.getConnectedUser().id ?
                                    isMyFriend(user.id, user.friends) ?
                                        <Cta 
                                            onPress={() => console.log("DELETE AMI")}
                                            _style={[cta.main, cta.b_red]}
                                            value={t(selectorsApp.getLang()).profile.DELETE_FRIEND}
                                            confirm={{
                                                title: t(selectorsApp.getLang()).profile.DELETE_FRIEND,
                                                content: t(selectorsApp.getLang()).profile.SURE_TO_DELETE_FRIEND
                                            }}
                                        />
                                    :
                                        friendRequestWaiting ?
                                            <Cta
                                                _style={[cta.main, cta.first]}
                                                value={t(selectorsApp.getLang()).friends.FRIEND_REQUEST_WAITING}
                                                disabled
                                            />
                                        :
                                            <Cta 
                                                onPress={() => {
                                                    firebase.sendNotif(global.notifications.ASK_FRIEND, userId, {
                                                        id: selectorsUser.getConnectedUser().id,
                                                        firstname: selectorsUser.getConnectedUser().firstname,
                                                        lastname: selectorsUser.getConnectedUser().lastname
                                                    });
                                                }}
                                                _style={[cta.main, cta.first]}
                                                value={t(selectorsApp.getLang()).profile.ADD_AS_FRIEND}
                                            />
                                :
                                    null
                            }
                        </View>
                    </View>
                    <View>
                        <Title>
                            {t(selectorsApp.getLang()).profile.PROFILE} 
                        </Title>
                        <View style={[globalStyles.flexColumn, globalStyles.m_5, globalStyles.mb_20]}>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.LASTNAME}
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {user.lastname} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.FIRSTNAME}
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {user.firstname} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.BIRTHDATE} 
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {t(selectorsApp.getLang()).datetime.formats.readableDate(user.birthdate)} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.FAVORITE_SPORT} 
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {getSportById(selectorsApp.getLang(), user.fav_sport).name} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.REGISTRATION_DATE} 
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {t(selectorsApp.getLang()).datetime.formats.date(user.create_at)} 
                                </Txt>
                            </View>
                        </View>
                        <Title>
                            {t(selectorsApp.getLang()).profile.CONTACT} 
                        </Title>
                        <View style={[globalStyles.flexColumn, globalStyles.m_5, globalStyles.mb_20]}>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.EMAIL}  
                                </Txt>
                                <Txt
                                    onPress={() => Linking.openURL(`mailto:${user.email}`)}
                                    _style={{flex: 1}}
                                >
                                    {user.email} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.PHONE_NUMBER}  
                                </Txt>
                                <Flag 
                                    id={JSON.parse(user.country).cca2}
                                    size={0.1}
                                />
                                <Txt 
                                    onPress={() => Linking.openURL(`${Platform.OS === "android" ? "tel" : "telprompt"}:${user.phone}`)}
                                    _style={[{flex: 1}, globalStyles.pl_5]}
                                >
                                    {
                                        JSON.parse(user.country).callingCode.length !== 0 ?
                                            formatPhoneNumber(`+${JSON.parse(user.country).callingCode[0]}${user.phone}`)
                                        :
                                        user.phone
                                    } 
                                </Txt>
                            </View>
                        </View>
                        <Title>
                            {t(selectorsApp.getLang()).profile.MEMBER_OF}
                        </Title>
                        <View style={[globalStyles.flexColumn, globalStyles.m_5]}>
                            {
                                user.events.length !== 0 ?
                                    (user.events).map((event, index) => {
                                            let isMyEvent = isUserInEventGroup(selectorsUser.getConnectedUser().events, event.id);
                                            return <EventCard item={event} isMyEvent={isMyEvent} key={index} />
                                        }
                                    ) 
                                :
                                    <Txt>
                                        {t(selectorsApp.getLang()).profile.MEMBER_OF_NO_EVENT}
                                    </Txt>
                            }
                        </View>
                    </View>
                </ScrollView>
            :
                <UserProfileLoader />
            }
        </>
    );
}