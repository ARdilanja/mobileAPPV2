import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const { width, height } = Dimensions.get('window');

// ===== WIDTH-BASED RESPONSIVE SCALE =====
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;

// ===== RESPONSIVE WIDTH & HEIGHT VALUES =====
const HERO_HEIGHT = Math.round(scale * 320);

const STREAK_WIDTH = Math.round(scale * 105);
const STREAK_HEIGHT = Math.round(scale * 88);

const JOURNEY_WIDTH = Math.round(scale * 250);
const JOURNEY_HEIGHT = Math.round(scale * 88);

const DAY_SIZE = Math.round(scale * 42);

const PRACTICE_CARD_HEIGHT = Math.round(scale * 40);

const CONFIDENCE_HEIGHT = Math.round(scale * 90);

const START_BUTTON_HEIGHT = Math.round(scale * 56);

// =======================================

const getDayIcon = day => {
  if (day < 3) return require('../assets/images/finish_task.png');
  if (day === 3) return require('../assets/images/red-cross.png');
  if (day === 4) return require('../assets/images/round_day1.png');
  return require('../assets/images/snooze.png');
};

export default function Home() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={require('../assets/images/first-img.jpg')}
            style={styles.hero}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(255,255,255,0)', '#FFFFFF']}
              style={styles.gradient}
            />
          </ImageBackground>

          {/* STREAK FLOAT */}
          <ImageBackground
            source={require('../assets/images/Streak_points.png')}
            style={styles.streakBg}
            resizeMode="cover"
          >
            <View style={styles.streakBox}>
              <Text style={styles.streakValue}>40</Text>
              <Text style={styles.streakLabel}>Earned points</Text>
            </View>
          </ImageBackground>

          {/* JOURNEY CARD */}
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
                  <View
                    key={day}
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
                );
              })}
            </ScrollView>
          </View>
        </View>

        {/* PRACTICE TIME */}
        <View style={styles.practiceTimeCard}>
          <Text style={styles.practiceLabel}>Total {'\n'}practice time</Text>
          <Text style={styles.practiceValue}>60 minutes</Text>
        </View>

        <LinearGradient
          colors={['#FFF9CA', '#EDC15C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.confidenceCard}
        >
          {/* Background Illustration */}
          {/* <Image
    source={require('../assets/images/Confidence.png')}
    style={styles.bgIllustration}
  /> */}

          {/* Text */}
          <View>
            <Text style={styles.confidenceTitle}>Confidence Readiness</Text>
            <Text style={styles.confidenceValue}>24%</Text>
          </View>

          {/* Badge (SEPARATE IMAGE) */}
          <Image
            source={require('../assets/images/batch.png')}
            style={styles.badge}
          />
        </LinearGradient>

        <LinearGradient
          colors={['#96F9D6', '#246951']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.confidenceCard1}
        >
          {/* Background Illustration */}
          {/* <Image
    source={require('../assets/images/batch.png')}
    style={styles.bgIllustration}
  /> */}
          {/* Text */}
          <View>
            <Text style={styles.confidenceTitle}>Most Practiced Skill</Text>
            <Text style={styles.confidenceValue}>Speaking in Meeting</Text>
          </View>
          <Image
            source={require('../assets/images/most_practiced.png')}
            style={styles.mostpracticed}
          />
        </LinearGradient>

        {/* START BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.startPracticeButton}
          onPress={() => navigation.navigate('PracticeStartScreen')}
        >
          <Text style={styles.startPracticeText}>Start Practice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  heroWrapper: {
    position: 'relative',
    paddingBottom: 70,
  },

  hero: {
    width: '100%',
    height: HERO_HEIGHT,
    justifyContent: 'flex-end',
  },

  gradient: {
    height: 130,
    width: '100%',
  },

  streakBg: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: STREAK_WIDTH,
    height: STREAK_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },

  streakBox: {
    padding: Math.round(scale * 10),
  },

  streakValue: {
    fontSize: 32 * scale,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  streakLabel: {
    fontSize: 12 * scale,
    color: '#EAF2FF',
    width: Math.round(scale * 45),
  },

  journeyCard: {
    position: 'absolute',
    bottom: Math.round(scale * 0),
    left: Math.round(scale * 130),
    width: JOURNEY_WIDTH,
    height: JOURNEY_HEIGHT,
    backgroundColor: '#FFFFFF',
    padding: Math.round(scale * 10),
    borderRadius: Math.round(scale * 8),
    elevation: 6,
    overflow: 'hidden',
  },

  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Math.round(scale * 6),
  },

  journeyTitle: {
    fontSize: 14 * scale,
    fontWeight: '600',
  },

  journeyCount: {
    fontSize: 14 * scale,
    fontWeight: '600',
    color: '#2D6BFF',
  },

  journeyRow: {
    flexDirection: 'row',
    gap: Math.round(scale * 8),
    alignItems: 'center',
  },

  dayItem: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: Math.round(scale * 6),
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  dayIcon: {
    width: DAY_SIZE * 0.38,
    height: DAY_SIZE * 0.38,
    marginBottom: Math.round(scale * 4),
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
    fontFamily: 'IBMPlexSans-Regular',
    fontSize: 12 * scale,
    color: '#666',
  },

  activeDayText: {
    color: '#2D6BFF',
    fontFamily: 'IBMPlexSans-Bold',
  },

  redDayText: {
    color: '#E53935',
  },

  practiceTimeCard: {
    marginHorizontal: 16,
    height: height * 0.08,
    // paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  practiceLabel: {
    fontSize: 14 * scale,
    width: Math.round(scale * 83),
    height: PRACTICE_CARD_HEIGHT,
  },

  practiceValue: {
    fontSize: 16 * scale,
    fontWeight: '700',
    color: '#0A84FF',
  },

  confidenceCard: {
    // marginTop: Math.round(scale * 16),
    marginHorizontal: Math.round(scale * 16),
    height: CONFIDENCE_HEIGHT,
    borderRadius: Math.round(scale * 16),
    paddingHorizontal: Math.round(scale * 16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  confidenceCard1: {
    marginTop: Math.round(scale * 16),
    marginHorizontal: Math.round(scale * 16),
    height: CONFIDENCE_HEIGHT,
    borderRadius: Math.round(scale * 16),
    paddingHorizontal: Math.round(scale * 16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  confidenceTitle: {
    fontSize: 14 * scale,
    fontWeight: '500',
  },

  confidenceValue: {
    fontSize: 20 * scale,
    fontWeight: '700',
    marginTop: Math.round(scale * 4),
  },

  startPracticeButton: {
    marginHorizontal: 16,
    marginTop: height * 0.03,
    height: height * 0.07,
    backgroundColor: '#007AFF',
    borderRadius: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },

  startPracticeText: {
    color: '#FFFFFF',
    fontSize: 18 * scale,
    fontWeight: '600',
  },

  badge: {
    position: 'absolute',
    right: 24,
    // top: '50%',
    width: 90,
    height: 86,
    resizeMode: 'contain',
  },
  mostpracticed: {
    position: 'absolute',
    right: 2,
    width: 90,
    height: 80,
  },
});
