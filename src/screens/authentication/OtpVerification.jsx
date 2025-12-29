import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, View, Alert, StatusBar } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import OtpInput from '../../components/auth/OtpInput';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';

const OtpVerification = ({ route }) => {
  const navigation = useNavigation()

  const {
    email,
    phone,
    serverOtp,
    otpType,
  } = route.params;

  const [otp, setOtp] = useState('');

  const contactText =
    otpType === 'mobile'
      ? phone
      : email;

  // Handle OTP verification logic
  const handleVerifyOtp = () => {
    if (!otp || otp.length < 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP');
      return;
    }

    if (otp === serverOtp) {
      Alert.alert('Success', 'OTP verified successfully', [
        {
          text: 'Continue',
          onPress: () => navigation.navigate('JourneyGetStartScreen'),
        },
      ]);
    } else {
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
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
                  subtitle={`Enter the 4-digit OTP sent to ${contactText}`}
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
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
  },
});

export default OtpVerification;
