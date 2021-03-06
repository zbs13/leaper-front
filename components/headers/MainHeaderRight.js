import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import Search from '../Search';
import Cta from '../Cta';
import styles from '../../assets/styles/styles';
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
        <View style={styles.headerRightContainer}>
            <Cta _style={[styles.headerIcons, globalStyles.p_10]} 
                onPress={() => actions.updateUserParameters({
                    searchBar: "global"
                })}
                value={<Ionicons style={styles.headerIcons} name="search-outline" />}
                underlayColor={global.colors.LIGHT_GREY}
            />
            <Cta _style={[styles.headerProfilePic, globalStyles.m_10]} 
                onPress={() => alert("bbaab")}
                backgroundImage={mainHeaderState.profilePic === null ? require('../../assets/img/default_profile_pic.png') : ''} //a changer selon recuperation depuis api
            />
        </View>
    );
}
