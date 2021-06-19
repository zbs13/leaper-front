import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import globalStyles from '../../assets/styles/global';
import { cta } from '../../assets/styles/styles';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Field from '../fields/Field';
import BackgroundImage from '../BackgroundImage';
import Cta from '../cta/Cta';
import OptionsModal from '../modals/OptionsModal';
import { pickImage } from '../../utils/phoneFunct';
import DialogPopup from '../DialogPopup';
import useGroups from '../../hooks/useGroups';
import { manageResponseUI } from '../../context/actions/apiCall';

/**
 * Create/edit group form
 * 
 * @param {boolean} isEdit is an edition of event
 * @param {number|null} eventId id of event to edit
 * @param {string} nameValue event name
 * @param {string} descriptionValue event description
 * @param {string|null} picSrc event picture
 * @returns 
 */
export default function CreateEditGroupForm({
    isEdit = false,
    groupId = null,
    nameValue = "",
    descriptionValue = "",
    picSrc = null
}){

    const {selectors, actions: actionsApp} = useApp();
    const {actions: actionsGroup} = useGroups();

    const [geValues, setGeValues] = useState({
        name: nameValue,
        description: descriptionValue,
        pic: picSrc
    });

    const [fieldErrors, setFieldErrors] = useState({
        nameError: isEdit ? false : true,
        descriptionError: isEdit ? false : true
    });

    const [pickImageRestrictionPopup, setPickImageRestrictionPopup] = useState({
        isVisible: false,
        title: t(selectors.getLang()).NO_ACCESS_GRANTED,
        content: t(selectors.getLang()).PHONE_ACCESS_NOT_GRANTED_TO_MEDIA
    })

    return(
        <View style={globalStyles.h_100}>
            <ScrollView style={[globalStyles.m_5, globalStyles.mb_50]}>
                <View>
                    <DialogPopup 
                        dialogVisible={pickImageRestrictionPopup.isVisible}
                        title={pickImageRestrictionPopup.title}
                        content={pickImageRestrictionPopup.content}
                        onCancelPress={() => setPickImageRestrictionPopup({...pickImageRestrictionPopup, isVisible: false})}
                        onAcceptPress={() => setPickImageRestrictionPopup({...pickImageRestrictionPopup, isVisible: false})}
                    />
                    <OptionsModal
                        options={
                            [
                                {
                                    value: t(selectors.getLang()).CAMERA,
                                    icon: "camera-outline",
                                    action: () => alert("aa")
                                },
                                {
                                    value: t(selectors.getLang()).PHOTO_LIBRARY,
                                    icon: "images-outline",
                                    action: () => pickImage(
                                        (res) => setGeValues({...geValues, pic: res.uri}),
                                        () => setPickImageRestrictionPopup({...pickImageRestrictionPopup, isVisible: true})
                                    )
                                }
                            ]
                        }
                        onPress
                    >
                        <Cta 
                            onPress={() => {}} 
                            _style={[globalStyles.justifyCenter, globalStyles.alignCenter]}
                        >
                            <View style={[{width: 150, height: 150}, globalStyles.flex, globalStyles.alignCenter]}>
                                <BackgroundImage isRound image={geValues.pic !== null ? {uri: geValues.pic} : require('../../assets/img/logos/Mini_Leaper_Logo.png')} />
                            </View>
                        </Cta>
                    </OptionsModal>
                </View>
                <View style={globalStyles.mb_10}>
                    <Field 
                        type="text"
                        min={3}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, nameError: true}) : setFieldErrors({...fieldErrors, nameError: false})}
                        label={t(selectors.getLang()).GENERAL}
                        labelIcon="information-circle-outline"
                        defaultValue={nameValue}
                        placeholder={t(selectors.getLang()).NAME}
                        onChange={(value) => setGeValues({
                            ...geValues,
                            name: value
                        })}
                    />
                </View>
                <View style={globalStyles.mb_10}>
                    <Field 
                        type="textarea"
                        defaultValue={descriptionValue}
                        placeholder={t(selectors.getLang()).DESCRIPTION}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, descriptionError: true}) : setFieldErrors({...fieldErrors, descriptionError: false})}
                        onChange={(value) => setGeValues({
                            ...geValues,
                            description: value
                        })}
                    />
                </View>
            </ScrollView>
            <View style={[{flex: 1, position: "absolute", bottom: 0}, globalStyles.w_100, globalStyles.mb_10]}>
                <Cta 
                    value={isEdit ? t(selectors.getLang()).SAVE_CHANGES : t(selectors.getLang()).group.CONFIRM_CREATE_GROUP}
                    _style={[cta.main, cta.first]}
                    disabled={fieldErrors.descriptionError || fieldErrors.nameError}
                    onPress={() => {
                        if(isEdit){
                            actionsGroup.updateById(groupId, geValues).then((data) => {
                                manageResponseUI(data,
                                    selectors.getLang(),
                                    function (res) {
                                        actionsApp.addPopupStatus({
                                            type: "success",
                                            message: t(selectors.getLang()).success.EDIT_SUCCESS
                                        });
                                    },
                                    function (error) {
                                        actionsApp.addPopupStatus(error);
                                    })
                            })
                            return;
                        }
                        actionsGroup.create(geValues).then((data) => {
                            manageResponseUI(data,
                                selectors.getLang(),
                                function (res) {
                                    actionsApp.addPopupStatus({
                                        type: "success",
                                        message: t(selectors.getLang()).success.CREATE_SUCCESS
                                    });
                                },
                                function (error) {
                                    actionsApp.addPopupStatus(error);
                                })
                        })
                    }}
                />
            </View>
        </View>
    )
}