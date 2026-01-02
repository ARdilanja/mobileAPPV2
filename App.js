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

import { GoogleSignin } from '@react-native-google-signin/google-signin';

console.log("GoogleSignin native module =>", GoogleSignin);
export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "672175532425-d5af6nvj3u5uhuls8vptspth5pgf5mdn.apps.googleusercontent.com", // 🔴 VERY IMPORTANT
      offlineAccess: false,
    });
  }, []);

  return (
    <Provider store={store}>
      <StatusBar
        translucent={false}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <AppNavigation />
    </Provider>
  );
}

