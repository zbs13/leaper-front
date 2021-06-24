import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import TagNbGroupsEvents from '../tags/TagNbGroupsEvents';
import ImageIcon from '../icons/ImageIcon';
import useFirebase from '../../hooks/useFirebase';

/**
 * create users icon in cards
 * 
 * @param {object} users users list 
 * @returns 
 */
export default function ListUsersIconCards({users}) {

    const {actions: firebase} = useFirebase();
    const [profilePics, setProfilePics] = useState([]);

    useEffect(() => {
        let res = profilePics;
        let isMounted = true;
        if(isMounted){
            users.map((value, index) => {
                if (index < 6 && res.length < users.length) {
                    firebase.getUserProfilePic(value.id).then(function(url){
                        res.push(url);
                        setProfilePics(res);
                    })
                }
            })
        }
        return () => { isMounted = false };
    }, [])

    return (
        <View style={globalStyles.flexRow}>
            {profilePics.map((url, idx) => <ImageIcon key={idx} src={url || require("../../assets/img/icons/default_profile_pic.png")} />)}
            {users.length > 5 ? <TagNbGroupsEvents>+{users.length - 5}</TagNbGroupsEvents> : null}
        </View>
    );
}
