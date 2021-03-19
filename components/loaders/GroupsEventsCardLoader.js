import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';
import { home } from '../../assets/styles/styles';

export default function GroupsEventsCardLoader() {
    return (
        <View style={home.view}>
            <View style={[home.cardContainer, globalStyles.alignCenter]}>
                <Placeholder
                    Animation={Fade}
                    Left={props => (<PlaceholderMedia isRound={true} />)}
                    Right={props => (<PlaceholderMedia isRound={true} />)}
                >
                </Placeholder>
                <Placeholder
                    Animation={Fade}
                >
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
    );
}