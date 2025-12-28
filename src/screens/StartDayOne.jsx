import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Gradient from '../../constants/Gradient';
import AuthButton from '../../components/auth/AuthButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const StartDayOne = () => {
  const navigation = useNavigation()
  return (
    <Gradient>
      <View style={styles.container}>

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
              Your confidence journey <Text style={styles.highlight}>
                starts today 
              </Text>
            </Text>


          </View>
          {/* Button */}
          <AuthButton
            text="Start Day 1"
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'BottomDash' }],
            })}
            />
            <Text style={styles.link} onPress={navigation.navigate('PricingScreen')}>
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
    height: screenHeight
  },
  topSection: {
    width: '100%',
  },
  imageWrapper: {
    width: screenWidth,
    height: screenHeight * 0.55, // Reduce height so it doesn't push text down too much
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
    height: screenHeight - screenHeight * 0.55,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  link: {  marginTop: 15, fontSize: 16, textAlign: 'center',color: '#1a73e8', fontWeight: '600' },
});

