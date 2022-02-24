import React from 'react';
import {
  Keyboard,
  NativeModules,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ModalViewController from '../../utils/controllers/modal';
import Section from '../../utils/section';
import mainTheme from '../../styles/theme';
import {useState} from 'react';
import inputStyles from '../../styles/inputs';
import {BaseButton, MainButton, SpinnerButton} from '../../utils/buttons/main';
import thisTextColor from '../../styles/text-color';
import CenteredSection from '../../utils/centered-section';
import AvailableNetworksModalController from './network';
import {saveUserWalletSetting} from '../../native/user/defaults';

const styles = StyleSheet.create({
  sectionTitles: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  sectionStaticTextlabels: {
    fontWeight: 'normal',
    fontSize: 16,
  },
  sectionableInputStyles: {
    ...inputStyles.multilineInput,
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    borderColor: mainTheme.colors.mainColorOpaque,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
});

const CreateWalletController = ({navigation}) => {
  const [name, setName] = useState(null);
  const [address, setaddress] = useState(null);
  const [network, setNetwork] = useState(null);
  const [mnemonic, setMnemonic] = useState(null);
  const [generatingMnemonic, setGeneratingMnemonic] = useState(false);
  const [networkPickerIsVisible, setNetworkPickerIsVisible] = useState(null);
  const [availableNetworksOptions, setavailableNetworksOptions] = useState([]);
  const Touchable =
    Platform.OS === 'android3' ? TouchableNativeFeedback : TouchableOpacity;

  const anyFieldIsEmpty = () => {
    let ok = false;
    for (let check of [name, network, mnemonic]) {
      ok = check === null || check === '';
      if (ok) {
        return true;
      }
    }
    return false;
  };

  const handlePopUpNetworkSelectModule = () => {
    // navigation.navigate('AvailableNetworksModalController');/

    NativeModules.NetworkModule.availableNetworks()
      .then(options => {
        console.log(options);
        setavailableNetworksOptions(options);
        setNetworkPickerIsVisible(true);
      })
      .catch(console.log);
  };

  const handleGeneratingMnemonic = () => {
    console.log(NativeModules.MnemonicModule, 'HELLOOOOOOOOOOOOO');
    if (generatingMnemonic) {
      return;
    }
    setGeneratingMnemonic(!generatingMnemonic);
    NativeModules.MnemonicModule.generateBip32('uh oh')
      .then(r => {
        console.log(r);
        console.log('WHAT');
        setMnemonic(r);
        setGeneratingMnemonic(false);
      })
      .catch(console.log);
  };

  const handleSaveWallet = () => {
    let entry = {
      name,
      network,
      address,
      seed: mnemonic,
    };
    console.log(entry);

    NativeModules.AddressManager.createAddress(entry)
      .then(r => {
        console.log('Result:');
        console.log(r);
        if (!r.id) {
          console.log('Error - No Wallet object returned from native layer');
          return;
        }
        saveUserWalletSetting(r.id)
          .then(_ => {
            navigation.goBack();
          })
          .catch(console.log);
      })
      .catch(console.log);
  };

  console.log('OPTIONS ARE');

  console.log(availableNetworksOptions);

  const NetworkInputSection = ({value}) => {
    console.log(value);
    console.log('VALUE FROM NetworkInputSection');
    if (value) {
      return (
        <View
          style={{
            width: '100%',
            margin: 0,
          }}>
          <View
            style={{
              ...styles.sectionableInputStyles,
              marginHorizontal: 0,
            }}
            onPress={() => {
              setNetworkPickerIsVisible(true);
            }}>
            <View>
              <Text style={styles.sectionStaticTextlabels}>
                {value.header ?? value}
              </Text>
            </View>
          </View>
          <MainButton
            title={'Select Network'}
            style={{
              minWidth: '100%',
              marginHorizontal: 0,
              marginTop: 0,
            }}
            onClick={() => {
              handlePopUpNetworkSelectModule();
            }}
          />
        </View>
        // <Pressable
        //   style={styles.sectionableInputStyles}
        //   onPress={() => {
        //     setNetworkPickerIsVisible(true);
        //   }}>
        //   <View>
        //     <Text style={styles.sectionStaticTextlabels}>{value}</Text>
        //   </View>
        // </Pressable>
      );
    }

    return (
      <MainButton
        title={'Select Network'}
        style={{
          minWidth: '100%',
          marginHorizontal: 0,
        }}
        onClick={() => {
          handlePopUpNetworkSelectModule();
        }}
      />
    );
  };

  const MnemonicSection = ({value, spinning}) => {
    if (!network) {
      return null;
    }
    if (value !== null) {
      return (
        <Pressable
          style={styles.sectionableInputStyles}
          onPress={() => {
            // setNetworkPickerIsVisible(true);
            handleGeneratingMnemonic();
            setMnemonic(null);
          }}>
          <Text style={styles.sectionStaticTextlabels} numberOfLines={5}>
            {value}
          </Text>
          {/*<View style={styles.sectionableInputStyles}>*/}
          {/*</View>*/}
        </Pressable>
      );
    }
    return (
      <SpinnerButton
        spinning={spinning}
        title={'Generate Mnemonic'}
        style={{
          minWidth: '100%',
          marginHorizontal: 0,
        }}
        onClick={handleGeneratingMnemonic}
      />
    );
  };

  const MainButtonSection = ({display}) => {
    return (
      <MainButton
        title={'Create Wallet'}
        style={{
          minWidth: '100%',
          marginHorizontal: 0,
        }}
        onClick={() => {
          console.log('Create');
          Keyboard.dismiss();
          handleSaveWallet();
        }}
        // disabled={display}
      />
    );
  };

  const PassPhraseTitleComponent = () => {
    if (network === null || network === '' || network === undefined) {
      return null;
    }
    return (
      <View
        style={{
          // display: 'flex',
          width: '100%',
        }}>
        <Text
          style={{
            textAlign: 'left',
            ...styles.sectionTitles,
          }}>
          Your Passphrase
        </Text>
      </View>
    );
  };

  if (anyFieldIsEmpty()) {
    return (
      <ModalViewController>
        <Section style={{marginTop: 10, marginHorizontal: 0}}>
          <Text style={{fontSize: 30, ...thisTextColor}}>
            Create a new Wallet
          </Text>
        </Section>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            // flex: 1,
            height: '100%',
          }}>
          <CenteredSection>
            <View
              style={{
                // alignContent: 'center',
                width: '100%',
              }}>
              <Text style={styles.sectionTitles}>Wallet Name</Text>
            </View>
            <TextInput
              style={{...inputStyles.input, width: '100%'}}
              onChangeText={setName}
              value={name}
              placeholder={'Wallet Name'}
            />
            <View
              style={{
                // display: 'flex',
                width: '100%',
              }}>
              <Text
                style={{
                  textAlign: 'left',
                  ...styles.sectionTitles,
                }}>
                Network
              </Text>
            </View>
            <NetworkInputSection value={network ? network.header : ''} />
            <PassPhraseTitleComponent />
            <MnemonicSection value={mnemonic} spinning={generatingMnemonic} />
          </CenteredSection>
        </ScrollView>
        <AvailableNetworksModalController
          isVisible={networkPickerIsVisible}
          options={availableNetworksOptions}
          dismissModal={netWorkValue => {
            setNetwork(netWorkValue);
            setNetworkPickerIsVisible(false);
          }}
        />
      </ModalViewController>
    );
  }

  return (
    <ModalViewController>
      <Section style={{marginTop: 10, marginHorizontal: 0}}>
        <Text style={{fontSize: 30, ...thisTextColor}}>
          Create a new Wallet
        </Text>
      </Section>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          // flex: 1,
          height: '100%',
        }}>
        <CenteredSection>
          <View
            style={{
              // alignContent: 'center',
              width: '100%',
            }}>
            <Text style={styles.sectionTitles}>Wallet Name</Text>
          </View>
          <TextInput
            style={{...inputStyles.input, width: '100%'}}
            onChangeText={setName}
            value={name}
            placeholder={'Wallet Name'}
          />
          <View
            style={{
              // display: 'flex',
              width: '100%',
            }}>
            <Text
              style={{
                textAlign: 'left',
                ...styles.sectionTitles,
              }}>
              Network
            </Text>
          </View>
          <NetworkInputSection value={network} />
          <PassPhraseTitleComponent />
          <MnemonicSection value={mnemonic} spinning={generatingMnemonic} />
          <MainButtonSection display={true} />
        </CenteredSection>
      </ScrollView>
      <AvailableNetworksModalController
        isVisible={networkPickerIsVisible}
        dismissModal={netWorkValue => {
          setNetwork(netWorkValue);
          setNetworkPickerIsVisible(false);
        }}
        options={availableNetworksOptions}
      />
    </ModalViewController>
  );
};

export default CreateWalletController;
