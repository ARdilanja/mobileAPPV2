import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';
import { Fonts } from '../../constants/fonts';

const { width, height } = Dimensions.get('window');
const scale = width / 390;

export default function AboutScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="#F6F6F6" /> */}
      <Header title="About" />

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate('TermsofServiceScreen')}
        >
          <Text style={styles.text}>Terms of service</Text>
          <Image
            source={require('../../assets/images/Arrow_3.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>Privacy policy</Text>
          <Image
            source={require('../../assets/images/Arrow_3.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>

        <View style={styles.divider} />

        <View style={styles.versionRow}>
          <Text style={styles.text}>App version</Text>
          <Text style={styles.version}>v1.0.1</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: width * 0.04, // responsive margin
    paddingTop: height * 0.02,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16 * scale,
    paddingVertical: height * 0.01,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    width: '100%',          // 🔥 full responsive width
    alignSelf: 'center',
  },

  row: {
    minHeight: 52 * scale,  // responsive height
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
  },

  versionRow: {
    minHeight: 52 * scale,
    justifyContent: 'center',
    paddingHorizontal: width * 0.04,
  },

  text: {
    fontSize: 14 * scale,
    color: '#000',
    fontFamily: Fonts.Regular,
  },

  version: {
    marginTop: 4,
    fontSize: 13 * scale,
    color: '#666',
    fontFamily: Fonts.Regular,
  },

  arrow: {
    width: 10 * scale,
    height: 14 * scale,
    resizeMode: 'contain',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginHorizontal: width * 0.04,
  },
});
