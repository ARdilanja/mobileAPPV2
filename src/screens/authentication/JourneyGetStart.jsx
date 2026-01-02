import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Gradient from '../../constants/Gradient';
import AuthButton from '../../components/auth/AuthButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scale = screenWidth / 390;

const JourneyGetStartScreen = () => {
  const navigation = useNavigation()
  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />

      <View style={styles.container}>

        {/* Illustration */}
        <View style={styles.topSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/buildconfidence.png')}
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
            <Text style={styles.title}>Ready to shape <Text style={styles.highlight}>your own journey?
            </Text>
            </Text>

          </View>
          {/* Button */}
          <AuthButton
            text="Get Started"
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'BottomDash' }],
            })}
          />
        </View>
      </View>

    </Gradient>
  );
};

export default JourneyGetStartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    height: screenHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  topSection: {
    width: '100%',
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
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 'auto',
    marginTop: 0, // Space between image and text
  },

  title: {
    fontSize: 40 * scale,
    fontFamily: Fonts.Medium,
    color: 'rgba(42, 42, 42, 1)',
    lineHeight: 56 * scale,
  },

  highlight: {
    color: '#0178FF',
  },
  bottomSection: {
    width: '100%',
    height: screenHeight - screenHeight * 0.50,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingBottom: 120,
  },
});

