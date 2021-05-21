import React from 'react';
import Spin from '../animations/Spin';
import MiniLogo from '../logo/MiniLogo';
import { miniLoader, logo } from '../../assets/styles/styles';
import globalStyles from '../../assets/styles/global';

/**
 * mini loader with logo
 * 
 * @returns 
 */
export default function MiniLoader() {

  return (
    <Spin _style={[globalStyles.justifyCenter, globalStyles.alignCenter, {height: 40, width: 40}, globalStyles.m_5]}>
        <MiniLogo _style={logo.mini} />
    </Spin>
  );
}