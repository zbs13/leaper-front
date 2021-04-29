import React from 'react';
import { Text } from 'react-native';
import global from '../providers/global';
import { ellipsisText } from '../utils/utils';

/**
 * custom text component
 * 
 * @param {component} children children component
 * @param {number} ellipsis max char before ellipsis
 * @param {string} color text color
 * @returns 
 */
export default function Txt({children, ellipsis = null, color = null, _style = {}, onPress = null}) {

    let globalStyle = {color: color !== null ? color : global.colors.ANTHRACITE};
    let __style = _style instanceof Array ? [globalStyle, ..._style] : [globalStyle, _style]

    return (
        <Text
            style={__style}
            onPress={onPress}
        >
            {ellipsis !== null ?
                ellipsisText(children, ellipsis)
            :
                children
            }
        </Text>
    );
}
