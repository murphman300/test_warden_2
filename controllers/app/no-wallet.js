import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import CreateWalletController from '../create/wallet';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainButton} from '../../utils/buttons/main';
import CenteredSection from '../../utils/centered-section';
import {currentUserWallet} from '../../native/user/defaults';
import mainStyle from '../../styles';
import FullyCenteredSection from '../../utils/fully-centered-section';

const NoWalletSelectedViewController = ({onSelectedWalletDetected}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const Stack = createNativeStackNavigator();

  const NoWalletBaseController = ({navigation}) => {
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', e => {
        currentUserWallet()
          .then(v => {
            if (v && onSelectedWalletDetected) {
              setTimeout(() => onSelectedWalletDetected(v), 1000);
            }
          })
          .catch(console.log);
      });
      return unsubscribe;
    });
    return (
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // flex: 1,
            height: '100%',
          }}>
          <View
            style={{
              height: '40%',
              // backgroundColor: 'blue',
            }}>
            <FullyCenteredSection>
              <View
                style={{
                  width: '100%',
                }}>
                <Text
                  style={{
                    ...mainStyle.sectionTitle,
                    textAlign: 'center',
                  }}>
                  Welcome!
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                }}>
                <Text
                  style={{
                    ...mainStyle.sectionDescription,
                    textAlign: 'center',
                    marginTop: 30,
                  }}>
                  Let's get you setup
                </Text>
              </View>
            </FullyCenteredSection>
          </View>
          <CenteredSection
            style={{
              padding: 0,
            }}>
            <View>
              <View
                style={{
                  width: '100%',
                }}>
                <Text style={mainStyle.sectionSubTitle}>Get started</Text>
              </View>
              <MainButton
                title={'New Wallet'}
                style={{
                  minWidth: '100%',
                  marginHorizontal: 0,
                }}
                onClick={() => {
                  navigation.navigate('NoWalletToCreateWalletController');
                }}
              />
            </View>
          </CenteredSection>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Stack.Navigator
        initialRouteName="noWalletViewBaseController"
        screenOptions={{headerShown: false}}
        screenListeners={{}}>
        <Stack.Group>
          <Stack.Screen
            name="noWalletViewBaseController"
            component={NoWalletBaseController}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name="NoWalletToCreateWalletController"
            component={CreateWalletController}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NoWalletSelectedViewController;
