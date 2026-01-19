
import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import axios from 'axios';
import { API_BASE } from '@env';

/* ================== PERMISSION ================== */
export async function requestNotificationPermission() {
  const authStatus = await messaging().requestPermission();

  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('✅ Notification permission granted');
  } else {
    Alert.alert('Permission denied', 'Notifications are disabled');
  }
}

/* ================== GET FCM TOKEN ================== */
export async function getFCMToken() {
  const token = await messaging().getToken();
  console.log('🔥 FCM Token:', token);
  return token;
}

/* ================== SAVE FCM TOKEN (NEW – SAFE) ================== */
export async function saveFcmTokenToBackend(accessToken) {
  try {
    const fcmToken = await messaging().getToken();

    console.log('📤 Sending FCM token to backend:', fcmToken);

    await axios.post(
      `${API_BASE}/user/save-fcm-token`,
      {
        token: fcmToken,
        platform: Platform.OS,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log('✅ FCM token saved in DB');
  } catch (err) {
    console.log('❌ FCM save failed:', err.message);
  }
}

/* ================== FOREGROUND NOTIFICATION ================== */
export function listenToNotifications() {
  return messaging().onMessage(async remoteMessage => {
    console.log('📩 Foreground message:', remoteMessage);

    await displaySystemNotification(
      remoteMessage.data?.title ?? 'New Notification',
      remoteMessage.data?.body ?? 'You received a message'
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



// import { Alert, Platform } from 'react-native';
// import notifee, { AndroidImportance } from '@notifee/react-native';
// import axios from 'axios';
// import { API_BASE } from '@env';

// import { getApp } from '@react-native-firebase/app';
// import {
//   getMessaging,
//   requestPermission,
//   getToken,
//   onMessage,
//   AuthorizationStatus,
// } from '@react-native-firebase/messaging';

// /* ================== INTERNAL ================== */
// function getMessagingInstance() {
//   const app = getApp();
//   return getMessaging(app);
// }

// /* ================== PERMISSION ================== */
// export async function requestNotificationPermission() {
//   try {
//     const messagingInstance = getMessagingInstance();

//     const authStatus = await requestPermission(messagingInstance);

//     const enabled =
//       authStatus === AuthorizationStatus.AUTHORIZED ||
//       authStatus === AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('✅ Notification permission granted');
//     } else {
//       Alert.alert('Permission denied', 'Notifications are disabled');
//     }
//   } catch (err) {
//     console.log('❌ Permission error:', err.message);
//   }
// }

// /* ================== GET FCM TOKEN ================== */
// export async function getFCMToken() {
//   try {
//     const messagingInstance = getMessagingInstance();

//     const token = await getToken(messagingInstance);
//     console.log('🔥 FCM Token:', token);

//     return token;
//   } catch (err) {
//     console.log('❌ Failed to get FCM token:', err.message);
//     return null;
//   }
// }

// /* ================== SAVE FCM TOKEN ================== */
// export async function saveFcmTokenToBackend(accessToken) {
//   try {
//     const messagingInstance = getMessagingInstance();
//     const fcmToken = await getToken(messagingInstance);

//     if (!fcmToken) return;

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
//   const messagingInstance = getMessagingInstance();

//   return onMessage(messagingInstance, async remoteMessage => {
//     console.log('📩 Foreground message:', remoteMessage);

//     await displaySystemNotification(
//       remoteMessage?.data?.title ?? 'New Notification',
//       remoteMessage?.data?.body ?? 'You received a message'
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
