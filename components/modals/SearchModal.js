import React, { createRef, useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import SB from '../search/SearchBar';
import useApp from '../../hooks/useApp';
import t from '../../providers/lang/translations';
import globalStyles from '../../assets/styles/global';
import{ text } from '../../assets/styles/styles';
import Txt from '../Txt';

/**
 * search modal
 * 
 * @param {string} type search modal type => global 
 * @returns 
 */
export default function SearchModal({type}) {

    const {actions, selectors} = useApp();
    const [search, setSearch] = useState({
        value: "",
        res: []
    });

    useEffect(() => {
        console.log("zojed");
    }, [search.value])

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
                    actions.toggleSearchBar(null)
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
                        <Txt _style={text.searchTitle}>{t(selectors.getLang()).SEARCH} : "{search.value}"</Txt>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
