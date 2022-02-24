import {NativeModules} from 'react-native';

const {NetworkModule} = NativeModules;

console.log(NetworkModule);

module.exports = {
  NetworkModule,
};
