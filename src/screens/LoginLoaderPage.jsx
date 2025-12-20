import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function LoginLoaderPage({ navigation }) {
  useEffect(() => {
  const timer = setTimeout(() => {
    navigation.replace('Login');
  }, 2500);

  return () => clearTimeout(timer);
}, []);

  return (
    <LinearGradient
      colors={["#EAF4FF", "#B0D1FF"]} // light to slightly darker gradient
      style={styles.container}
    >

      <Image
        source={require("../assets/images/Lea.png")}
        style={styles.robot}
        resizeMode="contain"
      />

      <Text style={styles.title}>LEA</Text>
      <Text style={styles.subtitle}>#1 AI Interviewing Platform</Text>

      <Text style={styles.brand}>RECROOT</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  robot: {
    width: 220,
    height: 220,
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0A3D91",
    marginTop: 8,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0A3D91",
    marginTop: 6,
  },
  brand: {
    position: "absolute",
    bottom: 40,
    fontSize: 18,
    fontWeight: "700",
    color: "#1B6EDC",
    letterSpacing: 1,
  },
});
