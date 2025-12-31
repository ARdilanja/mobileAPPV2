import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const CARD_WIDTH = 358 * scale;
const CARD_HEIGHT = 176 * scale;

const TOP_WIDTH = 350 * scale;
const TOP_HEIGHT = 120 * scale;

const LOGO_BOX = 46 * scale;
const LOGO_WIDTH = 46 * scale;
const LOGO_HEIGHT = 46 * scale;
const arrowIcon = require('../../assets/icons/arrow-small-right.png');

const InterviewTopCard = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* TOP VIOLET SECTION */}
        <ImageBackground
          source={require('../../assets/images/BG_Violet.png')}
          resizeMode="cover"
          style={styles.topSection}
        >
          <Text style={styles.title}>You’ve received an interview invite</Text>

          {/* LOGO + TEXT ROW */}
          <View style={styles.row}>
            <View style={styles.logoBox}>
              <Image
                source={require('../../assets/images/violet_logo.png')}
                style={styles.logo}
              />
            </View>

            <View style={styles.textBox}>
              <Text style={styles.role}>React Native Developer</Text>
              <Text style={styles.company}>Google</Text>
            </View>
          </View>
        </ImageBackground>

        {/* BOTTOM ROW */}
        <View style={styles.bottomRow}>
          <Text style={styles.dueText}>
            Due in <Text style={styles.days}>3 days</Text>
          </Text>

          <TouchableOpacity activeOpacity={0.8} style={styles.startBtn}>
            <Text style={styles.startText}>Start now</Text>
            <Image source={arrowIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InterviewTopCard;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    // marginTop: 10,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },

  topSection: {
    width: TOP_WIDTH,
    height: TOP_HEIGHT,
    alignSelf: 'center',
    margin: 4 * scale,
    borderRadius: 16,
    padding: 16 * scale,
  },

  title: {
    fontFamily: Fonts.Medium,
    fontSize: 14 * scale,
    lineHeight: 20,
    color: '#FFFFFF',
    marginBottom: 10 * scale,
    fontWeight: 500,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBox: {
    width: LOGO_BOX,
    height: LOGO_BOX,
    borderRadius: LOGO_BOX / 2,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
    resizeMode: 'contain',
  },

  textBox: {
    marginLeft: 12 * scale,
  },

  role: {
    fontFamily: Fonts.Medium,
    fontSize: 18 * scale,
    lineHeight: 22,
    color: '#FFFFFF',
  },

  company: {
    fontFamily: Fonts.Regular,
    fontSize: 14 * scale,
    lineHeight: 20,
    color: '#E9DFFF',
    marginTop: 2,
  },

  /* BOTTOM ROW */
  bottomRow: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dueText: {
    fontFamily: Fonts.Regular,
    lineHeight: 20,
    fontSize: 15 * scale,
    color: '#000',
    fontWeight: 400,
  },

  days: {
    fontFamily: Fonts.Medium,
    lineHeight: 20,
    fontWeight: 500,
    fontSize: 15 * scale,
  },

  startBtn: {
    width: 105 * scale,
    height: 24 * scale,
    borderRadius: 24 * scale,
    backgroundColor: '#740CE3',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    paddingVertical: 2 * scale,
    // paddingHorizontal: 12 * scale,
    gap: 4 * scale,
  },

  arrowIcon: {
    width: 17 * scale,
    height: 17 * scale,
    marginLeft: 6 * scale,
    resizeMode: 'contain',
  },

  startText: {
    fontFamily: Fonts.Regular,
    lineHeight: 20,
    fontSize: 14 * scale,
    color: '#FFF',
  },
});
