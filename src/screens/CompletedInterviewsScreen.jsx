import React, { useState } from "react";
import {  Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";

import EmployerInterviewHeader from "../components/EmployerInterviewHeader";
import InterviewTabSwitcher from "../components/EmployerInterviewTabSwitcher";
import CompleteCardData from "../components/CompleteCardData";

const CompletedInterviewsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("employer");

  const handleBack = () => {
    navigation?.goBack();
  };

  const employerCount = 0;
  const mockCount = 0;

  const getLargeTitle = () => {
    return activeTab === "employer" ? "Employer Interview" : "Mock Interview";
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <EmployerInterviewHeader
        onBackPress={handleBack}
        title="Completed Interviews"
      />

      <InterviewTabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        employerCount={employerCount}
        mockCount={mockCount}
      />

      <Text style={styles.largeTabTitle}>{getLargeTitle()}</Text>

      <CompleteCardData activeTab={activeTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  largeTabTitle: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 18,
    color: "#000",
    // textAlign: "center",
    marginLeft:24,
    marginTop: 32,
    marginBottom: 8,
  },
});

export default CompletedInterviewsScreen;

