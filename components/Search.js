import React, { useState } from 'react';
import { Text, View, Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import useApp from '../hooks/useApp';
import Cta from './Cta';

export default function Search({type}) {

    const {actions} = useApp();

    const [value, setValue] = useState("");

    let updateValue = (value) => {
        setValue(value);
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={true}
                onRequestClose={() => {
                    actions.updateUserParameters({
                        searchBar: null
                    })
                }}
            >
                <View>
                    <SearchBar
                        placeholder="Type Here..."
                        onChangeText={updateValue}
                        value={value}
                    />
                    <Cta 
                        onPress={() => {
                            actions.updateUserParameters({
                                searchBar: null
                            })
                        }} 
                        value="close" 
                    />
                    <Text>{value}</Text>
                </View>
            </Modal>
        </View>
    );
}
