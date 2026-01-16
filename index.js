// /**
//  * @format
//  */

// import 'react-native-get-random-values';
// import { registerGlobals } from '@livekit/react-native';

// // MUST be called BEFORE AppRegistry
// registerGlobals();

// import 'react-native-gesture-handler';
// import 'react-native-reanimated';
// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import { displaySystemNotification } from './src/services/notificationService';

// // getMessaging().setBackgroundMessageHandler(async remoteMessage => {
// //   console.log('📩 Background Notification:', remoteMessage);
// // });
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('📩 Background Notification:', remoteMessage);

//     await displaySystemNotification(
//       remoteMessage.data?.title,
//       remoteMessage.data?.body
//     );
// });

// AppRegistry.registerComponent(appName, () => App);


/**
 * @format
 */

import 'react-native-get-random-values';
import { registerGlobals } from '@livekit/react-native';
registerGlobals();

import 'react-native-gesture-handler';
import 'react-native-reanimated';

import { NativeModules } from 'react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { displaySystemNotification } from './src/services/notificationService';

/* ===== FIX NativeEventEmitter WARNINGS ===== */
if (NativeModules.LiveAudioStream) {
  NativeModules.LiveAudioStream.addListener ||= () => {};
  NativeModules.LiveAudioStream.removeListeners ||= () => {};
}

if (NativeModules.AudioRecord) {
  NativeModules.AudioRecord.addListener ||= () => {};
  NativeModules.AudioRecord.removeListeners ||= () => {};
}

/* ===== FIREBASE BACKGROUND HANDLER (MODULAR) ===== */
import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  setBackgroundMessageHandler,
} from '@react-native-firebase/messaging';

const app = getApp();
const messagingInstance = getMessaging(app);

setBackgroundMessageHandler(messagingInstance, async remoteMessage => {
  console.log('📩 Background Notification:', remoteMessage);

  await displaySystemNotification(
    remoteMessage.data?.title,
    remoteMessage.data?.body
  );
});

AppRegistry.registerComponent(appName, () => App);
