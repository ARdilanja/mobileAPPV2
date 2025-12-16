import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function EmployerInterviewHeader({ onBackPress, title = "Interviews" }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <View style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",                    // Better full-width layout
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
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
    flex: 1,
    textAlign: "center",
    marginRight: 40, 
  },
});