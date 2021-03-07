import React, { useEffect, createRef, useState } from 'react';
import { Text, View, Modal } from 'react-native';
import { SearchBar } from 'react-native-elements';
import useApp from '../hooks/useApp';
import Cta from './Cta';
import t from '../providers/lang/translations';
import globalStyles from '../assets/styles/global';
import{ cta, text } from '../assets/styles/styles';
import global from '../providers/global';

export default function Search({type}) {

    const {actions, selectors} = useApp();
    const [search, setSearch] = useState({
        value: "",
        res: []
    });

    const searchBarRef = createRef();

    useEffect(() => {
        setTimeout(() => {
            searchBarRef.current.focus();
        }, 400);
    }, [])

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
                    <SearchBar
                        placeholder={placeholder}
                        onChangeText={updateValue}
                        value={search.value}
                        platform={selectors.getOS()}
                        ref={searchBarRef}
                    />
                    <View style={[globalStyles.flex, globalStyles.flexRow, globalStyles.flexBetween, globalStyles.alignCenter, globalStyles.p_5]}>
                        <Text style={text.searchTitle}>{t(selectors.getLang()).SEARCH} : "{search.value}"</Text>
                        <Cta 
                            onPress={() => {
                                actions.updateUserParameters({
                                    searchBar: null
                                })
                            }} 
                            value={t(selectors.getLang()).CANCEL}
                            _style={[cta.main, cta.first]}
                            underlayColor={global.colors.LIGHT_GREY}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
