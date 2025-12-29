import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

import { createLocalVideoTrack } from "livekit-client";
import { VideoView, AudioSession } from "@livekit/react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function CameraCheckScreen({ navigation }) {
  const [videoTrack, setVideoTrack] = useState(null);

  useEffect(() => {
    AudioSession.startAudioSession();
    checkPermission();

    return () => {
      videoTrack?.stop();
      AudioSession.stopAudioSession();
    };
  }, []);

  const checkPermission = async () => {
    const permission =
      Platform.OS === "android"
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA;

    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      startCamera();
    } else {
      Alert.alert("Permission Required", "Camera permission is required");
    }
  };

  const startCamera = async () => {
    try {
      const track = await createLocalVideoTrack({
        facingMode: "user",
      });

      setVideoTrack(track);
    } catch (e) {
      console.log("Camera error:", e);
      Alert.alert("Error", "Unable to start camera");
    }
  };

  const goNext = () => {
    videoTrack?.stop();
    navigation.replace("LiveRoom", route.params);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Camera Check</Text>

      {videoTrack && (
        <VideoView
          track={videoTrack}
          style={styles.camera}
          mirror
        />
      )}

      {videoTrack && (
        <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
          <Text style={styles.nextText}>Continue</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  header: {
    position: "absolute",
    top: 16,
    alignSelf: "center",
    color: "#fff",
    fontSize: 18,
    zIndex: 10,
    fontWeight: "600",
  },

  camera: {
    flex: 1,
  },

  nextBtn: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#0066ff",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 28,
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
