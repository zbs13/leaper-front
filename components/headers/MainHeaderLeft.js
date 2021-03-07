import React from 'react';
import { View } from 'react-native';
import Logo from '../logo/Logo';
import globalStyles from '../../assets/styles/global';
import { header, logo } from '../../assets/styles/styles';
import Cta from '../Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';

export default function MainHeaderLeft({navigation}) {

    return (
        <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Cta _style={[header.headerIcons]} 
                onPress={() => navigation.openDrawer()}
                value={<Ionicons style={header.headerIcons} name="reorder-four-outline" />}
                underlayColor={global.colors.LIGHT_GREY}
            />
            <Logo _style={logo.header} />
        </View>
    );
}
