import React, { useState } from 'react';
import { View } from 'react-native';
import useApp from '../../hooks/useApp';
import global from '../../providers/global';
import t from '../../providers/lang/translations';
import FileDisplay from '../display/FileDisplay';
import { saveFileOnPhone, shareFile } from '../../utils/phoneFunct';
import Clipboard from 'expo-clipboard';

/**
 * shared content card => image, video, file
 * 
 * @param {object} content content => type, size, name, uri
 * @param {number} index index number of card (for background color)
 * @returns 
 */
export default function SharedContentCard({content, index}) {

    const [isSharing, setIsSharing] = useState(false);
    const {selectors, actions} = useApp();

    const options = {
        options: [{
            value: t(selectors.getLang()).COPY_ATTACHMENT_LINK,
            icon: "copy-outline",
            action: () => Clipboard.setString(content.downloadUrl)
        },
        {
            value: t(selectors.getLang()).SAVE_ATTACHMENT,
            icon: "save-outline",
            action: () => saveFileOnPhone(content.downloadUrl,
                () => {
                    actions.addPopupStatus({
                        type: "error",
                        message: t(selectors.getLang()).errors.ERROR_DOWNLOAD_FILE
                    })
                }),
        },
        {
            value: t(selectors.getLang()).SHARE_ATTACHMENT,
            icon: "share-social-outline",
            disabled: isSharing,
            action: () => {
                setIsSharing(true);
                shareFile(content.downloadUrl,
                    () => {
                        actions.addPopupStatus({
                            type: "error",
                            message: t(selectors.getLang()).errors.ERROR_SHARE_FILE
                        })
                    },
                    () => setIsSharing(false)
                )
            }
        }]
    }

    return (
        <View style={{backgroundColor: index % 2 == 0 ? global.colors.VERY_LIGHT_GREY : "transparent"}}>
            <FileDisplay file={content} options={options} />
        </View>
    )
}