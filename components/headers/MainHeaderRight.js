import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import Cta from '../cta/Cta';
import { header } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import useApp from '../../hooks/useApp';
import RightToggleMenu from '../menus/RightToggleMenu';

/**
 * main header right component
 * 
 * @returns 
 */

export default function MainHeaderRight() {

    const {actions} = useApp();

    const [mainHeaderState, setMainHeaderState] = useState({
        profilePic: null
    });

    return (
        <View style={header.headerRightContainer}>
            <Cta _style={[header.headerIcons, globalStyles.p_10]} 
                onPress={() => actions.toggleSearchBar("global")}
                value={<Ionicons style={header.headerIcons} name="search-outline" />}
                underlayColor={global.colors.LIGHT_GREY}
            />
            <RightToggleMenu></RightToggleMenu>
        </View>
    );
}
