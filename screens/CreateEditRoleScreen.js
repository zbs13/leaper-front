import React, {useEffect, useState} from 'react';
import { View, ScrollView } from 'react-native';
import useApp from '../hooks/useApp';
import useRoles from '../hooks/useRoles';
import t from '../providers/lang/translations';
import Field from '../components/fields/Field';
import globalStyles from '../assets/styles/global';
import Title from '../components/Title';
import Switch from '../components/cta/Switch';
import Cta from '../components/cta/Cta';
import { cta } from '../assets/styles/styles';
import { manageResponseUI } from '../context/actions/apiCall';
import global from '../providers/global';
import { roleHasRight }  from '../utils/utils';

/**
 * create/edit role screen
 * 
 * @param {object} navigation for navigation
 * @param {object} route => params -> role, isEdit, isEvent, geId
 * @returns 
 */
export default function CreateEditRoleScreen({navigation, route}) {
    const role = route.params.role;
    const isEdit = route.params.isEdit;
    const isEvent = route.params.isEvent;
    const geId = route.params.geId

    const { selectors: selectorApp, actions: actionsApp } = useApp();
    const { actions: actionRole } = useRoles();
    
    const [roleName, setRoleName] = useState(isEdit ? role.name : "");
    const [roleError, setRoleError] = useState(!isEdit);

    const [sw, setSw] = useState({
        isRightRemoveUser: isEdit ? roleHasRight(role.rights, global.rights.REMOVE_USER) ? true : false : false,
        isRightAddUser: isEdit ? roleHasRight(role.rights, global.rights.ADD_USER) ? true : false : false,
        isRightDeleteMessage: isEdit ? roleHasRight(role.rights, global.rights.DELETE_MESSAGE) ? true : false : false,
        isRightEditInfos: isEdit ? roleHasRight(role.rights, global.rights.EDIT_INFOS) ? true : false : false
    });

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEdit ? `${t(selectorApp.getLang()).roles.ROLE} : ${role.name}` : t(selectorApp.getLang()).roles.CREATE_ROLE
        });
    }, [])

    return (
        <View style={[globalStyles.h_100, globalStyles.w_100]}>
            <ScrollView style={[globalStyles.mpm, globalStyles.flexColumn, globalStyles.mb_50]}>
                <View style={[globalStyles.mt_10, globalStyles.mb_20]}>
                    <Field 
                        type="text"
                        min={2}
                        placeholder={t(selectorApp.getLang()).roles.ROLE_NAME}
                        defaultValue={isEdit ? roleName : null}
                        isError={(error) => setRoleError(error)}
                        onChange={(name) => setRoleName(name)}
                    />
                </View>
                <View>
                    <Title>
                        {t(selectorApp.getLang()).rights.RIGHTS}
                    </Title>
                    <View style={[{width: "75%"}, globalStyles.m_10]}>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRightRemoveUser: !sw.isRightRemoveUser})}
                                value={sw.isRightRemoveUser}
                                label={t(selectorApp.getLang()).rights[global.rights.REMOVE_USER]}
                            />
                        </View>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRightAddUser: !sw.isRightAddUser})}
                                value={sw.isRightAddUser}
                                label={t(selectorApp.getLang()).rights[global.rights.ADD_USER]}
                            />
                        </View>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRightDeleteMessage: !sw.isRightDeleteMessage})}
                                value={sw.isRightDeleteMessage}
                                label={t(selectorApp.getLang()).rights[global.rights.DELETE_MESSAGE]}
                            />
                        </View>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRightEditInfos: !sw.isRightEditInfos})}
                                value={sw.isRightEditInfos}
                                label={t(selectorApp.getLang()).rights[global.rights.EDIT_INFOS]}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[{flex: 1, position: "absolute", bottom: 0}, globalStyles.mb_10, globalStyles.w_100]}>
                <Cta _style={[cta.main, cta.first]}
                    value={isEdit ? t(selectorApp.getLang()).roles.EDIT_THE_ROLE : t(selectorApp.getLang()).roles.CREATE_THE_ROLE}
                    onPress={() => {
                        let rights = [];
                        sw.isRightRemoveUser && rights.push(global.rights.REMOVE_USER);
                        sw.isRightAddUser && rights.push(global.rights.ADD_USER);
                        sw.isRightDeleteMessage && rights.push(global.rights.DELETE_MESSAGE);
                        sw.isRightEditInfos && rights.push(global.rights.EDIT_INFOS);
                        if(isEdit){
                            actionRole.updateRole(role.id, {
                                name: roleName,
                                rights: rights
                            }).then((data) => {
                                manageResponseUI(data,
                                    selectorApp.getLang(),
                                    function (res) {
                                        actionRole.updateNeedReload(true);
                                        navigation.navigate(global.screens.MANAGE_ROLE, {isEvent: isEvent, id: geId})
                                    },
                                    function (error) {
                                        actionsApp.addPopupStatus(error);
                                    })
                            });
                        }else{
                            actionRole.createRole(isEvent, geId, {
                                name: roleName,
                                rights: rights
                            }).then((data) => {
                                manageResponseUI(data,
                                    selectorApp.getLang(),
                                    function (res) {
                                        actionRole.updateNeedReload(true);
                                        navigation.navigate(global.screens.MANAGE_ROLE, {isEvent: isEvent, id: geId})
                                    },
                                    function (error) {
                                        actionsApp.addPopupStatus(error);
                                    })
                            });;
                        }
                    }}
                    disabled={roleError || (!sw.isRightAddUser && !sw.isRightDeleteMessage && !sw.isRightEditInfos && !sw.isRightRemoveUser)}
                />
            </View>
        </View>
    );
}

