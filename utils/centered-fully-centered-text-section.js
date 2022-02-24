import React from 'react';
import type {Node} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import mainStyle from '../styles';
import {
  centeredInnerContent,
  fullyCenteredInnerContent,
} from '../styles/centered';

const thisStyle = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

const FullyCenteredTextSection = ({
  title,
  subText,
  style,
  subTextStyle,
  children,
}) => {
  const isDarkMode = useColorScheme() === 'dark';
  let applyStyle = style
    ? {
        ...thisStyle.container,
        ...fullyCenteredInnerContent,
        ...style,
      }
    : {
        ...thisStyle.container,
        ...fullyCenteredInnerContent,
      };
  return (
    <View style={applyStyle}>
      <Text style={[mainStyle.sectionTitle]}>{title}</Text>
      <Text
        style={
          subTextStyle
            ? {marginVertical: 5, fontSize: 12, ...subTextStyle}
            : {
                marginVertical: 5,
                fontSize: 12,
              }
        }>
        {subText}
      </Text>
      {children}
    </View>
  );
};

export default FullyCenteredTextSection;
