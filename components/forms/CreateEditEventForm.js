import React, { useState } from 'react';
import { View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import Txt from '../Txt';
import global from '../../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Field from '../fields/Field';
import BackgroundImage from '../BackgroundImage';
import Cta from '../cta/Cta';

/**
 * Create/edit event form
 * 
 * @param {boolean} isEdit is an edition of event
 * @param {number|null} eventId id of event to edit
 * @param {string} nameValue event name
 * @param {string} descriptionValue event description
 * @param {number} sportId sport id of event
 * @param {string} dateValue event date
 * @param {string} startHourValue event start hour
 * @param {string} endHourValue event end hour
 * @param {string} addressValue event address
 * @param {object|null} locationValue address location => latitude, longitude
 * @param {string|null} picSrc event picture
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
    addressValue = "",
    locationValue = null,
    picSrc = null
}){

    const {selectors} = useApp();

    const [geValues, setGeValues] = useState({
        name: nameValue,
        description: descriptionValue,
        sportId: sportId,
        date: dateValue,
        startHour: startHourValue,
        endHour: endHourValue,
        address: addressValue,
        location: locationValue,
        pic: picSrc
    });

    return(
        <View style={globalStyles.m_5}>
            <View>
                <Cta 
                    onPress={() => console.log("ezrdfz")} 
                    _style={[globalStyles.justifyCenter, globalStyles.alignCenter]}
                >
                    <View style={[{width: 150, height: 150}, globalStyles.flex, globalStyles.alignCenter]}>
                        <BackgroundImage isRound image={{uri: geValues.pic}} />
                    </View>
                </Cta>
            </View>
            <View style={globalStyles.mb_10}>
                <Field 
                    type="text"
                    min={3}
                    label={t(selectors.getLang()).GENERAL}
                    labelIcon="information-circle-outline"
                    defaultValue={nameValue}
                    placeholder={t(selectors.getLang()).NAME}
                    onChange={(value) => setGeValues({
                        ...geValues,
                        name: value
                    })}
                />
            </View>
            <View style={globalStyles.mb_10}>
                <Field 
                    type="textarea"
                    defaultValue={descriptionValue}
                    placeholder={t(selectors.getLang()).DESCRIPTION}
                    onChange={(value) => setGeValues({
                        ...geValues,
                        description: value
                    })}
                />
            </View>
            <View style={globalStyles.mb_10}>
                <Field 
                    type="address"
                    placeholder={t(selectors.getLang()).ADDRESS}
                    defaultValue={addressValue}
                    onChange={(address, location) => setGeValues({...geValues, address: address, location: location})}
                    location={locationValue}
                />
            </View>
            <View style={globalStyles.mb_10}>
                <Field 
                    type="select"
                    label={t(selectors.getLang()).SPORT}
                    labelIcon="basketball-outline"
                    keyExtractor={(item) => item.id.toString()}
                    defaultSelectValue={(item) => item.id == sportId}
                    items={global.listSports(selectors.getLang())}
                    onChangeSelect={(item) => setGeValues({...geValues, sportId: item.id})}
                    renderItem={(item) => 
                        <View style={[globalStyles.flexRow, globalStyles.alignCenter]}>
                            <Ionicons name={item.icon} />
                            <Txt>{item.name}</Txt>
                        </View>
                    }
                />
            </View>
            <View style={globalStyles.mb_10}>
                <Field 
                    type="date"
                    label={t(selectors.getLang()).DATE}
                    greaterThan={new Date()}
                    labelIcon="calendar-outline"
                    datetime={geValues.date}
                    onChangeDateTime={(date) => setGeValues({...geValues, date: date})}
                />
            </View>
            <View style={globalStyles.flexRow}>
                <View style={[globalStyles.mb_10, {flex: 1}]}>
                    <Field 
                        type="hour"
                        label={t(selectors.getLang()).START}
                        lessThan={geValues.endHour}
                        labelIcon="time-outline"
                        datetime={geValues.startHour}
                        onChangeDateTime={(startHour) => setGeValues({...geValues, startHour: startHour})}
                    />
                </View>
                <View style={[globalStyles.mb_10, {flex: 1}]}>
                    <Field 
                        type="hour"
                        label={t(selectors.getLang()).END}
                        greaterThan={geValues.startHour}
                        labelIcon="time-outline"
                        datetime={geValues.endHour}
                        onChangeDateTime={(endHour) => setGeValues({...geValues, endHour: endHour})}
                    />
                </View>
            </View>
        </View>
    )
}