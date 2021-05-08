import React, { useEffect, useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { tchatBar } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import OptionsModal from '../modals/OptionsModal';
import Txt from '../Txt';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cta from '../cta/Cta';
import { pickDocument, pickMedia } from '../../utils/phoneFunct';
import DialogPopup from '../DialogPopup';
import FileDisplay from '../display/FileDisplay';
import Field from '../fields/Field';

/**
 * Create/edit event form
 * 
 * @param {boolean} isEdit is an edition of event
 * @param {number} eventId id of event to edit
 * @param {string} nameValue event name
 * @param {string} descriptionValue event description
 * @param {number} sportId sport id of event
 * @param {string} dateValue event date
 * @param {string} startHourValue event start hour
 * @param {string} endHourValue event end hour
 * @param {string} addressValue event address
 * @returns 
 */
export default function CreateEditEventForm({
    isEdit = false,
    eventId = null,
    nameValue = "",
    descriptionValue = "",
    sportId = 1,
    dateValue = "",
    startHourValue = "",
    endHourValue = "",
    addressValue = ""
}){

    const {selectors} = useApp();

    const [geValues, setGeValues] = useState({
        name: nameValue,
        description: descriptionValue,
        sportId: sportId,
        date: dateValue,
        startHour: startHourValue,
        endHour: endHourValue,
        address: addressValue
    });

    return(
        <View>
            <Field 
                type="text"
                defaultValue={nameValue}
                placeholder="name"
                onChange={(value) => setGeValues({
                    ...geValues,
                    name: value
                })}
            />
            <Field 
                type="textarea"
                defaultValue={descriptionValue}
                placeholder="description"
                onChange={(value) => setGeValues({
                    ...geValues,
                    description: value
                })}
            />
            <Field 
                type="select"
                label="Sport"
            />
        </View>
    )
}