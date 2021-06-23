import React, {useEffect, useState} from 'react';
import { View, Linking, Platform } from 'react-native';
import useApp from '../hooks/useApp';
import globalStyles from '../assets/styles/global';
import { manageResponseUI } from '../context/actions/apiCall';
import { getSportById, isMyFriend } from '../utils/utils';
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

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: t(selectorsApp.getLang()).profile.title(userFirstname)
        });
        fetchProfile();
    }, [])

    /**
     * get user datas
     */
    function fetchProfile(){
        actionsUser.fetchUserById(userId).then((data) => {
            manageResponseUI(data,
                selectorsApp.getLang(),
                function (res) {
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
                                image={{uri: selectorsUser.getUser().src}} 
                                isRound 
                                _style={profile.headerPic}
                            />
                        </View>
                        <View>
                            <Txt _style={profile.headerName}>
                                {`${selectorsUser.getUser().firstname} ${selectorsUser.getUser().lastname}, ${differenceInYears(new Date(), parseISO(selectorsUser.getUser().birthdate))}`}
                            </Txt>
                        </View>
                        <View style={globalStyles.mt_10}>
                            {
                                isMyFriend(selectorsUser.getConnectedUser().id, selectorsUser.getUser().friends) ?
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
                                    <Cta 
                                        onPress={() => console.log("ajouter en ami")}
                                        _style={[cta.main, cta.first]}
                                        value={t(selectorsApp.getLang()).profile.ADD_AS_FRIEND}
                                    />
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
                                    {selectorsUser.getUser().lastname} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.FIRSTNAME}
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {selectorsUser.getUser().firstname} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.BIRTHDATE} 
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {t(selectorsApp.getLang()).datetime.formats.readableDate(selectorsUser.getUser().birthdate)} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.FAVORITE_SPORT} 
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {getSportById(selectorsApp.getLang(), selectorsUser.getUser().fav_sport).name} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.REGISTRATION_DATE} 
                                </Txt>
                                <Txt _style={{flex: 1}}>
                                    {t(selectorsApp.getLang()).datetime.formats.date(selectorsUser.getUser().create_at)} 
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
                                    onPress={() => Linking.openURL(`mailto:${selectorsUser.getUser().email}`)}
                                    _style={{flex: 1}}
                                >
                                    {selectorsUser.getUser().email} 
                                </Txt>
                            </View>
                            <View style={globalStyles.flexRow}>
                                <Txt _style={[{flex: 1}, globalStyles.f_bold]}>
                                    {t(selectorsApp.getLang()).profile.PHONE_NUMBER}  
                                </Txt>
                                <Flag 
                                    id={JSON.parse(selectorsUser.getUser().country).cca2}
                                    size={0.1}
                                />
                                <Txt 
                                    onPress={() => Linking.openURL(`${Platform.OS === "android" ? "tel" : "telprompt"}:${selectorsUser.getUser().phone}`)}
                                    _style={[{flex: 1}, globalStyles.pl_5]}
                                >
                                    {
                                        JSON.parse(selectorsUser.getUser().country).callingCode.length !== 0 ?
                                            formatPhoneNumber(`+${JSON.parse(selectorsUser.getUser().country).callingCode[0]}${selectorsUser.getUser().phone}`)
                                        :
                                            selectorsUser.getUser().phone
                                    } 
                                </Txt>
                            </View>
                        </View>
                        <Title>
                            {t(selectorsApp.getLang()).profile.MEMBER_OF}
                        </Title>
                        <View style={[globalStyles.flexColumn, globalStyles.m_5]}>
                            {
                                selectorsUser.getUser().events.length !== 0 ?
                                    (selectorsUser.getUser().events).map((event, index) =>
                                        <EventCard item={event} key={index} />
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