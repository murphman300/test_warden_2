import React, {useCallback, useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NativeModules} from 'react-native';
import CenteredSection from '../../utils/centered-section';
import FullyCenteredSection from '../../utils/fully-centered-section';
import FullyCenteredTextSection from '../../utils/centered-fully-centered-text-section';
import Section from '../../utils/section';
import {Title} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import mainTheme from '../../styles/theme';

const {NetworkModule} = NativeModules;

const buttonComp = (title, actionOnClick, accountState) => {
  return !accountState ? (
    <CenteredSection
      style={{
        marginTop: 0,
      }}>
      <Button title={title} onPress={actionOnClick} />
    </CenteredSection>
  ) : null;
};

const NoWalletSavedTextSection = () => (
  <FullyCenteredTextSection
    title={'Your Wallet'}
    subText={'Select one of the following options to get started'}
    style={{
      marginTop: 0,
    }}
    subTextStyle={{
      fontSize: 15,
      paddingTop: 20,
      width: '80%',
      textAlign: 'center',
    }}
  />
);

const BalancesController = ({navigation, children, title}): Node => {
  const [accountState, setAccountState] = useState(null);
  const [renderedOnce, setRenderedOnce] = useState(false);
  const [fetchedWalletsAlone, setFetchedWalletsAlone] = useState(false);
  const [displayWallets, setDisplayWallets] = useState(false);

  const [wallets, setWallets] = useState([]);

  const accountCreate = () => {
    console.log('wallet create');
    navigation.navigate('CreateWalletController');
    // navigation.
  };

  const walletLink = () => {
    console.log('wallet link');
    navigation.navigate('LinkWalletController');
  };

  const switchWallet = () => {
    setDisplayWallets(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadedWalletsFromDisk = () => {
    NativeModules.AddressManager.loadWallets()
      .then(r => {
        console.log('Result:');
        console.log(r);
        fetchWallets();
      })
      .catch(console.log);
  };

  const fetchWallets = () => {
    NativeModules.AddressManager.getAllAddresses()
      .then(r => {
        console.log('Result for GetAll:');
        console.log(r);
        if (r) {
          const sorted = r.sort((a, b) => a.index < b.index);
          setWallets(sorted);
        }
        setFetchedWalletsAlone(true);
      })
      .catch(console.log);
  };

  useEffect(() => {
    console.log('LISTENING');
    const unsubscribe = navigation.addListener('focus', e => {
      loadedWalletsFromDisk();
    });
    const sub = navigation.addListener('transitionEnd', e => {
      fetchWallets();
    });
    if (!renderedOnce) {
      loadedWalletsFromDisk();
      setRenderedOnce(true);
      return unsubscribe;
    }
    return unsubscribe;
  }, [
    navigation,
    wallets,
    fetchedWalletsAlone,
    renderedOnce,
    loadedWalletsFromDisk,
  ]);

  if (fetchedWalletsAlone) {
    return (
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 100,
              paddingBottom: 50,
              showsVerticalScrollIndicator: true,
              // verticalScroll
              // flex: 1,
              // height: '100%',
            }}>
            <NoWalletSavedTextSection />
            {buttonComp('Create Wallet', accountCreate)}
            {buttonComp('Link Wallet', walletLink)}
            <FullyCenteredSection>
              {wallets.map(wallet => {
                return (
                  <Section key={`section-wallet-label-${wallet.name}`}>
                    <Title key={`section-wallet-label-text-${wallet.name}`}>
                      {wallet.name}
                    </Title>
                  </Section>
                );
              })}
            </FullyCenteredSection>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
  // loadedWalletsFromDisk();
  console.log('DIONG....');
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // flex: 1,
          height: '100%',
        }}>
        <FullyCenteredSection>
          <ActivityIndicator size={'large'} />
        </FullyCenteredSection>
        {/*<NoWalletSavedTextSection />*/}
        {/*{buttonComp('Create Wallet', accountCreate)}*/}
        {/*{buttonComp('Link Wallet', walletLink)}*/}
        {/*<FullyCenteredSection />*/}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BalancesController;
