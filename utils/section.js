import React from 'react';
import type {Node} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import mainStyle from '../styles';

const Section = ({children, title, style}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={
        style
          ? {...mainStyle.sectionContainer, ...style}
          : mainStyle.sectionContainer
      }>
      <Text
        style={[
          mainStyle.sectionTitle,
          // {
          //   color: isDarkMode ? Colors.white : Colors.black,
          // },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          mainStyle.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

export default Section;
