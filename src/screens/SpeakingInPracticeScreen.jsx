import { useFocusEffect,useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../constants/fonts';
import DayCompleScrolComponent from '../components/invitedInterview/DayCompleScrolComponent';
import planData from '../content/plan30.json'
const { width } = Dimensions.get('window');
const scale = width / 390;
const STATUS_BAR_HEIGHT =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const ITEM_WIDTH = 130 * scale;

const PRACTICE_OPTIONS = [
  'Promotion &\nAppraisal',
  'Speak in\nMeetings',
  'Saying\nNo',
];


const LOOPED_OPTIONS = [
  ...PRACTICE_OPTIONS,
  ...PRACTICE_OPTIONS,
  ...PRACTICE_OPTIONS,
];

export default function SpeakingInPracticeScreen() {
  const scrollRef = useRef(null);
  const middleIndex = PRACTICE_OPTIONS.length;
  const [activePracticeIndex, setActivePracticeIndex] = useState(1);

  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );
  React.useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        x: middleIndex * ITEM_WIDTH,
        animated: false,
      });
    }, 50);
  }, []);

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / ITEM_WIDTH);
    setActivePracticeIndex(index);
  };
  const handleMomentumScrollEnd = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    const rawIndex = Math.round(x / ITEM_WIDTH);
    const centerX = x + width / 2;
    const realIndex =
      ((rawIndex % PRACTICE_OPTIONS.length) + PRACTICE_OPTIONS.length) %
      PRACTICE_OPTIONS.length;

    setActivePracticeIndex(realIndex);

    // Jump back to middle silently
    if (rawIndex <= PRACTICE_OPTIONS.length ||
      rawIndex >= PRACTICE_OPTIONS.length * 2) {
      scrollRef.current?.scrollTo({
        x: (realIndex + PRACTICE_OPTIONS.length) * ITEM_WIDTH,
        animated: false,
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* TOP GRADIENT */}
      <View style={styles.topGradientWrapper}>
        <LinearGradient
          colors={['#FFFFFF', '#EBE6FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
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
              <Text style={styles.primaryBtnText}>Start today’s session</Text>
            </Pressable>

            <Pressable style={styles.secondaryBtn}>
              <Text style={styles.secondaryBtnText}>View full plan</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </View>

      <View style={{ paddingHorizontal: 16 * scale }}>
        {/* SESSION CARD */}
        <View style={styles.sessionCard}>
          <View style={styles.sessionCardRow}>
            <Text style={styles.sessGreenLabel}>Last session feedback</Text>

            <View style={styles.sessGreenDateChip}>
              <Text style={styles.sessGreenDate}>Jan 20, 2026</Text>
            </View>
          </View>

          <Text style={styles.sessGreenTitle}>
            Speak first in today’s standup
          </Text>

          <Pressable style={styles.fedbackBtn}>
            <Text style={styles.fedbackBtnText}>View feedback</Text>
            <Image
              source={require('../assets/images/angle-small.png')}
              style={styles.whitearrowIcon}
            />
          </Pressable>
        </View>

        {/* PRACTICE SECTION */}
        <View style={styles.lineWrapper}>
          <Text style={styles.startPracticeTitle}>
            Start an Ad-hoc Practice
          </Text>

          {/* CENTER FIXED INDICATOR */}
          <View style={styles.carouselWrapper}>
            {/* CENTER INDICATOR (RESPONSIVE) */}


            {/* HORIZONTAL SCROLL */}
            <ScrollView
              ref={scrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_WIDTH}
              decelerationRate="fast"
              onMomentumScrollEnd={handleMomentumScrollEnd}
              contentContainerStyle={styles.practiceRow}
            >
              {/* LEFT SPACER */}
              <View style={{ width: width / 2 - ITEM_WIDTH / 2 }} />

              {LOOPED_OPTIONS.map((item, index) => {
                const realIndex = index % PRACTICE_OPTIONS.length;
                const isActive = realIndex === activePracticeIndex;

                return (
                  <View key={`${item}-${index}`} style={styles.practiceItem}>
                    <Text
                      numberOfLines={2}
                      style={
                        isActive
                          ? styles.practiceTextActive
                          : styles.practiceTextMuted
                      }
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}

              {/* RIGHT SPACER */}
              <View style={{ width: width / 2 - ITEM_WIDTH / 2 }} />
            </ScrollView>

            <View style={styles.centerIndicatorContainer} pointerEvents="none">
              <LinearGradient
                colors={['#235DFF', '#F5F5F500']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.verticalLine}
              />
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
  container: { flex: 1, backgroundColor: '#FFFFFF' },

  topGradientWrapper: {
    height: 362 * scale + STATUS_BAR_HEIGHT,
    marginTop: -STATUS_BAR_HEIGHT,
    borderBottomLeftRadius: 16 * scale,
    borderBottomRightRadius: 16 * scale,
    overflow: 'hidden',
  },

  topGradient: { flex: 1 },

  topContent: {
    marginTop: STATUS_BAR_HEIGHT + 40 * scale,
    paddingHorizontal: 16 * scale,
  },

  todayText: {
    marginTop: 24 * scale,
    color: '#4A2AC9',
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
  },

  title: {
    marginTop: 8 * scale,
    fontSize: 24 * scale,
    fontFamily: Fonts.Medium,
  },

  week: {
    marginTop: 16 * scale,
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
  },

  dayScrollpart: { marginTop: 8 * scale },

  primaryBtn: {
    marginTop: 24 * scale,
    height: 40 * scale,
    borderRadius: 8 * scale,
    backgroundColor: '#4A2AC9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryBtnText: {
    color: '#FFF',
    fontFamily: Fonts.Medium,
  },

  secondaryBtn: {
    marginTop: 14 * scale,
    height: 40 * scale,
    borderRadius: 8 * scale,
    borderWidth: 1,
    borderColor: '#4A2AC9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryBtnText: {
    color: '#4A2AC9',
    fontFamily: Fonts.Medium,
  },

  sessionCard: {
    marginTop: 24 * scale,
    borderRadius: 16 * scale,
    backgroundColor: '#E8E2FF',
    padding: 12 * scale,
  },

  sessionCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sessGreenLabel: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    color: '#4A2AC9',
  },

  sessGreenDateChip: {
    borderRadius: 8 * scale,
    paddingVertical: 4 * scale,
    paddingHorizontal: 8 * scale,
    backgroundColor: '#D7CCFF',
  },

  sessGreenDate: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
  },

  sessGreenTitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    marginTop: 12 * scale,
  },

  fedbackBtn: {
    marginTop: 16 * scale,
    width: 169 * scale,
    height: 40 * scale,
    borderRadius: 8 * scale,
    backgroundColor: '#4A2AC9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12 * scale,
  },

  fedbackBtnText: {
    color: '#FFF',
    fontFamily: Fonts.Medium,
  },

  whitearrowIcon: {
    tintColor: '#FFF',
    width: 20 * scale,
    height: 20 * scale,
  },

  lineWrapper: { marginVertical: 26 * scale },

  startPracticeTitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    marginBottom: 28 * scale,
  },

  practiceRow: {
    // paddingHorizontal: (width - ITEM_WIDTH) / 2,
    paddingBottom: 12 * scale,
  },

  practiceItem: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -3 * scale
  },


  practiceTextMuted: {
    fontSize: 14 * scale,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20 * scale,
  },

  practiceTextActive: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    color: '#000',
    textAlign: 'center',
    lineHeight: 24 * scale,
  },


  carouselWrapper: {
    // height: 80 * scale,
    justifyContent: 'center',
    alignContent: "center",
    textAlign: "center",
    alignItems: "center"
  },

  centerIndicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  verticalLine: {
    width: 4 * scale,
    height: 40 * scale,
    borderRadius: 24 * scale,
  },

  practiceBtn: {
    paddingHorizontal:16*scale,
    paddingVertical:16*scale,
    borderRadius: 48 * scale,
    backgroundColor: '#235DFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  practiceBtnText: {
    color: '#FFF',
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    fontSize: 18 * scale
  },
});
