import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';
import { home, card } from '../../assets/styles/styles';

export default function GroupsEventsCardLoader() {
    return (
        <View style={home.view}>
            <View
                style={card.cardContainer}
            >
                <View style={[globalStyles.p_10, globalStyles.h_100, globalStyles.flexAround, globalStyles.alignStretch, globalStyles.flex, globalStyles.alignAround]}>
                    <Placeholder
                        Animation={Fade}
                        Left={props => (<PlaceholderMedia size={30} isRound={true} />)}
                        Right={props => (<PlaceholderMedia size={30} isRound={true} />)}
                    />
                    <Placeholder Animation={Fade}>
                        <PlaceholderLine width={50} />
                    </Placeholder>
                    <Placeholder
                        Animation={Fade}
                    >
                        <View style={globalStyles.flexRow}>
                            <PlaceholderMedia size={25} isRound={true} />
                            <PlaceholderMedia size={25} isRound={true} />
                        </View>
                    </Placeholder>
                </View>
            </View>
        </View>
    );
}