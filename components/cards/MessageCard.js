import React from 'react';
import { View, Text } from 'react-native';
import { messageCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';
import BackgroundImage from '../BackgroundImage';
import FileDisplay from '../FileDisplay';
import OptionsModal from '../modals/OptionsModal';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Cta from '../cta/Cta';

/**
 * message card
 * 
 * @param {object} navigation navigation object for routing
 * @param {object} message message => id, attachment, content, date, sentBy 
 * @returns 
 */
export default function MessageCard({navigation, message}) {

    let myId = 2;

    const {selectors} = useApp();

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
        const options = {
            options: [
                {
                    value: t(selectors.getLang()).COPY_TEXT,
                    icon: "copy-outline",
                    action: () => alert("message copié")
                },
                {
                    value: t(selectors.getLang()).message.DELETE_MESSAGE,
                    icon: "trash-outline",
                    action: () => alert("message supprimé")
                },
                {
                    value: t(selectors.getLang()).message.PIN_MESSAGE,
                    icon: "pricetag-outline",
                    action: () => alert("message epinglé")
                },
            ]
        }

        return(
            <OptionsModal
                {...options}
            >
                <Cta>
                    <View style={[globalStyles.flexColumn, myId === message.sentBy.id ? globalStyles.w_100 : {}, myId === message.sentBy.id ? globalStyles.alignEnd : {}]}>
                        {myId !== message.sentBy.id ?
                            <Txt _style={[globalStyles.p_5, messageCard.firstname]} ellipsis={30}>{message.sentBy.firstname}</Txt>
                        :
                            null
                        }
                        <View style={[messageCard.content, myId === message.sentBy.id ? messageCard.contentMy : messageCard.contentNotMy]}>
                            <Txt _style={[messageCard.date, myId === message.sentBy.id ? globalStyles.ta_r : {}]}>{message.date}</Txt>
                            {displayContent()}
                        </View>
                    </View>
                </Cta>
            </OptionsModal>
        )
    }

    return (
        <View style={[messageCard.container, globalStyles.flexRow]}>
            {myId === message.sentBy.id ?
                contentPart()
            :
                profilePart()
            }
            {myId === message.sentBy.id ?
                null
            :
                contentPart()
            }
        </View>
    );
}