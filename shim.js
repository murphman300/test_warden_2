import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
if (typeof __dirname === 'undefined') {
  global.__dirname = '/';
}
if (typeof __filename === 'undefined') {
  global.__filename = '';
}
if (typeof process === 'undefined') {
  global.process = require('process');
} else {
  const bProcess = require('process');
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}
process.browser = false;
if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}
if (typeof location === 'undefined') {
  global.location = {port: 80, protocol: 'https:'};
}
const isDev = typeof __DEV__ === 'boolean' && __DEV__;
process.env.NODE_ENV = isDev ? 'development' : 'production';
if (typeof localStorage !== 'undefined') {
  // eslint-disable-next-line no-undef
  localStorage.debug = isDev ? '*' : '';
}
// If using the crypto shim, uncomment the following line to ensure
// crypto is loaded first, so it can populate global.crypto
require('crypto');
//
// import crypto from 'crypto';
// if (typeof __dirname === 'undefined') {
//   global.__dirname = '/';
// }
// if (typeof __filename === 'undefined') {
//   global.__filename = '';
// }
// if (typeof process === 'undefined') {c
//   global.process = require('process');
// } else {
//   const bProcess = require('process');
//   for (var p in bProcess) {
//     if (!(p in process)) {
//       process[p] = bProcess[p];
//     }
//   }
// }
//
// process.browser = false;
// if (typeof Buffer === 'undefined') {
//   global.Buffer = require('buffer').Buffer;
// }
//
// // global.location = global.location || { port: 80 }
// const isDev = typeof __DEV__ === 'boolean' && __DEV__;
// process.env.NODE_ENV = isDev ? 'development' : 'production';
// if (typeof localStorage !== 'undefined') {
//   // eslint-disable-next-line no-undef
//   localStorage.debug = isDev ? '*' : '';
// }
//
// // If using the crypto shim, uncomment the following line to ensure
// // crypto is loaded first, so it can populate global.crypto
// // require('crypto')