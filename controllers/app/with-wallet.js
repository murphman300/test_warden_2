/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScrollView, StatusBar, Text, useColorScheme, View} from 'react-native';

import {
  DebugInstructions,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BalancesController from '../balances';
import AccountController from '../account';
import CreateWalletController from '../create/wallet';
import LinkExternalWallet from '../create/wallet-link';

const WithWalletSelectedViewController: () => Node = ({currentWallet}) => {
  const [usersCurrentWallet, setUsersCurrentWallet] = useState(currentWallet);

  const isDarkMode = useColorScheme() === 'dark';

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}
        screenListeners={{}}>
        {/*<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />*/}
        <Stack.Group>
          <Stack.Screen name="Home">
            {() => (
              <Tab.Navigator screenOptions={{headerShown: false}}>
                <Tab.Screen name="Wallet" component={BalancesController} />
                <Tab.Screen name="Account" component={AccountController} />
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="CreateWalletController"
            component={CreateWalletController}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="LinkWalletController"
            component={LinkExternalWallet}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default WithWalletSelectedViewController;
