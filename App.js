
// // App.js
// import React, { useEffect } from 'react';
// import { StatusBar } from 'react-native';
// import AppNavigation from './src/navigations/AppNavigation';
// import { store } from "./src/redux/store.jsx";
// import { Provider } from 'react-redux';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import messaging from '@react-native-firebase/messaging';
// import {  listenToNotifications, requestNotificationPermission, setupNotificationChannel } from './src/services/notificationService';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { STRIPE_PUBLISHABLE_KEY } from '@env';
// import { API_BASE } from '@env';

// console.log("GoogleSignin native module =>", GoogleSignin);
// export default function App() {
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId: "672175532425-d5af6nvj3u5uhuls8vptspth5pgf5mdn.apps.googleusercontent.com", // 🔴 VERY IMPORTANT
//       offlineAccess: false,
//     });
//   }, []);
//   useEffect(() => {
//     requestNotificationPermission();
//     // getFCMToken();
//     setupNotificationChannel()
//   }, []);
//   useEffect(() => {
//     const unsubscribe = listenToNotifications();

//     return () => unsubscribe();
//   }, []);

//   useEffect(() => {
//       console.log("ENV CHECK =>",STRIPE_PUBLISHABLE_KEY);
//     }, []);

//     console.log(API_BASE)
//   return (
//     <Provider store={store}>
//       <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
//         <StatusBar
//           translucent={false}
//           backgroundColor="transparent"
//           barStyle="dark-content"
//         />
//         <AppNavigation />
//       </StripeProvider>
//     </Provider>
//   );
// }





////////warning - free


import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store.jsx';
import { StripeProvider } from '@stripe/stripe-react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import { API_BASE } from '@env';
import {  listenToNotifications, requestNotificationPermission, setupNotificationChannel } from './src/services/notificationService';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '283074857122-ha8cn3g0mh8ik14fu0avit9jl3cqgvlu.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);
 useEffect(() => {
    requestNotificationPermission();
    setupNotificationChannel();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToNotifications();
    return unsubscribe;
  }, []);

  console.log(API_BASE)

  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <StatusBar barStyle="dark-content" />
        <AppNavigation />
      </StripeProvider>
    </Provider>
  );
}
