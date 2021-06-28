import React from 'react';
import { View } from 'react-native';
import global from '../../providers/global';
import OptionsModal from '../modals/OptionsModal';
import t from '../../providers/lang/translations';
import useEvents from '../../hooks/useEvents';
import useGroups from '../../hooks/useGroups';
import useApp from '../../hooks/useApp';
import { useNavigation } from '@react-navigation/native';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * Header right part with group/event options
 * 
 * @param {boolean} isEvent is header right for an event or a group
 * @param {string} geTitle group/event title
 * @param {number} geId group/event id
 * @returns 
 */
export default function HeaderRightGroupEventOptions({isEvent = false, geTitle, geId}) {

    const { selectors: selectorsApp, actions: actionsApp } = useApp();
    const { selectors: selectorsEvent, actions: actionsEvent } = useEvents();
    const { selectors: selectorsGroup, actions: actionsGroup } = useGroups();
    const navigation = useNavigation();

    let selector = selectorsGroup;
    let action = actionsGroup;
    if(isEvent){
      selector = selectorsEvent;
      action = actionsEvent;
    }

    let mainOptions = [
        // {
        //   value: t(selectorsApp.getLang()).MUTE,
        //   icon: "notifications-off-outline",
        //   action: () => alert("mettre en sourdine")
        // },
        {
          value: t(selectorsApp.getLang()).PEOPLE_LIST,
          icon: "people-outline",
          action: () => navigation.navigate(global.screens.PEOPLE_LIST, {isEvent: isEvent, id: geId})
        },
        {
          value: t(selectorsApp.getLang()).SHARED_CONTENT,
          icon: "images-outline",
          action: () => navigation.navigate(global.screens.SHARED_CONTENT, {id: geId, isEvent: isEvent})
        },
        {
          value: isEvent ? selector.isOwner() ? t(selectorsApp.getLang()).event.DELETE_THIS_EVENT : t(selectorsApp.getLang()).event.LEAVE_THIS_EVENT : selector.isOwner() ? t(selectorsApp.getLang()).group.DELETE_THIS_GROUP : t(selectorsApp.getLang()).group.LEAVE_THIS_GROUP,
          icon: selector.isOwner() ? "close-outline" : "log-out-outline",
          iconColor: global.colors.WHITE,
          style: {
            backgroundColor: global.colors.RED_ERROR,
            color: global.colors.WHITE
          },
          confirm: {
            title: isEvent ? selector.isOwner() ? t(selectorsApp.getLang()).event.DELETE_EVENT : t(selectorsApp.getLang()).event.LEAVE_EVENT : selector.isOwner() ? t(selectorsApp.getLang()).event.DELETE_GROUP : t(selectorsApp.getLang()).group.LEAVE_GROUP,
            content: `${isEvent ? selector.isOwner() ? t(selectorsApp.getLang()).event.SURE_TO_DELETE_EVENT : t(selectorsApp.getLang()).event.SURE_TO_LEAVE_EVENT : selector.isOwner() ? t(selectorsApp.getLang()).group.SURE_TO_DELETE_GROUP : t(selectorsApp.getLang()).group.SURE_TO_LEAVE_GROUP} ${geTitle}`
          },
          action: selector.isOwner() ? 
              () => action.deleteById(geId).then((data) => {
                manageResponseUI(data,
                    selectorsApp.getLang(),
                    function (res) {
                        navigation.navigate(isEvent ? global.screens.MY_EVENTS : global.screens.MY_GROUPS);
                    },
                    function (error) {
                        actionsApp.addPopupStatus(error);
                    })
                }) 
            : 
              () => alert("Quitter")
        },
    ];
  
    /**
     * if connected user got "add user" right
     */
    if(selector.hasRight(global.rights.ADD_USER)){
        mainOptions.splice(1, 0, {
            value: isEvent ? t(selectorsApp.getLang()).event.ADD_TO_EVENT : t(selectorsApp.getLang()).group.ADD_TO_GROUP,
            icon: "person-add-outline",
            action: () => navigation.navigate(global.screens.ADD_PERSON, {asFriend: false, isEvent: isEvent, geId: geId})
        })
    }

    /**
     * if connected user got "edit infos" right
     */
    if(selector.hasRight(global.rights.EDIT_INFOS)){
        mainOptions.splice(1, 0, {
            value: t(selectorsApp.getLang()).EDIT_INFOS,
            icon: "create-outline",
            action: () => navigation.navigate(global.screens.EDIT_GROUP_EVENT, {id: geId, isEvent: isEvent, infos: selector.getFetchedById()})
        })
    }

    /**
     * if user is owner of group so access to roles screen
     */
    if(selector.isOwner()){
      mainOptions.splice(1, 0, {
          value: t(selectorsApp.getLang()).ROLES,
          icon: "lock-closed-outline",
          action: () => navigation.navigate(global.screens.MANAGE_ROLE, {id: geId, isEvent: isEvent})
      })
  }

    return (
    <View>
        <OptionsModal 
            title={t(selectorsApp.getLang()).PARAMETERS}
            icon="ellipsis-horizontal-outline"
            buttonColor={global.colors.MAIN_COLOR}
            options={mainOptions}
        />
    </View>
    )
}
