import messaging from '@react-native-firebase/messaging';

export const getFcmToken = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (!enabled) return null;

    const token = await messaging().getToken();
    console.log('FCM TOKEN:', token);
    return token;
  } catch (e) {
    console.log('FCM error:', e);
    return null;
  }
};
