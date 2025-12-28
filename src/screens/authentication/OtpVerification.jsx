import React, { useState } from 'react';
import { Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, View, Alert  } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import OtpInput from '../../components/auth/OtpInput';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';

const OtpVerification = ({  route  }) => {
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

              <View style={styles.topSection}>
                <AuthHeader
                  title="OTP Verification"
                 subtitle={`Enter the 4-digit OTP sent to ${contactText}`}
                  showBack={true}
                  showLogo={true}
                />

                <OtpInput value={otp} onChange={setOtp} />

                <Text style={styles.resend}>Resend <Text style={{ color: 'rgba(42, 42, 42, 1)' }}>OTP</Text></Text>
              </View>

              <View style={styles.bottomSection}>
                <AuthButton text="Continue"  onPress={handleVerifyOtp} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  topSection: {
    // alignItems: 'center',
    flex: 1,
  },
  bottomSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  resend: {
    color: '#1a73e8',
    marginTop: 24,
    marginLeft: 16,
    lineHeight: 28,
    fontWeight: '400',
    fontSize: 18,
  },
});

export default OtpVerification;
