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
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';        
import AppNavigation from './src/navigations/AppNavigation';
import { store } from "./src/redux/store";

export default function App() {
  return (
    <Provider store={store}>                      
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
      <AppNavigation />
    </Provider>
  );
}



// import React from "react";
// import { SafeAreaView, StatusBar } from "react-native";
// import InterviewScreen from "./src/screens/InterviewScreen";

// export default function App() {
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />
//             <InterviewScreen />
//         </SafeAreaView>
//     );
// }
