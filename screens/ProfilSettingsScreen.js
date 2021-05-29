import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import global from '../providers/global';
import { settings } from '../assets/styles/styles';
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
                label="Mes informations"
                type="lastname"
                placeholder="Nom :"
            />
            <Field
                type="firstname"
                placeholder="Prénom :"
            />
            <Field
                type="mail"
                placeholder="Email :"
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
                _style= {[settings.buttonStyle, settings.buttonFont]}
                value="Modifier"
                onPress={() => {}}
            ></Cta>
            <Field
                type="date"
                label="Date de naissance :"
                onChangeDateTime={(date) => setGeValues({...geValues, date: date})}
            />
            <Field
                type="password"
                label="Modifier mon mot de passe :"
                placeholder="Ancien mot de passe :"
            />
            <Field
                type="password"
                placeholder="Nouveau mot de passe :"
            />
            <Field
                type="password"
                placeholder="Confirmation du mot de passe :"
            />
            <Cta
                _style= {[settings.buttonStyle, settings.buttonFont, settings.bgColorMain]}
                value="Modifier"
                onPress={() => {}}
            ></Cta>
        </ScrollView>
    </View>
    );
  }