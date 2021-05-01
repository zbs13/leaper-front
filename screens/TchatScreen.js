import React, {useEffect, useState} from 'react';
import { View, Keyboard } from 'react-native';
import useApp from '../hooks/useApp';
import TchatBar from '../components/fields/TchatBar';
import globalStyles from '../assets/styles/global';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import { manageResponseUI } from '../context/actions/apiCall';
import MessageCard from '../components/cards/MessageCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import HeaderRightGroupEventOptions from '../components/headers/HeaderRightGroupEventOptions';
import TchatLoader from '../components/loaders/TchatLoader';
import Cta from '../components/cta/Cta';
import Txt from '../components/Txt';
import t from '../providers/lang/translations';
import global from '../providers/global';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * tchat screen
 * 
 * @param {object} navigation for routing 
 * @param {object} route params => route.params -> title, id, isEvent
 * @returns 
 */
export default function TchatScreen({navigation, route}) {

  const title = route.params.title; 
  const id = route.params.id;
  const isEvent = route.params.isEvent;
  
  const { actions: actionsApp, selectors: selectorsApp } = useApp();
  const { actions: actionsEvent, selectors: selectorsEvent } = useEvents();
  const { actions: actionsGroup, selectors: selectorsGroup } = useGroups();

  const scrollViewRef = React.useRef();

  const [ts, setTs] = useState({
    offset: 0
  })
  const [isLoaded, setIsLoaded] = useState(false);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    fetchAllById();
  }, [ts.offset]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => <HeaderRightGroupEventOptions navigation={navigation} isEvent={isEvent} geTitle={title} />
    });
  }, [isLoaded])

  let action = actionsGroup;
  let selector = selectorsGroup;
  if(isEvent){
    action = actionsEvent;
    selector = selectorsEvent;
  }

  /**
   * fetch group/event messages
   */
  function fetchAllById(){
    action.fetchAllById(id, ts.offset).then((resp) => {
      manageResponseUI(resp,
        lang,
        function (res) {
          setIsLoaded(true);
          scrollViewRef.current.scrollToEnd({ animated: true })
        },
        function (error) {
            actionsApp.addPopupStatus(error);
            setIsLoaded(false)
        })
    })
  }

  return (
    <>
      {isLoaded ?
        <View style={[globalStyles.flexRow, globalStyles.w_100]}>
          {
            isEvent ?
            <View style={{flex: 1}}>
                <Cta 
                  backgroundImage={require("../assets/img/backgrounds/map.png")} 
                  onPress={() => navigation.navigate(global.screens.SPORT_EVENT_DETAILS, {id: id, title: title, isMyEvent: true})} 
                  _style={[globalStyles.h_50p]}
                >
                  <Txt _style={[globalStyles.ta_c]}>
                    {t(selectorsApp.getLang()).SEE_DETAILS}
                  </Txt>
                </Cta>
              </View>
            :
              null
          }
          <View style={{flex: 1}}>
            <Cta
              onPress={() => alert("zez")} 
              _style={globalStyles.h_50p}
            >
              <View style={[globalStyles.h_100, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <Ionicons name="images-outline" size={25}/>
              </View>
            </Cta>
          </View>
          <View style={{flex: 1}}>
            <Cta
              onPress={() => alert("zez")} 
              _style={globalStyles.h_50p}
            >
              <View style={[globalStyles.h_100, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <Ionicons name="people-outline" size={25}/>
              </View>
            </Cta>
          </View>
          {selector.hasRight(global.rights.ADD_USER) ?
            <View style={{flex: 1}}>
              <Cta
                onPress={() => alert("zez")} 
                _style={globalStyles.h_50p}
              >
                <View style={[globalStyles.h_100, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                  <Ionicons name="person-add-outline" size={25}/>
                </View>
              </Cta>
            </View>
          :
            null
          }
        </View>
      :
        null
      }
      <KeyboardAwareScrollView 
        style={[globalStyles.w_100]} 
        onScrollBeginDrag={() => Keyboard.dismiss()} 
        ref={scrollViewRef} 
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onKeyboardDidShow={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onKeyboardWillShow={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        extraScrollHeight={-225}
        removeClippedSubviews
      >
        {isLoaded ?
          selector.getMessages().map((message, index) => <View key={index}><MessageCard navigation={navigation} message={message} isEvent={isEvent} /></View>)
        :
          <TchatLoader />
        }
      </KeyboardAwareScrollView>
      <View>
        <TchatBar onChangeInput={() => scrollViewRef.current.scrollToEnd({ animated: true })} onSend={() => alert("aa")} />
      </View>
    </>
  );
}