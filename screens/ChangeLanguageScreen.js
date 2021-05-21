import React from 'react';
import { Text, View } from 'react-native';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import { settings } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import { RadioButton } from 'react-native-paper';

/**
 * app settings screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function ChangeLanguageScreen(navigation) {

    const [checked, setChecked] = React.useState('EN');
    const  {selectors} = useApp();

    return (
      <View>
        <Text style={settings.titleParams}>{t(selectors.getLang()).changeLanguage.TITLE}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeLanguage.SELECT_LANGUAGES_FR}
            </Text>
            <RadioButton
              value="FR"
              status={ checked === 'FR' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('FR')}
            />  
          </View>
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.mt_20]}>
            <Text>
              {t(selectors.getLang()).changeLanguage.SELECT_LANGUAGES_EN}
            </Text>
            <RadioButton
              value="EN"
              status={ checked === 'EN' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('EN')}
            />
          </View>
        </View>
    </View>
    );
  }