import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import useApp from '../hooks/useApp';
import useFirebase from '../hooks/useFirebase';
import t from '../providers/lang/translations';
import _ from 'lodash';
import MessageCard from '../components/cards/MessageCard';
import NoData from '../components/NoData';

/**
 * pinned messages screen
 * 
 * @param {object} navigation for navigation
 * @param {object} route params => geId
 * @returns 
 */
export default function PinnedMessagesScreen({navigation, route}) {

    const geId = route.params.geId;
    const isEvent = route.params.isEvent;

    const {selectors: selectorsApp} = useApp();
    const { actions: firebase } = useFirebase();

    const [pinnedMessages, setPinnedMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({
          headerTitle: t(selectorsApp.getLang()).pinnedMessages.PINNED_MESSAGES,
        });
    }, [])

    useEffect(() => {
        const pinnedMsgs = firebase.lastPinnedMessagesSnapshot(geId, function(pinnedMsg){
            const data = pinnedMsg.docs.map(doc => ({...doc.data(), id: doc.id}));
            setPinnedMessages(_.reverse(data));
        });
        return () => pinnedMsgs();
    }, [geId]);

    return (
        <ScrollView>
            {
                pinnedMessages.length !== 0 ?
                    pinnedMessages.map((message, index) => <View key={index}><MessageCard geId={geId} message={message} isEvent={isEvent} /></View>)
                :
                    <NoData message={t(selectorsApp.getLang()).pinnedMessages.NO_PINNED_MESSAGES} />
            }
        </ScrollView>
    );
}
