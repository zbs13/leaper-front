import React from 'react';
import { View } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useApp from '../../hooks/useApp';
import useRoles from '../../hooks/useRoles';
import { manageResponseUI } from '../../context/actions/apiCall';
import Cta from '../cta/Cta';
import global from '../../providers/global';
import { roleCard } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import t from '../../providers/lang/translations';
import Txt from '../Txt';
import OptionsModal from '../modals/OptionsModal';
import { useNavigation } from '@react-navigation/native';

/**
 * role card
 * 
 * @param {object} item role datas => id, name, rights
 * @param {boolean} isEvent is a role from an event
 * @returns 
 */
export default function RoleCard({item, isEvent}) {

    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const {actions: actionsRole} = useRoles();
    const {actions: actionsEvent} = useEvents();
    const {actions: actionsGroup} = useGroups();
    const navigation = useNavigation();

    let actions = actionsGroup;
    if(isEvent){
        actions = actionsEvent;
    }

    const roleCardOptions = [{
        value: t(selectorsApp.getLang()).roles.DELETE_ROLE,
        icon: "trash-outline",
        action: () => actionsRole.deleteRole(item.id).then((data) => {
            manageResponseUI(data,
                selectorsApp.getLang(),
                function (res) {
                    actions.deleteRoleInUI(item.id);
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                })
        }),
        confirm: {
            title: t(selectorsApp.getLang()).roles.DELETE_ROLE,
            content: t(selectorsApp.getLang()).roles.SURE_TO_DELETE_ROLE
        }
    }]

    return (
        <OptionsModal
            options={roleCardOptions}
        >
            <Cta onPress={() => navigation.navigate(global.screens.CREATE_EDIT_ROLE, {isEdit: true, role: item})}>
                <View style={[globalStyles.flexRow, roleCard.container, globalStyles.mb_10]}>
                    <View style={[globalStyles.flexColumn, {flex: 1.8}]}>
                        <View>
                            <Txt _style={globalStyles.f_bold}>
                                {item.name}
                            </Txt>
                        </View>
                        <View style={globalStyles.flexRow}>
                            <Txt _style={{fontSize: 12, color: global.colors.LIGHT_GREY}}>
                                {
                                    item.rights.map((right, index) => {
                                        return right;
                                    }).reduce((accu, right) => {
                                        return accu === null ? [t(selectorsApp.getLang()).rights[right.id]] : [...accu, ', ', t(selectorsApp.getLang()).rights[right.id]]
                                    }, null)
                                }
                            </Txt>
                        </View>
                    </View>
                    <View style={{flex: 0.2}}>
                        <OptionsModal 
                            options={roleCardOptions}
                            buttonSize={25}
                        />
                    </View>
                </View>
            </Cta>
        </OptionsModal>
    );
}