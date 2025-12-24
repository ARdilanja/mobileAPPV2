import React, { useState, useCallback, useRef } from 'react';
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
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../constants/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, verifyOtp } from '../../redux/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE } from '../../config/api';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BOY_IMAGE = require('../../assets/images/boy_img_signup.png');
const RECROOT_LOGO = require('../../assets/images/recroot_logo.png');
const PROFILE_IMAGE = require('../../assets/images/signup_icon.png');
const visibilitySvg = require('../../assets/images/eye_look.png');
const visibilityOffSvg = require('../../assets/images/eye_close.png');

const SignupFlowScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.auth);

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const otpRefs = useRef([]);

  const handleOtpChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 3) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const nextStep = useCallback(() => {
    setStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setStep(prev => prev - 1);
  }, []);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !phone) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone,
      // password: '', // password set later
      recrootUserType: 'Candidate',
      countryDetails: {
        country: 'India',
        dialCode: '+91',
      },
    };
    const res = await dispatch(registerUser(payload));

    if (res.meta.requestStatus === 'fulfilled') {
      Alert.alert('Success', 'OTP sent to your email');
      nextStep(); // Go to OTP step
    } else {
      Alert.alert('Error', res.payload || 'Registration failed');
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      Alert.alert('Error', 'Please enter full 4-digit code');
      return;
    }

    const res = await dispatch(verifyOtp({ email, otp: otpCode }));
    if (res.meta.requestStatus === 'fulfilled') {
      Alert.alert('Success', 'OTP verified successfully');
      nextStep(); // Go to password step
    } else {
      Alert.alert('Error', res.payload || 'Invalid OTP');
    }
  };

  const handleFinish = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter a password');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE}/auth/set-password`, {
        email,
        password,
        confirmPassword,
      });

      if (res.data.message) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.replace('BottomDash');
      }
    } catch (err) {
      Alert.alert(
        'Error',
        err.response?.data?.message || 'Failed to set password',
      );
    }
  };

  const getInputBorderColor = fieldName =>
    focusedInput === fieldName ? '#006CD9' : '#ddd';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Critical fix
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false} // Prevents bouncy oscillation
      >
        {/* Step 1: Onboarding */}
        {step === 1 && (
          <View style={styles.onboardingContainer}>
            <LinearGradient
              colors={['#006CD9', '#017FFF00']}
              style={styles.gradientTopBackground}
            />
            <Image
              source={BOY_IMAGE}
              style={styles.boyImage}
              resizeMode="contain"
            />
            <Image
              source={RECROOT_LOGO}
              style={styles.recrootLogo}
              resizeMode="contain"
            />
            <View style={styles.reviewCard}>
              <Image
                source={PROFILE_IMAGE}
                style={styles.reviewAvatar}
                resizeMode="contain"
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.reviewName}>Maria Jose</Text>
                <Text style={styles.reviewStars}>★★★★★</Text>
              </View>
            </View>
            <Text style={styles.bigText}>
              Build confidence.{'\n'}Speak up.{'\n'}Grow your career.
            </Text>
            <TouchableOpacity
              style={styles.blueButtonAbsolute}
              onPress={nextStep}
            >
              <Text style={styles.blueButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Details */}
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
              style={[
                styles.input,
                { borderColor: getInputBorderColor('firstName') },
              ]}
              placeholder="First name"
              placeholderTextColor="#000"
              value={firstName}
              onChangeText={setFirstName}
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput(null)}
            />
            <TextInput
              style={[
                styles.input,
                { borderColor: getInputBorderColor('lastName') },
              ]}
              placeholder="Last name"
              placeholderTextColor="#000"
              value={lastName}
              onChangeText={setLastName}
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput(null)}
            />
            <TextInput
              style={[
                styles.input,
                { borderColor: getInputBorderColor('email') },
              ]}
              placeholder="Email id"
              keyboardType="email-address"
              placeholderTextColor="#000"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />

            <View style={styles.phoneRow}>
              <View
                style={[
                  styles.flagInputBox,
                  { borderColor: getInputBorderColor('phone') },
                ]}
              >
                <Text style={styles.flag}>🇮🇳</Text>
              </View>
              <View
                style={[
                  styles.phoneNumberBox,
                  { borderColor: getInputBorderColor('phone') },
                ]}
              >
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.phoneTextInput}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  placeholderTextColor="#000"
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.blueButton}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.blueButtonText}>Continue</Text>
              )}
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}

        {/* Step 3: OTP */}
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
                  ref={ref => (otpRefs.current[idx] = ref)}
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

        {/* Step 4: Password */}
        {step === 4 && (
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={prevStep} style={styles.backArrow}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Create New Password</Text>

            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: getInputBorderColor('password'),
                    paddingRight: 60,
                  },
                ]}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Image
                  source={showPassword ? visibilitySvg : visibilityOffSvg}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: getInputBorderColor('confirm'),
                    paddingRight: 60,
                  },
                ]}
                placeholder="Confirm Password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedInput('confirm')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Image
                  source={
                    showConfirmPassword ? visibilitySvg : visibilityOffSvg
                  }
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.blueButton} onPress={handleFinish}>
              <Text style={styles.blueButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    minHeight: SCREEN_HEIGHT, // Ensures stable height
  },
  onboardingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent: 'flex-end',
    paddingBottom: 100,
  },
  gradientTopBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 390,
  },
  boyImage: {
    position: 'absolute',
    width: 380,
    left: (SCREEN_WIDTH - 380) / 2,
    top: 0,
  },
  recrootLogo: {
    position: 'absolute',
    width: 109,
    height: 24,
    top: 55,
    left: 24,
  },
  reviewCard: {
    position: 'absolute',
    top: 330,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 8,
  },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20 },
  reviewName: { fontSize: 14, fontWeight: '600', color: '#000' },
  reviewStars: { fontSize: 14, color: '#F5A623' },
  bigText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: Fonts.SemiBold,
    color: '#000',
    lineHeight: 48,
    marginBottom: 60,
  },
  blueButtonAbsolute: {
    position: 'absolute',
    bottom: 40,
    left: 30,
    right: 30,
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  blueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  backArrow: { marginBottom: 20 },
  backText: { fontSize: 30, color: '#000' },
  screenTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 15, color: '#666', marginBottom: 30 },
  input: {
    height: 56,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    color: '#000',
    placeholderTextColor: '#000',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  flagInputBox: {
    width: 56,
    height: 56,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginRight: 12,
  },
  phoneNumberBox: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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
  otpBoxFilled: { borderColor: '#007AFF' },
  buttonDisabled: { backgroundColor: '#999' },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignupFlowScreen;
