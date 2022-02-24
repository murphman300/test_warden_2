import {
  ActivityIndicator,
  Keyboard,
  Platform,
  Pressable,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import mainTheme from '../../styles/theme';
import React, {useState} from 'react';

const TextOnlyButton = ({
  title,
  onClick,
  disabled,
  dismissKeyboardOnPressOut,
  style,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable disabled={disabled}>
      <Pressable
        onPressIn={() => {
          console.log('pressed');
          if (disabled) {
            return;
          }
          setIsPressed(true);
        }}
        onPressOut={() => {
          if (disabled) {
            return;
          }
          if (onClick) {
            onClick();
          }
          setIsPressed(false);
          if (dismissKeyboardOnPressOut) {
            Keyboard.dismiss();
          }
        }}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            paddingVertical: 5,
            backgroundColor: 'transparent',
            // borderRadius: 5,
            alignItems: 'center',
            ...(style ?? {}),
            opacity: disabled || isPressed ? 0.6 : 1.0,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: mainTheme.colors.mainColor,
            }}>
            {title}
          </Text>
        </View>
      </Pressable>
    </Touchable>
  );
};

const BackLayer = ({style, disabled, isPressed, children}) => {
  return (
    <View
      style={{
        marginHorizontal: 23,
        marginVertical: 23,
        paddingVertical: 15,
        backgroundColor: mainTheme.colors.mainColor,
        borderRadius: 5,
        alignItems: 'center',
        ...(style ?? {}),
        opacity: disabled || isPressed ? 0.6 : 1.0,
      }}>
      {children}
    </View>
  );
};

export const BaseButton = ({
  title,
  onClick,
  disabled,
  dismissKeyboardOnPressOut,
  style,
  children,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable disabled={disabled}>
      <Pressable
        onPressIn={() => {
          console.log('pressed');
          if (disabled) {
            return;
          }
          setIsPressed(true);
        }}
        onPressOut={() => {
          if (disabled) {
            return;
          }
          if (onClick) {
            onClick();
          }
          setIsPressed(false);
          if (dismissKeyboardOnPressOut) {
            Keyboard.dismiss();
          }
        }}>
        <BackLayer style={style} disabled={disabled} isPressed={isPressed}>
          {children}
        </BackLayer>
      </Pressable>
    </Touchable>
  );
};

export const MainButton = props => {
  return (
    <BaseButton {...props}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white',
        }}>
        {props.title}
      </Text>
    </BaseButton>
  );
};

export const SpinnerButton = props => {
  const {spinning, title} = props;
  if (spinning) {
    return (
      <BaseButton {...props}>
        <ActivityIndicator size={'small'} />
      </BaseButton>
    );
  }

  return (
    <BaseButton {...props}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white',
        }}>
        {title}
      </Text>
    </BaseButton>
  );
};
