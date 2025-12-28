import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;


const successImg = require('../assets/images/green_round.png');
const failedImg = require('../assets/images/red_round.png');

export default function PaymentStatusScreen({
  status = 'success', // 'success' | 'failed'
}) {
  const isSuccess = status === 'success';

  return (
    <View style={styles.container}>
      {/* STATUS ICON */}
      <View
        style={[
          styles.iconWrapper,
          isSuccess ? styles.successBorder : styles.failedBorder,
        ]}
      >
        <Image
          source={isSuccess ? successImg : failedImg}
          style={styles.statusIcon}
          resizeMode="contain"
        />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>
        {isSuccess ? 'Payment successful' : 'Payment failed'}
      </Text>

      {/* BOTTOM WHITE SECTION */}
      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>
          {isSuccess ? 'Paid to RECRoot' : 'Transaction failed'}
        </Text>

        <Text style={styles.label}>Transaction id</Text>
        <Text style={styles.value}>89632533963253</Text>

        <Text style={[styles.label, { marginTop: 12 * scale }]}>
          Date & Time
        </Text>
        <Text style={styles.value}>
          December 30, 2025 at 01:00 PM IST
        </Text>

        <Text style={styles.link}>View invoice ›</Text>
      </View>

      {/* ACTION BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {isSuccess ? 'Home' : 'Retry payment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    paddingTop: 48 * scale,
  },

  /* STATUS ICON CIRCLE */
  iconWrapper: {
    width: 120 * scale,
    height: 120 * scale,
    borderRadius: 60 * scale,
    borderWidth: 24 * scale,
    justifyContent: 'center',
    alignItems: 'center',
  },

  successBorder: {
    borderColor: '#CFF1DF',
  },

  failedBorder: {
    borderColor: '#FAD4D1',
  },

  statusIcon: {
    width: 100 * scale,
    height: 100 * scale,
  },

  title: {
    fontSize: 22 * scale,
    fontWeight: '700',
    marginTop: 24 * scale,
  },

  bottomSection: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 24 * scale,
    paddingHorizontal: 16 * scale,
    paddingTop: 24 * scale,
    paddingBottom: 32 * scale,
  },

  sectionTitle: {
    fontSize: 16 * scale,
    fontWeight: '600',
    marginBottom: 16 * scale,
  },

  label: {
    fontSize: 12 * scale,
    color: '#777777',
  },

  value: {
    fontSize: 14 * scale,
    fontWeight: '600',
    marginTop: 4 * scale,
  },

  link: {
    marginTop: 16 * scale,
    color: '#007AFF',
    fontSize: 14 * scale,
  },

  button: {
    width: 358 * scale,
    height: 56 * scale,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24 * scale,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16 * scale,
    fontWeight: '600',
  },
});
