import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const InterviewCard = ({ companyLogo, companyName, role, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <Image source={companyLogo} style={styles.logo} resizeMode="contain" />
        <View style={styles.textContainer}>
          <Text style={styles.company}>{companyName}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onPress}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default InterviewCard;

const styles = StyleSheet.create({
  card: {
    width: 375,
    height: 76,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    alignSelf: "center",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  textContainer: {
    justifyContent: "center",
  },
  company: {
    fontFamily: "Inter",
    fontWeight: "700",
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
  },
  role: {
    fontFamily: "Inter",
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  startText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});