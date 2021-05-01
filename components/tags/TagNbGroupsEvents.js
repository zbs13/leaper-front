import React from 'react';
import { View } from 'react-native';
import { tag } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';
import Txt from '../Txt';

/**
 * tag nb groups/events
 * 
 * @param {object} children for routing 
 * @returns 
 */
export default function TagNbGroupsEvents({children}) {
    return (
        <View style={[globalStyles.alignCenter, globalStyles.justifyCenter, tag.container, tag.groupsEvents]}>
            <Txt _style={tag.groupsEventsText} >{children}</Txt>
        </View>
    );
}
