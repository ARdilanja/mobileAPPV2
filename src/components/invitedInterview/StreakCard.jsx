// components/StreakCard.jsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const StreakCard = ({ streak = 120 }) => {
  return (
    <ImageBackground
      source={require('../../assets/images/Streak_points.png')}
      style={styles.streakCard}
      resizeMode="cover"
    >
      <View style={styles.streakBox}>
        <Text style={styles.streakNumber}>{streak}</Text>
        <Text style={styles.streakText}>Earned{'\n'}points</Text>
      </View>
    </ImageBackground>
  );
};

export default StreakCard;

const styles = StyleSheet.create({
  streakCard: {
    width: 100 * scale,
    height: 80 * scale,
    borderRadius: 8,
    overflow: 'hidden',
  },

  streakBox: {
    paddingHorizontal: 10,
    paddingVertical: 1,
    justifyContent: 'center',
  },

  streakNumber: {
    fontFamily: Fonts.Bold,
    lineHeight: 40,

    fontSize: 32,
    color: '#FFFFFF',
  },

  streakText: {
    fontFamily: Fonts.Regular,
    lineHeight: 14,
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
  },
});
