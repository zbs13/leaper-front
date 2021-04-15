import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import useApp from '../hooks/useApp';
import global from '../providers/global';
import OptionsModal from '../components/modals/OptionsModal';
import t from '../providers/lang/translations';
import TchatBar from '../components/fields/TchatBar';
import globalStyles from '../assets/styles/global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

  const [isLoaded, setIsLoaded] = useState(false);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => headerMenu()
    });
  }, []);

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
    <View style={globalStyles.h_100}>
      <KeyboardAwareScrollView>
        <View>
          <Text>dddd</Text>
        </View>
      </KeyboardAwareScrollView>
      <View>
        <TchatBar onSend={() => alert("aa")} />
      </View>
    </View>
  );
}