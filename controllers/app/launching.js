import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  NativeModules,
  ActivityIndicator,
  Image,
} from 'react-native';
import FullyCenteredSection from '../../utils/fully-centered-section';
import {currentUserWallet} from '../../native/user/defaults';
import {FullscreenSplashView} from '../../utils/views/fullscreen-splash';
import {imageStyles} from '../account';

const ApplicationIsLaunchingViewController = ({onFinishedHandler}) => {
  const handleCheckingForUserDefaults = () => {
    NativeModules.AddressManager.loadWallets()
      .then(r => {
        console.log('Result:');
        console.log(r);
        currentUserWallet()
          .then(v => {
            if (onFinishedHandler) {
              return onFinishedHandler({userWallet: v});
            }
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(console.log);
  };

  useEffect(() => {
    handleCheckingForUserDefaults();
  });

  return (
    <FullscreenSplashView>
      <Image
        style={{
          ...imageStyles.tinyLogo,
          margin: 30,
          paddingBottom: 10,
        }}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <ActivityIndicator size={'large'} />
    </FullscreenSplashView>
  );
};

export default ApplicationIsLaunchingViewController;
