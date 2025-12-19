import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createLocalAudioTrack } from 'livekit-client';

export default function MicCheckScreen({ navigation }) {
  const [checking, setChecking] = useState(false);
  const [success, setSuccess] = useState(false);
  const audioTrackRef = useRef(null);

  const startMicCheck = async () => {
    if (checking) return;
    setChecking(true);

    try {
      const track = await createLocalAudioTrack({
        noiseSuppression: true,
        echoCancellation: true,
      });

      audioTrackRef.current = track;

      // ✅ Mic WORKING
      setTimeout(() => {
        setSuccess(true);
        setChecking(false);
      }, 1500);

    } catch (err) {
      setChecking(false);
      Alert.alert(
        'Microphone Error',
        'Microphone not available. Please allow mic permission.'
      );
    }
  };

  const goNext = () => {
    audioTrackRef.current?.stop();
    navigation.navigate('CameraCheckScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mic Check</Text>

      {/* Fake waveform (UI only) */}
      <View style={styles.waveContainer}>
        {[...Array(18)].map((_, i) => (
          <View
            key={i}
            style={[
              styles.bar,
              { height: checking ? 20 + Math.random() * 60 : 20 },
            ]}
          />
        ))}
      </View>

      {!success && (
        <TouchableOpacity style={styles.micBtn} onPress={startMicCheck}>
          <Text style={{ color: '#fff', fontSize: 28 }}>🎤</Text>
        </TouchableOpacity>
      )}

      {success && (
        <>
          <View style={styles.card}>
            <Text style={{ fontSize: 40 }}>✅</Text>
            <Text>Microphone Check Successful</Text>
          </View>

          <TouchableOpacity style={styles.nextBtn} onPress={goNext}>
            <Text style={{ color: '#fff', fontSize: 26 }}>→</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  header: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },

  waveContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    marginTop: 140,
  },

  bar: {
    width: 6,
    backgroundColor: '#0066ff',
    marginHorizontal: 4,
    borderRadius: 4,
  },

  micBtn: {
    marginTop: 120,
    backgroundColor: '#0066ff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  micIcon: {
    fontSize: 30,
    color: '#fff',
  },

  card: {
    marginTop: 80,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },

  successCircle: {
    backgroundColor: '#2ecc71',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  check: {
    color: '#fff',
    fontSize: 36,
    fontWeight: '700',
  },

  successText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
  },

  nextBtn: {
    marginTop: 40,
    backgroundColor: '#0066ff',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  nextText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
});


