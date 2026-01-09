import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Platform,
  Animated,
  StatusBar,
} from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import AudioRecord from 'react-native-audio-record';
import {
  LiveKitRoom,
  useTracks,
  VideoTrack,
  isTrackReference,
} from '@livekit/react-native';
import { Track } from 'livekit-client';
import { Buffer } from 'buffer';
import { LIVEKIT_URL } from '../config/api';
import { fetchLiveKitToken } from '../services/livekit';
import { Fonts } from '../constants/fonts';
import Header from '../components/Header';
import RNFS from 'react-native-fs';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const scale = width / 390;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_BAR_HEIGHT = 68;
/*  AUDIO CONFIG  */
const audioConfig = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  audioSource: 6,
  wavFile: 'mic_check.wav',
};

/*  DEEPGRAM  */
const DEEPGRAM_API_KEY = '4ef7bd0d54281e63169e5a58c6149205e86cc758';

async function transcribeWithDeepgram(filePath) {
  const audioBase64 = await RNFS.readFile(filePath, 'base64');
  const binary = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
  const response = await fetch(
    'https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true',
    {
      method: 'POST',
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        'Content-Type': 'audio/wav',
      },
      body: binary,
    },
  );
  const data = await response.json();
  return data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '';
}

function normalizeBrandName(text = '') {
  return text.replace(
    /\b(recruit|recuirt|record|rekroot|recuit)\b/gi,
    'Recroot',
  );
}

