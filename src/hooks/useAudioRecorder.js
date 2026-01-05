import { PermissionsAndroid, Platform } from "react-native";
import AudioRecord from "react-native-audio-record";
import { useRef } from "react";

async function requestMicPermission() {
  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    {
      title: "Microphone Permission",
      message: "This app needs access to your microphone",
      buttonPositive: "OK",
    }
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

export function useAudioRecorder() {
  const isRecording = useRef(false);
  const initialized = useRef(false);

  const startRecording = async () => {
    if (isRecording.current) return;

    const ok = await requestMicPermission();
    if (!ok) return;

    if (!initialized.current) {
      AudioRecord.init({
        sampleRate: 16000,
        channels: 1,
        bitsPerSample: 16,
        audioSource: 1, // 🔥 MIC (FIX)
        wavFile: "voice.wav",
      });

      // 🔥 VERY IMPORTANT
      await new Promise(res => setTimeout(res, 500));
      initialized.current = true;
    }

    AudioRecord.start();
    isRecording.current = true;
  };

  const stopRecording = async () => {
    if (!isRecording.current) return null;

    const filePath = await AudioRecord.stop();
    isRecording.current = false;
    return filePath;
  };

  return {
    startRecording,
    stopRecording,
  };
}
