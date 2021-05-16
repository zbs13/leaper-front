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
export default function EditGroupEventScreen({navigation, route}) {
    const id = route.params.id;
    const isEvent = route.params.isEvent;
    const infos = route.params.infos;

    const { selectors } = useApp();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${t(selectors.getLang()).EDITING} : ${infos.name}`
        });
    }, [])

    return (
        <View>
            {
                isEvent ?
                    <CreateEditEventForm 
                        isEdit
                        eventId={id}
                        nameValue={infos.name}
                        descriptionValue={infos.description}
                        sportId={infos.sportId}
                        dateValue={infos.date}
                        startHourValue={infos.startHour}
                        endHourValue={infos.endHour}
                        addressValue={infos.address}
                        locationValue={infos.location}
                        picSrc={infos.src}
                    />
                :
                    <CreateEditGroupForm 
                        isEdit
                        groupId={id}
                        nameValue={infos.name}
                        descriptionValue={infos.description}
                        picSrc={infos.src}
                    />
            }
        </View>
    );
  }

