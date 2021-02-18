import React from 'react';
import { View } from 'react-native';
import HeaderLogo from '../logo/HeaderLogo';
import globalStyles from '../../assets/styles/global';
import styles from '../../assets/styles/styles';
import Cta from '../Cta';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';

export default function MainHeaderLeft({navigation}) {

    return (
        <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.alignCenter]}>
            <Cta _style={[styles.headerIcons]} 
                onPress={() => navigation.openDrawer()}
                value={<Ionicons style={styles.headerIcons} name="reorder-four-outline" />}
                underlayColor={global.colors.LIGHT_GREY}
            />
            <HeaderLogo />
        </View>
    );
}
