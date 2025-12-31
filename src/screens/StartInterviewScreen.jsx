import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  Platform,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import InterviewInviteTopCard from '../components/invitedInterview/InterviewInviteTopCard.jsx';
import StreakCard from '../components/invitedInterview/StreakCard.jsx';
import MonthDayCard from '../components/invitedInterview/MonthDayCard.jsx';
import { Text } from 'react-native';
import { Fonts } from '../constants/fonts';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const BASE_WIDTH = 390;
const scale = width / BASE_WIDTH;
const CONFIDENCE_HEIGHT = Math.round(scale * 90);
const HORIZONTAL_GUTTER = Math.round(scale * 16);

const notificationIcon = require('../assets/images/notification.png');
const confidenceBg = require('../assets/images/Confidence-bg.png');
const mostPracticedBg = require('../assets/images/Practiceskill-bg.png');

const InterviewScreen = () => {
  const navigation = useNavigation();
  const [notificationState, setNotificationState] = useState('active');
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );

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

  const renderNotification = () => {
    switch (notificationState) {
      case 'default':
        return (
          <TouchableOpacity style={styles.notifyWrapper} activeOpacity={0.8}>
            <Image
              source={require('../assets/images/notification.png')}
              style={styles.notifyIcon}
            />
          </TouchableOpacity>
        );

      case 'tooltip':
        return (
          <View style={[styles.notifyWrapper, styles.tooltipWrapper]}>
            <Text style={styles.tooltipText}>You have 1 notification</Text>
            <Image
              source={require('../assets/images/notification_active.png')}
              style={styles.tooltipIcon}
            />
          </View>
        );

      case 'active':
        return (
          <TouchableOpacity style={styles.notifyWrapper} activeOpacity={0.8}>
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
    <SafeAreaView style={styles.root}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Top Header */}
      <View style={styles.topHeader}>{renderNotification()}</View>

      {/* Invite + Streak */}
      <InterviewInviteTopCard />
      <View style={styles.streakWrapper}>
        <StreakCard />
        <MonthDayCard />
      </View>

      {/* Total Practice Time */}
      <View style={styles.practiceTimeCard}>
        <Text style={styles.practiceLabel}>Total {'\n'}practice time</Text>
        <Text style={styles.practiceValue}>60 minutes</Text>
      </View>

      {/* Confidence Readiness */}
      <ImageBackground
        source={confidenceBg}
        resizeMode="stretch"
        style={styles.confidenceCard}
        imageStyle={styles.bgImage}
      >
        <View>
          <Text style={styles.confidenceTitle}>Confidence Readiness</Text>
          <Text style={styles.confidenceValue}>24%</Text>
        </View>
      </ImageBackground>

      {/* Most Practiced Skill */}
      <ImageBackground
        source={mostPracticedBg}
        resizeMode="stretch"
        style={styles.confidenceCard}
        imageStyle={styles.bgImage}
      >
        <View>
          <Text style={styles.confidenceTitle}>Most Practiced Skill</Text>
          <Text style={styles.confidenceValue}>Speaking in Meeting</Text>
        </View>
      </ImageBackground>

      {/* Start Practice Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.startPracticeButton}
        onPress={() => navigation.navigate('StartInterviewScreen')}
      >
        <Text style={styles.startPracticeText}>Start Practice</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InterviewScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'flex-start',
  },

  topHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16 * scale,
    // marginTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 16 * scale : 16 * scale,
    marginTop: 55,
    paddingHorizontal: 20 * scale,
  },

  notifyWrapper: {
    width: 32 * scale,
    height: 32 * scale,
    borderRadius: 16 * scale,
    borderWidth: 1,
    borderColor: '#2D6BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notifyIcon: {
    width: 32 * scale,
    height: 32 * scale,
    resizeMode: 'contain',
  },
  tooltipWrapper: {
    flexDirection: 'row',
    // paddingHorizontal: 8,
    gap: 6,
    height: 32,
    width: 170,
    backgroundColor: '#235DFF',
  },

  tooltipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: Fonts.Regular,
    lineHeight: 20,
  },

  tooltipIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },

  streakWrapper: {
    paddingHorizontal: 16 * scale,
    flexDirection: 'row',
    gap: 6 * scale,
    marginTop: 10 * scale,
  },

  practiceTimeCard: {
    marginHorizontal: HORIZONTAL_GUTTER,
    marginTop: 16 * scale,
    marginBottom: 8 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  practiceLabel: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
  },

  practiceValue: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Bold,
    color: '#0A84FF',
  },

  confidenceCard: {
    marginHorizontal: HORIZONTAL_GUTTER,
    marginTop: 14 * scale,
    height: CONFIDENCE_HEIGHT,
    borderRadius: 16 * scale,
    paddingHorizontal: 16 * scale,
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 1,
  },

  bgImage: {
    borderRadius: 16 * scale,
  },

  confidenceTitle: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    color: '#000',
  },

  confidenceValue: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    marginTop: 4 * scale,
  },

  startPracticeButton: {
    position: 'absolute',
    bottom: 45,
    left: 16 * scale,
    right: 16 * scale,
    height: height * 0.07,
    backgroundColor: '#007AFF',
    borderRadius: height * 0.035,
    justifyContent: 'center',
    alignItems: 'center',
  },

  startPracticeText: {
    color: '#FFFFFF',
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
  },
});
