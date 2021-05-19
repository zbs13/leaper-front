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
 * @param {object} navigation for routing 
 * @returns 
 */
export default function ChangeNotificationsScreen(navigation) {

    const [checked, setChecked] = React.useState('EN');
    const  {selectors} = useApp();

    const [isEnabled, setIsEnabled] = React.useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
        <Text style={settings.titleParams}>{t(selectors.getLang()).settingsApp.TITLE}</Text>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Text>
            Messages:
          </Text>
          <View>
            <Text>
              Messages des discutions :
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={MessagePrivateEnable ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchMessagePrivate}
              value={MessagePrivateEnable}
            /> 
          </View>
          <View>
            <Text>
              Messages des évènements :
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={MessageEventEnable ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchMessageEvent}
              value={MessageEventEnable}
            /> 
          </View>

          <Text>
            Invitations:
          </Text>

          <View>
            <Text>
              Invitations à une discutions :
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={AddMessagePrivate ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchAddMessagePrivate}
              value={AddMessagePrivate}
            /> 
          </View>

          <View>
            <Text>
              Invitations à un évènement :
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={AddEvent ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchAddEvent}
              value={AddEvent}
            /> 
          </View>

          <View>
            <Text>
              Invitations d'ami :
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={AddFriend ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchRememeber}
              value={AddFriend}
            /> 
          </View>

          <Text>
            Rappel:
          </Text>

          <View>
            <Text>
              Me rappeler un évènement :
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: global.colors.MAIN_COLOR }}
              humbColor={Remember ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchAddMessagePrivate}
              value={Remember}
            /> 
          </View>


        </View>
    </View>
    );
  }