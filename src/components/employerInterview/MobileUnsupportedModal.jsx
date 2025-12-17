// src/components/MobileUnsupportedModal.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../constants/fonts';

const { height } = Dimensions.get('window');

const MobileUnsupportedModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Interview Not Supported on Mobile</Text>

        <Text style={styles.description}>
          This interview includes coding questions that are not supported on the
          mobile app. Please switch to a laptop or desktop to complete your
          interview.
        </Text>

        <Text style={styles.thanks}>Thank you for your understanding.</Text>

        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.35)', // Light gray overlay
    justifyContent: 'center',  // ← Centers vertically
    alignItems: 'center',      // ← Centers horizontally
    zIndex: 1000,
  },
  card: {
    width: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: 'center',
    // Optional shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  thanks: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    lineHeight: 18,
    color: '#000000',
    textAlign: 'center',
    marginBottom: 28,
  },
  button: {
    width: '100%',
    height: 48,
    backgroundColor: '#0B5ED7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: '#FFFFFF',
  },
});

export default MobileUnsupportedModal;