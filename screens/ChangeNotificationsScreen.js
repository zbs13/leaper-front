import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import globalStyles from '../assets/styles/global';
import useApp from '../hooks/useApp';
import useUsers from '../hooks/useUsers';
import t from '../providers/lang/translations';
import Switch from '../components/cta/Switch';
import Title from '../components/Title';

/**
 * notifications settings screen
 * 
 * @returns 
 */
export default function ChangeNotificationsScreen({navigation}) {

    const {selectors} = useApp();
    const {actions: actionsUser, selectors: selectorsUser} = useUsers();

    const [MessageGroupEnable, setMessageGroup] = React.useState(selectorsUser.getConnectedUser().is_notif_message_group);
    const toggleSwitchMessageGroup = () => {
      actionsUser.editConnectedUserNotification({
        is_notif_message_group: !MessageGroupEnable
      });
      setMessageGroup(!MessageGroupEnable);
    }

    const [MessageEventEnable, setMessageEvent] = React.useState(selectorsUser.getConnectedUser().is_notif_message_event);
    const toggleSwitchMessageEvent = () => {
      actionsUser.editConnectedUserNotification({
        is_notif_message_event: !MessageEventEnable
      });
      setMessageEvent(!MessageEventEnable);
    }

    const [AddGroup, setAddGroup] = React.useState(selectorsUser.getConnectedUser().is_notif_add_group);
    const toggleSwitchAddGroup = () => {
      actionsUser.editConnectedUserNotification({
        is_notif_add_group: !AddGroup
      });
      setAddGroup(!AddGroup);
    }

    const [AddEvent, setAddEvent] = React.useState(selectorsUser.getConnectedUser().is_notif_add_event);
    const toggleSwitchAddEvent = () => {
      actionsUser.editConnectedUserNotification({
        is_notif_add_event: !AddEvent
      });
      setAddEvent(!AddEvent);
    }

    const [AddFriend, setAddFriend] = React.useState(selectorsUser.getConnectedUser().is_notif_add_friend);
    const toggleSwitchAddFriend = () => {
      actionsUser.editConnectedUserNotification({
        is_notif_add_friend: !AddFriend
      });
      setAddFriend(!AddFriend);
    }

    const [Remember, setRemember] = React.useState(selectorsUser.getConnectedUser().is_remind_event);
    const toggleSwitchRememeber = () => {
      actionsUser.editConnectedUserNotification({
        is_remind_event: !Remember
      });
      setRemember(!Remember);
    }

    useEffect(() => {
      navigation.setOptions({
          headerTitle: t(selectors.getLang()).changeNotifications.TITLE
      });
    }, [])

    return (
      <ScrollView style={[globalStyles.mpp]}>
        <Title>
          {t(selectors.getLang()).changeNotifications.TITLE_MESSAGE}
        </Title>
        <View style={globalStyles.p_10}>
          <Switch
            onValueChange={toggleSwitchMessageGroup}
            value={MessageGroupEnable}
            label={t(selectors.getLang()).changeNotifications.TITLE_MESSAGE_GROUP}
          />
        </View>
        <View style={globalStyles.p_10}>
          <Switch
            onValueChange={toggleSwitchMessageEvent}
            value={MessageEventEnable}
            label={t(selectors.getLang()).changeNotifications.TITLE_MESSAGE_EVENT}
          />
        </View>
        <Title>
          {t(selectors.getLang()).changeNotifications.TITLE_ADD}
        </Title>
        <View style={globalStyles.p_10}>
          <Switch
            onValueChange={toggleSwitchAddGroup}
            value={AddGroup}
            label={t(selectors.getLang()).changeNotifications.TITLE_ADD_GROUP}
          />
        </View>
        <View style={globalStyles.p_10}>
          <Switch
            onValueChange={toggleSwitchAddEvent}
            value={AddEvent}
            label={t(selectors.getLang()).changeNotifications.TITLE_ADD_EVENT}
          />
        </View>
        <View style={globalStyles.p_10}>
          <Switch
            onValueChange={toggleSwitchAddFriend}
            value={AddFriend}
            label={t(selectors.getLang()).changeNotifications.TITLE_ADD_FRIEND}
          />
        </View>
        <Title>
          {t(selectors.getLang()).changeNotifications.TITLE_REMINDER}
        </Title>
        <View style={globalStyles.p_10}>
          <Switch
            onValueChange={toggleSwitchRememeber}
            value={Remember}
            label={t(selectors.getLang()).changeNotifications.TITLE_REMINDER_EVENT}
          />
        </View>
      </ScrollView>
    );
  }