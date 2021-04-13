import React, { useState } from 'react';
import { View, Text } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Cta from '../cta/Cta';
import useApp from '../../hooks/useApp';
import { filtersModal, calendarFilter } from '../../assets/styles/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from "../../assets/styles/global";
import Field from '../fields/Field';
import t from '../../providers/lang/translations';
import Title from '../Title';

export default function FiltersModal({setCriteria}){

    const sheetRef = React.useRef(null);
    const {selectors} = useApp();

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={[35, "70%"]}
            initialSnap={0}
            enabledInnerScrolling={true}
            renderHeader={() => (
                <Cta _style={filtersModal.ctaTitle}
                    onPress={() => sheetRef.current.snapTo(1)}
                    underlayColor={filtersModal.ctaTitle.backgroundColor}
                >
                    <View style={[globalStyles.flexRow, globalStyles.justifyCenter, globalStyles.alignCenter, globalStyles.h_100]}>
                        <Ionicons size={20} name="options-outline" />
                        <Text style={[{fontSize: 20}, globalStyles.p_5]}>{t(selectors.getLang()).FILTERS}</Text>
                    </View>
                </Cta>
            )}
            renderContent={() => (
                <View style={filtersModal.contentContainer}>
                    <View style={globalStyles.m_10} >
                        <Title type="second">
                            {t(selectors.getLang()).FILTER_BY} :
                        </Title>
                    </View>
                    <Field type="text" placeholder={t(selectors.getLang()).PLACE_FILTER_PLACEHOLDER}
                        onChange={(val) => setCriteria({place: val})}
                        icon="pin-outline"
                    />
                    <View style={calendarFilter.container}>
                        <Field type="calendar-period" 
                            label={t(selectors.getLang()).DATE}
                            onChange={(startDate, endDate) => setCriteria({
                                startDate: startDate,
                                endDate: endDate
                            })}
                        />
                    </View>
                </View>
            )}
        />
    );
}