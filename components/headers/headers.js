import React from 'react';
import MainHeaderLeft from './MainHeaderLeft';
import MainHeaderRight from './MainHeaderRight';
import HeaderTitle from './HeaderTitle';
import NavigationBackIcon from '../NavigationBackIcon';

export default headerType = {
    /**
     * main header
     * 
     * @param {object} navigation for routing
     * @returns 
     */
    main: (navigation) => ({
        headerTitle: "",
        headerLeft: (props) => (<MainHeaderLeft navigation={navigation} />),
        headerRight: () => (
            <MainHeaderRight />
        )
    }),
    /**
     * back header
     * 
     * @param {object} navigation for routing
     * @param {string} title value to be displayed as title in header
     * @param {component} headerRight component to be displayed at the header's right
     * @returns 
     */
    back: (navigation, title = "...", headerRight = null) => ({
        headerTitle: props => <HeaderTitle title={title}/>,
        headerLeft: () => (
            <NavigationBackIcon navigation={navigation} />
        ),
        headerRight: () => {
            if(headerRight !== null){
                return headerRight
            }

            return null;
        }
    })
}
