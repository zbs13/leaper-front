import React, { useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import globalStyles from '../../assets/styles/global';
import useApp from '../../hooks/useApp';
import global from '../../providers/global';
import Cta from '../cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import t from '../../providers/lang/translations';
import { shareFile, saveFileOnPhone } from '../../utils/phoneFunct';
import Clipboard from 'expo-clipboard';

/**
 * display in absolute fullscreen
 * 
 * @param {boolean} isFullscreen true if element nedd to be in fullscreen
 * @param {function} onClose call if modal is closed
 * @param {string} file file uri
 * @param {function} children children component
 * @returns 
 */
export default function FullscreenDisplay({isFullScreen = false, onClose, file, children}){

    const {selectors, actions} = useApp();

    return (
        <View>
            {children}
            <Modal
                isVisible={isFullScreen}
                swipeDirection={["up", "down"]}
                onSwipeComplete={() => {
                    onClose();
                }}
            >
                <View style={[globalStyles.w_100, globalStyles.h_100]}>
                    <View style={[globalStyles.pos_a, globalStyles.flexRow, globalStyles.flexAround, globalStyles.w_100, globalStyles.mt_20]}>
                        <Cta onPress={() => Clipboard.setString(file)}>
                            <Ionicons color={global.colors.WHITE} name="copy-outline" size={30} />
                        </Cta>
                        <Cta onPress={() => saveFileOnPhone(file,
                                () => {
                                    actions.addPopupStatus({
                                        type: "error",
                                        message: t(selectors.getLang()).errors.ERROR_DOWNLOAD_FILE
                                    })
                                })}
                            >
                            <Ionicons color={global.colors.WHITE} name="save-outline" size={30} />
                        </Cta>
                        <Cta onPress={() => shareFile(file,
                                () => {
                                    actions.addPopupStatus({
                                        type: "error",
                                        message: t(selectors.getLang()).errors.ERROR_SHARE_FILE
                                    })
                                }
                            )}
                        >
                            <Ionicons color={global.colors.WHITE} name="share-social-outline" size={30} />
                        </Cta>
                    </View>
                    {React.cloneElement(children, {style: [globalStyles.w_100, globalStyles.h_100]})}
                </View>
            </Modal>
        </View>
    )
}