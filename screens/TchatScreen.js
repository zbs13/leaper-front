import React, {useEffect, useState} from 'react';
import { View, Keyboard } from 'react-native';
import useApp from '../hooks/useApp';
import global from '../providers/global';
import OptionsModal from '../components/modals/OptionsModal';
import t from '../providers/lang/translations';
import TchatBar from '../components/fields/TchatBar';
import globalStyles from '../assets/styles/global';
import useEvents from '../hooks/useEvents';
import useGroups from '../hooks/useGroups';
import { manageResponseUI } from '../context/actions/apiCall';
import MessageCard from '../components/cards/MessageCard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => headerMenu()
    });
    getMessages();
  }, [ts.offset]);

  let action = actionsGroup;
  let selector = selectorsGroup;
  if(isEvent){
    action = actionsEvent;
    selector = selectorsEvent;
  }

  /**
   * fetch group/event messages
   */
  function getMessages(){
    action.fetchMessages(id, ts.offset).then((data) => {
      manageResponseUI(data,
          lang,
          function (res) {
            setIsLoaded(true);
          },
          function (error) {
              actionsApp.addPopupStatus(error);
              setIsLoaded(false)
          })
    })
  }

  /**
   * header right menu (options)
   * 
   * @returns 
   */
  function headerMenu(){
    return (
      <View>
          <OptionsModal 
            title={t(selectorsApp.getLang()).PARAMETERS}
            icon="ellipsis-horizontal-outline"
            buttonColor={global.colors.MAIN_COLOR}
            options={[
              {
                value: t(selectorsApp.getLang()).MUTE,
                icon: "notifications-off-outline",
                action: () => alert("mettre en sourdine")
              },
              {
                value: isEvent ? t(selectorsApp.getLang()).event.ADD_TO_EVENT : t(selectorsApp.getLang()).group.ADD_TO_GROUP,
                icon: "person-add-outline",
                action: () => alert("ajouter a la conv")
              },
              {
                value: t(selectorsApp.getLang()).PEOPLE_LIST,
                icon: "people-outline",
                action: () => alert("liste personnes")
              },
              {
                value: t(selectorsApp.getLang()).SHARED_CONTENT,
                icon: "images-outline",
                action: () => alert("contenu partager")
              },
              {
                value: isEvent ? t(selectorsApp.getLang()).event.LEAVE_THIS_EVENT : t(selectorsApp.getLang()).group.LEAVE_THIS_GROUP,
                icon: "log-out-outline",
                iconColor: global.colors.WHITE,
                style: {
                  backgroundColor: global.colors.RED_ERROR,
                  color: global.colors.WHITE
                },
                confirm: {
                  title: isEvent ? t(selectorsApp.getLang()).event.LEAVE_EVENT : t(selectorsApp.getLang()).event.LEAVE_GROUP,
                  content: `${isEvent ? t(selectorsApp.getLang()).event.SURE_TO_LEAVE_EVENT : t(selectorsApp.getLang()).group.SURE_TO_LEAVE_GROUP} ${title}`
                },
                action: () => alert("Quitter")
              },
            ]}
          />
      </View>
    )
  }

  return (
    <>
      <KeyboardAwareScrollView 
        style={[globalStyles.w_100]} 
        onScrollBeginDrag={() => Keyboard.dismiss()} 
        ref={scrollViewRef} 
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} 
        onKeyboardDidShow={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        onKeyboardWillShow={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        extraScrollHeight={-225}
      >
        {isLoaded ?
          selector.getMessages().map((message, index) => <View key={index}><MessageCard navigation={navigation} message={message} /></View>)
        :
          <></>
        }
      </KeyboardAwareScrollView>
      <View>
        <TchatBar onChangeInput={() => scrollViewRef.current.scrollToEnd({ animated: true })} onSend={() => alert("aa")} />
      </View>
    </>
  );
}