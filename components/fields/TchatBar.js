import React, { useState } from 'react';
import { TextInput, View, Image, StyleSheet } from 'react-native';
import { tchatBar } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import OptionsModal from '../modals/OptionsModal';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cta from '../cta/Cta';
import { pickDocument, pickMedia } from '../../utils/phoneFunct';
import DialogPopup from '../DialogPopup';
import { Video, AVPlaybackStatus } from 'expo-av';
import BackgroundImage from '../BackgroundImage';
import Txt from '../Txt';

/**
 * tchat bar
 * 
 * @param {function} onSend function called if message sended 
 * @returns 
 */
export default function TchatBar({onSend}){

    const {selectors, actions} = useApp();

    const [tchatState, setTchatState] = useState({
        textValue: "",
        attachment: null
    })

    const [pickImageRestrictionPopup, setPickImageRestrictionPopup] = useState({
        isVisible: false,
        title: "e",
        content: "d"
    })

    return(
        <View style={[globalStyles.alignEnd, globalStyles.w_100, tchatBar.container]}>
            <DialogPopup 
                dialogVisible={pickImageRestrictionPopup.isVisible}
                title={pickImageRestrictionPopup.title}
                content={pickImageRestrictionPopup.content}
                onCancelPress={() => setPickImageRestrictionPopup({...pickImageRestrictionPopup, isVisible: false})}
                onAcceptPress={() => setPickImageRestrictionPopup({...pickImageRestrictionPopup, isVisible: false})}
            />
            {tchatState.attachment !== null && typeof tchatState.attachment.type !== "undefined" ?
                <View style={[globalStyles.w_100, tchatBar.imagePreviewContainer]}>
                    <View style={tchatBar.imagePreviewDelete}>
                        <Cta
                            onPress={() => setTchatState({...tchatState, attachment: null})}
                            _style={{backgroundColor: global.colors.WHITE, borderRadius: 50}}
                        >
                            <Ionicons name="close-outline" size={25} color={global.colors.ANTHRACITE}/>
                        </Cta>
                    </View>
                    {tchatState.attachment.type === "video" ?
                        <Video
                            style={styles.video}
                            source={{
                                uri: tchatState.attachment.uri,
                            }}
                            useNativeControls
                            resizeMode="contain"
                        />
                    :
                        tchatState.attachment.type === "image" ?
                            <Image
                                style={tchatBar.imagePreview}
                                source={{
                                    uri: tchatState.attachment.uri
                                }}
                                resizeMode="contain"
                            />
                        :
                            <View style={[globalStyles.flexRow, globalStyles.alignCenter, globalStyles.p_5]}>
                                <View style={{width: 50}}>
                                    <BackgroundImage
                                        image={require("../../assets/img/icons/file-icon.png")}
                                        resizeMode="contain"
                                    >
                                        <Txt _style={[globalStyles.ta_c, globalStyles.c_anth]}>{tchatState.attachment.type}</Txt>
                                    </BackgroundImage>
                                </View>
                                <View>
                                    <Txt ellipsis={25} _style={globalStyles.c_anth}>{tchatState.attachment.name}</Txt>
                                </View>
                                <View style={globalStyles.separator} />
                                <View>
                                    <Txt ellipsis={25} _style={globalStyles.c_anth}>{tchatState.attachment.size}</Txt>
                                </View>
                            </View>
                    }
                </View>
            :
                null
            }
            <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                <View>
                    <OptionsModal 
                        icon="attach-outline"
                        options={
                            [
                                {
                                    value: "Caméra",
                                    icon: "camera-outline",
                                    action: () => alert("aa")
                                },
                                {
                                    value: "Bibliothèque photos/vidéos",
                                    icon: "images-outline",
                                    action: () => pickMedia(
                                        (res) => setTchatState({...tchatState, attachment: res}),
                                        () => setPickImageRestrictionPopup({...pickImageRestrictionPopup, isVisible: true})
                                    )
                                },
                                {
                                    value: "Document",
                                    icon: "document-outline",
                                    action: () => pickDocument(
                                        (res) => setTchatState({...tchatState, attachment: res}),
                                        () => actions.addPopupStatus({
                                            type: "error",
                                            message: "ta mere la pute rayan"
                                        })
                                    )
                                },
                            ]
                        }
                    />
                </View>
                <View style={{flex: 2}}>
                    <TextInput 
                        multiline
                        onChangeText={(value) => setTchatState({...tchatState, textValue: value})}
                        value={tchatState.textValue}
                        placeholder={t(selectors.getLang()).WRITE_A_MESSAGE}
                        style={tchatBar.input}
                    />
                </View>
                <View style={[globalStyles.m_10, globalStyles.alignCenter, {display: tchatState.textValue !== "" || tchatState.attachment !== null ? "flex" : "none"}]}>
                    <Cta onPress={() => alert("non")}>
                        <Ionicons name="send" color={global.colors.MAIN_COLOR} size={30}/>
                    </Cta>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    },
});