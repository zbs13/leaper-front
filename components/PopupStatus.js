import React from 'react';
import { View, Text } from 'react-native';
import useApp from "./../hooks/useApp";
import { popup } from './../assets/styles/styles';
import globalStyles from './../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import t from "../providers/lang/translations";
import Cta from './cta/Cta';

/**
 * Popup status
 * 
 * @returns 
 */
export default function PopupStatus() {

    const {selectors, actions} = useApp();

    const popupStatus = selectors.getPopupsStatus();

    /**
     * popup to display according to popup type
     * @returns
     */
    let popupsToDisplay = () => {
        let popupJSX = [];
        for(let _popup of popupStatus){
            switch(_popup.type){
                case "success":
                    popupJSX.push(
                        <View key={_popup.id} style={[popup.success, globalStyles.p_5, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}>
                            <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                <Ionicons style={[popup.icon, popup.icon_success]} name="checkmark-circle-outline" />
                                <Text style={popup.success_text}>{_popup.message}</Text>
                            </View>
                            <View>
                                <Cta onPress={() => actions.removePopupStatus(_popup.id)}
                                    value={<Ionicons style={[popup.icon, popup.icon_success]} name="close-outline" />}
                                />
                            </View>
                        </View>
                    );
                    break;
                case "error":
                    popupJSX.push(
                        <View key={_popup.id} style={[popup.error, globalStyles.p_5, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween]}>
                            <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                <Ionicons style={[popup.icon, popup.icon_error]} name="bug-outline" />
                                <Text style={popup.error_text}>{_popup.message || t(selectors.getLang()).ERROR_API}</Text>
                            </View>
                            <View>
                                <Cta onPress={() => actions.removePopupStatus(_popup.id)}
                                    value={<Ionicons style={[popup.icon, popup.icon_error]} name="close-outline" />}
                                />
                            </View>
                        </View>
                    );
                    break;
                default:
                    popupJSX.push(
                        <></>
                    )
            }
        }

        return popupJSX;
    }

    return (
        <View style={popup.global}>
            {popupsToDisplay()}
        </View>
    );
}