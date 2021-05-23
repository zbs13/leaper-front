import React from 'react';
import { View } from 'react-native';
import { Placeholder, Fade, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import globalStyles from '../../assets/styles/global';
import { profile } from '../../assets/styles/styles';

/**
 * user profile screen loader
 * 
 * @returns 
 */
export default function UserProfileLoader() {
    return (
        <View style={globalStyles.mpm}>
            <View style={[globalStyles.flexColumn, globalStyles.w_100, globalStyles.alignCenter, globalStyles.p_10, profile.header]}>
                <View style={[profile.headerPicContainer, globalStyles.m_10, globalStyles.justifyCenter, globalStyles.alignCenter]}>
                    <Placeholder Animation={Fade} >
                        <PlaceholderMedia isRound size={100} />
                    </Placeholder>
                </View>
                <View>
                    <Placeholder Animation={Fade} >
                        <PlaceholderLine />
                    </Placeholder>
                </View>
                <View style={globalStyles.mt_10}>
                    <Placeholder Animation={Fade} >
                        <PlaceholderLine />
                    </Placeholder>
                </View>
            </View>
            <View style={globalStyles.mt_10}>
                <Placeholder Animation={Fade} >
                    <PlaceholderLine width={40} />
                </Placeholder>
                <View style={[globalStyles.flexColumn, globalStyles.m_5, globalStyles.mb_20]}>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                </View>
                <Placeholder Animation={Fade} >
                    <PlaceholderLine width={40} />
                </Placeholder>
                <View style={[globalStyles.flexColumn, globalStyles.m_5, globalStyles.mb_20]}>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                    <View style={globalStyles.flexRow}>
                        <Placeholder Animation={Fade} >
                            <PlaceholderLine width={20} />
                        </Placeholder>
                    </View>
                </View>
                <Placeholder Animation={Fade} >
                    <PlaceholderLine width={40} />
                </Placeholder>
                <View style={[globalStyles.flexColumn, globalStyles.m_5, globalStyles.w_100]}>
                    <Placeholder Animation={Fade} >
                        <PlaceholderMedia style={globalStyles.w_100} />
                    </Placeholder>
                </View>
            </View>
        </View>
    );
}