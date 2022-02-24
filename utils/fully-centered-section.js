import React from 'react';
import type {Node} from 'react';
import {Text, useColorScheme, View} from 'react-native';
import mainStyle from '../styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  centeredInnerContent,
  fullyCenteredInnerContent,
} from '../styles/centered';

const FullyCenteredSection = ({children, style}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  let applyStyle = style
    ? {
        ...mainStyle.sectionContainer,
        ...fullyCenteredInnerContent,
        ...style,
      }
    : {
        ...mainStyle.sectionContainer,
        ...fullyCenteredInnerContent,
      };
  return <View style={applyStyle}>{children}</View>;
};

export default FullyCenteredSection;
