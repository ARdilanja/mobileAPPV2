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

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const JourneyGetStartScreen = ({ navigation }) => {
  return (
    <Gradient>
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
              'rgba(255,255,255,0.5)',
              'rgba(255,255,255,0.85)',
              'rgba(255, 255, 255, 1)',
              '#FFFFFF',
            ]}
            locations={[0,0.25, 0.5, 0.76, 1]}
            style={styles.imageGradient}
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Ready to shape <Text style={styles.highlight}>
            your own journey?
          </Text>
          </Text>
          
          
        </View>
</View>
        {/* Button */}
               <View style={styles.bottomSection}>
        <AuthButton
          text="Get Started"
          onPress={() => navigation.navigate('SignIn')}
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
    justifyContent: 'space-between',
  },
  topSection: {
    width: '100%',
  },
  imageWrapper: {
    width: screenWidth,
    height: screenHeight * 0.45, // Reduce height so it doesn't push text down too much
    position: 'relative',
    backgroundColor: 'transparent', // Ensure it doesn't block background
  },

  image: {
    width: '100%',
    height: '90%',
  },

  imageGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200, // fade height
  },
  gradient: {
    height: 440,
    width: '100%',
  },

 textContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 0, // Space between image and text
    backgroundColor: '#fff'
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
});

