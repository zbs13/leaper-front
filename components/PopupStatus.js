import React from 'react';
import { View, Text } from 'react-native';
import useApp from "./../hooks/useApp";
import { popup } from './../assets/styles/styles';
import globalStyles from './../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import t from "../providers/lang/translations";
import Cta from './cta/Cta';
import Txt from './Txt';

/**
 * Popup status
 * 
 * @returns 
 */
export default function PopupStatus() {

    const {selectors, actions} = useApp();

    const popupStatus = selectors.getPopupsStatus();

    return (
        <View style={popup.global}>
            {popupStatus.map((_popup, idx) => {
                return (
                <View 
                    key={_popup.id} 
                    style={[_popup.type === "error" ? popup.error : _popup.type === "success" ? popup.success : popup.info, globalStyles.p_5, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}>
                    <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                        <Ionicons 
                            style={[popup.icon, _popup.type === "error" ? popup.icon_error : _popup.type === "success" ? popup.icon_success : popup.icon_info]} 
                            name={_popup.type === "error" ? "bug-outline" : _popup.type === "success" ? "checkmark-circle-outline" : "information-circle-outline"} />
                        <Txt 
                            _style={_popup.type === "error" ? popup.error_text : _popup.type === "success" ? popup.success_text : popup.info_text}
                        >
                            {_popup.message || t(selectors.getLang()).ERROR_API}
                        </Txt>
                    </View>
                    <View>
                        <Cta 
                            onPress={() => actions.removePopupStatus(_popup.id)}
                            value={<Ionicons style={[popup.icon, _popup.type === "error" ? popup.icon_error : _popup.type === "success" ? popup.icon_success : popup.icon_info]} 
                            name="close-outline" />}
                        />
                    </View>
                </View>
            )})}
        </View>
    );
}