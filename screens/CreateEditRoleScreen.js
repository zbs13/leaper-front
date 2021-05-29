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
    
    const [roleState, setRoleState] = useState({
        name: isEdit ? role.name : "",
        isError: !isEdit
    })

    const [sw, setSw] = useState({
        isRight1: isEdit ? role.rights.findIndex(right => right.id == 1) !== -1 ? true : false : false,
        isRight2: isEdit ? role.rights.findIndex(right => right.id == 2) !== -1 ? true : false : false,
        isRight3: isEdit ? role.rights.findIndex(right => right.id == 3) !== -1 ? true : false : false,
        isRight4: isEdit ? role.rights.findIndex(right => right.id == 4) !== -1 ? true : false : false
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
                        defaultValue={isEdit ? role.name : null}
                        isError={(error) => error ? setRoleState({...roleState, isError: true}) : setRoleState({...roleState, isError: false})}
                        onChange={(name) => setRoleState({...roleState, name: name})}
                    />
                </View>
                <View>
                    <Title>
                        {t(selectorApp.getLang()).rights.RIGHTS}
                    </Title>
                    <View style={[{width: "75%"}, globalStyles.m_10]}>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRight1: !sw.isRight1})}
                                value={sw.isRight1}
                                label={t(selectorApp.getLang()).rights[1]}
                            />
                        </View>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRight2: !sw.isRight2})}
                                value={sw.isRight2}
                                label={t(selectorApp.getLang()).rights[2]}
                            />
                        </View>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRight3: !sw.isRight3})}
                                value={sw.isRight3}
                                label={t(selectorApp.getLang()).rights[3]}
                            />
                        </View>
                        <View style={globalStyles.mb_20}>
                            <Switch
                                onValueChange={() => setSw({...sw, isRight4: !sw.isRight4})}
                                value={sw.isRight4}
                                label={t(selectorApp.getLang()).rights[4]}
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
                        sw.isRight1 && rights.push(1);
                        sw.isRight2 && rights.push(2);
                        sw.isRight3 && rights.push(3);
                        sw.isRight4 && rights.push(4);

                        if(isEdit){
                            actionRole.updateRole(isEvent, geId, {
                                id: role.id,
                                name: roleState.name,
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
                                name: roleState.name,
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
                    disabled={roleState.isError}
                />
            </View>
        </View>
    );
}

