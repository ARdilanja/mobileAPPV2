// src/screens/auth/VerificationScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { Fonts } from '../../constants/fonts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { API_BASE } from '../../config/api';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const VerificationScreen = ({ route, navigation }) => {
  const { email, otpCode } = route.params;
  console.log(email, otpCode);
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputs = useRef([]);

  const handleCodeChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
      if (text && index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleVerify = async () => {
    const enteredCode = code.join('');

    if (enteredCode.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit OTP');
      return;
    }

    // ✅ Frontend OTP check (optional)
    if (String(enteredCode) !== String(otpCode)) {
      Alert.alert('Invalid OTP', 'Incorrect OTP. Please try again.');
      return;
    }

    try {
      setLoading(true);

      // ✅ LOGIN WITHOUT PASSWORD (GET TOKEN)
      const response = await axios.post(
        `${API_BASE}/auth/login-no-password`,
        { email }
      );
      console.log('response', response)
      const { token, refreshToken, User } = response.data;

      if (!token || !refreshToken) {
        throw new Error('Token not received from server');
      }

      // ✅ Store tokens & user
      // ✅ Store tokens & user (atomic write)
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

// ⏳ SMALL DELAY (Android safety)
await new Promise(res => setTimeout(res, 300));

// ✅ Navigate AFTER confirmed save
navigation.reset({
  index: 0,
  routes: [{ name: "BottomDash" }],
});

     

    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Failed',
        error?.response?.data?.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Illustration - Absolute positioned */}
        <Image
          source={require('../../assets/images/otp_img.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Title at top center */}
        <Text style={styles.pageTitle}>Verification Email</Text>

        <Text style={styles.subtitle}>Verification Code</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Sign in'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: SCREEN_WIDTH * 0.08,
  },
  illustration: {
    position: 'absolute',
    width: 276,
    height: 262,
    top: 124,
    left: 57,
  },
  pageTitle: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: Fonts.Medium,
    fontSize: 20,
    lineHeight: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: SCREEN_WIDTH * 0.045,
    color: '#555',
    marginBottom: 20,
    marginTop: 420, // Below illustration
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  codeInput: {
    width: SCREEN_WIDTH * 0.18,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: SCREEN_WIDTH * 0.07,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '600',
  },
});

export default VerificationScreen;
