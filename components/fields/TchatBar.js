import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';
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
import FileDisplay from '../display/FileDisplay';

/**
 * tchat bar
 * 
 * @param {function} function called when press camera cta
 * @param {function} onSend function called if message sended 
 * @param {function} onChangeInput function called when text/media value changed
 * @param {object} cameraPicture took picture datas
 * @returns 
 */
export default function TchatBar({toggleCamera, onSend, onChangeInput, cameraPicture = null}){

    const {selectors, actions} = useApp();

    const [tchatState, setTchatState] = useState({
        textValue: "",
        attachment: {}
    })
    const [pickImageRestrictionPopupVisible, setPickImageRestrictionPopupVisible] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if(isMounted){
            if(cameraPicture !== null){
                setTchatState({...tchatState, attachment: cameraPicture})
            }
        }
        return () => {isMounted = false}
    }, [cameraPicture]);

    useEffect(() => {
        onChangeInput();
    }, [tchatState.attachment]);

    return(
        <View style={[globalStyles.alignEnd, globalStyles.w_100, tchatBar.container, globalStyles.flexColumn]}>
            <DialogPopup 
                dialogVisible={pickImageRestrictionPopupVisible}
                title={t(selectors.getLang()).NO_ACCESS_GRANTED}
                content={t(selectors.getLang()).PHONE_ACCESS_NOT_GRANTED_TO_MEDIA}
                onCancelPress={() => setPickImageRestrictionPopupVisible(false)}
                onAcceptPress={() => setPickImageRestrictionPopupVisible(false)}
            />
            {typeof tchatState.attachment.type !== "undefined" ? 
                <View style={[globalStyles.w_100, tchatBar.imagePreviewContainer]}>
                    <View style={tchatBar.imagePreviewDelete}>
                        <Cta
                            onPress={() => setTchatState({...tchatState, attachment: {}})}
                            _style={{backgroundColor: global.colors.WHITE, borderRadius: 50}}
                        >
                            <Ionicons name="close-outline" size={25} color={global.colors.ANTHRACITE}/>
                        </Cta>
                    </View>
                    <FileDisplay file={tchatState.attachment} isPreview={true}/>
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
                                    value: t(selectors.getLang()).CAMERA,
                                    icon: "camera-outline",
                                    action: () => toggleCamera(true)
                                },
                                {
                                    value: t(selectors.getLang()).PHOTO_VIDEO_LIBRARY,
                                    icon: "images-outline",
                                    action: () => pickMedia(
                                        (res) => setTchatState({...tchatState, attachment: res}),
                                        () => setPickImageRestrictionPopupVisible(true)
                                    )
                                },
                                {
                                    value: t(selectors.getLang()).FILE,
                                    icon: "document-outline",
                                    action: () => pickDocument(
                                        (res) => setTchatState({...tchatState, attachment: res}),
                                        () => actions.addPopupStatus({
                                            type: "error",
                                            message: t(selectors.getLang()).errors.ERROR_IMPORTING_FILE
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
                        scrollEnabled
                        onChangeText={(value) => setTchatState({...tchatState, textValue: value})}
                        value={tchatState.textValue}
                        placeholder={t(selectors.getLang()).message.WRITE_A_MESSAGE}
                        style={tchatBar.input}
                        onChange={onChangeInput}
                    />
                </View>
                <View style={[globalStyles.m_10, globalStyles.alignCenter, {display: tchatState.textValue.trim() !== "" || Object.keys(tchatState.attachment).length !== 0 ? "flex" : "none"}]}>
                    <Cta onPress={() => {
                            onSend({
                                textValue: tchatState.textValue.trim() !== "" ? tchatState.textValue : "",
                                attachment: tchatState.attachment
                            });
                            setTchatState({textValue: "", attachment: {}});
                        }}
                    >
                        <Ionicons name="send" color={global.colors.MAIN_COLOR} size={30}/>
                    </Cta>
                </View>
            </View>
        </View>
    )
}