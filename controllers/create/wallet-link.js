import React from 'react';
import {
  Platform,
  ScrollView,
  SegmentedControlIOS,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Clipboard,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  NativeModules,
} from 'react-native';
import ModalViewController from '../../utils/controllers/modal';
import Section from '../../utils/section';
import mainTheme from '../../styles/theme';
import {useState} from 'react';
import inputStyles from '../../styles/inputs';
import FullyCenteredSection from '../../utils/fully-centered-section';
import CenteredSection from '../../utils/centered-section';
import {MainButton} from '../../utils/buttons/main';
import TextOnlyButton from '../../utils/buttons/text';
import thisTextColor from '../../styles/text-color';

const innerStyles = {marginTop: 10, marginHorizontal: 0};

const LinkExternalWallet = ({navigation}) => {
  const [externalWallet, setExternalWallet] = useState(null);
  const [externalWalletName, setExternalWalletName] = useState(null);
  const [hasClipboardContent, setHasClipboardContent] = useState(false);
  const [linkButtonDisabled, setLinkButtonDisabled] = useState(true);

  const inputRef = React.useRef();

  const inputRef2 = React.useRef();

  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  const textIsNotNull = text =>
    text === '' || text === null || text === undefined;

  const getClipboardText = async () => {
    return await Clipboard.getString();
  };

  const pasteClipboardText = async () => {
    try {
      const text = await getClipboardText();
      setExternalWallet(text);
      setLinkButtonDisabled(textIsNotNull(text));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSetExternalWallet = newValue => {
    setExternalWallet(newValue);
    setLinkButtonDisabled(textIsNotNull(newValue));
  };

  return (
    <ModalViewController>
      <Section style={innerStyles}>
        <Text style={{fontSize: 30, ...thisTextColor}}>
          Link a wallet to this App
        </Text>
      </Section>
      <ScrollView
        contentContainerStyle={
          {
            // flexGrow: 1,
            // flex: 1,
            // height: '100%',
          }
        }>
        <CenteredSection>
          <View
            style={{
              alignContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              Wallet Address
            </Text>
          </View>
          <TextInput
            style={{
              ...inputStyles.multilineInput,
              width: '100%',
              marginBottom: 0,
            }}
            onChangeText={handleSetExternalWallet}
            value={externalWallet}
            multiline={true}
            numberOfLines={3}
            clearButtonMode={'always'}
            ref={inputRef}
          />
          <TextOnlyButton
            title={'Paste Clipboard'}
            onClick={() => {
              pasteClipboardText().then().catch(console.log);
            }}
            style={{
              color: mainTheme.colors.mainColorLite,
            }}
            dismissKeyboardOnPressOut={true}
          />
          <View
            style={{
              alignContent: 'center',
              marginTop: 10,
              paddingTop: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              (Optional) Give this wallet a name
            </Text>
          </View>
          <TextInput
            style={{
              ...inputStyles.multilineInput,
              width: '100%',
            }}
            onChangeText={setExternalWalletName}
            value={externalWalletName}
            clearButtonMode={'always'}
            // ref={inputRef2}
          />
          <MainButton
            title={'Link Wallet'}
            disabled={linkButtonDisabled}
            style={{
              minWidth: '100%',
              marginHorizontal: 0,
            }}
            onClick={() => {
              console.log('Link');
              Keyboard.dismiss();
            }}
          />
        </CenteredSection>
      </ScrollView>
    </ModalViewController>
  );
};

export default LinkExternalWallet;
