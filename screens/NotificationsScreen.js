import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import useApp from '../hooks/useApp';
import useUsers from '../hooks/useUsers';
import useFirebase from '../hooks/useFirebase';
import globalStyles from '../assets/styles/global';
import Title from '../components/Title';
import NotificationCard from '../components/cards/NotificationCard';
import NoData from '../components/NoData';
import t from '../providers/lang/translations';

/**
 * notifications screen
 * 
 * @returns 
 */
export default function NotificationsScreen({navigation}) {

  const {selectors} = useApp();
  const {selectors: selectorsUser} = useUsers();
  const {actions: firebase} = useFirebase();

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      firebase.updateNotifs(selectorsUser.getConnectedUser().id)
    }
    return () => {isMounted = false}
  }, [selectors.getNotifs()]);

  return (
    <View style={[globalStyles.flexColumn, globalStyles.mpp]}>
      <Title>
        {t(selectors.getLang()).notifications.NOTIFICATIONS} ({selectors.getNotifs().length})
      </Title>
      <FlatList
        data={selectors.getNotifs()}
        renderItem={({item}) => (
          <NotificationCard data={item} />
        )}
        ListEmptyComponent={() => <NoData message={t(selectors.getLang()).notifications.NO_NOTIFS} />}
        keyExtractor={(data, index) => index.toString()}
        onEndReachedThreshold={0.3}
        removeClippedSubviews
      />
    </View>
  );
}
