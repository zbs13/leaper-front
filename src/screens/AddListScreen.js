import React from 'react';
import { Text, View, Button } from 'react-native';
import PopupBottom from '../../components/PopupBottom';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';

export default function AddListScreen({ navigation }) {

    const { selectors } = useApp();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                {t(selectors.getLang()).CREATE_GROUP}
            </Text>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                {t(selectors.getLang()).CREATE_EVENT}
            </Text>
            <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>
                {t(selectors.getLang()).ADD_CONTACT_PERSON}
            </Text>
            <PopupBottom arrayValue={
                [
                    {
                        value: t(selectors.getLang()).CREATE_GROUP,
                        link: ""
                    }, {
                        value: t(selectors.getLang()).CREATE_EVENT,
                        link: ""
                    }, {
                        value: t(selectors.getLang()).ADD_CONTACT_PERSON,
                        link: ""
                    }
                ]
            }
                title={t(selectors.getLang()).ADD} />
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

