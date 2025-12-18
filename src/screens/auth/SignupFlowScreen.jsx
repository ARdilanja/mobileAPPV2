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
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../constants/fonts';
import { SvgXml } from 'react-native-svg';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BOY_IMAGE = require('../../assets/images/boy_img_signup.png');
const RECROOT_LOGO = require('../../assets/images/recroot_logo.png');
const PROFILE_IMAGE = require('../../assets/images/signup_icon.png');
const visibilitySvg = require('../../assets/images/eye_look.png');
const visibilityOffSvg = require('../../assets/images/eye_close.png');
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

  const [focusedInput, setFocusedInput] = useState(null);

  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
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

  const getInputBorderColor = fieldName => {
    return focusedInput === fieldName ? '#006CD9' : '#ddd';
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar hidden />
        {step === 1 && (
          <View style={styles.onboardingContainer}>
            <LinearGradient
              colors={['#006CD9', '#017FFF00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
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
              Build confidence.{'\n'} Speak up. {'\n'}
              Grow your career.
            </Text>
            <TouchableOpacity
              style={styles.blueButtonAbsolute}
              onPress={nextStep}
            >
              <Text style={styles.blueButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2: Enter Details */}
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
              placeholderTextColor="#000"
              placeholder="First name"
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
              placeholderTextColor="#000"
              placeholder="Last name"
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
              placeholderTextColor="#000"
              placeholder="Email id"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
            />

            {/* Phone Number Input – Two Separate Boxes */}
            <View style={styles.phoneRow}>
              {/* Flag Box */}
              <View
                style={[
                  styles.flagInputBox,
                  { borderColor: getInputBorderColor('phone') },
                ]}
              >
                <Text style={styles.flag}>🇮🇳</Text>
              </View>

              {/* Phone Input Box */}
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
                  placeholderTextColor="#000"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  onFocus={() => setFocusedInput('phone')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.blueButton} onPress={nextStep}>
              <Text style={styles.blueButtonText}>Continue</Text>
            </TouchableOpacity>
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
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.blueButtonText}>Verify</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {/* Step 4: Create Password */}
        {step === 4 && (
          <View style={styles.formContainer}>
            <TouchableOpacity onPress={prevStep} style={styles.backArrow}>
              <Text style={styles.backText}>←</Text>
            </TouchableOpacity>

            <Text style={styles.screenTitle}>Create New Password</Text>
            <Text style={styles.subtitle}>Hi Diana,</Text>

            {/* Current Password with Eye Icon */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: getInputBorderColor('currentPass'),
                    paddingRight: 60,
                  },
                ]}
                placeholderTextColor="#000"
                placeholder="Current Password"
                secureTextEntry={!showCurrentPass}
                value={currentPass}
                onChangeText={setCurrentPass}
                onFocus={() => setFocusedInput('currentPass')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowCurrentPass(!showCurrentPass)}
              >
                <Image
                  source={showCurrentPass ? visibilitySvg : visibilityOffSvg}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            {/* Confirm Password with Eye Icon */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: getInputBorderColor('newPass'),
                    paddingRight: 60,
                  },
                ]}
                placeholderTextColor="#000"
                placeholder="Confirm Password"
                secureTextEntry={!showNewPass}
                value={newPass}
                onChangeText={setNewPass}
                onFocus={() => setFocusedInput('newPass')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowNewPass(!showNewPass)}
              >
                <Image
                  source={showNewPass ? visibilitySvg : visibilityOffSvg}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.bottomButtonWrapper}>
              <TouchableOpacity
                style={styles.blueButton}
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
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  onboardingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
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
    // top: 100,
    left: (SCREEN_WIDTH - 380) / 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  reviewStars: {
    fontSize: 14,
    color: '#F5A623',
  },
  bigText: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 36,
    fontFamily: Fonts.SemiBold,
    color: '#000',
    lineHeight: 48,
  },
  blueButton: {
    backgroundColor: '#007AFF',
    height: 56,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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

  blueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  formContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 140, // ✅ ADD THIS
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
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 40,
    backgroundColor: '#f9f9f9',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    height: '100%',
  },
  flag: { fontSize: 28 },
  countryCode: { fontSize: 16, color: '#000', marginLeft: 8 },
  phoneTextInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
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

  flag: {
    fontSize: 28,
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

  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
  },

  phoneTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
  },
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
});

export default SignupFlowScreen;
