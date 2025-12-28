import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import AudioRecord from "react-native-audio-record";

const micIcon = require("../../assets/images/mic.png");

export default function VoiceRecorder({ onRecorded }) {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
    }

    AudioRecord.init({
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      audioSource: 6,
      wavFile: "voice_message.wav",
    });
  }, []);

  const startRecording = async () => {
    setRecording(true);
    await AudioRecord.start();
  };

  const stopRecording = async () => {
    const filePath = await AudioRecord.stop();
    setRecording(false);
    onRecorded(filePath);
  };

  return (
    <TouchableOpacity
      onPress={recording ? stopRecording : startRecording}
      style={styles.button}
    >
      <Image
        source={micIcon}
        style={[
          styles.icon,
          recording && { tintColor: "red" },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { marginLeft: 8 },
  icon: {
    width: 22,
    height: 22,
    tintColor: "#454545",
  },
});
