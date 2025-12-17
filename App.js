// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import AppNavigation from '../Recroot_Mobile/src/navigations/AppNavigation'

// const App = () => {
//   return (
//     <AppNavigation />
//   )


import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import InterviewScreen from "./src/screens/InterviewScreen";
import LiveRoomScreen from "./src/screens/LiveRoomScreen";


export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <LiveRoomScreen />
            {/* <InterviewScreen /> */}
        </SafeAreaView>
    );
}
