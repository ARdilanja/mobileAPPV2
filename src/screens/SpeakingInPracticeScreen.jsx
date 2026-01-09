import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar, Image,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../constants/fonts';
import DayCompleScrolComponent from '../components/invitedInterview/DayCompleScrolComponent';

const { width } = Dimensions.get('window');
const scale = width / 390;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export default function SpeakingInPracticeScreen() {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );

  return (

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* TOP GRADIENT – EXTENDS INTO STATUS BAR */}
      <View style={styles.topGradientWrapper}>
        <LinearGradient
          colors={['#FFFFFF', '#EBE6FF']}
          locations={[0, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          // style={styles.gradient}
          style={styles.topGradient}
        >
          <View style={styles.topContent}>
            <Text style={styles.todayText}>Today’s session</Text>
            <Text style={styles.title}>Speak first in today’s standup</Text>
            <Text style={styles.week}>Week 1</Text>

            <DayCompleScrolComponent
              style={styles.dayScrollpart}
              totalDays={9}
              activeDay={4}
            />

            <Pressable style={styles.primaryBtn}>
              <Text style={styles.primaryBtnText}>
                Start today’s session
              </Text>
            </Pressable>

            <Pressable style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>
                View full plan
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      {/* SESSION CARD */}
      {/* <View style={styles.sessionCard}>
          <View>
            <Text style={styles.sessionLabel}>Session 1</Text>
            <Text style={styles.sessionTitle}>Speak in Meetings</Text>

            <View style={styles.sessionMeta}>
              <View style={styles.dateChip}>
                <Image
                  source={require('../assets/icons/calendar-day.png')}
                  style={styles.metaIcon}
                />
                <Text style={styles.metaText}>Jan 07, 2025</Text>
              </View>

              <View style={styles.timeChip}>
                <Image
                  source={require('../assets/icons/clock-three.png')}
                  style={styles.metaIcon}
                />
                <Text style={styles.metaText}>7 mins</Text>
              </View>
            </View>

          </View>

          <View style={styles.rightWrap}>
            <Image
              source={require('../assets/images/angle-small.png')}
              style={styles.arrowIcon}
            />
            <View style={styles.greetingPart}>
              <View style={styles.pointsRow}>
                <Text style={styles.streakNumber}>23</Text>
                <Image
                  source={require('../assets/icons/greatings.png')}
                  style={styles.greetingImg}
                />
              </View>

              <Text style={styles.streakText}>Points Earned</Text>
            </View>


          </View>
        </View> */}
      <View style={{ paddingHorizontal: 16 * scale }}>
        <View style={styles.sessionCard}>
          <View style={styles.sessionLeft}>
            <Text style={styles.sessGreenLabel}>Last session feedback</Text>
            <Text style={styles.sessGreenTitle}>
              Speak first in today’s standup
            </Text>

            {/* View Feedback Button - Bottom Left */}
            <Pressable style={styles.fedbackBtn}>
              <Text style={styles.fedbackBtnText}>
                View feedback
              </Text>
              <Image
                source={require('../assets/images/angle-small.png')}
                style={styles.whitearrowIcon}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.lineWrapper}>
          <Text style={styles.startPracticeTitle}>Start an Ad-hoc Practice</Text>

          <View style={styles.practiceRow}>
            {/* Left */}
            <View style={styles.practiceItem}>
              <Text style={styles.practiceTextMuted}>Promotion & Appraisal</Text>
            </View>

            {/* Center (Active) */}
            <View style={styles.practiceCenterItem}>
              <Text style={styles.practiceTextActive}>Speak in Meetings</Text>

              <LinearGradient
                colors={['#235DFF', 'rgba(245,245,245,0)',]}

                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.verticalLine}
              />
            </View>

            {/* Right */}
            <View style={styles.practiceItem}>
              <Text style={styles.practiceTextMuted}>Saying No</Text>
            </View>
          </View>
        </View>


        <Pressable style={styles.practiceBtn}>
          <Text style={styles.practiceBtnText}>Start practice</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topGradientWrapper: {
    height: 362 * scale + STATUS_BAR_HEIGHT,
    marginTop: -STATUS_BAR_HEIGHT,
    borderBottomLeftRadius: 16 * scale,
    borderBottomRightRadius: 16 * scale,
    overflow: 'hidden',
  },

  topGradient: {
    flex: 1,
  },
  topContent: {
    marginTop: STATUS_BAR_HEIGHT + 40 * scale,
    paddingHorizontal: 16 * scale, // ✅ move padding here
  },

  todayText: {
    marginTop: 24 * scale,
    color: '#4A2AC9',
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    fontFamily: Fonts.Regular
  },

  title: {
    marginTop: 8 * scale,
    color: '#000',
    fontSize: 24 * scale,
    lineHeight: 32 * scale,
    fontFamily: Fonts.Medium
  },

  week: {
    marginTop: 16 * scale,
    color: '#2A2A2A',
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    fontFamily: Fonts.Regular
  },

  /* Day Scroll */
  dayScrollpart: {
    marginTop: 8 * scale,
    paddingRight: 16 * scale,
  },


  /* Buttons */
  primaryBtn: {
    marginTop: 24 * scale,
    height: 40 * scale,
    borderRadius: 8 * scale,
    backgroundColor: '#4A2AC9',
    borderColor: '#4A2AC9',

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
  },

  primaryBtnText: {
    color: '#FFF3EA',
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    paddingVertical: 8 * scale
  },

  secondaryBtn: {
    marginTop: 14 * scale,
    height: 40 * scale,
    borderRadius: 8 * scale,
    borderWidth: 1,
    borderColor: '#4A2AC9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16 * scale,
  },

  secondaryBtnText: {
    color: '#4A2AC9',
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    paddingVertical: 8 * scale
  },

  /* Session Card */
  sessionCard: {
    marginTop: 24 * scale,
    height: 140 * scale,
    borderRadius: 16 * scale,
    backgroundColor: '#E2F6E5',
    padding: 12 * scale,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sessGreenLabel: {
    fontFamily: Fonts.Regular,
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    color: "#009343"
  },
  sessionLeft: {
    flex: 1,
    justifyContent: 'space-between',
  },

  fedbackBtn: {
    width: 169 * scale,
    height: 40 * scale,
    borderRadius: 8 * scale,
    paddingVertical: 8 * scale,
    marginVertical: 16 * scale,
    paddingHorizontal: 12 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#009343',
    justifyContent: "space-between"
  },

  fedbackBtnText: {
    fontFamily: Fonts.Medium,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    color: "#fff",
  },
  whitearrowIcon: {
    tintColor: "#FFF",
    width: 20 * scale,
    height: 20 * scale,
  },
  sessGreenTitle: {
    fontFamily: Fonts.Medium,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    marginTop: 12 * scale
  },
  sessionLabel: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    lineHeight: 20 * scale,
    color: '#6B5CFF',
  },

  sessionTitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    marginTop: 12 * scale,
  },

  sessionMeta: {
    flexDirection: 'row',
    gap: 8 * scale,
    marginTop: 12 * scale,
  },

  metaIcon: {
    width: 12 * scale,
    height: 12 * scale,
    resizeMode: 'contain',
  },

  dateChip: {
    height: 28 * scale,
    width: 120 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8 * scale,
    paddingVertical: 4 * scale,
    gap: 8 * scale,
    borderRadius: 4 * scale,
    backgroundColor: '#EBE6FF',
  },

  timeChip: {
    height: 28 * scale,
    width: 79 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8 * scale,
    paddingVertical: 4 * scale,
    gap: 8 * scale,
    borderRadius: 4 * scale,
    backgroundColor: '#EBE6FF',
  },


  pointsWrap: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  points: {
    fontSize: 22 * scale,
    fontWeight: '700',
  },

  pointsLabel: {
    fontSize: 12 * scale,
    color: '#8E8E93',
    marginTop: 4 * scale,
  },
  rightWrap: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
  },

  greetingImg: {
    width: 24 * scale,
    height: 32 * scale,
    resizeMode: 'contain',
  },
  greetingPart: {
    alignItems: 'flex-end',
    width: 88 * scale,
    height: 68 * scale,
    marginRight: 24 * scale,
  },

  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6 * scale,
  },

  streakNumber: {
    fontSize: 32 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 48 * scale,
    color: '#000',
  },

  streakText: {
    marginTop: 2 * scale,
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    lineHeight: 20 * scale,

    color: '#000',
  },
  arrowIcon: {
    width: 20 * scale,
    height: 20 * scale,
    resizeMode: 'contain',
    // marginTop: 8 * scale,
  },

  lineWrapper: {
    marginVertical: 26 * scale,
  },

  startPracticeTitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    color: '#000',
    marginBottom: 28 * scale,
    lineHeight: 24 * scale,
    textAlign: "left"
  },

  practiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 8 * scale,
  },

  practiceItem: {
    width: 80 * scale,
    alignItems: 'center',
  },

  practiceCenterItem: {
    width: 80 * scale,
    alignItems: 'center',
  },

  practiceTextMuted: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20 * scale,
  },

  practiceTextActive: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    color: '#000',
    textAlign: 'center',
  },

  verticalLine: {
    width: 4 * scale,
    height: 40 * scale,
    borderRadius: 24 * scale,
    marginTop: 22 * scale,
    // marginBottom: 20 * scale

  },

  practiceBtn: {
    // marginBottom: 32 * scale,
    height: 56 * scale,
    borderRadius: 48 * scale,
    backgroundColor: '#235DFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40 * scale,
  },

  practiceBtnText: {
    color: '#FFFFFF',
    fontSize: 16 * scale,
    fontFamily: Fonts.Medium, lineHeight: 24 * scale
  },
});
