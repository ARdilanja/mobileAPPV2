import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { createLocalVideoTrack } from 'livekit-client';
import { VideoView } from '@livekit/react-native';

export default function CameraCheckScreen({ navigation }) {
  const [videoTrack, setVideoTrack] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    startCamera();
    return stopCamera;
  }, []);

  const startCamera = async () => {
    try {
      const track = await createLocalVideoTrack({
        facingMode: 'user', // FRONT camera
      });

      setVideoTrack(track);

      setTimeout(() => {
        setSuccess(true);
      }, 1000);
    } catch (err) {
      Alert.alert(
        'Camera Error',
        'Unable to access camera. Please allow permission.'
      );
    }
  };

  const stopCamera = () => {
    videoTrack?.stop();
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

      {success && (
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.navigate('NextScreen')}
        >
          <Text style={{ color: '#fff', fontSize: 26 }}>→</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

  header: {
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    color: '#000',
    fontSize: 18,
    zIndex: 2,
    fontWeight: '600',
  },

  camera: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 24,
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
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
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
