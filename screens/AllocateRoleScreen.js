import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import useApp from '../hooks/useApp';
import useRoles from '../hooks/useRoles';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import t from '../providers/lang/translations';
import Field from '../components/fields/Field';
import globalStyles from '../assets/styles/global';
import Title from '../components/Title';
import Switch from '../components/cta/Switch';
import Cta from '../components/cta/Cta';
import { cta } from '../assets/styles/styles';
import { manageResponseUI } from '../context/actions/apiCall';
import global from '../providers/global';
import Txt from '../components/Txt';
import RoleCard from '../components/cards/RoleCard';
import { RefreshViewList } from '../components/RefreshView';

/**
 * allocate role screen
 * 
 * @param {object} navigation for navigation
 * @param {boolean} route params => userFirstname, isEvent, userId, currentRoleId
 * @returns 
 */
export default function AllocateRoleScreen({navigation, route}) {

    const userFirstname = route.params.userFirstname;
    const isEvent = route.params.isEvent;
    const userId = route.params.userId;
    const currentRoleId = route.params.currentRoleId;

    const {selectors: selectorsApp, actions: actionsApp} = useApp();
    const {selectors: selectorEvents, actions: actionEvents} = useEvents();
    const {selectors: selectorGroups, actions: actionGroups} = useGroups();
    const {actions: actionRoles} = useRoles();

    let selector = selectorGroups;
    let action = actionGroups;
    if(isEvent){
        selector = selectorEvents;
        action = actionEvents;
    }

    useEffect(() => {
        navigation.setOptions({
            headerTitle: `${t(selectorsApp.getLang()).roles.ALLOCATE_ROLE_TO} ${userFirstname}`
        });
    }, [])

    const [selectedValue, setSelectedValue] = useState(currentRoleId || null);

    /**
     * fetch roles
     */
    function fetchRoles(){
        action.fetchById(selector.getFetchedById().id).then((data) => {
            manageResponseUI(data,
                selectorsApp.getLang(),
                function (res) {
                    return;
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                })
        });
    }

    return (
        <View style={globalStyles.mpm}>
            <Title>
                {`${t(selectorsApp.getLang()).roles.ROLES} (${selector.getFetchedById().roles.length})`}
            </Title>
            <RefreshViewList 
                data={selector.getFetchedById().roles}
                onRefresh={() => fetchRoles()}
                noDataMessage={t(selectorsApp.getLang()).roles.NO_ROLE_CREATED_YET}
                renderItem={({item}) => (
                    <RoleCard
                        item={item} 
                        selectable 
                        isSelected={selectedValue === item.id}
                        onPress={() => {
                            if(selectedValue === item.id){
                                actionRoles.removeUserRole(selectedValue, userId).then((data) => {
                                    manageResponseUI(data,
                                        selectorsApp.getLang(),
                                        function (res) {
                                            setSelectedValue(null);
                                        },
                                        function (error) {
                                            actionsApp.addPopupStatus(error);
                                        })
                                });
                            }else{
                                actionRoles.updateUserRole(selectedValue, item.id, userId).then((data) => {
                                    manageResponseUI(data,
                                        selectorsApp.getLang(),
                                        function (res) {
                                            setSelectedValue(item.id);
                                        },
                                        function (error) {
                                            actionsApp.addPopupStatus(error);
                                        })
                                });
                            }
                        }}
                    />
                )}
            />
        </View>
    );
}