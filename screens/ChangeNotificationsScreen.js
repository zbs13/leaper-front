import React from 'react';
import { Text, View, Switch } from 'react-native';
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
 * @returns 
 */
export default function ChangeNotificationsScreen() {

    const  {selectors} = useApp();

    const [MessagePrivateEnable, setMessagePrivate] = React.useState(false);
    const toggleSwitchMessagePrivate = () => setMessagePrivate(previousState => !previousState);

    const [MessageEventEnable, setMessageEvent] = React.useState(false);
    const toggleSwitchMessageEvent = () => setMessageEvent(previousState => !previousState);

    const [AddMessagePrivate, setAddMessagePrivate] = React.useState(false);
    const toggleSwitchAddMessagePrivate = () => setAddMessagePrivate(previousState => !previousState);

    const [AddEvent, setAddEvent] = React.useState(false);
    const toggleSwitchAddEvent = () => setAddEvent(previousState => !previousState);

    const [AddFriend, setAddFriend] = React.useState(false);
    const toggleSwitchAddFirend = () => setAddFriend(previousState => !previousState);

    const [Remember, setRemember] = React.useState(false);
    const toggleSwitchRememeber = () => setRemember(previousState => !previousState);

    return (
      <View>
        <Text style={settings.titleParams}>{t(selectors.getLang()).changeNotifications.TITLE}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>

          <Text style={[globalStyles.f_bold, globalStyles.title_size, globalStyles.mt_20]}>
            {t(selectors.getLang()).changeNotifications.TITLE_MESSAGE}
          </Text>

          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeNotifications.TITLE_MESSAGE_PRIVATE}
            </Text>
            <Switch
              style={[globalStyles.m_10]} 
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={MessagePrivateEnable ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchMessagePrivate}
              value={MessagePrivateEnable}
            /> 
          </View>
          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeNotifications.TITLE_MESSAGE_EVENT}
            </Text>
            <Switch
              style={[globalStyles.m_10]} 
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={MessageEventEnable ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchMessageEvent}
              value={MessageEventEnable}
            /> 
          </View>

          <Text style={[globalStyles.f_bold, globalStyles.title_size, globalStyles.mt_20]}>
            {t(selectors.getLang()).changeNotifications.TITLE_ADD}
          </Text>

          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeNotifications.TITLE_ADD_MESSAGE}
            </Text>
            <Switch
              style={[globalStyles.m_10]} 
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={AddMessagePrivate ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchAddMessagePrivate}
              value={AddMessagePrivate}
            /> 
          </View>

          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeNotifications.TITLE_ADD_EVENT}
            </Text>
            <Switch
              style={[globalStyles.m_10]} 
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={AddEvent ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchAddEvent}
              value={AddEvent}
            /> 
          </View>

          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeNotifications.TITLE_ADD_FRIEND}
            </Text>
            <Switch
              style={[globalStyles.m_10]} 
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={AddFriend ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchAddFirend}
              value={AddFriend}
            /> 
          </View>

          <Text style={[globalStyles.f_bold, globalStyles.title_size, globalStyles.mt_20]}>
            {t(selectors.getLang()).changeNotifications.TITLE_REMINDER}
          </Text>

          <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Text>
              {t(selectors.getLang()).changeNotifications.TITLE_REMINDER_EVENT}
            </Text>
            <Switch
              style={[globalStyles.m_10]} 
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={Remember ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchRememeber}
              value={Remember}
            /> 
          </View>

        </View>
    </View>
    );
  }