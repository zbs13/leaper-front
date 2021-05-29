import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import Txt from '../components/Txt';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import useRoles from '../hooks/useRoles';
import Title from '../components/Title';
import globalStyle from '../assets/styles/global';
import RoleCard from '../components/cards/RoleCard';
import Cta from '../components/cta/Cta';
import { cta } from '../assets/styles/styles';
import global from '../providers/global';
import { RefreshViewList } from '../components/RefreshView';
import { manageResponseUI } from '../context/actions/apiCall';

/**
 * manage role screen
 * 
 * @param {object} navigation for routing
 * @param {object} route params => id, isEvent
 * @returns 
 */
export default function ManageRoleScreen({navigation, route}) {

    const id = route.params.id;
    const isEvent = route.params.isEvent;

    const {selectors: selectorsApp} = useApp();
    const {selectors: selectorsEvent, actions: actionsEvent} = useEvents();
    const {selectors: selectorsGroup, actions: actionsGroup} = useGroups();
    const {selectors: selectorsRole, actions: actionRoles} = useRoles();

    let selectors = selectorsGroup;
    let actions = actionsGroup;
    if(isEvent){
        selectors = selectorsEvent;
        actions = actionsEvent;
    }

    useEffect(() => {
        navigation.setOptions({
          headerTitle: t(selectorsApp.getLang()).roles.ROLES_MANAGEMENT
        });
    }, [])

    useEffect(() => {
        if(selectorsRole.needReload()){
            fetchRoles();
        }
    }, [selectorsRole.needReload()])

    /**
     * fetch roles
     */
    function fetchRoles(){
        console.log("fetttzeezrteztgzetg");
        actions.fetchById(id).then((data) => {
            manageResponseUI(data,
                selectorsApp.getLang(),
                function (res) {
                    return;
                },
                function (error) {
                    actionsApp.addPopupStatus(error);
                })
        });
        actionRoles.updateNeedReload(false);
    }

    return (
        <View style={[globalStyle.mpm, globalStyle.flexColumn]}>
            <View style={globalStyle.m_10}>
                <Cta 
                    value={t(selectorsApp.getLang()).roles.CREATE_ROLE} 
                    icon="add-outline"
                    _style={[cta.main, cta.first]}
                    onPress={() => navigation.navigate(global.screens.CREATE_EDIT_ROLE, {isEdit: false, isEvent: isEvent, geId: id})}
                />
            </View>
            <Title>
                {t(selectorsApp.getLang()).roles.ROLES}
            </Title>
            <RefreshViewList 
                data={selectors.getFetchedById().roles}
                onRefresh={() => fetchRoles()}
                noDataMessage={t(selectorsApp.getLang()).roles.NO_ROLE_CREATED_YET}
                renderItem={({item}) => (
                    <RoleCard item={item} isEvent={isEvent} geId={id} />
                )}
            />
        </View>
    );
  };

