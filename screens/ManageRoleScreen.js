import React, {useEffect} from 'react';
import { View, ScrollView } from 'react-native';
import Txt from '../components/Txt';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import Title from '../components/Title';
import globalStyle from '../assets/styles/global';
import RoleCard from '../components/cards/RoleCard';
import Cta from '../components/cta/Cta';
import { cta } from '../assets/styles/styles';
import global from '../providers/global';

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

    return (
        <View style={[globalStyle.mpm, globalStyle.flexColumn]}>
            <View style={globalStyle.m_10}>
                <Cta 
                    value={t(selectorsApp.getLang()).roles.CREATE_ROLE} 
                    icon="add-outline"
                    _style={[cta.main, cta.first]}
                    onPress={() => navigation.navigate(global.screens.CREATE_EDIT_ROLE, {isEdit: false})}
                />
            </View>
            <Title>
                {t(selectorsApp.getLang()).roles.ROLES}
            </Title>
            <ScrollView>
                {
                    selectors.getFetchedById().roles.length !== 0 ?
                        selectors.getFetchedById().roles.map((role, index) => 
                            <RoleCard item={role} isEvent={isEvent} key={index} />
                        )
                    :
                        <Txt _style={[globalStyle.ta_c, globalStyle.m_10]}>
                            {t(selectorsApp.getLang()).roles.NO_ROLE_CREATED_YET}
                        </Txt>
                }
            </ScrollView>
        </View>
    );
  };

