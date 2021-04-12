import React, {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import useApp from '../hooks/useApp';

export default function TchatScreen({navigation, route}) {

  const title = route.params.title 

  const { actions: actionsApp, selectors: selectorsApp } = useApp();

  const [isLoaded, setIsLoaded] = useState(false);

  let lang = selectorsApp.getLang();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  }, []);

  return (
    <View>
      <Text>fdfff</Text>
    </View>
  );
}