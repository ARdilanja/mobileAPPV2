import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, View, Alert, StatusBar, Dimensions } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import OtpInput from '../../components/auth/OtpInput';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE } from '@env';


const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 390
const OtpVerification = ({ route }) => {
  const navigation = useNavigation()

  const {
    email,
    userId,
    isForgotPassword,
    serverOtp
  } = route.params;
  console.log('userId', userId)
  const [otp, setOtp] = useState('');

  // Handle OTP verification logic
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP');
      return;
    }

    // for forgot password

    if (isForgotPassword) {
      await axios.post(`${API_BASE}/auth/forgot-password/verify-otp`, {
        userId,
        otp,
      });

      navigation.navigate("ResetPassword", { email });
      return;
    }

    try {
       if (otp !== String(serverOtp)) {
    Alert.alert('Wrong OTP', 'Invalid OTP. Please try again.');
    return;
  }
      // Step 2: Call backend PUT API only after OTP match
      const response = await axios.put(`${API_BASE}/auth/verify-email/${userId}`, {
        code: true,
      });
      const { User, token, refreshToken } = response.data;

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

      Alert.alert('Success', 'Email verified successfully', [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('JourneyGetStartScreen'),
        },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Verification failed'
      );
    }
  };


  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
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

              {/* Header and OTP input section */}
              <View style={styles.topSection}>
                <AuthHeader
                  title="OTP Verification"
                  subtitle={`Enter the 4-digit OTP sent to ${email}`}
                  showBack={true}
                  showLogo={true}
                />
                {/* OTP input component */}
                <OtpInput value={otp} onChange={setOtp} />
                {/* Resend OTP action */}
                <Text style={styles.resend}
                //  onPress={() => navigation.navigate('JourneyGetStartScreen')} 
                >Resend <Text style={{ color: '#2A2A2A' }}>OTP</Text></Text>
              </View>

              {/* Bottom continue button section */}
              <View style={styles.bottomSection}>
                <AuthButton text="Continue" onPress={handleVerifyOtp} />
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
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  topSection: {
    flex: 1,
  },
  bottomSection: {
    marginBottom: 120,
    alignItems: 'center',
  },
  resend: {
    color: '#0178FF',
    marginTop: 24,
    marginLeft: 16,
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
  },
});

export default OtpVerification;
