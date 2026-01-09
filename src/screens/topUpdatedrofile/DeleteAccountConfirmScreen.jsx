import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Header from '../../components/Header';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function DeleteAccountConfirmScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header title="Delete Account" />
      <Text style={styles.title}>
        You have requested the deletion of your account
      </Text>

      <Text style={styles.description}>
        This means your data, history, and access will be permanently removed.
        If you're sure, click below to continue.
      </Text>

      <TouchableOpacity
        style={styles.primaryBtn}
        activeOpacity={0.8}
        onPress={() => console.log('Account deleted')}
      >
        <Text style={styles.primaryText}>Delete my account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
        <Text style={styles.linkText}>Back to settings</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 24,
  },

  title: {
    fontSize: 24 * scale,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 32 * scale,
  },

  description: {
    fontSize: 14 * scale,
    color: '#555',
    lineHeight: 20 * scale,
    marginBottom: 32,
    fontFamily: Fonts.Regular,
  },

  primaryBtn: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  primaryText: {
    color: '#FFFFFF',
    fontSize: 18 * scale,
    fontWeight: '600',
    fontFamily: Fonts.Regular,
    lineHeight: 24,
  },

  linkText: {
    color: '#007AFF',
    fontSize: 18 * scale,
    textAlign: 'center',
    fontFamily: Fonts.Regular,
    lineHeight: 24,
  },
});
