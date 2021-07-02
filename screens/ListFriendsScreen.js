import React, { useState } from 'react';
import { View } from 'react-native';
import useUsers from '../hooks/useUsers';
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
import SB from '../components/search/SearchBar';
import { sortUsersSearchCriteria } from '../utils/utils';
import Title from '../components/Title';
import { cta } from '../assets/styles/styles';

/**
 * friends list screen
 * 
 * @returns 
 */
export default function ListFriendsScreen({navigation}) {

    const { actions: actionsApp, selectors: selectorsApp } = useApp();
    const { actions: actionsUser, selectors: selectorsUser } = useUsers();
  
    const [lfs, setLfs] = useState({
        friends: selectorsUser.getConnectedUser().friends,
        sortedFriends: null,
        searchValue: "",
    });
  
    let lang = selectorsApp.getLang();
  
    /**
     * fetch all my friends
     */
    function fetchFriends(){
        actionsUser.fetchConnectedUserFriends().then((data) => {
        manageResponseUI(data,
            lang,
            function (res) {
                setLfs({
                    ...lfs,
                    friends: res.friends
                });
            },
            function (error) {
                actionsApp.addPopupStatus(error);
            })
      })
    }
  
    return (
        <View style={globalStyles.mpm}>
            <Title>{t(selectorsApp.getLang()).friends.MY_FRIENDS}</Title>
            <SB
                placeholder={t(selectorsApp.getLang()).friends.SEARCH_A_FRIEND}
                onChangeText={(val) => setLfs(
                {
                    ...lfs, 
                    searchValue: val,
                    sortedFriends: sortUsersSearchCriteria(lfs.friends, val)
                })}
                value={lfs.searchValue}
                cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
                containerStyle={{backgroundColor: "transparent"}}
                cancelButtonProps={{color: global.colors.MAIN_COLOR}}
            />
            <View style={[globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
            <Txt _style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).friends.FRIENDS} : {lfs.sortedFriends && lfs.sortedFriends.length || lfs.friends.length}</Txt>
            <Cta
                onPress={() => navigation.navigate(global.screens.ADD_PERSON, {asFriend: true})}
                underlayColor={global.colors.LIGHT_GREY}
                _style={[cta.main, cta.first]}
            >
                <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
            </Cta>
            </View>
            <RefreshViewList 
                data={lfs.sortedFriends || lfs.friends}
                noDataMessage={t(selectorsApp.getLang()).friends.NO_FRIENDS}
                onRefresh={() => fetchFriends()}
                renderItem={({item}) => (
                    <PersonCard datas={item} />
                )}
            />
        </View>
    )
};

