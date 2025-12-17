// VerificationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const VerificationScreen = () => {
  const [code, setCode] = useState(['', '', '', '']);

  const handleCodeChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Illustration */}
        <Image
          source={require('../../assets/images/otp_img.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>Verification Email</Text>

        <Text style={styles.subtitle}>Verification Code</Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign in</Text>
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
    paddingHorizontal: width * 0.08,
    justifyContent: 'center',
  },
  illustration: {
    width: width * 0.85,
    height: height * 0.4,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#000',
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#555',
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  codeInput: {
    width: width * 0.18,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    fontSize: width * 0.07,
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
    fontSize: width * 0.05,
    fontWeight: '600',
  },
});

export default VerificationScreen;
