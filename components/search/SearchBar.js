import React, { useEffect } from 'react';
import { SearchBar } from 'react-native-elements';
import global from '../../providers/global';
import useApp from '../../hooks/useApp';

/**
 * search bar
 * 
 * @param {object} props search bar props => _ref, placeholder, onChangeText, value, cancelButtonTitle, onCancel
 * @returns 
 */
export default function SB(props) {

    const {selectors} = useApp();

    if(typeof props._ref !== "undefined"){
      useEffect(() => {
          setTimeout(() => {
              (props._ref).current.focus();
          }, 400);
      }, [])
    }

    return (
        <SearchBar
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          value={props.value}
          ref={props._ref || null}
          platform={selectors.getOS()}
          cancelButtonTitle={props.cancelButtonTitle}
          containerStyle={{backgroundColor: "transparent"}}
          cancelButtonProps={{color: global.colors.MAIN_COLOR}}
          onCancel={props.onCancel !== undefined ? props.onCancel : () => {}}
      />
    );
}
