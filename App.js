// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import InterviewScreen from './src/screens/InterviewScreen.jsx'

// const App = () => {
//   return (
  
//       <InterviewScreen />
    
//   )
// }

// export default App

// const styles = StyleSheet.create({})


import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import InterviewScreen from "./src/screens/InterviewScreen";
import Dashboard from "./src/screens/Dashboard";

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* <InterviewScreen /> */}
            <Dashboard/>
        </SafeAreaView>
    );
}
