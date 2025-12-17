// App.js (or your main App file)
import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import LoginLoaderPage from "./src/screens/LoginLoaderPage";
import LoginScreen from "./src/screens/auth/LoginScreen";
import VerificationScreen from "./src/screens/auth/VerificationScreen";
import AppNavigation from "./src/navigations/AppNavigation";

export default function App() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("login");
  
  // If loader not finished
  if (!loaderFinished) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" backgroundColor="#EAF4FF" />
        <LoginLoaderPage onFinish={() => setLoaderFinished(true)} />
      </SafeAreaView>
    );
  }

  // After loader
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {currentScreen === "login" && (
        <LoginScreen
          onNext={() => setCurrentScreen("verification")}
        />
      )}

      {currentScreen === "verification" && (
        <VerificationScreen
          onVerifySuccess={() => setCurrentScreen("main")}
        />
      )}

      {currentScreen === "main" && <AppNavigation />}
    </SafeAreaView>
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
