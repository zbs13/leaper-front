import React, { createRef, useState } from 'react';
import { Text, View, Modal } from 'react-native';
import SB from './SearchBar';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import globalStyles from '../../assets/styles/global';
import{ text } from '../../assets/styles/styles';

export default function Search({type}) {

    const {actions, selectors} = useApp();
    const [search, setSearch] = useState({
        value: "",
        res: []
    });

    const searchBarRef = createRef();

    let updateValue = (value) => {
        setSearch({
            value: value
        });
    }

    let placeholder;
    switch(type){
        case "global":
            placeholder = t(selectors.getLang()).search.GLOBAL;
            break;
        default:
            placeholder = t(selectors.getLang()).search.GLOBAL;
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
                    <SB
                        placeholder={placeholder}
                        onChangeText={updateValue}
                        value={search.value}
                        _ref={searchBarRef}
                        cancelButtonTitle={t(selectors.getLang()).CANCEL}
                        onCancel={() => {
                            actions.updateUserParameters({
                                searchBar: null
                            })
                        }}
                    />
                    <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter, globalStyles.p_5]}>
                        <Text style={text.searchTitle}>{t(selectors.getLang()).SEARCH} : "{search.value}"</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
