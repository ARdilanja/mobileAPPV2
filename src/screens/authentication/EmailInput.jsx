
import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Dimensions,
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard,
  StatusBar
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';
import MessagePopup from '../../components/MessagePopup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get("window").width;

const EmailInput = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info');

  const showPopup = (message, type = 'error') => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupVisible(true);
  };

  // const handleNext = async () => {
  //   if (!email.trim()) {
  //     showPopup('Please enter your email', 'error');
  //     return;
  //   }

  //   try {
  //     // console.log('first', API_BASE,"checkUser")
  //     const response = await axios.post(`https://api.arinnovate.io/api/checkUser`, { email });

  //     const user = response.data.updatedUser || response.data.existingUser;

  //     if (!user) {
  //       showPopup('User not found. Please sign up.', 'error');
  //       navigation.navigate('ChooseSignupMethod');
  //       return;
  //     }

  //     // ✅ Navigate to password screen
  //     navigation.navigate('Password', { email });

  //   } catch (error) {
  //     showPopup(
  //       error?.response?.data?.message || 'Something went wrong',
  //       'error'
  //     );
  //   }
  // };

  const handleNext = async () => {
    if (!email.trim()) {
      showPopup('Please enter your email', 'error');
      return;
    }

    if (!password.trim()) {
      showPopup('Please enter your password', 'error');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.0.18:5000/api/auth/login-password',
        {
          email,
          password,
        }
      );

      console.log('response', response)
      console.log('email', email)
      console.log('password', password)
      const { User, token, refreshToken } = response.data;
      console.log('User', User)
      console.log('token', token)
      console.log('refreshToken', refreshToken)
    

      // ✅ Store tokens (example – adapt to Redux / SecureStorage)
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


      showPopup('Login successful', 'success');

      // ✅ Navigate to dashboard
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomDash' }], // change to your main screen
        });
      }, 500);

    } catch (error) {
      showPopup(
        error?.response?.data?.message || 'Invalid email or password',
        'error'
      );

      // 🔁 Google-only account
      if (
        error?.response?.data?.message?.includes('Google')
      ) {
        setTimeout(() => {
          navigation.navigate('ChooseSignupMethod');
        }, 800);
      }
    }
  };

  return (

    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <MessagePopup
        visible={popupVisible}
        message={popupMessage}
        type={popupType}
        onHide={() => setPopupVisible(false)}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>

              {/* TOP SECTION: Header + Input */}
              <View style={styles.topSection}>
                <AuthHeader
                  title="Sign in"
                  subtitle="Sign in and find your dream job"
                  showBack={true}
                  showLogo={true}
                />
                <TextInput
                  placeholderTextColor="#242424"
                  placeholder="Email id"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                <TextInput
                  placeholderTextColor="#242424"
                  placeholder="Password"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* BOTTOM SECTION: Pushed to bottom by space-between */}
              <View style={styles.bottomSection}>
                <AuthButton
                  text="Next"
                  signupText={true}
                  onPress={handleNext}
                  onFooterPress={() => navigation.navigate('ChooseSignupMethod')}
                />
              </View>

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content fills the screen height
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  topSection: {
    flex: 1, // Takes up remaining space pushing bottomSection down
  },
  bottomSection: {
    marginBottom: 60, // Space from very bottom of device
    alignItems: 'center',
  },
  input: {
    width: screenWidth - 32,
    backgroundColor: '#fff',
    marginHorizontal: 'auto',
    borderRadius: 48,
    paddingVertical: 16,
    color: '#242424',
    paddingLeft: 24,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    marginBottom: 16,
    shadowRadius: 8,
  },
});

export default EmailInput;