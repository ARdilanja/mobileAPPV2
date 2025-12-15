import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function EmployerInterviewHeader({ onBackPress }) {
  return (
    <View style={styles.container}>
      {/* Custom Back Arrow - No Image Needed */}
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.title}>Interviews</Text>

      {/* Spacer to center title */}
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 187.5,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 18,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    width: 12,
    height: 12,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#000",
    transform: [{ rotate: "45deg" }],
  },
  title: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 24,
    color: "#000",
  },
});