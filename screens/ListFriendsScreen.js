import React, { useEffect } from 'react';
import { View } from 'react-native';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import { RefreshViewList } from '../components/RefreshView';
import { manageResponseUI } from '../context/actions/apiCall';
import PersonCard from '../components/cards/PersonCard';
import Txt from '../components/Txt';
import globalStyles from '../assets/styles/global';
import Cta from '../components/cta/Cta';
import global from '../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * friends list screen
 * 
 * @returns 
 */
export default function ListFriendsScreen({navigation}) {

    const {selectors: selectorsApp, actions: actionsApp} = useApp();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: "Amis",
            headerRight: () => 
                <Cta onPress={() => navigation.navigate(global.screens.ADD_PERSON, {asFriend: true})} >
                    <Ionicons name="add-outline" color={global.colors.MAIN_COLOR} size={30} />
                </Cta>
        });
    }, [])

   /**
   * fetch all group/event members
   */
    function fetchMembers(){
        actions.fetchById(id).then((data) => {
        manageResponseUI(data,
            selectorsApp.getLang(),
            function (res) {
                return;
            },
            function (error) {
                actionsApp.addPopupStatus(error);
            })
        })
    }

    return (
      <View>
        <View style={globalStyles.m_10}>
            {/* <Txt _style={globalStyles.f_bold}>
                {`${t(selectorsApp.getLang()).MEMBERS} : ${selectors.getFetchedById().users.length}`}
            </Txt> */}
        </View>
        {/* <RefreshViewList
            onRefresh={() => fetchMembers()}
            noDataMessage={t(selectorsApp.getLang()).NO_MEMBER}
            data={selectors.getFetchedById().users}
            renderItem={({item}) => <PersonCard isMember isEvent={isEvent} datas={item} />}
        /> */}
      </View>
    );
};

