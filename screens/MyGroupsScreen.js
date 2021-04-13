import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import useGroups from '../hooks/useGroups';
import SB from '../components/search/SearchBar';
import t from '../providers/lang/translations';
import useApp from '../hooks/useApp';
import globalStyles from '../assets/styles/global';
import global from '../providers/global';
import { manageResponseUI } from '../context/actions/apiCall';
import GroupCard from '../components/cards/GroupCard';
import GroupCardLoader from '../components/loaders/GroupCardLoader';
import { RefreshViewList } from '../components/RefreshView';
import Title from '../components/Title';
import Cta from '../components/cta/Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { cta } from '../assets/styles/styles';

export default React.memo(function MyGroupsScreen({navigation}) {

  const { actions: actionsApp, selectors: selectorsApp } = useApp();
  const { actions: actionsGroups, selectors: selectorsGroups } = useGroups();

  const [mgs, setMgs] = useState({
      searchValue: "",
      offset: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    fetchData();
  }, [mgs]);

  function fetchData(){
    actionsGroups.fetchAllMy(mgs.offset).then((data) => {
      manageResponseUI(data,
          lang,
          function (res) {
            setIsLoaded(true)
          },
          function (error) {
              actionsApp.addPopupStatus(error);
              setIsLoaded(false)
          })
    })
  }

  return (
    <View style={globalStyles.mpm}>
        <Title>{t(selectorsApp.getLang()).MY_GROUPS}</Title>
        <SB
          placeholder={t(selectorsApp.getLang()).FIND_A_GROUP}
          onChangeText={(val) => setMgs({...mgs, searchValue: val})}
          value={mgs.searchValue}
          cancelButtonTitle={t(selectorsApp.getLang()).CANCEL}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
      />
      <View style={[globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter]}>
        <Text style={[globalStyles.f_bold, globalStyles.c_anth]}>{t(selectorsApp.getLang()).RESULTS} : {selectorsGroups.getNbMyFetched()}</Text>
        <Cta
            onPress={() => navigation.navigate("Home")}
            underlayColor={global.colors.LIGHT_GREY}
            _style={[cta.main, cta.first]}
        >
            <Ionicons name="add-outline" size={20} color={global.colors.ANTHRACITE} />
        </Cta>
      </View>
      { isLoaded ?
        <RefreshViewList 
          data={selectorsGroups.getAllMy()}
          onRefresh={() => fetchData()}
          onEndReached={() => setMgs({...mgs, offset: mgs.offset += global.MAX_RESULT_PER_LOADED_PAGE})}
          renderItem={({item}) => (
            <GroupCard navigation={navigation} 
              isMyGroup={true}
              item={item}
            />
          )}
        />
      :
        <GroupCardLoader />
      }
    </View>
  );
})