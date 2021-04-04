import React from 'react';
import { View } from 'react-native';
import globalStyles from '../../assets/styles/global';
import LeftToggleMenu from '../menus/LeftToggleMenu';


import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';

export default function MainHeaderLeft({navigation}) {

    const  {selectors} = useApp();

    return (
        <View style={[globalStyles.m_10, globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <LeftToggleMenu
            arrayValue= {
                [
                    {
                        value: t(selectors.getLang()).CREATE_GROUP,
                        link: ""
                    },{
                        value: t(selectors.getLang()).CREATE_EVENT,
                        link: ""
                    },{
                        value: t(selectors.getLang()).ADD_CONTACT_PERSON,
                        link: ""
                    }
                ]
            }  
            title={t(selectors.getLang()).ADD} 
            />
        </View>
    );
}
