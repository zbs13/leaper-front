import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import useApp from '../hooks/useApp';
import TchatBar from '../components/fields/TchatBar';
import globalStyles from '../assets/styles/global';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import useUsers from '../hooks/useUsers';
import useFirebase from '../hooks/useFirebase';
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
import MiniLoader from '../components/loaders/MiniLoader';
import _ from 'lodash';
import { getNbGENotif } from '../utils/utils';

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
  const { selectors: selectorsUser } = useUsers();
  const { actions: firebase } = useFirebase();

  const scrollViewRef = React.useRef();

  const [ts, setTs] = useState({
    offset: 0,
    yPos: 0,
    endPos: 0
  })
  const [loader, setLoader] = useState({
    isTchatLoaded: false,
    isMoreContentLoading: false
  });

  const [messages, setMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    const msgs = firebase.lastMessagesSnapshot(id, function(msg){
      const data = msg.docs.map(doc => ({...doc.data(), id: doc.id}));
      setMessages(_.reverse(data));
    });
    return () => msgs();
  }, [id]);

  useEffect(() => {
    let isMounted = true;
    if(isMounted){
      fetchById();
    }
    return () => { isMounted = false };
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => <HeaderRightGroupEventOptions isEvent={isEvent} geTitle={title} geId={id} />
    });
  }, [loader.isTchatLoaded])

  let action = actionsGroup;
  let selector = selectorsGroup;
  if(isEvent){
    action = actionsEvent;
    selector = selectorsEvent;
  }

  /**
   * fetch group/event messages
   */
  function fetchById(){
    action.fetchById(id, ts.offset).then((resp) => {
      manageResponseUI(resp,
        lang,
        function (res) {
          setLoader({
            isTchatLoaded: true,
            isMoreContentLoading: false
          });
        },
        function (error) {
            actionsApp.addPopupStatus(error);
            setLoader({
              ...loader,
              isTchatLoaded: false
            });
        })
    })
  }

  return (
    <>
      {loader.isTchatLoaded ?
        <View style={[globalStyles.flexRow, globalStyles.w_100, {backgroundColor: global.colors.WHITE}]}>
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
              onPress={() => navigation.navigate(global.screens.SHARED_CONTENT, {id: id, isEvent: isEvent})} 
              _style={globalStyles.h_50p}
            >
              <View style={[globalStyles.h_100, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <Ionicons name="images-outline" size={25}/>
              </View>
            </Cta>
          </View>
          <View style={{flex: 1}}>
            <Cta
              tag={selector.hasRight(global.rights.ADD_USER) ? getNbGENotif(selectorsApp.getGeNotifs(), id) : 0}
              onPress={() => navigation.navigate(global.screens.PEOPLE_LIST, {isEvent: isEvent, id: id})} 
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
                onPress={() => navigation.navigate(global.screens.ADD_PERSON, {asFriend: false, isEvent: isEvent, geId: id})}
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
          <View style={{flex: 1}}>
            <Cta
              onPress={() => navigation.navigate(global.screens.PINNED_MESSAGES, {geId: id, isEvent: isEvent})}
              _style={globalStyles.h_50p}
            >
              <View style={[globalStyles.h_100, globalStyles.alignCenter, globalStyles.justifyCenter]}>
                <Ionicons name="pricetag-outline" size={25}/>
              </View>
            </Cta>
          </View>
        </View>
      :
        null
      }
      {
        loader.isMoreContentLoading &&
          <View style={[globalStyles.w_100, globalStyles.alignCenter]}>
            <MiniLoader />
          </View>
      }
      <KeyboardAwareScrollView 
        style={[globalStyles.w_100]}
        onContentSizeChange={(width, height) => {
          if(ts.yPos === ts.endPos){
            scrollViewRef.current.scrollToEnd({ animated: true });
            return;
          }
        }}
        ref={scrollViewRef} 
        onKeyboardDidShow={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onKeyboardWillShow={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        extraScrollHeight={-225}
        removeClippedSubviews
        onScroll={(e) => {
          if(e.nativeEvent.contentOffset.y === 0){
            if(messages.length >= (ts.offset + global.MAX_RESULT_PER_LOADED_TCHAT)){
              setLoader({...loader, isMoreContentLoading: true});
              firebase.getOldMessages(id, ts.offset + global.MAX_RESULT_PER_LOADED_TCHAT, function(otherOldMessages){
                let inOldSetMessages = oldMessages;
                const data = otherOldMessages.docs.map(doc => ({...doc.data(), id: doc.id}));
                inOldSetMessages.push(..._.reverse(data));
                setTs({...ts, offset: ts.offset + global.MAX_RESULT_PER_LOADED_TCHAT})
                setOldMessages(inOldSetMessages);
                setLoader({...loader, isMoreContentLoading: false});
              })
            }
          }else{
            setTs({
              ...ts, 
              yPos: e.nativeEvent.contentOffset.y,
              endPos: e.nativeEvent.contentSize.height - e.nativeEvent.layoutMeasurement.height
            })
          }
        }}
      >
        {loader.isTchatLoaded ? 
          oldMessages.concat(messages).map((message, index) => <View key={index}><MessageCard geId={id} message={message} isEvent={isEvent} /></View>)
        :
          <TchatLoader />
        }
      </KeyboardAwareScrollView>
      <View>
        <TchatBar
          onChangeInput={() => scrollViewRef.current.scrollToEnd({ animated: true })} 
          onSend={({textValue, attachment}) => {
            firebase.postMessage(id, selectorsUser.getConnectedUser(), textValue, attachment, function(){
              actionsApp.addPopupStatus({
                type: "error"
              })
            });
          }}
        />
      </View>
    </>
  );
}