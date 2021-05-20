import React from 'react';
import MainHeaderLeft from './MainHeaderLeft';
import MainHeaderRight from './MainHeaderRight';
import HeaderTitle from './HeaderTitle';
import NavigationBackIcon from '../NavigationBackIcon';

export default headerType = {
    /**
     * main header
     * 
     * @returns 
     */
    main: () => ({
        headerTitle: "",
        headerLeft: (props) => (<MainHeaderLeft />),
        headerRight: () => (
            <MainHeaderRight />
        )
    }),
    /**
     * back header
     * 
     * @param {string} title value to be displayed as title in header
     * @param {component} headerRight component to be displayed at the header's right
     * @returns 
     */
    back: (title = "", headerRight = null) => ({
        headerTitle: props => <HeaderTitle title={title}/>,
        headerLeft: () => (
            <NavigationBackIcon />
        ),
        headerRight: () => {
            if(headerRight !== null){
                return headerRight
            }

            return null;
        }
    })
}
