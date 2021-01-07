import React from 'react';
import {StatusBar} from 'react-native';
import {AuthProvider} from './AuthProvider';
import Routes from './Routes';
import CommonColors from '../utils/CommonColors';
/**
 * Wrap all providers here
 */

export default function Providers() {
  return (
    <AuthProvider>
      <StatusBar barStyle="light-content" backgroundColor={CommonColors.BLUE} />
      <Routes />
    </AuthProvider>
  );
}
