import React from 'react';
import MainHeaderLeft from './MainHeaderLeft';
import MainHeaderRight from './MainHeaderRight';
import HeaderTitle from './HeaderTitle';
import NavigationBackIcon from '../NavigationBackIcon';

export default headerType = {
    main: (navigation) => ({
        headerTitle: (props) => (<MainHeaderLeft navigation={navigation} />),
        headerRight: () => (
            <MainHeaderRight />
        )
    }),
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
