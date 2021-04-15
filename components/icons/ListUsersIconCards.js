import React from 'react';
import { View } from 'react-native';
import { randId } from '../../utils/utils';
import TagNbGroupsEvents from '../tags/TagNbGroupsEvents';
import ImageIcon from '../icons/ImageIcon';

/**
 * create users icon in cards
 * 
 * @param {object} users users list 
 * @returns 
 */
export default function ListUsersIconCards({users}) {

    return (
        <View style={globalStyles.flexRow}>
            {users.map((val, idx) => idx > users.length - 6 ? <ImageIcon key={randId()} src={val.src} /> : null)}
            {users.length > 5 ? <TagNbGroupsEvents>+{users.length - 5}</TagNbGroupsEvents> : null}
        </View>
    );
}
