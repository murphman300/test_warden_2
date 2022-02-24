import React from 'react';
import {
  Alert,
  Keyboard,
  Modal,
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
} from 'react-native';
import ModalViewController from '../../utils/controllers/modal';
import Section from '../../utils/section';
import mainTheme from '../../styles/theme';
import {useState} from 'react';
import inputStyles from '../../styles/inputs';
import {MainButton} from '../../utils/buttons/main';
import thisTextColor from '../../styles/text-color';
import CenteredSection from '../../utils/centered-section';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    paddingBottom: 30,
    minHeight: '20%',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    ...{position: 'absolute', left: 0, right: 0, bottom: 0},
  },
  button: {
    borderRadius: 5,
    paddingVertical: 1,
    elevation: 2,
    marginVertical: 5,
    width: '100%',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  listItem: {
    // backgroundColor: '#2196F3',
    // border: '5px solid ',
    borderColor: mainTheme.colors.mainColorOpaque,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  listItemUnselected: {
    borderColor: mainTheme.colors.mainColorOpaque,
  },
  listItemSelected: {
    borderColor: mainTheme.colors.mainColor,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const listItemStyleFromSelected = selected => {
  if (selected) {
    return {...styles.listItem, ...styles.listItemSelected};
  }
  return {...styles.listItem, ...styles.listItemUnselected};
};

const AvailableNetworksModalController = ({
  navigation,
  isVisible,
  onInputChanged,
  options,
  dismissModal,
}) => {
  const [network, setNetwork] = useState(null);
  const [networkKey, setNetworkKey] = useState(null);

  // const options = Array.from(Array(7).keys()).map(i => {
  //   return {key: `network_${i}`, header: `Network ${i}`};
  // });

  const handleSelect = () => {
    if (dismissModal) {
      dismissModal(network);
    }
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontSize: 25,
                ...thisTextColor,
                width: '100%',
                alignItems: 'center',
                marginTop: 4,
                marginBottom: 8,
              }}>
              Select a network
            </Text>
            <View
              style={{
                fontSize: 25,
                ...thisTextColor,
                width: '100%',
                alignItems: 'center',
                marginVertical: 8,
              }}>
              {options.map(v => (
                <Pressable
                  style={[
                    styles.button,
                    listItemStyleFromSelected(v === network),
                  ]}
                  onPress={() => {
                    setNetwork(networkKey === v.key ? null : v);
                    setNetworkKey(networkKey === v.key ? null : v.key);
                  }}
                  key={`avail-net-item-pressabled-${v.key}`}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    key={`avail-net-item-view1-${v.key}`}>
                    <View
                      style={{
                        fontSize: 25,
                        ...thisTextColor,
                        width: '60%',
                        alignItems: 'left',
                        marginVertical: 8,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          height: 40,
                          width: 40,
                        }}
                        key={`avail-net-item-view2-${v.key}`}
                      />
                      <View key={`avail-net-item-view3-${v.key}`}>
                        <Text
                          style={{
                            ...thisTextColor,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                            fontSize: 16,
                            fontWeight: 'bold',
                          }}
                          key={`avail-net-item-text-header-${v.key}`}>
                          {v.header}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        // flex: 2,
                        alignItems: 'right',
                        marginVertical: 8,
                        marginRight: 15,
                        // width: '30%',
                      }}
                      key={`avail-net-item-view4-${v.key}`}>
                      <CheckBox
                        style={{
                          height: 40,
                          width: 40,
                        }}
                        value={networkKey === v.key}
                        onTintColor={'transparent'}
                        tintColor={'transparent'}
                        onCheckColor={'rgba(83,136,84,0.99)'}
                        animationDuration={0.2}
                        lineWidth={4.0}
                        key={`avail-net-item-checkbox-${v.key}`}
                      />
                    </View>
                  </View>
                </Pressable>
              ))}
              <MainButton
                title={'Select'}
                style={{
                  minWidth: '100%',
                  marginHorizontal: 0,
                }}
                disabled={network === null}
                onClick={handleSelect}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AvailableNetworksModalController;
