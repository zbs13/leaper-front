import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import SB from '../components/search/SearchBar';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import useUsers from '../hooks/useUsers';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';
import { manageResponseUI } from '../context/actions/apiCall';
import GroupCard from '../components/cards/GroupCard';
import { RefreshViewList } from '../components/RefreshView';
import Title from '../components/Title';
import Cta from '../components/cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { cta } from '../assets/styles/styles';
import Txt from '../components/Txt';
import { sortMyGEBySearchCriteria } from '../utils/utils';

/**
 * my groups screen
 * 
 * @param {object} navigation for routing
 * @returns 
 */
export default React.memo(function MyGroupsScreen({navigation}) {

  const { actions: actionsApp, selectors: selectorsApp } = useApp();
  const { selectors: selectorsUser, actions: actionsUser } = useUsers();

  const [mgs, setMgs] = useState({
    results: [],
    sortedResults: null,
    searchValue: ""
  });

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      setMgs({
        ...mgs,
        results: selectorsUser.getConnectedUser().groups
      })
    }
    return () => { isMounted = false };
  }, [selectorsUser.getConnectedUser().groups])

  let lang = selectorsApp.getLang();

  /**
   * fetch all my groups
   */
  function fetchMyGroups(){
    actionsUser.fetchConnectedUserGroups().then((data) => {
      manageResponseUI(data,
        lang,
        function (res) {
          setMgs({
            ...mgs,
            results: res
          });
        },
        function (error) {
            actionsApp.addPopupStatus(error);
        })
    })
  }

  return (
    <View style={globalStyles.mpm}>
        <Title>{t(selectorsApp.getLang()).group.MY_GROUPS}</Title>
        <SB
          placeholder={t(selectorsApp.getLang()).group.FIND_A_GROUP}
          onChangeText={(val) => setMgs(
            {
              ...mgs, 
              searchValue: val,
              sortedResults: sortMyGEBySearchCriteria(mgs.results, val)
            })}
          value={mgs.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      <View style={[globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
        <Txt _style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).RESULTS} : {mgs.sortedResults && mgs.sortedResults.length || mgs.results.length}</Txt>
        <Cta
            onPress={() => navigation.navigate(global.screens.CREATE_GROUP_EVENT, {isEvent: false})}
            underlayColor={global.colors.LIGHT_GREY}
            _style={[cta.main, cta.first]}
        >
            <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
        </Cta>
      </View>
      <RefreshViewList 
        data={mgs.sortedResults || mgs.results}
        onRefresh={() => fetchMyGroups()}
        renderItem={({item}) => (
          <GroupCard
            isMyGroup={true}
            item={item}
          />
        )}
      />
    </View>
  );
})