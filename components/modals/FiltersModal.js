import React from 'react';
import { View, Text } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Cta from '../Cta';

export default function FiltersModal({setCriteria}){

    const sheetRef = React.useRef(null);

    return (
        <BottomSheet
            ref={sheetRef}
            snapPoints={[35, "50%"]}
            initialSnap={0}
            renderHeader={() => (
                <Cta _style={{borderTopLeftRadius: 5, borderTopRightRadius: 5, height: 40, backgroundColor: "blue"}}
                    value="Header"
                    onPress={() => sheetRef.current.snapTo(1)}
                />
            )}
            renderContent={() => (
            <View style={{height: 500, backgroundColor: "red"}}>
                <Text>
                    aaaa
                </Text>
            </View>
            )}
        />
    );
}