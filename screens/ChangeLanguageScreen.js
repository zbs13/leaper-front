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
        <Text style={settings.titleParams}>{t(selectors.getLang()).settingsApp.TITLE}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          {/* <Switch
            trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value="true"
          /> */}
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              FR :
            </Text>
            <RadioButton
              value="FR"
              status={ checked === 'FR' ? 'checked' : 'unchecked' }
              onPress={() => setChecked('FR')}
            />  
          </View>
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.mt_20]}>
            <Text>
              EN :
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