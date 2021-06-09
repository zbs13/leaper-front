import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import global from '../providers/global';
import { settings, cta } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
import useUsers from '../hooks/useUsers';
import t from '../providers/lang/translations';
import Txt from '../components/Txt';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Field from '../components/fields/Field';
import Cta from '../components/cta/Cta';


/**
 * app settings screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function ProfilSettingsScreen({
    isEdit = false,
}) {

    const  {selectors} = useApp();
    const  {selectors: selectorsUsers} = useUsers();
    
    const [getValues, setValues] = useState({
        date: selectorsUsers.getConnectedUser().birthdate,
        lastname: selectorsUsers.getConnectedUser().lastname,
        firstname: selectorsUsers.getConnectedUser().firstname,
        mail: selectorsUsers.getConnectedUser().email,
        phone: selectorsUsers.getConnectedUser().phone, 
        country: selectorsUsers.getConnectedUser().country, 
        sport: selectorsUsers.getConnectedUser().fav_sport

    });

    const [fieldErrors, setFieldErrors] = useState({
        lastnameError: isEdit ? false : true,
        firstnameError: isEdit ? false : true,
        mailError: isEdit ? false : true,
        phoneError: isEdit ? false : true,
        dateError: isEdit ? false : true,
        oldPasswordError: isEdit ? false : true,
        newPasswordError: isEdit ? false : true,
        confirmPasswordError: isEdit ? false : true

    });



    return (
      <View>
        <ScrollView style={[globalStyles.m_5, globalStyles.mb_20]}>
            <Field
                label={t(selectors.getLang()).profilSettings.MY_INFORMATIONS}
                type="lastname"
                defaultValue={getValues.lastname}
                placeholder={t(selectors.getLang()).profilSettings.PH_LASTNAME}
                isError={(error) => error ? setFieldErrors({...fieldErrors, lastnameError: false}) : setFieldErrors({...fieldErrors, lastnameError: false})}
                onChange={(value) => setValues({
                    ...getValues,
                    lastname: value
                })}
            />
            <Field
                type="firstname"
                defaultValue={getValues.firstname}
                placeholder={t(selectors.getLang()).profilSettings.PH_FIRSTNAME}
                isError={(error) => error ? setFieldErrors({...fieldErrors, firstnameError: false}) : setFieldErrors({...fieldErrors, firstnameError: false})}
                onChange={(value) => setValues({
                    ...getValues,
                    firstname: value
                })}
            />
            <Field
                type="mail"
                defaultValue={getValues.mail}
                placeholder={t(selectors.getLang()).profilSettings.PH_MAIL}
                isError={(error) => error ? setFieldErrors({...fieldErrors, mailError: false}) : setFieldErrors({...fieldErrors, mailError: false})}
                onChange={(value) => setValues({
                    ...getValues,
                    mail: value
                })}
            />
            <Field 
                type="phone" 
                label="phone"
                defaultValue={getValues.phone}
                defaultCountry={getValues.defaultCountry}
                isError={(error) => error ? setFieldErrors({...fieldErrors, phoneError: false}) : setFieldErrors({...fieldErrors, phoneError: false})}
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
                defaultSelectValue={(item) => item.id == getValues.sport}
                items={global.listSports(selectors.getLang())}
                onChangeSelect={(item) => setValues({...getValues, sport: item.id})}
                renderItem={(item) => 
                    <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                         <Ionicons name={item.icon} />
                        <Txt>{item.name}</Txt>
                    </View>
            }
            />

            <Field
                type="date"
                value= {getValues.birthdate}
                label={t(selectors.getLang()).profilSettings.BIRTH}
                onChangeDateTime={(date) => setValues({...getValues, date: date})}
                isError={(error) => error ? setFieldErrors({...fieldErrors, dateError: false}) : setFieldErrors({...fieldErrors, dateError: false})}
            />
            <Cta
                _style= {[cta.first, cta.main, settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).profilSettings.CTA_UPDATE}
                onPress={() => {console.log('oui')}}
                disabled={fieldErrors.lastnameError || fieldErrors.firstnameError || fieldErrors.mailError ||  fieldErrors.dateError}
            ></Cta>

            <Field
                type="password"
                label={t(selectors.getLang()).profilSettings.CHANGE_PASSWORD}
                placeholder={t(selectors.getLang()).profilSettings.PH_OLD_PW}
                isError={(error) => error ? setFieldErrors({...fieldErrors, oldPasswordError: true}) : setFieldErrors({...fieldErrors, oldPasswordError: false})}
            />
            <Field
                type="password"
                placeholder={t(selectors.getLang()).profilSettings.PH_NEW_PW}
                isError={(error) => error ? setFieldErrors({...fieldErrors, newPasswordError: true}) : setFieldErrors({...fieldErrors, newPasswordError: false})}
            />
            <Field
                type="password"
                placeholder={t(selectors.getLang()).profilSettings.PH_COMFIRMATION_PW}
                isError={(error) => error ? setFieldErrors({...fieldErrors, confirmPasswordError: true}) : setFieldErrors({...fieldErrors, confirmPasswordError: false})}
            />
            <Cta
                _style= {[cta.first, cta.main ,settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).profilSettings.CTA_UPDATE}
                onPress={() => {}}
                disabled={fieldErrors.oldPasswordError || fieldErrors.newPasswordError  || fieldErrors.confirmPasswordError }
            ></Cta>
        </ScrollView>
    </View>
    );
  }