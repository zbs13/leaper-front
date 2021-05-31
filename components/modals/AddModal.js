import React from 'react';
import { View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import t from '../../providers/lang/translations';
import useApp from '../../hooks/useApp';
import Cta from '../cta/Cta';
import globalStyles from '../../assets/styles/global';
import global from '../../providers/global';
import { cta, optionsModal } from '../../assets/styles/styles';

/**
 * add modal (bottom menu)
 * 
 * @returns 
 */
export default function AddModal() {

    const {selectors, actions} = useApp();

    return (
        <BottomSheet visible={true} onBackButtonPress={() => actions.toggleAddModal()} onBackdropPress={() => actions.toggleAddModal()} >
          <View style={[{height: 220}, optionsModal.container, globalStyles.justifyCenter, globalStyles.alignCenter]}>
            <View
              style={[{flex: 1}, globalStyles.w_100, globalStyles.flexColumn, globalStyles.flexBetween]}>
                <View style={[{ flex: 1 }, globalStyles.flexColumn]}>
                    <View>
                        <Cta
                            onPress={() => {
                                selectors.getAddModal().navigation.navigate(global.screens.CREATE_GROUP_EVENT, {isEvent: true});
                                actions.toggleAddModal();
                            }}
                            underlayColor={global.colors.VERY_LIGHT_GREY}
                            _style={[cta.main, globalStyles.ta_l, optionsModal.optionCta]}
                            value={t(selectors.getLang()).event.CREATE_EVENT}
                            icon="create-outline"
                            iconSize={30}
                        />
                    </View>
                    <View>
                        <Cta
                            onPress={() => {
                                selectors.getAddModal().navigation.navigate(global.screens.CREATE_GROUP_EVENT, {isEvent: false});
                                actions.toggleAddModal();
                            }}
                            underlayColor={global.colors.VERY_LIGHT_GREY}
                            _style={[cta.main, globalStyles.ta_l, optionsModal.optionCta]}
                            value={t(selectors.getLang()).group.CREATE_GROUP}
                            icon="create-outline"
                            iconSize={30}
                        />
                    </View>
                    <View>
                        <Cta
                            onPress={() => {
                                selectors.getAddModal().navigation.navigate(global.screens.ADD_PERSON, {asFriend: true});
                                actions.toggleAddModal();
                            }}
                            underlayColor={global.colors.VERY_LIGHT_GREY}
                            _style={[cta.main, globalStyles.ta_l, optionsModal.optionCta]}
                            value={t(selectors.getLang()).ADD_CONTACT_PERSON}
                            icon="person-add-outline"
                            iconSize={30}
                        />
                    </View>
                    <Cta
                      onPress={() => actions.toggleAddModal()}
                      value={t(selectors.getLang()).CANCEL}
                      _style={[globalStyles.mt_20, globalStyles.m_10, optionsModal.cancel]}
                    />
                </View>
            </View>
          </View>
        </BottomSheet>
    );
  }