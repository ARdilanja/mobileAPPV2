import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Alert } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialButton from '../../components/auth/SocialButton';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import { API_BASE } from '../../config/api';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const SignIn = () => {
  const navigation = useNavigation()
   const handleGoogleSignIn = async () => {
    try {
      // 1️⃣ Ensure Play Services available
      await GoogleSignin.hasPlayServices();

      // 2️⃣ Clear any previous pending session
      try {
        await GoogleSignin.signOut();
      } catch (e) {
        // ignore if already signed out
      }

      // 3️⃣ Google popup
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo:', userInfo);

      const idToken = userInfo?.data?.idToken;

      if (!idToken) {
        return Alert.alert("Error", "Google token not received");
      }

      // 4️⃣ Send token to backend (SIGN IN)
      const response = await axios.post(
        `${API_BASE}/auth/google-login`,
        { idToken,mode: "signin" }
      );

      const { token, refreshToken, User } = response.data;

      console.log("Signed in user:", User);

      // TODO: store token & refreshToken (AsyncStorage / Redux)
await AsyncStorage.multiSet([
        ["token", token],
        ["refreshToken", refreshToken],
        ["user", JSON.stringify(User)],
      ]);

      // 🔍 VERIFY STORAGE IMMEDIATELY
      const saved = await AsyncStorage.multiGet([
        "token",
        "refreshToken",
        "user",
      ]);

      console.log("Saved auth data:", saved);
      navigation.replace("BottomDash");

    } catch (error) {
      console.error("Google Sign-In Error:", error);

      Alert.alert(
        "Sign in failed",
        error?.response?.data?.message ||
          "This Google account is not registered. Please sign up first."
      );
    }
  };


  


// const handleGoogleSignIn = async () => {
//   try {
//     // 1️⃣ Ensure Play Services available
//     await GoogleSignin.hasPlayServices();

//     // ❌ DO NOT signOut here
//     // This allows Google to remember last account

//     // 2️⃣ Google popup
//     const userInfo = await GoogleSignin.signIn();
//     console.log("userInfo:", userInfo);

//     const idToken = userInfo?.data?.idToken;
//     if (!idToken) {
//       return Alert.alert("Error", "Google token not received");
//     }

//     // 3️⃣ Backend SIGN-IN
//     const response = await axios.post(
//       `${API_BASE}/auth/google-login`,
//       { idToken, mode: "signin" }
//     );

//     const { token, refreshToken, User } = response.data;

//     await AsyncStorage.multiSet([
//       ["token", token],
//       ["refreshToken", refreshToken],
//       ["user", JSON.stringify(User)],
//     ]);

//     navigation.replace("BottomDash");

//   } catch (error) {
//     console.error("Google Sign-In Error:", error);

//     Alert.alert(
//       "Sign in failed",
//       error?.response?.data?.message ||
//       "This Google account is not registered. Please sign up first."
//     );
//   }
// };

  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <View style={styles.container}>

        {/* Sign-in header */}
        <AuthHeader
          title="Sign in"
          subtitle="Log in your way: choose an option below"
          showBack={false}
          showLogo={false}
        />
        <View style={{ marginTop: 15 * scale }}>
          {/* Google sign-in option */}
          <SocialButton text="Sign in with Google" icon={require('../../assets/icons/google.png')}
            onPress={handleGoogleSignIn}
            iconWidth={24 * scale}

          />


          {/* apple sign-in option */}
          <SocialButton
            text="Sign in with apple"
            iconWidth={24 * scale}
            icon={require('../../assets/icons/apple.png')}
            onPress={() => navigation.navigate('MobileInput')}
          />

          {/* faceboook sign-in option */}
          <SocialButton
            text="Sign in with facebook"
            iconWidth={24 * scale}

            icon={require('../../assets/icons/facebook.png')}
            onPress={() => navigation.navigate('EmailInput')}
          />

          {/* Email sign-in option */}
          <SocialButton
            text="Sign in with email"
            iconWidth={24 * scale}

            icon={require('../../assets/icons/email.png')}
            onPress={() => navigation.navigate('EmailInput')}
          />

        </View>
        {/* Footer sign-up link */}
        <Text style={styles.footer}
        >
          Don’t have an account? <Text style={styles.link} onPress={() => navigation.navigate('ChooseSignupMethod')}>Sign up</Text>
        </Text></View>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  footer: {
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    marginTop: 32 * scale,
  },
  link: {
    color: '#0178FF',
    fontWeight: '500',
  },
});

export default SignIn;
