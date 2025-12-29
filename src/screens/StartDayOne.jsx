import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Gradient from '../constants/Gradient';
import AuthButton from '../components/auth/AuthButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const StartDayOne = () => {
  const navigation = useNavigation();
  return (
    <Gradient>
      <View style={styles.container}>
        <Text style={styles.skip}>Skip</Text>
        {/* Illustration */}
        <View style={styles.topSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/images/start-day-one.png')}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Gradient Overlay */}
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.35)',
                'rgba(255,255,255,0.75)',
                'rgba(255, 255, 255, 0.95)',
                '#FFFFFF',
              ]}
              locations={[0, 0.25, 0.5, 0.76, 1]}
              style={styles.imageGradient}
            />
          </View>
        </View>

        <View style={styles.bottomSection}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Your confidence journey{' '}
              <Text style={styles.highlight}>starts today</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'BottomDash' }],
              })
            }
          >
            <Text style={styles.text}>Start Day 1</Text>
          </TouchableOpacity>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate('PricingScreen')}
          >
            View plan Overview
          </Text>
        </View>
      </View>
    </Gradient>
  );
};

export default StartDayOne;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    height: screenHeight,
    position: 'relative'
  },
  topSection: {
    width: '100%',
  },
  skip: {
    lineHeight: 24,
    fontSize: 18,
    fontWeight: 500,
    textAlign: 'right',
    marginRight: 16,
    paddingTop: 12,
  },
  imageWrapper: {
    width: screenWidth,
    height: screenHeight * 0.50, // Reduce height so it doesn't push text down too much
    position: 'relative',
    backgroundColor: 'transparent', // Ensure it doesn't block background
  },

  image: {
    width: '100%',
    height: '100%',
  },

  imageGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120, // fade height
  },

  textContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 'auto',
    marginTop: 0, // Space between image and text
  },

  title: {
    fontSize: 40,
    fontWeight: '700',
    color: 'rgba(42, 42, 42, 1)',
    lineHeight: 56,
  },

  highlight: {
    color: 'rgba(1, 120, 255, 1)',
  },
  bottomSection: {
    width: '100%',
    height: screenHeight - screenHeight * 0.50,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  button: {
    width: screenWidth - 32,
    position: 'absolute',
    bottom: 110,
    backgroundColor: 'rgba(1, 120, 255, 1)',
    borderRadius: 48,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  text: { color: '#fff', fontSize: 24, fontWeight: '500' },
  footer: {
    marginTop: 15,
    fontSize: 16,
    color: '#2A2A2A',
    textAlign: 'center',
  },
  link: {
    color: '#1a73e8', fontWeight: '600', position: 'absolute',
    textDecorationStyle: 'solid',
    bottom: 70,
    textDecorationLine: 'underline'
  },
});
