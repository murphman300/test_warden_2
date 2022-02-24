import {Platform, PlatformColor} from 'react-native';
// import mainStyle from './index';
import mainTheme from './theme';

const thisTextColor = Platform.select({
  ios: {
    color: 'rgb(22,27,48)',
    // backgroundColor: PlatformColor('systemTealColor'),
  },
  android: {
    color: PlatformColor('?android:attr/textColor'),
    // backgroundColor: PlatformColor('@android:color/holo_blue_bright'),
  },
  default: {color: 'black'},
});

export default thisTextColor;
