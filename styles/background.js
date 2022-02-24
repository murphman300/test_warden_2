import {Colors} from 'react-native/Libraries/NewAppScreen';

const backgroundStyle = isDarkMode => {
  return {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
};

export default backgroundStyle;
