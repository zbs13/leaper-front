import React, {useState, useEffect} from 'react';
import { View } from 'react-native';
import Cta from '../cta/Cta';
import { header } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import global from '../../providers/global';
import useApp from '../../hooks/useApp';

export default function MainHeaderRight() {

    const {actions} = useApp();

    const [mainHeaderState, setMainHeaderState] = useState({
        profilePic: null
    });

    useEffect(() => {
        
    }, [])

    return (
        <View style={header.headerRightContainer}>
            <Cta _style={[header.headerIcons, globalStyles.p_10]} 
                onPress={() => actions.updateUserParameters({
                    searchBar: "global"
                })}
                value={<Ionicons style={header.headerIcons} name="search-outline" />}
                underlayColor={global.colors.LIGHT_GREY}
            />
            <Cta _style={[header.headerProfilePic, globalStyles.m_10]} 
                onPress={() => alert("bbaab")}
                backgroundImage={mainHeaderState.profilePic === null ? require('../../assets/img/default_profile_pic.png') : ''} //a changer selon recuperation depuis api
            />
        </View>
    );
}