export default function MicCameraCheckScreen({ route }) {
  const navigation = useNavigation();
  const { roomName, interviewId, cid } = route.params;
  const hasNavigatedRef = useRef(false);

  const [token, setToken] = useState(null);
  const [camStatus, setCamStatus] = useState('idle');
  const [micStatus, setMicStatus] = useState('idle');
  const [showBlueSuccess, setShowBlueSuccess] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [showCamera, setShowCamera] = useState(true);
  const [showRedError, setShowRedError] = useState(false);
  const [delaySuccessUI, setDelaySuccessUI] = useState(false);

  const micAnim = useRef(new Animated.Value(1)).current;
  const stopAnimRef = useRef(null);

  const bothSuccess = camStatus === 'success' && micStatus === 'success';

  /*  CAMERA AUTO CHECK  */
  useEffect(() => {
    initCamera();
    return () => AudioRecord.stop();
  }, []);

  async function initCamera() {
    const res = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    if (res !== RESULTS.GRANTED) {
      setCamStatus('error');
      setShowRedError(true);
      return;
    }

    try {
      const t = await fetchLiveKitToken({
        roomName,
        interviewId,
        cid,
        identity: `cam-${Date.now()}`,
      });

      setToken(t);
      setCamStatus('success');
    } catch {
      setCamStatus('error');
      setShowRedError(true);
    }
  }

  /*  MIC CHECK  */
  async function handleMicPress() {
    if (micStatus !== 'idle' || camStatus !== 'success' || showBlueSuccess)
      return;

    const res = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    if (res !== RESULTS.GRANTED) {
      setMicStatus('error');
      setShowRedError(true);
      return;
    }

    setMicStatus('listening');
    setSpokenText(''); // Reset to show default again if retrying

    stopAnimRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(micAnim, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(micAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );
    stopAnimRef.current.start();

    AudioRecord.init(audioConfig);
    AudioRecord.start();

    let maxLevel = 0;
    const subscription = AudioRecord.on('data', data => {
      const buffer = Buffer.from(data, 'base64');
      let sum = 0;
      for (let i = 0; i < buffer.length; i += 2) {
        sum += Math.abs(buffer.readInt16LE(i));
      }
      const level = sum / (buffer.length / 2);
      maxLevel = Math.max(maxLevel, level);
    });

    setTimeout(async () => {
      const filePath = await AudioRecord.stop();
      subscription?.remove();
      stopAnimRef.current?.stop();
      micAnim.setValue(1);

      try {
        const transcript = await transcribeWithDeepgram(filePath);
        const normalizedDisplayText = normalizeBrandName(transcript);
        setSpokenText(normalizedDisplayText || 'No speech detected');

        const normalized = normalizeBrandName(transcript || '')
          .toLowerCase()

          .replace(/[^a-z ]/g, '')
          .trim();
        console.log('RAW TRANSCRIPT:', transcript);
        console.log('NORMALIZED:', normalized);
        console.log('MAX LEVEL:', maxLevel);
        const isHello =
          normalized.includes('hello') &&
          (normalized.includes('recroot') ||
            normalized.includes('recruit') ||
            normalized.includes('record'));

        const isReady = normalized.includes('ready');
        if (maxLevel > 120 && isHello && isReady) {
          setMicStatus('success');
          setDelaySuccessUI(true);
        } else {
          setMicStatus('error');
          setShowRedError(true);
        }
      } catch (err) {
        console.error('Transcription error:', err);
        setSpokenText('Transcription failed');
        setMicStatus('error');
      }
    }, 5000);
  }

  /*  BOTH SUCCESS HANDLER  */
  useEffect(() => {
    if (!bothSuccess) return;
    if (hasNavigatedRef.current) return;

    hasNavigatedRef.current = true;

    // Stop camera preview
    setShowCamera(false);

    // Show blue success AFTER 3 seconds
    const showBlueTimer = setTimeout(() => {
      setShowBlueSuccess(true);
    }, 3000);

    // Navigate AFTER 6 seconds
    const navigateTimer = setTimeout(() => {
      navigation.replace('SpeakInMeetingsScreen', {
        roomName,
        interviewId,
        cid,
      });
    }, 6000);

    return () => {
      clearTimeout(showBlueTimer);
      clearTimeout(navigateTimer);
    };
  }, [bothSuccess]);

  // useEffect(() => {
  //   console.log('STATUS:', camStatus, micStatus, bothSuccess);
  // }, [camStatus, micStatus]);

  const getErrorHeading = () => {
    if (camStatus === 'error' && micStatus === 'error') {
      return 'Camera & Microphone is not working';
    }
    if (camStatus === 'error') {
      return 'Camera is not working';
    }
    if (micStatus === 'error') {
      return 'Microphone is not working';
    }
    return '';
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {(showRedError || showBlueSuccess) && (
        <Header title="Camera & Mic check" />
      )}
      {(showBlueSuccess || showRedError) && (
        <View style={styles.headingWrapper}>
          <Text
            style={[
              styles.errorHeading,
              showBlueSuccess && styles.successHeading,
            ]}
          >
            {showBlueSuccess
              ? 'Camera & Microphone is working'
              : getErrorHeading()}
          </Text>
        </View>
      )}

      {/* FULL SCREEN CAMERA */}
      <View style={styles.cameraFull}>
        {showCamera && token && !showBlueSuccess && !showRedError && (
          <LiveKitRoom
            serverUrl={LIVEKIT_URL}
            token={token}
            connect
            video
            audio={false}
            options={{ adaptiveStream: false, dynacast: false }}
            style={StyleSheet.absoluteFill}
          >
            <CameraPreview />
          </LiveKitRoom>
        )}

        {/* SUCCESS */}
        {showBlueSuccess && (
          <View style={styles.centerOverlay}>
            <Image
              source={require('../assets/images/mic-cam-check.png')}
              style={styles.stateImage}
            />
          </View>
        )}

        {/* ERROR */}
        {showRedError && (
          <View style={styles.centerOverlay}>
            <Image
              source={require('../assets/images/mic-cam-redcicrle.png')}
              style={styles.stateImage}
            />
          </View>
        )}
      </View>

      {!showBlueSuccess && !showRedError && (
        <View style={styles.textOverlay}>
          <Text style={styles.instructionTitle}>Camera & Mic check</Text>
          <Text style={styles.instructionText}>
            Now position yourself in the frame and say,
          </Text>
          <Text
            style={[
              styles.quoteText,
              spokenText && styles.transcriptText,
              delaySuccessUI && styles.bold, // BOLD ONLY WHEN SUCCESS
            ]}
          >
            {spokenText ? `“${spokenText}”` : '“Hello Recroot, I’m ready.”'}
          </Text>
        </View>
      )}

      {/* GRADIENT BETWEEN TEXT & BOTTOM BAR */}
      {!showBlueSuccess && !showRedError && (
        <LinearGradient
          colors={['transparent', '#00000078', '#000000F0']}
          locations={[0, 0.5, 1]}
          pointerEvents="none"
          style={styles.betweenGradient}
        />
      )}

      {!showBlueSuccess && !showRedError && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomSubBar}>
            <Pressable onPress={handleMicPress}>
              <Animated.Image
                source={require('../assets/icons/white-circle-mic.png')}
                style={[
                  styles.bottomIcon,
                  micStatus === 'listening' && {
                    transform: [{ scale: micAnim }],
                  },
                ]}
              />
            </Pressable>
            <Image
              source={require('../assets/icons/white-video-camera.png')}
              style={styles.bottomIcon}
            />
          </View>
        </View>
      )}
    </View>
  );
}
/*  CAMERA PREVIEW  */
function CameraPreview() {
  const tracks = useTracks([Track.Source.Camera]);
  return (
    <View style={styles.cameraWrapper}>
      {tracks.map(
        t =>
          isTrackReference(t) && (
            <VideoTrack
              key={t.publication.trackSid}
              trackRef={t}
              style={styles.video}
              mirror
            />
          ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  headerTitle: {
    fontFamily: Fonts.Medium,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    color: '#000',
  },

  cameraFull: {
    flex: 1,
    backgroundColor: '#000',
  },

  cameraWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  video: {
    width: '100%',
    height: '100%',
  },

  headingWrapper: {
    paddingHorizontal: 16 * scale,
    paddingTop: 40 * scale,
    // paddingBottom: 8 * scale,
  },

  errorHeading: {
    fontFamily: Fonts.Regular,
    fontSize: 32 * scale,
    lineHeight: 42 * scale,
    color: '#000',
  },

  successHeading: {
    fontFamily: Fonts.Regular,
    fontSize: 32 * scale,
    lineHeight: 42 * scale,
    color: '#000',
  },

  centerOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'top',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingTop: 90 * scale,
  },

  stateImage: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_WIDTH * 0.6,
    resizeMode: 'contain',
  },

  textOverlay: {
    backgroundColor: '#FFFFFFD9',
    paddingHorizontal: 16 * scale,
    paddingVertical: 8 * scale,
    position: 'absolute',
    bottom: BOTTOM_BAR_HEIGHT + 35,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  instructionTitle: {
    fontFamily: Fonts.SemiBold,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
  },
  bold: {
    fontFamily: Fonts.Medium,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: BOTTOM_BAR_HEIGHT,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 6,
  },
  bottomSubBar: {
    position: 'absolute',
    bottom: 40 * scale,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  betweenGradient: {
    position: 'absolute',
    bottom: BOTTOM_BAR_HEIGHT,
    width: '100%',
    height: 80,
    zIndex: 5,
  },
  bottomIcon: {
    width: 48,
    height: 48,
    marginHorizontal: 10,
  },

  instructionText: {
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    color: '#000',
  },

  quoteText: {
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    color: '#000',
  },

  transcriptText: {
    fontFamily: Fonts.Medium,
    color: '#000',
  },
});
