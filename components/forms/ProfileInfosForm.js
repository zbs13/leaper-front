import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import global from '../../providers/global';
import { cta } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import useApp from '../../hooks/useApp';
import useUsers from '../../hooks/useUsers';
import t from '../../providers/lang/translations';
import Txt from '../Txt';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Field from '../fields/Field';
import Cta from '../cta/Cta';
import { useNavigation } from '@react-navigation/native';
import Title from '../Title';
import OptionsModal from '../modals/OptionsModal';
import { pickImage } from '../../utils/phoneFunct';
import DialogPopup from '../DialogPopup';
import BackgroundImage from '../BackgroundImage';
import { manageResponseUI } from '../../context/actions/apiCall';
import { format, parseISO } from 'date-fns';
import useFirebase from '../../hooks/useFirebase';
import { sortListSport } from '../../utils/utils';
import Cam from '../Cam';

/**
 * profile infos form
 * 
 * @param {boolean} isEdit true if edit profile and false if registration
 * @returns 
 */
export default function ProfileInfosForm({isEdit = false}) {

    const {actions: actionsApp, selectors} = useApp();
    const {actions: actionsUsers, selectors: selectorsUsers} = useUsers();
    const {actions: firebase} = useFirebase();
    const navigation = useNavigation();
    
    const [getValues, setValues] = useState({
        profilePic: isEdit ? selectorsUsers.getConnectedUserProfilePic() : null,
        birthdate: isEdit ? selectorsUsers.getConnectedUser().birthdate : null,
        lastname: isEdit ? selectorsUsers.getConnectedUser().lastname : null,
        firstname: isEdit ? selectorsUsers.getConnectedUser().firstname : null,
        email: isEdit ? selectorsUsers.getConnectedUser().email : null,
        phone: isEdit ? selectorsUsers.getConnectedUser().phone : null, 
        country: isEdit ? selectorsUsers.getConnectedUser().country : null, 
        fav_sport: isEdit ? selectorsUsers.getConnectedUser().fav_sport : 1,
        oldPassword: null,
        password: null,
        confirmPassword: null
    });

    const [fieldErrors, setFieldErrors] = useState({
        lastnameError: isEdit ? false : true,
        firstnameError: isEdit ? false : true,
        mailError: isEdit ? false : true,
        phoneError: isEdit ? false : true,
        dateError: isEdit ? false : true,
        oldPasswordError: true,
        newPasswordError: true,
        confirmPasswordError: false
    });

    const [pickImageRestrictionPopup, setPickImageRestrictionPopup] = useState({
        isVisible: false,
        title: t(selectors.getLang()).NO_ACCESS_GRANTED,
        content: t(selectors.getLang()).PHONE_ACCESS_NOT_GRANTED_TO_MEDIA
    })

    const [displayCamera, setDisplayCamera] = useState(false);

    useEffect(() => {
        if(isEdit){
            navigation.setOptions({
                headerTitle: t(selectors.getLang()).profilSettings.PROFILE
            });
        }
    }, [])

    function manageDisplayCamera(display){
        setDisplayCamera(display);
    }

    return (
            <View>
                <ScrollView style={[globalStyles.m_5, globalStyles.mb_20]}>
                    {
                        !isEdit &&
                            <Title>
                                {t(selectors.getLang()).registration.REGISTRATION}
                            </Title>
                    }
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
                                            (res) => setValues({...getValues, profilePic: res.uri}),
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
                                    <BackgroundImage isRound image={getValues.profilePic !== null ? {uri: getValues.profilePic} : require('../../assets/img/icons/default_profile_pic.png')} />
                                </View>
                            </Cta>
                        </OptionsModal>
                    </View>
                    <Field
                        label={t(selectors.getLang()).profilSettings.MY_INFORMATIONS}
                        type="lastname"
                        defaultValue={getValues.lastname}
                        placeholder={t(selectors.getLang()).profilSettings.PH_LASTNAME}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, lastnameError: true}) : setFieldErrors({...fieldErrors, lastnameError: false})}
                        onChange={(value) => setValues({
                            ...getValues,
                            lastname: value
                        })}
                    />
                    <Field
                        type="firstname"
                        defaultValue={getValues.firstname}
                        placeholder={t(selectors.getLang()).profilSettings.PH_FIRSTNAME}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, firstnameError: true}) : setFieldErrors({...fieldErrors, firstnameError: false})}
                        onChange={(value) => setValues({
                            ...getValues,
                            firstname: value
                        })}
                    />
                    <Field
                        type="mail"
                        defaultValue={getValues.email}
                        placeholder={t(selectors.getLang()).profilSettings.PH_MAIL}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, mailError: true}) : setFieldErrors({...fieldErrors, mailError: false})}
                        onChange={(value) => setValues({
                            ...getValues,
                            email: value
                        })}
                    />
                    <Field 
                        type="phone" 
                        label={t(selectors.getLang()).fields.PHONE_NUMBER}
                        defaultValue={getValues.phone}
                        defaultCountry={getValues.defaultCountry}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, phoneError: true}) : setFieldErrors({...fieldErrors, phoneError: false})}
                        onChangePhone={(number, country) => {
                            setValues({
                            ...getValues,
                                phone: number,
                                country: country
                            })
                        }}
                    />
                    <Field 
                        type="select"
                        label={t(selectors.getLang()).SPORT}
                        labelIcon="basketball-outline"
                        keyExtractor={(item) => item.id.toString()}
                        defaultSelectValue={(item) => item.id == getValues.fav_sport}
                        items={global.listSports(selectors.getLang()).sort(sortListSport)}
                        onChangeSelect={(item) => setValues({...getValues, fav_sport: item.id})}
                        renderItem={(item) => 
                            <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                                <Ionicons name={item.icon} />
                                <Txt _style={globalStyles.p_5}>{item.name}</Txt>
                            </View>
                    }
                    />

                    <Field
                        type="date"
                        datetime={getValues.birthdate}
                        lessThan={new Date()}
                        label={t(selectors.getLang()).profilSettings.BIRTH}
                        onChangeDateTime={(date) => setValues({...getValues, birthdate: format(parseISO(date), "yyyy-MM-dd")})}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, dateError: true}) : setFieldErrors({...fieldErrors, dateError: false})}
                    />
                    {
                        isEdit &&
                            <Cta
                                _style= {[cta.first, cta.main, globalStyles.mt_10, globalStyles.mb_10]}
                                value={t(selectors.getLang()).profilSettings.CTA_UPDATE}
                                onPress={() => {
                                    actionsUsers.editProfile(getValues).then((data) => {
                                        manageResponseUI(data,
                                            selectors.getLang(),
                                            function (res) {
                                                if(getValues.profilePic !== null && getValues.profilePic !== "" && getValues.profilePic !== undefined){
                                                    firebase.putUserProfilePic(res.id, getValues.profilePic, function(){
                                                        firebase.getUserProfilePic(res.id).then(function(url){
                                                            actionsUsers.updateConnectedUserProfilePic(url);
                                                        })
                                                    });
                                                }
                                                actionsApp.addPopupStatus({
                                                    type: "success",
                                                    message: t(selectors.getLang()).success.EDIT_PROFILE_SUCCESS
                                                });
                                            },
                                            function (error) {
                                                actionsApp.addPopupStatus(error);
                                            })
                                    })
                                }}
                                disabled={fieldErrors.lastnameError || fieldErrors.firstnameError || fieldErrors.mailError || fieldErrors.dateError || fieldErrors.phoneError}
                            ></Cta>
                    }
                    {
                        isEdit &&
                            <Field
                                type="password"
                                label={t(selectors.getLang()).profilSettings.CHANGE_PASSWORD}
                                placeholder={t(selectors.getLang()).profilSettings.PH_OLD_PW}
                                isError={(error) => error ? setFieldErrors({...fieldErrors, oldPasswordError: true}) : setFieldErrors({...fieldErrors, oldPasswordError: false})}
                                onChange={(password) => setValues({...getValues, oldPassword: password})}
                            />
                    }
                    <Field
                        type="password"
                        label={!isEdit ? t(selectors.getLang()).registration.PASSWORD : null}
                        placeholder={isEdit ? t(selectors.getLang()).profilSettings.PH_NEW_PW : t(selectors.getLang()).registration.PASSWORD}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, newPasswordError: true}) : setFieldErrors({...fieldErrors, newPasswordError: false})}
                        onChange={(password) => setValues({...getValues, password: password})}
                    />
                    <Field
                        type="confirm-password"
                        placeholder={isEdit ? t(selectors.getLang()).profilSettings.PH_COMFIRMATION_PW : t(selectors.getLang()).registration.CONFIRM_PASSWORD}
                        checkWithPassword={getValues.password}
                        isError={(error) => error ? setFieldErrors({...fieldErrors, confirmPasswordError: true}) : setFieldErrors({...fieldErrors, confirmPasswordError: false})}
                        onChange={(password) => setValues({...getValues, confirmPassword: password})}
                    />
                    <Cta
                        _style= {[cta.first, cta.main, globalStyles.mt_10, globalStyles.mb_10]}
                        value={isEdit ? t(selectors.getLang()).profilSettings.CTA_UPDATE : t(selectors.getLang()).registration.SIGN_UP}
                        onPress={() => {
                            let func = "signup"
                            if(isEdit){
                                func = "updateUserPassword"
                            }
                            actionsUsers[func](isEdit ? {oldPassword: getValues.oldPassword, newPassword: getValues.password} : getValues).then((data) => {
                                manageResponseUI(data,
                                    selectors.getLang(),
                                    function (res) {
                                        if(!isEdit){
                                            if(getValues.profilePic !== null){
                                                firebase.putUserProfilePic(res.user.id, getValues.profilePic);
                                            }
                                        }
                                        if(isEdit){
                                            if(!res.isUpdated){
                                                actionsApp.addPopupStatus({
                                                    type: "error",
                                                    message: t(selectors.getLang()).errors.ERROR_EDIT_PASSWORD
                                                });
                                                return;
                                            }
                                        }
                                        actionsApp.addPopupStatus({
                                            type: "success",
                                            message: isEdit ? t(selectors.getLang()).success.EDIT_PASSWORD_SUCCESS : t(selectors.getLang()).success.SIGNUP_SUCCESS
                                        });
                                        if(!isEdit){
                                            navigation.navigate(global.screens.LOGIN);
                                        }else{
                                            actionsUsers.logout();
                                        }
                                    },
                                    function (error) {
                                        actionsApp.addPopupStatus(error);
                                    })
                            })
                        }}
                        disabled={isEdit ? fieldErrors.oldPasswordError || fieldErrors.newPasswordError || fieldErrors.confirmPasswordError || !(getValues.confirmPassword === getValues.password) : fieldErrors.lastnameError || fieldErrors.firstnameError || fieldErrors.mailError ||  fieldErrors.dateError || fieldErrors.newPasswordError || !(getValues.confirmPassword === getValues.password)}
                    ></Cta>
                </ScrollView>
                <Cam 
                    isVisible={displayCamera}
                    onTakePicture={(picture) => setValues({...getValues, profilePic: picture.uri})} 
                    onClose={() => {manageDisplayCamera(false)}} 
                />
            </View>
    );
  }