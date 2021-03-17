import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import useGroups from '../../hooks/useGroups';
import useEvents from '../../hooks/useEvents';
import useApp from '../../hooks/useApp';
import { manageResponseUI } from '../../context/actions/apiCall';
import Cta from '../Cta';
import global from '../../providers/global';

export default function MyGroupsEventsCards({type, navigation}) {

    const {actions: actionsGroups, selectors: selectorsGroups} = useGroups();
    const {actions: actionsEvents, selectors: selectorsEvents} = useEvents();
    const {actions: actionsApp, selectors: selectorsApp} = useApp();

    const [groupEvent, setGroupEvent] = useState({
        isLoaded: false
    });

    let action;
    let selector;
    if(type === "groups"){
        action = actionsGroups;
        selector = selectorsGroups;
    }else if(type === "events"){
        action = actionsEvents;
        selector = selectorsEvents;
    }
    useEffect(() => {
        action.fetchAll().then((data) => {
            console.log("aaaa", data)
            manageResponseUI(data, 
                selectorsApp.getLang(),
                function(){
                    setGroupEvent({
                        isLoaded: true
                    })
                },
                function(error){
                    console.log("ccc", error);
                    actionsApp.addPopupStatus(error);
                    setGroupEvent({
                        isLoaded: false
                    })
                })
        }) 
    }, [])

    if(groupEvent.isLoaded){
        return (
            <View>
                <Cta
                    onPress={() => navigation.navigate(type === "groups" ? global.screens.MY_GROUPS : global.screens.MY_EVENTS)}>
                    <Text>
                        aaa
                    </Text>
                </Cta>
            </View>
        );
    }else{
        return (
            <View>
                <Text>nope</Text>
            </View>
        );
    }
}