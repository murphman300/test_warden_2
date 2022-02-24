import React from 'react';
import {View} from 'react-native';

const ModalViewController = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        padding: 5,
      }}>
      {children}
    </View>
  );
};

export default ModalViewController;
