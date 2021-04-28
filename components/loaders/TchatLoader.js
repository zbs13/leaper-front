import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';
import { messageCard } from '../../assets/styles/styles';

/**
 * tchat screen loader
 * 
 * @returns 
 */
export default function TchatLoader() {
    return (
        <View style={globalStyles.flexColumn}>
            <View style={[messageCard.container, globalStyles.flexRow]}>
                <View style={[globalStyles.flexColumn, globalStyles.alignCenter]}>
                    <View style={messageCard.profilePicContainer}>

                        <Placeholder
                            Animation={Fade}
                            Left={() => <PlaceholderMedia isRound={true} size={40} />}
                        />

                    </View>
                </View>
                <View style={globalStyles.w_100}>
                    <View>
                        <View style={globalStyles.flexColumn}>
                            <Placeholder Animation={Fade} >
                                <PlaceholderLine width={20} style={globalStyles.m_5} />
                            </Placeholder>
                            <View style={[messageCard.content, messageCard.contentNotMy]}>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine />
                                </Placeholder>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine />
                                </Placeholder>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine />
                                </Placeholder>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine width={30} />
                                </Placeholder>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[messageCard.container, globalStyles.flexRow]}>
                <View style={[globalStyles.flexColumn, globalStyles.alignCenter]}>
                    <View style={messageCard.profilePicContainer}>

                        <Placeholder
                            Animation={Fade}
                            Left={() => <PlaceholderMedia isRound={true} size={40} />}
                        />

                    </View>
                </View>
                <View style={globalStyles.w_100}>
                    <View>
                        <View style={globalStyles.flexColumn}>
                            <Placeholder Animation={Fade} >
                                <PlaceholderLine width={20} style={globalStyles.m_5} />
                            </Placeholder>
                            <View style={[messageCard.content, messageCard.contentNotMy]}>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine />
                                </Placeholder>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine width={30} />
                                </Placeholder>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[messageCard.container, globalStyles.flexRow]}>
                <View style={[globalStyles.flexColumn, globalStyles.alignCenter]}>
                    <View style={messageCard.profilePicContainer}>

                        <Placeholder
                            Animation={Fade}
                            Left={() => <PlaceholderMedia isRound={true} size={40} />}
                        />

                    </View>
                </View>
                <View style={{width: 100}}>
                    <View>
                        <View style={globalStyles.flexColumn}>
                            <Placeholder Animation={Fade} >
                                <PlaceholderLine width={50} style={globalStyles.m_5} />
                            </Placeholder>
                            <View style={[messageCard.content, messageCard.contentNotMy]}>
                                <Placeholder Animation={Fade} >
                                    <PlaceholderLine />
                                </Placeholder>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}