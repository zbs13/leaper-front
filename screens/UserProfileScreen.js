import React, {useEffect, useState} from 'react';
import { View, Keyboard } from 'react-native';
import useApp from '../hooks/useApp';
import TchatBar from '../components/fields/TchatBar';
import globalStyles from '../assets/styles/global';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import { manageResponseUI } from '../context/actions/apiCall';
import MessageCard from '../components/cards/MessageCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderRightGroupEventOptions from '../components/headers/HeaderRightGroupEventOptions';
import TchatLoader from '../components/loaders/TchatLoader';
import Cta from '../components/cta/Cta';
import Txt from '../components/Txt';
import t from '../providers/lang/translations';
import global from '../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUsers from '../hooks/useUsers';

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
            headerTitle: `${userFirstname}'s profile`
        });
        fetchProfile();
    }, [])

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
                <View>
                    <Txt>
                        {selectorsUser.getUser().firstname}
                    </Txt>
                </View>
            :
                null
            }
        </>
    );
}