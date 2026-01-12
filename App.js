// // App.js (or your main App file)
// import React, { useState } from 'react';
// import { SafeAreaView, StatusBar } from 'react-native';
// import LoginLoaderPage from './src/screens/LoginLoaderPage';
// import LoginScreen from './src/screens/auth/LoginScreen';
// import VerificationScreen from './src/screens/auth/VerificationScreen';
// import SignupFlowScreen from './src/screens/auth/SignupFlowScreen';
// import AppNavigation from './src/navigations/AppNavigation';

// export default function App() {
//   const [loaderFinished, setLoaderFinished] = useState(false);
//   const [currentScreen, setCurrentScreen] = useState('login');

//   if (!loaderFinished) {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <StatusBar barStyle="dark-content" backgroundColor="#EAF4FF" />
//         <LoginLoaderPage onFinish={() => setLoaderFinished(true)} />
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//       {currentScreen === 'login' && (
//         <LoginScreen
//           onLoginSuccess={() => setCurrentScreen('main')}
//           onSignupPress={() => setCurrentScreen('signup')} 
//         />
//       )}

//       {currentScreen === 'signup' && (
//         <SignupFlowScreen
//           onComplete={() => setCurrentScreen('main')}
//           onBackToLogin={() => setCurrentScreen('login')} // Optional: add back button if needed
//         />
//       )}

//       {currentScreen === 'main' && <AppNavigation />}
//     </SafeAreaView>
//   );
// }

// App.js
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from './src/navigations/AppNavigation';
import { store } from "./src/redux/store.jsx";
import { Provider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import messaging from '@react-native-firebase/messaging';
import { getFCMToken, listenToNotifications, requestNotificationPermission, setupNotificationChannel } from './src/services/notificationService';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { STRIPE_PUBLISHABLE_KEY } from './src/config/api.jsx';

import { initAIVoice } from './src/utils/aiVoice';

console.log("GoogleSignin native module =>", GoogleSignin);
export default function App() {

   useEffect(() => {
    initAIVoice(); // ✅ Google AI voice init
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "836429784338-ip12kfe22koc19s8ee2qa3c64qflfeoc.apps.googleusercontent.com", // 🔴 VERY IMPORTANT
      offlineAccess: true,
      forceCodeForRefreshToken: true, 
    });
  }, []);
  useEffect(() => {
    requestNotificationPermission();
    getFCMToken();
    setupNotificationChannel()
  }, []);
  useEffect(() => {
    const unsubscribe = listenToNotifications();

    return () => unsubscribe();
  }, []);
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <StatusBar
          translucent={false}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AppNavigation />
      </StripeProvider>
    </Provider>
  );
}

