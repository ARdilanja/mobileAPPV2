// import messaging from '@react-native-firebase/messaging';
// import { Alert, Platform } from 'react-native';
// import notifee, { AndroidImportance } from '@notifee/react-native';

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

// export async function getFCMToken() {
//   const token = await messaging().getToken();
//   console.log('🔥 FCM Tokens:', token);
//   return token;
// } 

// export function listenToNotifications() {
//   return messaging().onMessage(async remoteMessage => {
//     console.log('📩 Foreground message:', remoteMessage);

//     // 🔥 Always show notification manually
//     await displaySystemNotification(
//       remoteMessage.data?.title ?? 'New Notification',
//       remoteMessage.data?.body ?? 'You received a message'
//     );
//   });
// }

// export async function setupNotificationChannel() {
//   await notifee.createChannel({
//     id: 'default',
//     name: 'Default Notifications',
//     importance: AndroidImportance.HIGH,
//   });
// }

// export async function displaySystemNotification(title, body) {

//   // Display notification
//   await notifee.displayNotification({
//     title,
//     body,
//     // android: {
//     //   channelId:'default',
//     //   smallIcon: 'ic_notification', // make sure this exists
//     //   pressAction: {
//     //     id: 'default',
//     //   },
//     // },
//      android: {
//       channelId: 'default',
//       importance: AndroidImportance.HIGH,
//       sound: 'default', // 🔥 REQUIRED
//       pressAction: { id: 'default' },
//     },
//   });
// }




import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import axios from 'axios';
import { API_BASE } from '../config/api';

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
