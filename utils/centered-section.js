import React from 'react';
import type {Node} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import mainStyle from '../styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {centeredInnerContent} from '../styles/centered';

const CenteredSection = ({children, style, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  let applyStyle = style
    ? {
        ...mainStyle.sectionContainer,
        ...centeredInnerContent,
        ...style,
      }
    : {
        ...mainStyle.sectionContainer,
        ...centeredInnerContent,
      };
  return (
    <View style={applyStyle}>
      <Text
        style={[
          mainStyle.sectionTitle,
          // {
          //   color: isDarkMode ? Colors.white : Colors.black,
          // },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

export default CenteredSection;
