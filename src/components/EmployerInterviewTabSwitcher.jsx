import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Fonts } from "../constants/fonts";

export default function EmployerInterviewTabSwitcher({ activeTab, setActiveTab }) {
  return (
    <View style={styles.container}>
      {/* Employer Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("employer")}
      >
        <Text style={[
          styles.tabText,
          activeTab === "employer" && styles.activeText
        ]}>
          10 Employer Interview
        </Text>
        {activeTab === "employer" && <View style={styles.underline} />}
      </TouchableOpacity>

      {/* Mock Tab */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab("mock")}
      >
        <Text style={[
          styles.tabText,
          activeTab === "mock" && styles.activeText
        ]}>
          5 Mock Interview
        </Text>
        {activeTab === "mock" && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, 
    paddingHorizontal: 16,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    position: "relative",
  },

  tabText: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    fontWeight: "700",

  },

  activeText: {
    color: "#115CC7",
    fontWeight: "700",
  },

  underline: {
    position: "absolute",
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: "#115CC7",
    borderRadius: 1,
  },
});