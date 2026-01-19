
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Gradient from '../../constants/Gradient';
import AuthButton from '../../components/auth/AuthButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {  getJourneyStep, modalContent } from '../../utils/journey'
import WelcomeBackModel from '../../components/WelcomeBackModel'
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scale = screenWidth / 390;

const GetStartScreen = () => {
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [stage, setStage] = useState(null);
  const [nextScreen, setNextScreen] = useState(null)

const modal = modalContent[stage];


  useEffect(() => {
    checkJourney(); 
  const timer = setTimeout(() => {
    checkJourney();
  }, 60000); // 1 minute

  return () => clearTimeout(timer);
}, []);

  const checkJourney = async () => {
  try {
    const raw = await AsyncStorage.getItem("userState");
    console.log("📦 Raw userState:", raw);

    if (!raw) {
      console.log("❌ No userState found");
      return;
    }

    const state = JSON.parse(raw);
    console.log("🧭 Parsed state:", state);

    const { screen, stage } = getJourneyStep(state);
const modal = modalContent[stage];

setNextScreen(screen);
setStage(stage);

    if (screen  !== "Dashboard") {
      console.log("🟢 Showing WelcomeBack modal");
      setShowModal(true);

    } else {
      console.log("🔵 Going directly to Dashboard");
    }

  } catch (e) {
    console.log("❌ UserState parse error", e);
  }
};

  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <View style={styles.container}>

        {/* TOP SECTION: Illustration + Text */}
        <View style={styles.topSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/getstarted-illustrate.png')}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Smoother Gradient Overlay to fade the image into the background */}
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.5)',
                'rgba(255,255,255,0.85)',
                'rgba(255, 255, 255, 1)',
                '#FFFFFF',
              ]}
              locations={[0, 0.25, 0.5, 0.76, 1]}
              style={styles.imageGradient}
            />
          </View>

          {/* Text Content - Removed white background to let the gradient flow */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Build <Text style={styles.highlight}>confidence.</Text>
            </Text>
            <Text style={styles.title}>
              Speak <Text style={styles.highlight}>up.</Text>
            </Text>
            <Text style={styles.title}>
              Grow <Text style={styles.highlight}>your career.</Text>
            </Text>
          </View>
        </View>

        {/* BOTTOM SECTION: Stays at the bottom */}
        <View style={styles.bottomSection}>
          <AuthButton
            text="Get started"
            onPress={() => navigation.navigate('ChooseSignupMethod')}
          />
        </View>

       <WelcomeBackModel
  visible={showModal}
  icon={modal?.icon}    
  title={modal?.title}
  content={modal?.content}
  buttonText={modal?.button}
  onPress={() => {
    setShowModal(false);
    navigation.replace('BottomDash');
  }}
  onClose={() => setShowModal(false)}
/>
      </View>
    </Gradient>
  );
};

export default GetStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  topSection: {
    width: '100%',
  },
  imageWrapper: {
    width: screenWidth,
    height: screenHeight * 0.50,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 0,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 40 * scale,
    color: '#2A2A2A',
    lineHeight: 56 * scale,
    fontFamily: Fonts.Medium
  },
  highlight: {
    color: '#0178FF',
    fontSize: 40 * scale,
    lineHeight: 56 * scale,
    fontFamily: Fonts.Medium
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 110,
  },
});