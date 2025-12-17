import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';

const { width } = Dimensions.get('window');

const ONBOARDING_IMAGE = require('../../assets/images/boy_img_signup.png');
const PROFILE_IMAGE = require('../../assets/images/signup_icon.png');

const SignupFlowScreen = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [loading, setLoading] = useState(false);

  const otpRefs = Array(4)
    .fill()
    .map(() => React.createRef());

  const handleOtpChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 3) otpRefs[index + 1].current?.focus();
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleVerifyOtp = () => {
    if (otp.join('').length !== 4) {
      Alert.alert('Error', 'Please enter full 4-digit code');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      nextStep();
    }, 1000);
  };

  const handleFinish = () => {
    if (!currentPass || !newPass) {
      Alert.alert('Error', 'Please fill both password fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {step === 1 && (
          <View style={styles.onboarding}>
            <Image
              source={ONBOARDING_IMAGE}
              style={styles.character}
              resizeMode="contain"
            />
            <Image
              source={PROFILE_IMAGE}
              style={styles.smallProfile}
              resizeMode="contain"
            />

            <Text style={styles.bigText}>
              Step in,{'\n'}
              Speak up,{'\n'}
              Shine
            </Text>

            <TouchableOpacity style={styles.blueButton} onPress={nextStep}>
              <Text style={styles.blueButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={prevStep} style={styles.backArrow}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.screenTitle}>Enter your details</Text>
            <Text style={styles.subtitle}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email id"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.phoneInput}>
              <View style={styles.flagContainer}>
                <Text style={styles.flag}>🇮🇳</Text>
                <Text style={styles.countryCode}>+91</Text>
              </View>
              <TextInput
                style={styles.phoneTextInput}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

            <TouchableOpacity style={styles.blueButton} onPress={nextStep}>
              <Text style={styles.blueButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 3: OTP Verification */}
        {step === 3 && (
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={prevStep} style={styles.backArrow}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.screenTitle}>Sign up</Text>
            <Text style={styles.subtitle}>Verification code</Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, idx) => (
                <TextInput
                  key={idx}
                  ref={otpRefs[idx]}
                  style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
                  value={digit}
                  onChangeText={text => handleOtpChange(text, idx)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity
              style={[styles.blueButton, loading && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.blueButtonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {step === 4 && (
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={prevStep} style={styles.backArrow}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.screenTitle}>Create New Password</Text>
            <Text style={styles.subtitle}>Hi Diana,</Text>

            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPass}
              onChangeText={setCurrentPass}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={newPass}
              onChangeText={setNewPass}
            />

            <TouchableOpacity
              style={[styles.blueButton, loading && styles.buttonDisabled]}
              onPress={handleFinish}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.blueButtonText}>Sign up</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 },
  onboarding: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#E3F2FD',
  },
  character: {
    width: width * 0.7,
    height: width * 0.9,
    marginBottom: 20,
  },
  smallProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: 180,
    right: 40,
    borderWidth: 3,
    borderColor: '#fff',
  },
  bigText: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: width * 0.12,
    marginVertical: 40,
    color: '#000',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  backArrow: { marginBottom: 20 },
  backText: { fontSize: 30, color: '#000' },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  phoneInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  flag: { fontSize: 24, marginRight: 6 },
  countryCode: { fontSize: 16, color: '#000' },
  phoneTextInput: {
    flex: 1,
    height: 56,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 50,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  otpBoxFilled: {
    borderColor: '#007AFF',
  },
  blueButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: 100,
  },
  blueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
});

export default SignupFlowScreen;
