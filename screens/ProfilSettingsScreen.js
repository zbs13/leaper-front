import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import global from '../providers/global';
import { settings, cta } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
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
    sportId = 1,
    dateValue = "",
}) {

    const  {selectors} = useApp();

    const [geValues, setGeValues] = useState({
        sportId: sportId,
        date: dateValue
    });

    return (
      <View>
        <ScrollView style={[globalStyles.m_5, globalStyles.mb_20]}>
            <Field
                label={t(selectors.getLang()).profilSettings.MY_INFORMATIONS}
                type="lastname"
                placeholder={t(selectors.getLang()).profilSettings.PH_LASTNAME}
            />
            <Field
                type="firstname"
                placeholder={t(selectors.getLang()).profilSettings.PH_FIRSTNAME}
            />
            <Field
                type="mail"
                placeholder={t(selectors.getLang()).profilSettings.PH_MAIL}
            />
            <Field 
            type="phone" 
            label="phone"
            isError={(error) => console.log(error)}
            onChangePhone={(number, country) => {
                console.log("PHHHHOOOONE", number);
                console.log("COOOUNTRY", country);
            }}
            />
            <Field 
                type="select"
                label={t(selectors.getLang()).SPORT}
                labelIcon="basketball-outline"
                keyExtractor={(item) => item.id.toString()}
                defaultSelectValue={(item) => item.id == sportId}
                items={global.listSports(selectors.getLang())}
                onChangeSelect={(item) => setGeValues({...geValues, sportId: item.id})}
                renderItem={(item) => 
                    <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                        <Ionicons name={item.icon} />
                        <Txt>{item.name}</Txt>
                    </View>
            }
            />
            <Cta
                _style= {[cta.first, cta.main, settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).profilSettings.CTA_UPDATE}
                onPress={() => {}}
            ></Cta>
            <Field
                type="date"
                label={t(selectors.getLang()).profilSettings.BIRTH}
                onChangeDateTime={(date) => setGeValues({...geValues, date: date})}
            />
            <Field
                type="password"
                label={t(selectors.getLang()).profilSettings.CHANGE_PASSWORD}
                placeholder={t(selectors.getLang()).profilSettings.PH_OLD_PW}
            />
            <Field
                type="password"
                placeholder={t(selectors.getLang()).profilSettings.PH_NEW_PW}
            />
            <Field
                type="password"
                placeholder={t(selectors.getLang()).profilSettings.PH_COMFIRMATION_PW}
            />
            <Cta
                _style= {[cta.first, cta.main ,settings.buttonStyle, settings.buttonFont]}
                value={t(selectors.getLang()).profilSettings.CTA_UPDATE}
                onPress={() => {}}
            ></Cta>
        </ScrollView>
    </View>
    );
  }