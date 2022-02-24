import {
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
            color: mainTheme.colors.mainColorLite,
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

export default TextOnlyButton;
