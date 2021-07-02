import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { card, cta } from '../../assets/styles/styles';
import ImageIcon from '../icons/ImageIcon';
import globalStyles from '../../assets/styles/global';
import { ellipsisText, geLastMessage } from '../../utils/utils';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import useGroups from '../../hooks/useGroups';
import useFirebase from '../../hooks/useFirebase';
import t from '../../providers/lang/translations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionsModal from '../modals/OptionsModal';
import ListUsersIconCards from '../icons/ListUsersIconCards';
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * group card
 * 
 * @param {object} item group object => id, name, owner, description, src, users 
 * @param {boolean} isMyGroup true if user is in group else false
 * @param {object|null} navigation only used in global search to access to navigation
 * @param {function|null} onPress only used in global search to close search modal while pressing cta 
 * @param {boolean} inWaiting is add request sended 
 * @returns 
 */
export default function GroupCard({ 
    item, 
    isMyGroup = false, 
    navigation = null, 
    onPress = null,
    inWaiting = false
}) {
    
    const {actions, selectors} = useApp();
    const {selectors: selectorsUser} = useUsers();
    const {actions: firebase} = useFirebase();
    const {actions: actionsGroup} = useGroups();

    if(navigation === null){
        navigation = useNavigation();
    }

    const [groupLogo, setGroupLogo] = useState(null);
    const [groupRequestWaiting, setGroupRequestWaiting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            firebase.getGELogo(item.id).then(function(url){
                setGroupLogo(url);
            })
        }
        return () => { isMounted = false };
    }, [])

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            setGroupRequestWaiting(inWaiting);
        }
        return () => { isMounted = false };
    }, [item])

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
        action: () => actionsGroup.removeUser(selectorsUser.getConnectedUser().id, item.id).then((data) => {
            manageResponseUI(data,
                selectors.getLang(),
                function (res) {
                    actionsGroup.updateNeedReload(true);
                },
                function (error) {
                    actions.addPopupStatus(error);
                })
            })
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
                isActive={isMyGroup && selectorsUser.getConnectedUser().id !== item.owner.id }
                {...options}
            >
                <Cta
                    onPress={() => {
                        if(isMyGroup){
                            navigation.navigate(global.screens.TCHAT, {title: item.name, id: item.id, isEvent: false});
                            onPress !== null ? onPress() : null;
                        }
                    }}
                    _style={card.cardContainer}
                    underlayColor={global.colors.WHITE}
                    swipeableRightOptions={selectorsUser.getConnectedUser().id !== item.owner.id ? swipeableOptions : null}
                >
                    <View
                        style={[card.cardContainer, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}
                    >
                        <View style={{flex: 1}}>
                            <ImageIcon _style={card.pic} src={groupLogo || require("../../assets/img/logos/Mini_Leaper_Logo.png")} />
                        </View>
                        <View style={[globalStyles.flexColumn, globalStyles.h_100, globalStyles.flexAround, globalStyles.p_5, {flex: 3}]}>
                            <Txt ellipsis={50} _style={[globalStyles.f_bold, globalStyles.c_anth, globalStyles.ta_j]}>{item.name}</Txt>
                            <Txt ellipsis={80} _style={[globalStyles.c_anth, globalStyles.ta_j]}>
                                {
                                    isMyGroup 
                                    ? selectors.getGELastMessages()[item.id] !== undefined 
                                    ? selectors.getGELastMessages()[item.id].length !== 0 
                                    ? geLastMessage(selectors.getGELastMessages()[item.id], selectors.getLang()) 
                                    : item.description 
                                    : item.description 
                                    : item.description
                                }
                            </Txt>
                            <ListUsersIconCards users={item.users} />
                        </View>
                        <View style={[globalStyles.m_10]}>
                            {
                                selectorsUser.getConnectedUser().id !== item.owner.id ?
                                    isMyGroup ?
                                        <View>
                                            <OptionsModal buttonSize={25} 
                                                {...options}
                                            />
                                        </View>
                                    :
                                        groupRequestWaiting ?
                                            <Cta
                                                _style={[cta.main, cta.second]}
                                                disabled
                                            >
                                                <View style={globalStyles.alignCenter}>
                                                    <Ionicons name="mail-outline" color={global.colors.ANTHRACITE} size={30} />
                                                </View>
                                            </Cta>
                                        :
                                            <Cta
                                                onPress={() => {
                                                    firebase.sendNotif(global.notifications.ASK_GROUP, item.id, {
                                                        id: selectorsUser.getConnectedUser().id,
                                                        firstname: selectorsUser.getConnectedUser().firstname,
                                                        lastname: selectorsUser.getConnectedUser().lastname
                                                    }, item.id);
                                                    setGroupRequestWaiting(true);
                                                }}
                                                _style={[cta.main, cta.first]}
                                                confirm={{
                                                    title: item.name,
                                                    content: t(selectors.getLang()).group.CONFIRM_JOIN_GROUP
                                                }}
                                            >
                                                <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
                                            </Cta>
                                :
                                    null
                            }
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}