import React from 'react';
import { View } from 'react-native';
import { messageCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';
import BackgroundImage from '../BackgroundImage';
import FileDisplay from '../FileDisplay';
import OptionsModal from '../modals/OptionsModal';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import useEvents from '../../hooks/useEvents';
import useGroups from '../../hooks/useGroups';

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

    const {selectors: selectorsApp} = useApp();
    const { selectors: selectorsEvent } = useEvents();
    const { selectors: selectorsGroup } = useGroups();

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
                    <FileDisplay file={message.attachment} />
                :
                    null
                }
                <Txt _style={globalStyles.ta_j}>{message.content}</Txt>
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
                    value: t(selectorsApp.getLang()).COPY_TEXT,
                    icon: "copy-outline",
                    action: () => alert("message copié")
                },
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
                                <Txt _style={[messageCard.date, isMyMessage ? globalStyles.ta_r : {}]}>{message.date}</Txt>
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