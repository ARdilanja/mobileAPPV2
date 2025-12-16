import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MockInterviewCard({ company, role }) {
  return (
    <View style={styles.card}>
      <Image
        source={require("../assets/images/Lea.png")} 
        style={styles.logo}
      />
      <View style={styles.textContainer}>
        <Text style={styles.company}>{company}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 375,
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  company: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  role: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  startButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});