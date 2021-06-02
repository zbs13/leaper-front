import React, { useState } from 'react';
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
import t from '../../providers/lang/translations';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import useEvents from '../../hooks/useEvents';
import useGroups from '../../hooks/useGroups';
import { messageDateFormat } from '../../utils/utils';
import ContentDisplay from '../display/ContentDisplay';
import { saveFileOnPhone, shareFile } from '../../utils/phoneFunct';
import { useNavigation } from '@react-navigation/native';

/**
 * message card
 * 
 * @param {object} message message => id, attachment, content, date, sentBy
 * @param {boolean} isEvent is an event message
 * @returns 
 */
export default function MessageCard({ message, isEvent}) {

    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const { selectors: selectorsEvent } = useEvents();
    const { selectors: selectorsGroup } = useGroups();
    const { selectors: selectorsUser } = useUsers();
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
                        <BackgroundImage _style={messageCard.profilePic} image={{uri: message.sentBy.profilePic}}/>
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
                {typeof message.attachment === "object" && Object.entries(message.attachment).length !== 0 ?
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
                    value: t(selectorsApp.getLang()).message.PIN_MESSAGE,
                    icon: "pricetag-outline",
                    action: () => alert("message epinglé")
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
                action: () => alert("ajouter a la conv")
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
         if(message.attachment.type !== undefined && message.attachment !== null){
            options.options.splice(1, 0, ...[{
                value: t(selectorsApp.getLang()).COPY_ATTACHMENT_LINK,
                icon: "copy-outline",
                action: () => Clipboard.setString(message.attachment.uri)
            },
            {
                value: t(selectorsApp.getLang()).SAVE_ATTACHMENT,
                icon: "save-outline",
                action: () => saveFileOnPhone(message.attachment.uri,
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
                    shareFile(message.attachment.uri,
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
                                <Txt _style={[messageCard.date, isMyMessage ? globalStyles.ta_r : {}]}>{messageDateFormat(message.date, selectorsApp.getLang())}</Txt>
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