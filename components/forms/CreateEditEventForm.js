import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import globalStyles from '../../assets/styles/global';
import { cta } from '../../assets/styles/styles';
import useApp from '../../hooks/useApp';
import useFirebase from '../../hooks/useFirebase';
import t from '../../providers/lang/translations';
import Txt from '../Txt';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Field from '../fields/Field';
import BackgroundImage from '../BackgroundImage';
import Cta from '../cta/Cta';
import OptionsModal from '../modals/OptionsModal';
import { pickImage } from '../../utils/phoneFunct';
import DialogPopup from '../DialogPopup';
import useEvents from '../../hooks/useEvents';
import { manageResponseUI } from '../../context/actions/apiCall';
import { useNavigation } from '@react-navigation/native';
import { addHours } from 'date-fns';
import { sortListSport } from '../../utils/utils';
import Cam from '../Cam';

/**
 * Create/edit event form
 * 
 * @param {boolean} isEdit is an edition of event
 * @param {number|null} eventId id of event to edit
 * @param {string} nameValue event name
 * @param {string} descriptionValue event description
 * @param {number} sportId sport id of event
 * @param {string} dateValue event date
 * @param {string} startHourValue event start hour
 * @param {string} endHourValue event end hour
 * @param {string} addressValue event address
 * @param {object|null} locationValue address location => latitude, longitude
 * @returns 
 */
export default function CreateEditEventForm({
    isEdit = false,
    eventId = null,
    nameValue = "",
    descriptionValue = "",
    sportId = 1,
    dateValue = "",
    startHourValue = "",
    endHourValue = "",
    addressValue = "",
    locationValue = null
}){

    const {selectors, actions: actionsApp} = useApp();
    const {actions: actionsEvent} = useEvents();
    const {actions: firebase} = useFirebase();
    const navigation = useNavigation();

    const [geValues, setGeValues] = useState({
        name: nameValue,
        description: descriptionValue,
        sportId: sportId,
        date: dateValue,
        startHour: startHourValue !== "" ? startHourValue : new Date().toISOString(),
        endHour: endHourValue !== "" ? endHourValue : addHours(new Date(), 1).toISOString(),
        address: addressValue,
        location: locationValue,
        pic: null
    });

    const [fieldErrors, setFieldErrors] = useState({
        nameError: isEdit ? false : true,
        descriptionError: isEdit ? false : true,
        addressError: isEdit ? false : true,
        dateError: isEdit ? false : true,
        startHourError: false,
        endHourError: false
    });

    const [pickImageRestrictionPopup, setPickImageRestrictionPopup] = useState({
        isVisible: false,
        title: t(selectors.getLang()).NO_ACCESS_GRANTED,
        content: t(selectors.getLang()).PHONE_ACCESS_NOT_GRANTED_TO_MEDIA
    })
    const [displayCamera, setDisplayCamera] = useState(false);

    useEffect(() => {
        let isMounted = true;
        if(isMounted && isEdit){
            firebase.getGELogo(eventId).then(function(url){
                setGeValues({
                    ...geValues,
                    pic: url
                })
            });
        }
        return () => {isMounted = false};
    }, [])

    function manageDisplayCamera(display){
        setDisplayCamera(display);
    }

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
                                    action: () => setDisplayCamera(true)
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
                <View style={globalStyles.mb_10}>
                    <Field 
                        type="address"
                        placeholder={t(selectors.getLang()).ADDRESS}
                        defaultValue={addressValue}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, addressError: true}) : setFieldErrors({...fieldErrors, addressError: false})}
                        onChange={(address, location) => setGeValues({...geValues, address: address, location: location})}
                        location={locationValue}
                    />
                </View>
                <View style={globalStyles.mb_10}>
                    <Field 
                        type="select"
                        label={t(selectors.getLang()).SPORT}
                        labelIcon="basketball-outline"
                        keyExtractor={(item) => item.id.toString()}
                        defaultSelectValue={(item) => item.id == sportId}
                        items={global.listSports(selectors.getLang()).sort(sortListSport)}
                        onChangeSelect={(item) => setGeValues({...geValues, sportId: item.id})}
                        renderItem={(item) => 
                            <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                <Ionicons name={item.icon} />
                                <Txt _style={globalStyles.p_5} >{item.name}</Txt>
                            </View>
                        }
                    />
                </View>
                <View style={globalStyles.mb_10}>
                    <Field 
                        type="date"
                        label={t(selectors.getLang()).DATE}
                        greaterThan={new Date()}
                        labelIcon="calendar-outline"
                        isError={(error) => error ? setFieldErrors({...fieldErrors, dateError: true}) : setFieldErrors({...fieldErrors, dateError: false})}
                        datetime={geValues.date}
                        onChangeDateTime={(date) => setGeValues({...geValues, date: date})}
                    />
                </View>
                <View style={globalStyles.flexRow}>
                    <View style={[globalStyles.mb_10, {flex: 1}]}>
                        <Field 
                            type="hour"
                            label={t(selectors.getLang()).START}
                            lessThan={geValues.endHour || new Date()}
                            labelIcon="time-outline"
                            isError={(error) => error ? setFieldErrors({...fieldErrors, startHourError: true}) : setFieldErrors({...fieldErrors, startHourError: false})}
                            datetime={geValues.startHour}
                            onChangeDateTime={(startHour) => setGeValues({...geValues, startHour: startHour})}
                        />
                    </View>
                    <View style={[globalStyles.mb_10, {flex: 1}]}>
                        <Field 
                            type="hour"
                            label={t(selectors.getLang()).END}
                            greaterThan={geValues.startHour || new Date()}
                            labelIcon="time-outline"
                            isError={(error) => error ? setFieldErrors({...fieldErrors, endHourError: true}) : setFieldErrors({...fieldErrors, endHourError: false})}
                            datetime={geValues.endHour}
                            onChangeDateTime={(endHour) => setGeValues({...geValues, endHour: endHour})}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={[{flex: 1, position: "absolute", bottom: 0}, globalStyles.w_100, globalStyles.mb_10]}>
                <Cta 
                    value={isEdit ? t(selectors.getLang()).SAVE_CHANGES : t(selectors.getLang()).event.CONFIRM_CREATE_EVENT} 
                    _style={[cta.main, cta.first]}
                    disabled={fieldErrors.addressError || fieldErrors.dateError || fieldErrors.descriptionError || fieldErrors.endHourError || fieldErrors.nameError || fieldErrors.startHourError}
                    onPress={() => {
                        if(isEdit){
                            actionsEvent.updateById(eventId, geValues).then((data) => {
                                manageResponseUI(data,
                                    selectors.getLang(),
                                    function (res) {
                                        if(geValues.pic !== null){
                                            firebase.putGELogo(res.id, geValues.pic);
                                        }
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
                        actionsEvent.create(geValues).then((data) => {
                            manageResponseUI(data,
                                selectors.getLang(),
                                function (res) {
                                    if(geValues.pic !== null){
                                        firebase.putGELogo(res.id, geValues.pic);
                                    }
                                    actionsApp.addPopupStatus({
                                        type: "success",
                                        message: t(selectors.getLang()).success.CREATE_SUCCESS
                                    });
                                    navigation.goBack();
                                },
                                function (error) {
                                    actionsApp.addPopupStatus(error);
                                })
                        })
                    }}
                />
            </View>
            <Cam 
                isVisible={displayCamera}
                onTakePicture={(picture) => setGeValues({...geValues, pic: picture.uri})} 
                onClose={() => {manageDisplayCamera(false)}} 
            />
        </View>
    )
}