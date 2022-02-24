/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import './shim';
import React, {useState} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BalancesController from './controllers/balances';
import AccountController from './controllers/account';
import Section from './utils/section';
import backgroundStyle from './styles/background';
import mainTheme from './styles/theme';
import ModalViewController from './utils/controllers/modal';
import CreateWalletController from './controllers/create/wallet';
import LinkExternalWallet from './controllers/create/wallet-link';
import BalancesControllerAsClass from './controllers/balances/asclass';
import AvailableNetworksModalController from './controllers/create/network';
import ApplicationIsLaunchingViewController from './controllers/app/launching';
import NoWalletSelectedViewController from './controllers/app/no-wallet';
import WithWalletSelectedViewController from './controllers/app/with-wallet';

const BalancesControllerWrapper: () => Node = () => {
  return <BalancesControllerAsClass />;
};

const App: () => Node = () => {
  const [hasCurrentWalletSelected, setHasCurrentWalletSelected] =
    useState(null);
  const [appHasFinishedLaunching, setAppHasFinishedLaunching] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  const screenListenerStates = e => {
    console.log(e);
    console.log(e.type);
    console.log(e.data);
  };

  const focusStateListener = e => {
    // console.log(e);
    console.log(e.type);
    console.log(e.target);
  };

  const appIsFinishedLaunchingController = ({userWallet}) => {
    setAppHasFinishedLaunching(true);
    setHasCurrentWalletSelected(userWallet);
  };

  if (!appHasFinishedLaunching) {
    return (
      <ApplicationIsLaunchingViewController
        onFinishedHandler={appIsFinishedLaunchingController}
      />
    );
  }
  if (
    hasCurrentWalletSelected === null ||
    hasCurrentWalletSelected === undefined
  ) {
    return (
      <NoWalletSelectedViewController
        onSelectedWalletDetected={value => {
          setHasCurrentWalletSelected(value);
        }}
      />
    );
  }

  return (
    <WithWalletSelectedViewController
      currentWallet={hasCurrentWalletSelected}
    />
  );
};

export default App;
