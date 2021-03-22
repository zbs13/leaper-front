import React from 'react';
import { Animated, Easing} from 'react-native';

export default function Spin({children, _style}) {

    const spinValue = new Animated.Value(0);

    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 3000,
                easing: Easing.linear,
                useNativeDriver: true 
            }
        )
    ).start()

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    return (
        <Animated.View style={[_style, {transform: [{rotate: spin}] }]}>
            {children}
        </Animated.View>
    );
}