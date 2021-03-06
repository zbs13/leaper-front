import React, {useEffect, useState} from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useApp from './hooks/useApp';
import LeftToggleMenu from './components/Menus/LeftToggleMenu';
import Search from './components/Search';

export default function Main() {

    const [state, setState] = useState({
        lang: "fr",
        isLoaded: false
    });

    const {actions, selectors} = useApp();

    useEffect(() => {
        AsyncStorage.getItem("lang").then(val => {
            if(val !== state.lang){
            AsyncStorage.setItem("lang", "en").then(() => {
                setState({
                    lang: "en",
                    isLoaded: true
                });
                actions.updateUserParameters({
                    lang: "en"
                })
            });
            }else{
                setState({
                    ...state,
                    isLoaded: true
                });
            }
        })
    }, [state.lang])

    if(state.isLoaded){
        return (
            <>
                <LeftToggleMenu />
                {selectors.getSearchBar() !== null 
                    ?
                        <Search type={selectors.getSearchBar()} />
                    :
                        null
                }
            </>
        );
    }else{
        return(<Text>aaa</Text>)
    }
}