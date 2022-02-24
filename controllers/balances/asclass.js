import React, {Button, SafeAreaView, ScrollView} from 'react-native';
import {Component} from 'react';
import {NativeModules} from 'react-native';
import CenteredSection from '../../utils/centered-section';
import FullyCenteredSection from '../../utils/fully-centered-section';
import FullyCenteredTextSection from '../../utils/centered-fully-centered-text-section';
import Section from '../../utils/section';
import {Title} from 'react-native-paper';
import {MainButton} from '../../utils/buttons/main';

const accountCreate = ({navigation}) => {
  console.log('wallet create');
  navigation.navigate('CreateWalletController');
};

const walletLink = ({navigation}) => {
  console.log('wallet link');
  navigation.navigate('LinkWalletController');
};

const buttonComp = ({title, actionOnClick, accountState}) => {
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

export default class BalancesControllerAsClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallets: [],
      accountState: null,
    };
  }

  setWallet(newValue) {
    let existing = this.state.wallets.map(wall => Object.assign({}, wall));
    existing.push(newValue);
    this.setState({...this.state, wallet: existing});
  }

  componentDidMount() {
    console.log('Did Mount');
    // NativeModules.AddressManager.loadWallets()
    //   .then(r => {
    //     console.log('Result:');
    //     console.log(r);
    //     NativeModules.AddressManager.getAllAddresses()
    //       .then(ws => {
    //         this.setState(state => {
    //           let wallets = state.list;
    //           for (let wallet in ws) {
    //             wallets.push(wallet);
    //           }
    //           return {
    //             ...state,
    //             wallets,
    //           };
    //         });
    //       })
    //       .catch(console.log);
    //   })
    //   .catch(console.log);
  }

  render() {
    console.log('OKKKKKKKK');
    return (
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: '100%',
          }}>
          {() =>
            this.state.wallets.length > 0 ? null : (
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
            )
          }
          {/*<FullyCenteredSection>*/}
          {/*</FullyCenteredSection>*/}
          {this.state.wallets.map(wallet => {
            return (
              <Section>
                <Title>{wallet.name}</Title>
              </Section>
            );
          })}
          <CenteredSection
            style={{
              marginTop: 0,
            }}>
            <MainButton title={'Create Wallet'} onClick={accountCreate} />
          </CenteredSection>
          {/*{buttonComp('Create Wallet', accountCreate)}*/}
          {buttonComp('Link Wallet', walletLink)}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
