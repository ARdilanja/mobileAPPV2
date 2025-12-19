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
} from 'react-native';
import { Fonts } from '../../constants/fonts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const LoginScreen = ({ onLoginSuccess, onSignupPress,navigation }) => {
  const [email, setEmail] = useState('');

  const handleNext = () => {
    navigation.replace('BottomDash');
    // navigation.replace('VerificationScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Image
            source={require('../../assets/images/login_img.png')}
            style={styles.illustration}
            resizeMode="contain"
          />

          <Text style={styles.pageTitle}>Welcome!</Text>

          <Text style={styles.title}>Sign In</Text>

          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Don't have an Account?{' '}
            <Text onPress={() => navigation.navigate('Signup')}>
              Sign up here
            </Text>

          </Text>
        </View>
      </ScrollView>
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
  title: {
    fontSize: SCREEN_WIDTH * 0.07,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
    textAlign: 'left',
    marginTop: 420,
  },
  label: {
    fontSize: SCREEN_WIDTH * 0.045,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: SCREEN_WIDTH * 0.045,
    backgroundColor: '#fff',
    marginBottom: 30,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: SCREEN_WIDTH * 0.05,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: SCREEN_WIDTH * 0.04,
    color: '#666',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginScreen;
