import React, {useEffect} from 'react';
import { View } from 'react-native';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import { settings } from '../assets/styles/styles';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';

/**
 * app settings screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function AboutScreen({navigation}) {

    const  {selectors} = useApp();

    useEffect(() => {
      navigation.setOptions({
          headerTitle: t(selectors.getLang()).about.TITLE
      });
    }, [])

    return (
      <View>
        <View>
          <Cta
            _style= {[globalStyles.mt_50,settings.buttonStyle, settings.buttonFont]}
            onPress={() => {navigation.navigate(global.screens.CHANGE_NOTIFICATIONS)}}
            value={t(selectors.getLang()).about.DATA_USE_POLICY}
            underlayColor="transparent"
          />
          <Cta
            _style= {[globalStyles.mt_50, settings.buttonStyle, settings.buttonFont]}
            onPress={() => {navigation.navigate(global.screens.CHANGE_LANGUAGE)}}
            value={t(selectors.getLang()).about.TERMS_OF_USE}
            underlayColor="transparent"
          />
          <Cta
            _style= {[globalStyles.mt_50, settings.buttonStyle, settings.buttonFont]}
            onPress={() => {navigation.navigate(global.screens.CHANGE_LANGUAGE)}}
            value={t(selectors.getLang()).about.PATCH_NOTE}
            underlayColor="transparent"
          />
        </View>
    </View>
    );
  }