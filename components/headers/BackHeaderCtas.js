import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { header } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import global from '../../providers/global';
import Cta from '../cta/Cta';

export default function BackHeaderCtas({type = "", options = [], action = () => {}}) {

    switch(type){
        case "add":
            return (
                <View>
                    <Cta _style={[header.headerIcons, globalStyles.p_10]} 
                        onPress={action}
                        value={<Ionicons style={[header.headerIcons, globalStyles.c_main]} name="add-outline" />}
                        underlayColor={global.colors.LIGHT_GREY}
                    />
                </View>
            );
        case "menu":
            return (
                <View>
                    <Cta _style={[header.headerIcons, globalStyles.p_10]} 
                        onPress={() => {}}
                        value={<Ionicons style={[header.headerIcons, globalStyles.c_main]} name="ellipsis-horizontal-outline" />}
                        underlayColor={global.colors.LIGHT_GREY}
                    />
                </View>
            );
        default: 
            return null;
    }
}
