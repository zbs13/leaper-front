import React from 'react';
import HeaderLogo from '../logo/HeaderLogo';
import MainHeaderRight from './MainHeaderRight';

export default mainHeader = {
    headerTitle: (props) => (<HeaderLogo />),
    headerRight: () => (
        <MainHeaderRight />
    )
}
