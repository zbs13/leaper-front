import React, {useState} from 'react';
import { View } from 'react-native';
import Clipboard from 'expo-clipboard';
import { messageCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';
import BackgroundImage from '../BackgroundImage';
import FileDisplay from '../display/FileDisplay';
import OptionsModal from '../modals/OptionsModal';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import useEvents from '../../hooks/useEvents';
import useGroups from '../../hooks/useGroups';
import { messageDateFormat } from '../../utils/utils';
import ContentDisplay from '../display/ContentDisplay';
import { saveFileOnPhone } from '../../utils/phoneFunct';

/**
 * message card
 * 
 * @param {object} navigation navigation object for routing
 * @param {object} message message => id, attachment, content, date, sentBy
 * @param {boolean} isEvent is an event message
 * @returns 
 */
export default function MessageCard({navigation, message, isEvent}) {

    /**
     * myId
     */
    let myId = 2;
    /**
     * 
     */
    const isMyMessage = myId === message.sentBy.id

    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const { selectors: selectorsEvent } = useEvents();
    const { selectors: selectorsGroup } = useGroups();

    const [onProgressDl, setOnProgressDl] = useState({
        onProgress: false,
        downloaded: 0,
        expectedToDl: 0
    })

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
                <View style={messageCard.profilePicContainer}>
                    <BackgroundImage _style={messageCard.profilePic} image={{uri: message.sentBy.profilePic}}/>
                </View>
            </View>
        )
    }

    /**
     * display message content according to its parameters => message text, media or doc
     * @returns 
     */
    function displayContent(){
        return(
            <View>
                {typeof message.attachment === "object" && Object.entries(message.attachment).length !== 0 ?
                    <FileDisplay file={message.attachment} dlOnProgress={onProgressDl.onProgress} dlStatus={{downloaded: onProgressDl.downloaded, expectedToDl: onProgressDl.expectedToDl}}/>
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
                action: () => {
                    Clipboard.setString(message.content);
                    actionsApp.addPopupStatus({
                        type: "info",
                        message: t(selectorsApp.getLang()).COPY_TO_CLIPBOARD,
                    });
                }
            })
        }

        /**
         * if attachment not void
         */
         if(message.attachment.type !== undefined && message.attachment !== null){
            options.options.splice(1, 0, {
                value: t(selectorsApp.getLang()).COPY_ATTACHMENT_LINK,
                icon: "copy-outline",
                action: () => {
                    Clipboard.setString(message.attachment.uri);
                    actionsApp.addPopupStatus({
                        type: "info",
                        message: t(selectorsApp.getLang()).COPY_TO_CLIPBOARD,
                    });
                }
            })
            options.options.splice(1, 0, {
                value: t(selectorsApp.getLang()).SAVE_ATTACHMENT,
                icon: "save-outline",
                action: () => saveFileOnPhone(message.attachment.uri, 
                    ({totalBytesWritten, totalBytesExpectedToWrite }) => {
                        if(totalBytesWritten !== totalBytesExpectedToWrite){
                            setOnProgressDl({
                                onProgress: true,
                                downloaded: totalBytesWritten,
                                expectedToDl: totalBytesExpectedToWrite
                            })
                        }else{
                            setOnProgressDl({
                                onProgress: false,
                                downloaded: 0,
                                expectedToDl: 0
                            })
                        }
                    })
            })
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
                                {displayContent()}
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