import React from 'react';
import { View } from 'react-native';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { card, bookmarkCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import { isUserInEventGroup } from '../../utils/utils';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionsModal from '../modals/OptionsModal';
import Txt from '../Txt';
import { useNavigation } from '@react-navigation/native';
import t from '../../providers/lang/translations';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * bookmark Cards
 * 
 * @param {object} item bookmark object => id, users, address, name
 * @returns 
 */
export default function BookmarkCard({ item }) {
    
    const {actions, selectors} = useApp();
    const {selectors: selectorsUser, actions: actionsUser} = useUsers();
    const navigation = useNavigation();
    
    const options = {
        style: {
            backgroundColor: global.colors.RED_ERROR,
            color: global.colors.WHITE
        },
        confirm: {
            title: t(selectors.getLang()).bookmarks.DELETE_BOOKMARK,
            content: t(selectors.getLang()).bookmarks.SURE_TO_DELETE_BOOKMARK,
        },
        icon: "close-outline",
        iconColor: global.colors.WHITE,
        action: () => {
            actionsUser.removeBookmark(item.id).then((data) => {
                manageResponseUI(data,
                    selectors.getLang(),
                    function (res) {
                        actions.addPopupStatus({
                            type: "success",
                            message: t(selectors.getLang()).bookmarks.UNBOOKMARK_SUCCESS
                        });
                    },
                    function (error) {
                        actions.addPopupStatus(error);
                    })
                })
        }
    } 

    /**
     * main options for options modal
     */
    const mainOptions = {
        options: [
            {
                value: t(selectors.getLang()).bookmarks.DELETE_BOOKMARK,
                ...options
            } 
        ]
    };

    /**
     * main delete options for swipeable options
     */
    const swipeableOptions = [options];
    const isMyEvent = isUserInEventGroup(item.users, selectorsUser.getConnectedUser().id);

    return (
        <View style={card.view}>
            <OptionsModal
                {...mainOptions}
            >
                <Cta
                    onPress={() => navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {title: item.name, isMyEvent: isMyEvent, id: item.id})}
                    swipeableRightOptions={swipeableOptions}
                >
                    <View style={[globalStyles.flexColumn, bookmarkCard.view]}>
                        <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                            <Ionicons name="caret-forward-outline" color={global.colors.MAIN_COLOR} size={20} />
                            <Txt>
                                {item.name}
                            </Txt>
                        </View>
                        <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                            <Ionicons name="location-outline" color={global.colors.MAIN_COLOR} size={20} />
                            <Txt>
                                {item.address}
                            </Txt>
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        </View>
    );
}