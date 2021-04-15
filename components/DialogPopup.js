import React from 'react';
import Dialog from "react-native-dialog";
import t from '../providers/lang/translations';
import global from '../providers/global';
import useApp from '../hooks/useApp';

/**
 * dialog popup => choices = ok or cancel
 * 
 * @param {string|null} title dialog title
 * @param {content} content dialog content
 * @param {boolean} dialogVisible true if dialog is visible
 * @param {function} onCancelPress function to call if dialog cancelled
 * @param {function} onAcceptPress function to call if dialog accepted
 * @returns 
 */
export default function DialogPopup({
    title = null,
    content,
    dialogVisible,
    onCancelPress,
    onAcceptPress
}) {

    const {selectors} = useApp();

    return (
        <Dialog.Container visible={dialogVisible}>
            {title !== null ?
                <Dialog.Title>
                    {title}
                </Dialog.Title>
            :
                null
            }
            <Dialog.Description>
                {content}
            </Dialog.Description>
            <Dialog.Button color={global.colors.MAIN_COLOR} label={t(selectors.getLang()).CANCEL} onPress={() => onCancelPress()}/>
            <Dialog.Button color={global.colors.MAIN_COLOR} label={t(selectors.getLang()).OK} onPress={() => onAcceptPress()}/>
        </Dialog.Container>
    );
}
