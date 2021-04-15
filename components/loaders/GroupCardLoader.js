import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';
import { card } from '../../assets/styles/styles';

/**
 * group card loader
 * 
 * @returns 
 */
export default function GroupCardLoader() {
    return (
        <View style={card.view}>
            <View
                style={[card.cardContainer, globalStyles.flexRow, globalStyles.alignCenter, globalStyles.flexBetween, globalStyles.justifyStart]}
            >
                <View style={[globalStyles.m_10, {flex: 1}]}>
                    <Placeholder
                        Animation={Fade}
                        Left={() => <PlaceholderMedia isRound={true} size={90} />}
                    />
                </View>
                <View style={[globalStyles.flexColumn, globalStyles.m_10, globalStyles.h_100, globalStyles.flexAround, {flex: 2}]}>
                    <Placeholder Animation={Fade} >
                        <PlaceholderLine />
                    </Placeholder>
                    <Placeholder Animation={Fade} >
                        <PlaceholderLine />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                        Left={() => <PlaceholderMedia style={{margin: 5}} size={25} isRound={true} />}
                    >
                        <View style={globalStyles.flexRow}>
                            <PlaceholderMedia style={{margin: 5}} size={25} isRound={true} />
                            <PlaceholderMedia style={{margin: 5}} size={25} isRound={true} />
                        </View>
                    </Placeholder>
                </View>
                <View style={[globalStyles.m_10, globalStyles.justifyEnd, globalStyles.h_100, globalStyles.flexAround, {flex: 1}]}>
                    <Placeholder
                        Animation={Fade}
                        Left={PlaceholderLine}
                    />
                </View>
            </View>
        </View>
    );
}