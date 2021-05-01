import React from 'react';
import { Text, View } from 'react-native';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import { settings } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';

/**
 * app settings screen
 * 
 * @returns 
 */
export default function AppSettingsScreen() {

    const  {selectors} = useApp();

    return (
      <View>
        <Text style={settings.titleParams}>{t(selectors.getLang()).settingsApp.TITLE}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Cta
            _style= {[globalStyles.mt_50,settings.buttonStyle, settings.buttonFont]}
            onPress={() => {}}
            value={t(selectors.getLang()).settingsApp.NOTIFICATIONS}
            underlayColor="transparent"
          />
          <Cta
            _style= {[globalStyles.mt_50, settings.buttonStyle, settings.buttonFont]}
            onPress={() => {}}
            value={t(selectors.getLang()).settingsApp.LANGUAGE}
            underlayColor="transparent"
          />
        </View>
    </View>
    );
  }