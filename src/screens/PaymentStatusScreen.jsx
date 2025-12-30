import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const successImg = require('../assets/images/green_success.png');
const failedImg = require('../assets/images/red_circle.png');
const recrootLogo = require('../assets/images/recroot_img.png');

export default function PaymentStatusScreen({
  status = 'success', // 'success' | 'failed'
}) {
  const isSuccess = status === 'success';

  return (
    <View style={styles.container}>
      {/* STATUS ICON (ONLY FOR SUCCESS) */}
      {isSuccess && (
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
      )}

      {/* TITLE */}
      <Text style={styles.title}>
        {isSuccess ? 'Payment successful' : 'Payment failed'}
      </Text>

      {/* BOTTOM WHITE SECTION */}
      <View style={styles.bottomSection}>
        {/* PAID TO ROW / FAILED TEXT */}
        {isSuccess ? (
          <View style={styles.paidRow}>
            <Text style={styles.paidText}>Paid to</Text>
            <Image
              source={recrootLogo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        ) : (
          <Text style={styles.sectionTitle}>Transaction failed</Text>
        )}

        {/* TRANSACTION ID */}
        <Text style={styles.label}>Transaction id</Text>
        <Text style={styles.value}>89632533963253</Text>

        {/* DATE */}
        <Text style={[styles.label, { marginTop: 12 * scale }]}>
          Date & Time
        </Text>
        <Text style={styles.value}>December 30, 2025 at 01:00 PM IST</Text>

        {/* LINK */}
        <Text style={styles.link}>View invoice ›</Text>

        {/* ACTION BUTTON */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            {isSuccess ? 'Home' : 'Retry payment'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    paddingTop: 90 * scale,
  },

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
    width: 170 * scale,
    height: 170 * scale,
  },

  title: {
    fontSize: 22 * scale,
    fontFamily: Fonts.Medium,
    marginTop: 45 * scale,
  },

  bottomSection: {
    position: 'absolute',
    bottom: 0,
    top: 300,
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16 * scale,
    paddingTop: 24 * scale,
    paddingBottom: 24 * scale,
    justifyContent: 'space-between',
  },

  paidRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16 * scale,
  },

  paidText: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Regular,
    lineHeight: 24,
    marginRight: 8,
  },

  logo: {
    width: 109 * scale,
    height: 24 * scale,
  },

  sectionTitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    marginBottom: 16 * scale,
    lineHeight: 24,
  },

  label: {
    fontSize: 18 * scale,
    color: '#777777',
    fontFamily: Fonts.Regular,
    lineHeight: 24,
  },

  value: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
    marginTop: 4 * scale,
  },

  link: {
    marginTop: 16 * scale,
    color: '#007AFF',
    fontSize: 14 * scale,
    position: 'relative',
    left: 10,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
  },

  button: {
    width: 358 * scale,
    height: 56 * scale,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16 * scale,
    fontWeight: '600',
  },
});
