import React, {useState} from 'react';
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
  Image,
  FlatList,
} from 'react-native';
import Section from '../../utils/section';
import CenteredSection from '../../utils/centered-section';

export const imageStyles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 65,
    height: 65,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

const listStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#fff',
    padding: 11,
    marginVertical: 0,
    marginHorizontal: 0,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(97,97,96,0.3)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(97,97,96,0.3)',
  },
  title: {
    fontSize: 18,
  },
});

const settingsList = [
  {title: '_header', id: '0', type: 'account_header'},
  {title: 'Account', id: '1', subText: 'Name, Email, and other goodies'},
  {title: 'Features', id: '2', subText: 'Wallet unlocks, backups, cards'},
  {title: 'Networks', id: '3', subText: 'Saved networks, configurations'},
  {title: 'Permissions', id: '4', subText: 'Security, defaults, notifications'},
];

const AccountSettingsHeader = () => {
  return (
    <CenteredSection
      style={{
        marginVertical: 15,
        marginHorizontal: 10,
      }}>
      <Image
        style={{
          ...imageStyles.tinyLogo,
          marginTop: 30,
          paddingBottom: 10,
        }}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      <Text
        style={{
          marginTop: 20,
        }}>
        Your Account
      </Text>
    </CenteredSection>
  );
};

const AccountSettingsListItem = ({item}) => {
  let content;

  switch (item.type) {
    case 'account_header':
      content = <AccountSettingsHeader />;
      break;
    default:
      content = (
        <View style={listStyles.item}>
          <Text style={listStyles.title}>{item.title}</Text>
          {item.subText ? (
            <Text
              style={{
                marginVertical: 5,
                fontSize: 12,
                color: 'rgba(65,64,64,0.8)',
              }}>
              {item.subText}
            </Text>
          ) : null}
        </View>
      );
      break;
  }

  return content;
};

const AccountSettingsListContainer = ({data}): Node => {
  const renderItem = ({item}) => {
    return <AccountSettingsListItem item={item} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

const AccountController = ({children, title}): Node => {
  return (
    <SafeAreaView style={listStyles.container}>
      <AccountSettingsListContainer data={settingsList} />
    </SafeAreaView>
  );
};

export default AccountController;
