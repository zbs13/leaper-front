import React from 'react';
import { Text, View, Button } from 'react-native';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';

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
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                {t(selectors.getLang()).group.CREATE_GROUP}
            </Text>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                {t(selectors.getLang()).event.CREATE_EVENT}
            </Text>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20}}>
                {t(selectors.getLang()).ADD_CONTACT_PERSON}
            </Text>
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

