// src/screens/EmployerInterviewScreen.jsx

import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import EmployerInterviewHeader from "../components/EmployerInterviewHeader";
import EmployerInterviewTabSwitcher from "../components/EmployerInterviewTabSwitcher";
import EmployerInterviewList from "../components/EmployerInterviewList";        
import MockInterviewList from "../components/MockInterviewList";             

export default function EmployerInterviewScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("employer");

  // const handleBack = () => {
  //   if (navigation) {
  //     navigation.goBack();
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <EmployerInterviewHeader />
      <EmployerInterviewTabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "employer" ? (
        <EmployerInterviewList />
      ) : (
        <MockInterviewList />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});