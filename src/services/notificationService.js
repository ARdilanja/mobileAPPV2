
// import messaging from '@react-native-firebase/messaging';
// import { Alert, Platform } from 'react-native';
// import notifee, { AndroidImportance } from '@notifee/react-native';
// import axios from 'axios';
// // import { API_BASE } from '../config/api';
// import { API_BASE } from '@env';

// /* ================== PERMISSION ================== */
// export async function requestNotificationPermission() {
//   const authStatus = await messaging().requestPermission();

//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     console.log('✅ Notification permission granted');
//   } else {
//     Alert.alert('Permission denied', 'Notifications are disabled');
//   }
// }

// /* ================== GET FCM TOKEN ================== */
// export async function getFCMToken() {
//   const token = await messaging().getToken();
//   console.log('🔥 FCM Token:', token);
//   return token;
// }

// /* ================== SAVE FCM TOKEN (NEW – SAFE) ================== */
// export async function saveFcmTokenToBackend(accessToken) {
//   try {
//     const fcmToken = await messaging().getToken();

//     console.log('📤 Sending FCM token to backend:', fcmToken);

//     await axios.post(
//       `${API_BASE}/user/save-fcm-token`,
//       {
//         token: fcmToken,
//         platform: Platform.OS,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     console.log('✅ FCM token saved in DB');
//   } catch (err) {
//     console.log('❌ FCM save failed:', err.message);
//   }
// }

// /* ================== FOREGROUND NOTIFICATION ================== */
// export function listenToNotifications() {
//   return messaging().onMessage(async remoteMessage => {
//     console.log('📩 Foreground message:', remoteMessage);

//     await displaySystemNotification(
//       remoteMessage.data?.title ?? 'New Notification',
//       remoteMessage.data?.body ?? 'You received a message'
//     );
//   });
// }

// /* ================== ANDROID CHANNEL ================== */
// export async function setupNotificationChannel() {
//   await notifee.createChannel({
//     id: 'default',
//     name: 'Default Notifications',
//     importance: AndroidImportance.HIGH,
//   });
// }

// /* ================== SHOW NOTIFICATION ================== */
// export async function displaySystemNotification(title, body) {
//   await notifee.displayNotification({
//     title,
//     body,
//     android: {
//       channelId: 'default',
//       importance: AndroidImportance.HIGH,
//       smallIcon: 'ic_notification',
//       sound: 'default',
//       pressAction: { id: 'default' },
//     },
//   });
// }



//////////////warning - free



import { Alert, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import axios from 'axios';
import { API_BASE } from '@env';

import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onMessage,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';

/* ================== INIT ================== */
const app = getApp();
const messagingInstance = getMessaging(app);

/* ================== PERMISSION ================== */
export async function requestNotificationPermission() {
  const authStatus = await requestPermission(messagingInstance);

  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    Alert.alert('Permission denied', 'Notifications are disabled');
  }
}

/* ================== GET FCM TOKEN ================== */
export async function getFCMToken() {
  return await getToken(messagingInstance);
}

/* ================== SAVE FCM TOKEN ================== */
export async function saveFcmTokenToBackend(accessToken) {
  try {
    const fcmToken = await getToken(messagingInstance);

    await axios.post(
      `${API_BASE}/user/save-fcm-token`,
      {
        token: fcmToken,
        platform: Platform.OS,
      },
      {
        headers: {
          Authorization: Bearer `${accessToken}`,
        },
      }
    );
  } catch (err) {
    // intentionally silent (no logs, no behavior change)
  }
}

/* ================== FOREGROUND NOTIFICATION ================== */
export function listenToNotifications() {
  return onMessage(messagingInstance, async remoteMessage => {
    await displaySystemNotification(
      remoteMessage?.data?.title ?? 'New Notification',
      remoteMessage?.data?.body ?? 'You received a message'
    );
  });
}

/* ================== ANDROID CHANNEL ================== */
export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Notifications',
    importance: AndroidImportance.HIGH,
  });
}

/* ================== SHOW NOTIFICATION ================== */
export async function displaySystemNotification(title, body) {
  await notifee.displayNotification({
    title,
    body,
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      smallIcon: 'ic_notification',
      sound: 'default',
      pressAction: { id: 'default' },
    },
  });
}
