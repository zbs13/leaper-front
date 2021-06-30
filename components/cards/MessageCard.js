import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Clipboard from 'expo-clipboard';
import { messageCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';
import BackgroundImage from '../BackgroundImage';
import FileDisplay from '../display/FileDisplay';
import OptionsModal from '../modals/OptionsModal';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import useFirebase from '../../hooks/useFirebase';
import t from '../../providers/lang/translations';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import useEvents from '../../hooks/useEvents';
import useGroups from '../../hooks/useGroups';
import { messageDateFormat, urlNoParams } from '../../utils/utils';
import ContentDisplay from '../display/ContentDisplay';
import { saveFileOnPhone, shareFile } from '../../utils/phoneFunct';
import { useNavigation } from '@react-navigation/native';

/**
 * message card
 * 
 * @param {string} geId group/event id
 * @param {object} message message => id, attachment, content, date, sentBy
 * @param {boolean} isEvent is an event message
 * @returns 
 */
export default function MessageCard({ geId, message, isEvent}) {

    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const { selectors: selectorsEvent } = useEvents();
    const { selectors: selectorsGroup } = useGroups();
    const { selectors: selectorsUser } = useUsers();
    const { actions: firebase } = useFirebase();
    const navigation = useNavigation();

    const isMyMessage = selectorsUser.getConnectedUser().id === message.sentBy.id

    const [isSharing, setIsSharing] = useState(false);

    let selector = selectorsGroup;
    if(isEvent){
      selector = selectorsEvent;
    }

    /**
     * profile pic part
     * @returns 
     */
    function profilePart(){
        return(
            <View style={[globalStyles.flexColumn, globalStyles.alignCenter]}>
                <Cta onPress={() => navigation.navigate(global.screens.USER_PROFILE, {userId: message.sentBy.id, userFirstname: message.sentBy.firstname})}>
                    <View style={messageCard.profilePicContainer}>
                        <BackgroundImage _style={messageCard.profilePic} image={message.sentBy.profilePic !== null ? {uri: message.sentBy.profilePic} : require("../../assets/img/icons/default_profile_pic.png")}/>
                    </View>
                </Cta>
            </View>
        )
    }

    /**
     * display message content according to its parameters => message text, media or doc
     * 
     * @param {object} options file options 
     * @returns 
     */
    function displayContent(options){
        return(
            <View>
                {message.attachment !== null ?
                    <FileDisplay file={message.attachment} options={options}/>
                :
                    null
                }
                <ContentDisplay content={message.content} />
            </View>
        )
    }

    /**
     * content part => message, medias...
     * @returns 
     */
    function contentPart(){
        let options = {
            options: [
                {
                    value: message.pinned ? t(selectorsApp.getLang()).message.UNPIN_MESSAGE : t(selectorsApp.getLang()).message.PIN_MESSAGE,
                    icon: "pricetag-outline",
                    action: () => {
                        firebase.updatePinnedMessage(geId, message.id, !message.pinned);
                    }
                },
            ]
        }

        /**
         * if connected user got "delete message" right or owner of message
         */
        if(selector.hasRight(global.rights.DELETE_MESSAGE) || isMyMessage){
            options.options.splice(1, 0, {
                value: t(selectorsApp.getLang()).message.DELETE_MESSAGE,
                icon: "trash-outline",
                action: () => firebase.deleteMessage(geId, message, function(){
                    actionsApp.addPopupStatus({
                        type: "error"
                    })
                })
            })
        }

        /**
         * if text not void
         */
         if(message.content !== "" && message.content !== null){
            options.options.splice(1, 0, {
                value: t(selectorsApp.getLang()).COPY_TEXT,
                icon: "copy-outline",
                action: () => Clipboard.setString(message.content)
            })
        }

        /**
         * if attachment not void
         */
         if(message.attachment !== null){
            options.options.splice(1, 0, ...[{
                value: t(selectorsApp.getLang()).COPY_ATTACHMENT_LINK,
                icon: "copy-outline",
                action: () => Clipboard.setString(message.attachment.downloadUrl)
            },
            {
                value: t(selectorsApp.getLang()).SAVE_ATTACHMENT,
                icon: "save-outline",
                action: () => saveFileOnPhone(message.attachment.downloadUrl,
                    () => {
                        actionsApp.addPopupStatus({
                            type: "error",
                            message: t(selectorsApp.getLang()).errors.ERROR_DOWNLOAD_FILE
                        })
                    }),
            },
            {
                value: t(selectorsApp.getLang()).SHARE_ATTACHMENT,
                icon: "share-social-outline",
                disabled: isSharing,
                action: () => {
                    setIsSharing(true);
                    shareFile(message.attachment.downloadUrl,
                        () => {
                            actionsApp.addPopupStatus({
                                type: "error",
                                message: t(selectorsApp.getLang()).errors.ERROR_SHARE_FILE
                            })
                        },
                        () => setIsSharing(false)
                    )
                }
            }])
        }

        return(
            <View style={isMyMessage ? globalStyles.w_100 : {}}>
                <OptionsModal
                    {...options}
                >
                    <Cta>
                        <View style={[globalStyles.flexColumn, isMyMessage ? globalStyles.w_100 : {}, isMyMessage ? globalStyles.alignEnd : {}]}>
                            {!isMyMessage ?
                                <Txt _style={[globalStyles.p_5, messageCard.firstname]} ellipsis={30}>{message.sentBy.firstname}</Txt>
                            :
                                null
                            }
                            <View style={[messageCard.content, isMyMessage ? messageCard.contentMy : messageCard.contentNotMy]}>
                                <Txt _style={[messageCard.date, isMyMessage ? globalStyles.ta_r : {}]}>{messageDateFormat(message.createdAt.toDate(), selectorsApp.getLang())}</Txt>
                                {displayContent(options)}
                            </View>
                        </View>
                    </Cta>
                </OptionsModal>
            </View>
        )
    }

    return (
        <View style={[messageCard.container, globalStyles.flexRow]}>
            {isMyMessage ?
                contentPart()
            :
                profilePart()
            }
            {isMyMessage ?
                null
            :
                contentPart()
            }
        </View>
    );
}