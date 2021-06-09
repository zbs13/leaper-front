import React from 'react';
import { Text, View } from 'react-native';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import { settings } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import { RadioButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * app settings screen
 * 
 * @returns 
 */
export default function ChangeLanguageScreen() {
    const  {selectors, actions} = useApp();
    const [checked, setChecked] = React.useState(selectors.getLang());
    

    return (
      <View>
        <Text style={settings.titleParams}>{t(selectors.getLang()).changeLanguage.TITLE}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeLanguage.SELECT_LANGUAGES_FR}
            </Text>
            <RadioButton
              value="fr"
              status={ checked === 'fr' ? 'checked' : 'unchecked' }
              onPress={() => {
                actions.updateUserParameters({
                  lang: 
                  {
                    lang: 'fr',
                    flag: 'FR'
                  }
                  });
                AsyncStorage.setItem("lang", JSON.stringify({
                  lang: 'fr',
                  flag: 'FR'
                }));
                setChecked('fr')
              }}
            />  
          </View>
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.mt_20]}>
            <Text>
              {t(selectors.getLang()).changeLanguage.SELECT_LANGUAGES_EN}
            </Text>
            <RadioButton
              value="en"
              status={ checked === 'en' ? 'checked' : 'unchecked' }
              onPress={() => {
                actions.updateUserParameters({
                  lang: 
                  {
                    lang: 'en',
                    flag: 'GB'
                  }
                  });
                AsyncStorage.setItem("lang", JSON.stringify({
                  lang: 'en',
                  flag: 'GB'
                }));
                setChecked('en')
              }}
            />
          </View>
        </View>
    </View>
    );
  }