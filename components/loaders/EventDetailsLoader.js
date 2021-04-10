import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';
import { eventDetailsMap } from '../../assets/styles/styles';

export default function EventDetailsLoader() {
    return (
        <View>
            <View style={eventDetailsMap.container}>
                <Placeholder
                    Animation={Fade}
                    Left={props => (<PlaceholderMedia size="100%" />)}
                />
            </View>
            <View style={[globalStyles.m_10, globalStyles.flexColumn, globalStyles.mb_50]}>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine  />
                </Placeholder>
                <View style={[globalStyles.flexRow, globalStyles.m_10]}>
                    <View style={[globalStyles.flexColumn, {flex: 1}]}>
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                    </View>
                    <View style={[globalStyles.flexColumn, {flex: 1}]} >
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                    </View>
                    <View style={[globalStyles.flexColumn, {flex: 1}]} >
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                        <Placeholder Animation={Fade}>
                            <PlaceholderLine width={50} />
                        </Placeholder>
                    </View>
                </View>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine />
                </Placeholder>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine />
                </Placeholder>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine />
                </Placeholder>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine />
                </Placeholder>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine />
                </Placeholder>
                <Placeholder Animation={Fade}>
                    <PlaceholderLine width={60}/>
                </Placeholder>
            </View>
        </View>
    );
}