import { useRef, useState } from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'react-native';

export function useAudioRecorder() {
  const recorder = useRef(new AudioRecorderPlayer()).current;
  const [recording, setRecording] = useState(false);

  const startRecording = async () => {
    const path =
      Platform.OS === 'ios'
        ? 'recording.m4a'
        : `${Date.now()}.m4a`;

    await recorder.startRecorder(path);
    setRecording(true);
    return path;
  };

  const stopRecording = async () => {
    const result = await recorder.stopRecorder();
    recorder.removeRecordBackListener();
    setRecording(false);
    return result;
  };

  return {
    startRecording,
    stopRecording,
    recording,
  };
}
