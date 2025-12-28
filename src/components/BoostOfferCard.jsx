import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

// 👉 Background image
const bgImage = require('../assets/images/boost_bg.png');

export default function BoostOfferCard() {
  return (
    <ImageBackground
      source={bgImage}
      style={styles.container}
      imageStyle={styles.imageStyle}
      resizeMode="cover"
    >
      {/* TOP ROW */}
      <View style={styles.topRow}>
        <Text style={styles.discountText}>25% Off</Text>
        <Text style={styles.title}>CAREER BOOST OFFER</Text>
      </View>

      {/* BOTTOM TEXT */}
      <Text style={styles.subtitle}>
        Limited time offer until December 26th!
      </Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: 80 * scale,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    overflow: 'hidden', 
  },

  imageStyle: {
    borderRadius: 16,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  discountText: {
    fontFamily: 'IBM Plex Sans',
    fontWeight: '700',
    fontSize: 28 * scale,
    lineHeight: 40 * scale,
    color: '#5B2EFF',
    paddingHorizontal: 10,
  },

  title: {
    fontFamily: 'IBM Plex Sans',
    fontWeight: '500',
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    color: '#000000',
    paddingHorizontal: 10,
  },

  subtitle: {
    fontFamily: 'IBM Plex Sans',
    fontWeight: '400',
    fontSize: 12 * scale,
    lineHeight: 14 * scale,
    color: '#555',
    marginTop: 4,
  },
});
