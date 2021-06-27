import React, {useEffect} from 'react';
import { View } from 'react-native';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import { settings } from '../assets/styles/styles';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';

/**
 * app settings screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function AppSettingsScreen({navigation}) {

    const {selectors} = useApp();

    useEffect(() => {
      navigation.setOptions({
          headerTitle: t(selectors.getLang()).settingsApp.TITLE
      });
    }, [])

  return (
    <View>
      <View style={{justifyContent: 'center'}}>
        <Cta
          _style={[settings.buttonStyle, settings.buttonFont]}
          onPress={() => {navigation.navigate(global.screens.CHANGE_NOTIFICATIONS)}}
          value={t(selectors.getLang()).settingsApp.NOTIFICATIONS}
          underlayColor="transparent"
          icon="notifications-outline"
          iconSize={25}
        />
        <Cta
          _style={[settings.buttonStyle, settings.buttonFont]}
          onPress={() => {navigation.navigate(global.screens.CHANGE_LANGUAGE)}}
          value={t(selectors.getLang()).settingsApp.LANGUAGE}
          underlayColor="transparent"
          icon="language-outline"
          iconSize={25}
        />
      </View>
    </View>
  );
}