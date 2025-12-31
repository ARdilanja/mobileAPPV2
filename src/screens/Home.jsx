import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
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

const { width, height } = Dimensions.get('window');
const scale = width / 375;

export default function Home() {
  const navigation = useNavigation();
//   const clearAuthStorage = async () => {
//   try {
//     await AsyncStorage.multiRemove([
//       'token',
//       'refreshToken',
//       'user',
//     ]);

//     console.log('Auth storage cleared successfully');
//   } catch (error) {
//     console.error('Failed to clear auth storage:', error);
//   }
// };

// useEffect(() => {
//   clearAuthStorage()
// },[])
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={styles.journeyCount}>5 days continuous</Text>
            </View>

            <View style={styles.journeyRow}>
              {[
                { label: 'Day 1', icon: require('../assets/images/finish_task.png') },
                { label: 'Day 2', icon: require('../assets/images/finish_task.png') },
                { label: 'Day 3', icon: require('../assets/images/round_day1.png') },
                { label: 'Day 4', icon: require('../assets/images/round_day1.png') },
                { label: 'Day 5', icon: require('../assets/images/snooze.png') },
              ].map((item, index) => (
                <View key={index} style={styles.journeyCol}>
                  <View
                    style={[styles.dayItem, index === 2 && styles.activeDayBox]}
                  >
                    <Image source={item.icon} style={styles.dayIcon} />
                    <Text
                      style={[
                        styles.dayText,
                        index === 2 && styles.activeDayText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* PRACTICE TIME */}
        <View style={styles.practiceTimeCard}>
          <Text style={styles.practiceLabel}>Total practice time</Text>
          <Text style={styles.practiceValue}>60 minutes</Text>
        </View>

        {/* CONFIDENCE CARDS */}
        <ImageBackground
          source={require('../assets/images/Confidence-bg.png')}
          style={styles.confidenceCard}
          resizeMode="stretch"
        >
          <View>
            <Text style={styles.confidenceTitle}>Confidence Readiness</Text>
            <Text style={styles.confidenceValue}>24%</Text>
          </View>
        </ImageBackground>

        <ImageBackground
          source={require('../assets/images/Practiceskill-bg.png')}
          style={styles.confidenceCard}
          resizeMode="stretch"
        >
          <View>
            <Text style={styles.confidenceTitle}>Most Practiced Skill</Text>
            <Text style={styles.confidenceValue}>Speaking in Meeting</Text>
          </View>
        </ImageBackground>

        {/* START BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.startPracticeButton}
          onPress={() => navigation.navigate('PracticeStartScreen')}
        >
          <Text style={styles.startPracticeText}>Start Practice</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  heroWrapper: {
    position: 'relative',
    paddingBottom: height * 0.06,
  },

  hero: {
    width: '100%',
    height: height * 0.42,
    justifyContent: 'flex-end',
  },

  gradient: {
    height: height * 0.18,
    width: '100%',
  },

  streakBg: {
    position: 'absolute',
    bottom: height * 0.01,
    left: width * 0.04,
    width: width * 0.26,
    height: height * 0.1,
    borderRadius: 16,
    overflow: 'hidden',
  },

  streakBox: {
    padding: 10,
  },

  streakValue: {
    fontSize: 22 * scale,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  streakLabel: {
    fontSize: 12 * scale,
    color: '#EAF2FF',
  },

  journeyCard: {
    position: 'absolute',
    bottom: height * 0.01,
    left: width * 0.34,
    width: width * 0.6,
    height: height * 0.1,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    elevation: 6,
  },

  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
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
    justifyContent: 'space-between',
  },

  journeyCol: {
    paddingHorizontal: 1,
  },

  dayItem: {
    minWidth: width * 0.1,
    minHeight: width * 0.1,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeDayBox: {
    backgroundColor: '#EEF4FF',
    borderWidth: 1,
    borderColor: '#2D6BFF',
  },

  dayIcon: {
    width: 16,
    height: 16,
  },

  dayText: {
    fontSize: 10 * scale,
    color: '#666',
  },

  activeDayText: {
    color: '#2D6BFF',
    fontWeight: '700',
  },

  practiceTimeCard: {
    marginTop: height * 0.025,
    marginHorizontal: 16,
    height: height * 0.06,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  practiceLabel: {
    fontSize: 14 * scale,
  },

  practiceValue: {
    fontSize: 16 * scale,
    fontWeight: '700',
    color: '#0A84FF',
  },

  confidenceCard: {
    marginTop: height * 0.02,
    marginHorizontal: 16,
    height: height * 0.11,
    borderRadius: 16,
    paddingHorizontal: 16,
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
    marginTop: 4,
  },

  startPracticeButton: {
    marginHorizontal: 16,
    marginTop: height * 0.05,
    marginBottom: height * 0.05,
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
});