import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE } from "../config/api";
import { isTokenExpired } from "../utils/authUtils";

export default function LoginLoaderPage({ navigation }) {

  useEffect(() => {
    bootstrapAuth();
  }, []);

  const bootstrapAuth = async () => {
    try {
      // optional splash delay
      await new Promise(res => setTimeout(res, 2000));

      const token = await AsyncStorage.getItem("token");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      console.log('loadertoken', token)
      console.log('refreshToken', refreshToken)
      // ❌ No tokens → Login
      if (!token || !refreshToken) {
        console.log('no toekns found')
        return navigation.replace("Login");
      }

      // ✅ Access token valid
      if (!isTokenExpired(token)) {
        console.log('token is valid')
        return navigation.reset({
          index: 0,
          routes: [{ name: "BottomDash" }],
        });
      }

      // 🔄 Access expired → try refresh
      const refreshed = await refreshAccessToken(refreshToken);
      console.log('refreshed', refreshed)
      if (refreshed) {
        return navigation.reset({
          index: 0,
          routes: [{ name: "BottomDash" }],
        });
      }

      // ❌ Both expired
      await clearAuth();
      console.log('both expired')
      navigation.replace("Login");

    } catch (e) {
      await clearAuth();
      console.log('catch error')
      navigation.replace("Login");
    }
  };

  const refreshAccessToken = async (refreshToken) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/refresh-token`, {
        refreshToken,
      });
console.log('refereshtokenres', res)
      const { token, refreshToken: newRefresh } = res.data;

      await AsyncStorage.setItem("token", token);
      if (newRefresh) {
        await AsyncStorage.setItem("refreshToken", newRefresh);
      }

      return true;
    } catch (error) {
  console.log("Refresh token failed:", error?.response?.data || error.message);
  return false;
}
  };

  const clearAuth = async () => {
    await AsyncStorage.multiRemove(["token", "refreshToken", "user"]);
  };

  return (
    <LinearGradient
      colors={["#EAF4FF", "#B0D1FF"]}
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
  },
});
