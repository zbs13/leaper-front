import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';

const useKeyboard = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
  
    function onKeyboardDidShow(e) {
      setKeyboardHeight(e.endCoordinates.height);
    }
  
    function onKeyboardDidHide() {
      setKeyboardHeight(0);
    }
  
    useEffect(() => {
      Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
      return () => {
        Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
      };
    }, []);
  
    return [keyboardHeight];
};

export default useKeyboard;