import {currentUserWallet} from '../../native/user/defaults';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import FullyCenteredSection from '../fully-centered-section';

export const FullscreenSplashView = ({children, centeredStyles}) => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
        ...(centeredStyles ?? {}),
      }}>
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
          ...(centeredStyles ?? {}),
        }}>
        <FullyCenteredSection
          style={{
            height: '100%',
            ...(centeredStyles ?? {}),
          }}>
          {children}
        </FullyCenteredSection>
      </View>
    </SafeAreaView>
  );
};
