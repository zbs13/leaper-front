import React from 'react';
import { View } from 'react-native';
import global from '../../providers/global';
import OptionsModal from '../modals/OptionsModal';
import t from '../../providers/lang/translations';
import useEvents from '../../hooks/useEvents';
import useGroups from '../../hooks/useGroups';
import useApp from '../../hooks/useApp';

/**
 * Header right part with group/event options
 * 
 * @param {object} navigation for routing 
 * @param {boolean} isEvent is header right for an event or a group
 * @param {string} geTitle group/event title
 * @param {number} geId group/event id
 * @returns 
 */
export default function HeaderRightGroupEventOptions({navigation, isEvent = false, geTitle, geId}) {

    const { selectors: selectorsApp } = useApp();
    const { selectors: selectorsEvent } = useEvents();
    const { selectors: selectorsGroup } = useGroups();

    let selector = selectorsGroup;
    if(isEvent){
      selector = selectorsEvent;
    }

    let mainOptions = [
        {
          value: t(selectorsApp.getLang()).MUTE,
          icon: "notifications-off-outline",
          action: () => alert("mettre en sourdine")
        },
        {
          value: t(selectorsApp.getLang()).PEOPLE_LIST,
          icon: "people-outline",
          action: () => alert("liste personnes")
        },
        {
          value: t(selectorsApp.getLang()).SHARED_CONTENT,
          icon: "images-outline",
          action: () => navigation.navigate(global.screens.SHARED_CONTENT, {id: geId, isEvent: isEvent})
        },
        {
          value: isEvent ? t(selectorsApp.getLang()).event.LEAVE_THIS_EVENT : t(selectorsApp.getLang()).group.LEAVE_THIS_GROUP,
          icon: "log-out-outline",
          iconColor: global.colors.WHITE,
          style: {
            backgroundColor: global.colors.RED_ERROR,
            color: global.colors.WHITE
          },
          confirm: {
            title: isEvent ? t(selectorsApp.getLang()).event.LEAVE_EVENT : t(selectorsApp.getLang()).event.LEAVE_GROUP,
            content: `${isEvent ? t(selectorsApp.getLang()).event.SURE_TO_LEAVE_EVENT : t(selectorsApp.getLang()).group.SURE_TO_LEAVE_GROUP} ${geTitle}`
          },
          action: () => alert("Quitter")
        },
    ];
  
    /**
     * if connected user got "add user" right
     */
    if(selector.hasRight(global.rights.ADD_USER)){
        mainOptions.splice(1, 0, {
            value: isEvent ? t(selectorsApp.getLang()).event.ADD_TO_EVENT : t(selectorsApp.getLang()).group.ADD_TO_GROUP,
            icon: "person-add-outline",
            action: () => alert("ajouter a la conv")
        })
    }

    /**
     * if connected user got "edit infos" right
     */
    if(selector.hasRight(global.rights.EDIT_INFOS)){
        mainOptions.splice(1, 0, {
            value: t(selectorsApp.getLang()).EDIT_INFOS,
            icon: "create-outline",
            action: () => alert("modifier infos")
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
