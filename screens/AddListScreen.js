import React from 'react';
import { View, Button } from 'react-native';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import Txt from '../components/Txt';

/**
 * add list screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function AddListScreen({navigation}) {

    const  {selectors} = useApp();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Txt _style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                {t(selectors.getLang()).group.CREATE_GROUP}
            </Txt>
            <Txt _style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                {t(selectors.getLang()).event.CREATE_EVENT}
            </Txt>
            <Txt _style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                {t(selectors.getLang()).ADD_CONTACT_PERSON}
            </Txt>
            <Button  
                    style={{ paddingLeft: 10 }}  
                    onPress={() => navigation.openDrawer()}
                    title='Open Drawer' 
                    name="md-menu"  
                    size={30}  
                />
      </View>

    );
  }

