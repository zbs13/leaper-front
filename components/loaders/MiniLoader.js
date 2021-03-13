import React from 'react';
import Spin from '../animations/Spin';
import MiniLogo from '../logo/MiniLogo';
import { miniLoader, logo } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';

export default function MiniLoader() {

  return (
    <Spin _style={[miniLoader.main, globalStyles.justifyCenter]}>
        <MiniLogo _style={logo.mini} />
    </Spin>
  );
}