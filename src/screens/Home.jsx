import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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
import { Fonts } from '../constants/fonts';

const { width, height } = Dimensions.get('window');

const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;

const HERO_HEIGHT = Math.round(scale * 330);

const STREAK_WIDTH = Math.round(scale * 100);
const STREAK_HEIGHT = Math.round(scale * 80);

const JOURNEY_WIDTH = Math.round(scale * 250);
const JOURNEY_HEIGHT = Math.round(scale * 80);

const DAY_SIZE = Math.round(scale * 42);

const PRACTICE_CARD_HEIGHT = Math.round(scale * 40);

const CONFIDENCE_HEIGHT = Math.round(scale * 90);
const HORIZONTAL_GUTTER = Math.round(scale * 16);

const getDayIcon = day => {
  if (day < 3) return require('../assets/images/finish_task.png');
  if (day === 3) return require('../assets/images/red-cross.png');
  if (day === 4) return require('../assets/images/round_day1.png');
  return require('../assets/images/snooze.png');
};

export default function Home() {
  const navigation = useNavigation();

  // Notification state
  const [notificationState, setNotificationState] = useState('active');
  // 'default' | 'tooltip' | 'active'

  // AUTO SET NOTIFICATION (API / unread logic)
  useEffect(() => {
    const unreadCount = 1; // <-- replace with API value

    if (unreadCount > 0) {
      setNotificationState('default');
    } else {
      setNotificationState('default');
    }
  }, []);

  //  STATUS BAR RESET WHEN SCREEN IS FOCUSED
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );

  const renderNotification = () => {
    switch (notificationState) {
      case 'default':
        return (
          <TouchableOpacity style={styles.notifyDefault} activeOpacity={0.8}>
            <Image
              source={require('../assets/images/notification.png')}
              style={styles.notifyIcon}
            />
          </TouchableOpacity>
        );

      case 'tooltip':
        return (
          <View style={styles.notifyTooltipContainer}>
            <View style={styles.tooltipBox}>
              <Text style={styles.tooltipText}>You have 1 notification</Text>
              <Image
                source={require('../assets/images/notification_active.png')}
                style={styles.tooltipIcon}
              />
            </View>
          </View>
        );

      case 'active':
        return (
          <TouchableOpacity style={styles.notifyActive}>
            <Image
              source={require('../assets/images/notofication_after.png')}
              style={styles.notifyIcon}
            />
          </TouchableOpacity>
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFF', '#F2F2F2']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* <StatusBar  barStyle="light-content" backgroundColor="#48474784"  translucent={true}  /> */}

      <View style={{ flex: 1 }}>
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={require('../assets/images/first-img.jpg')}
            style={styles.hero}
            resizeMode="cover"
          >
            <LinearGradient
              colors={['rgba(255,255,255,0)', '#ffffff']}
              style={styles.gradient}
            />
          </ImageBackground>
          {renderNotification()}
        </View>
        <View>
          <ImageBackground
            source={require('../assets/images/Streak_points.png')}
            style={styles.streakBg}
            resizeMode="cover"
          >
            <View style={styles.streakBox}>
              <Text style={styles.streakValue}>40</Text>
              <Text style={styles.streakLabel}>Earned {'\n'}points</Text>
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
                  <View key={day} style={styles.dayWrapper}>
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
                    {isActive && <View style={styles.activeBottomLine} />}
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
        <View style={styles.bottomSection}>
          <LinearGradient
            colors={['#FFF9CA', '#EDC15C']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.confidenceCard}
          >
            <View>
              <Text style={styles.confidenceTitle}>Confidence Readiness</Text>
              <Text style={styles.confidenceValue}>24%</Text>
            </View>

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
            <View>
              <Text style={styles.confidenceTitle}>Most Practiced Skill</Text>
              <Text style={styles.confidenceValue}>Speaking in Meeting</Text>
            </View>
            <Image
              source={require('../assets/images/Skills_wbg.png')}
              style={styles.mostpracticed}
            />
          </LinearGradient>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.startPracticeButton}
          onPress={() => navigation.navigate('NinetyDayPlanScreen')}
        >
          <Text style={styles.startPracticeText}>Start Practice</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    height: 85,
    width: '100%',
  },

  streakBg: {
    position: 'absolute',
    bottom: 10,
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
    lineHeight: 40,
    fontFamily: Fonts.Bold,
    color: '#FFFFFF',
  },

  streakLabel: {
    fontSize: 12 * scale,
    color: '#EAF2FF',
    fontFamily: Fonts.Regular,
    lineHeight: 14,
  },

  journeyCard: {
    position: 'absolute',
    bottom: Math.round(scale * 10),
    left: Math.round(scale * 125),
    width: JOURNEY_WIDTH,
    height: JOURNEY_HEIGHT,
    // padding: Math.round(scale * 4),
    paddingHorizontal: Math.round(scale * 5),
    paddingVertical: Math.round(scale * 5),
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 6,
    overflow: 'hidden',
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

  journeyCount: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 20,
    color: '#2D6BFF',
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
    marginRight: 3,
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
    fontFamily: Fonts.Regular,
    lineHeight: 14,

    fontSize: 12 * scale,
    color: '#666',
  },
  activeDayText: {
    color: '#2D6BFF',
    fontFamily: Fonts.Bold,
    lineHeight: 14,
  },

  redDayText: {
    color: '#E53935',
    lineHeight: 14,
  },

  practiceTimeCard: {
    marginHorizontal: HORIZONTAL_GUTTER,
    height: height * 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 1,
  },

  practiceLabel: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    height: PRACTICE_CARD_HEIGHT,
    lineHeight: 20,
  },

  practiceValue: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Bold,
    lineHeight: 24,

    color: '#0A84FF',
  },

  confidenceCard: {
    marginHorizontal: HORIZONTAL_GUTTER,
    height: CONFIDENCE_HEIGHT,
    borderRadius: Math.round(scale * 16),
    paddingHorizontal: Math.round(scale * 16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 1,
  },
  confidenceCard1: {
    marginTop: Math.round(scale * 16),
    marginHorizontal: HORIZONTAL_GUTTER,
    height: CONFIDENCE_HEIGHT,
    borderRadius: Math.round(scale * 16),
    paddingHorizontal: Math.round(scale * 16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    elevation: 1,
  },

  confidenceTitle: {
    fontSize: 15 * scale,
    fontFamily: Fonts.Regular,
    lineHeight: 20,
    color: '#000000',
    fontWeight: '400',
  },

  confidenceValue: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
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
  },

  startPracticeText: {
    color: '#FFFFFF',
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
  },

  badge: {
    position: 'absolute',
    right: 22,
    width: 110,
    height: 86,
    resizeMode: 'contain',
  },
  mostpracticed: {
    position: 'absolute',
    right: 2,
    width: 160,
    height: 90,
  },

  notifyDefault: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: '#2D6BFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyActive: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyTooltipContainer: {
    position: 'absolute',
    top: 48,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tooltipIcon: {
    width: 18,
    height: 18,
    marginLeft: 8, // ✅ space from text
    resizeMode: 'contain',
    tintColor: '#FFFFFF', // ✅ white icon
  },

  // /* 🔔 TOOLTIP STATE */
  // notifyTooltipContainer: {
  //   position: 'absolute',
  //   top: 60,
  //   left: 186,
  //   width: 188,
  //   height: 32,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },

  tooltipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0178FF',
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
  },

  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 20,
  },
  notifyIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  dayWrapper: {
    alignItems: 'center',
  },

  activeBottomLine: {
    marginTop: 4,
    width: 26 * scale,
    height: 1,
    borderRadius: 2,
    backgroundColor: '#316BFF',
  },
});
