import React, {useEffect} from 'react';
import { View } from 'react-native';
import CreateEditEventForm from '../components/forms/CreateEditEventForm';
import CreateEditGroupForm from '../components/forms/CreateEditGroupForm';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';

/**
 * edit group/event screen
 * @returns 
 */
export default function CreateGroupEventScreen({navigation, route}) {
    const isEvent = route.params.isEvent;

    const { selectors } = useApp();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEvent ? t(selectors.getLang()).event.CREATE_EVENT : t(selectors.getLang()).group.CREATE_GROUP
        });
    }, [])

    return (
        <View>
            {
                isEvent ?
                    <CreateEditEventForm />
                :
                    <CreateEditGroupForm />
            }
        </View>
    );
  }

