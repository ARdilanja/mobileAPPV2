// components/JourneyCard.jsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { Fonts } from '../../constants/fonts';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const scale = width / 390;
const DAY_SIZE = Math.round(scale * 42);
const JOURNEY_WIDTH = Math.round(scale * 250);

const getDayIcon = day => {
  if (day < 3) return require('../../assets/images/finish_task.png');
  if (day === 3) return require('../../assets/images/red-cross.png');
  if (day === 4) return require('../../assets/images/round_day1.png');
  return require('../../assets/images/snooze.png');
};

const MonthDayCard = ({ days = 10 }) => {
  return (
    <View style={styles.journeyCard}>
      <View style={styles.journeyHeader}>
        <Text style={styles.journeyTitle}>Journey</Text>
        <MaskedView
          maskElement={
            <Text style={styles.journeyCount}>5 days continuous</Text>
          }
        >
          <LinearGradient
            colors={['#0178FF', '#740CE3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={[styles.journeyCount, { opacity: 0 }]}>
              5 days continuous
            </Text>
          </LinearGradient>
        </MaskedView>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.journeyRow}
      >
        {Array.from({ length: 10 }).map((_, index) => {
          const day = index + 1;
          const isRed = day === 3;
          const isActive = day === 4;

          return (
            <View key={day} style={styles.dayWrapper}>
              <View
                style={[
                  styles.dayItem,
                  isActive && styles.activeDayBox,
                  isRed && styles.redDayBox,
                ]}
              >
                <Image
                  source={getDayIcon(day)}
                  style={[styles.dayIcon, isRed && styles.redDayIcon]}
                />

                <Text
                  style={[
                    styles.dayText,
                    isActive && styles.activeDayText,
                    isRed && styles.redDayText,
                  ]}
                >
                  Day {day}
                </Text>
              </View>

              {/* 🔵 Bottom active line (like screenshot) */}
              {isActive && <View style={styles.activeBottomLine} />}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MonthDayCard;

const styles = StyleSheet.create({
  journeyCard: {
    width: JOURNEY_WIDTH,
    height: 80 * scale,
    padding: Math.round(scale * 4),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 6,
    overflow: 'hidden',
  },
  journeyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0 * scale,
  },

  journeyTitle: {
    fontSize: 14 * scale,
    lineHeight: 20,
    fontFamily: Fonts.Regular,
  },
  journeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayItem: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  dayIcon: {
    width: DAY_SIZE * 0.38,
    height: DAY_SIZE * 0.38,
    // marginBottom: 4,
    resizeMode: 'contain',
  },
  redDayIcon: {
    tintColor: '#E53935',
  },
  activeDayBox: {
    borderWidth: 1.5,
    borderColor: '#2D6BFF',
    backgroundColor: '#EEF4FF',
  },
  redDayBox: {
    backgroundColor: '#FFECEC',
  },
  dayText: {
    fontFamily: Fonts.Regular,
    fontSize: 12 * scale,
    lineHeight: 14,
    fontWeight: 400,

    color: '#666',
  },
  activeDayText: {
    color: '#2D6BFF',
    fontFamily: Fonts.Bold,
    fontSize: 12 * scale,
    lineHeight: 14,
    fontWeight: 400,
  },
  redDayText: {
    color: '#E53935',
    fontFamily: Fonts.Regular,
    fontSize: 12 * scale,
    lineHeight: 14,
    fontWeight: 400,
  },
  journeyCount: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 20,
    color: '#316BFF',
  },
  dayWrapper: {
    alignItems: 'center',
  },

  activeBottomLine: {
    marginTop: 4,
    width: DAY_SIZE * 0.7,
    height: 1,
    borderRadius: 2,
    backgroundColor: '#316BFF',
  },
});
