// LoginScreen.js
import React from 'react';
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
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        {/* Illustration */}
        <Image
          source={require('../../assets/images/login_img.png')}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.welcomeText}>Welcome!</Text>

        <Text style={styles.title}>Sign In</Text>

        <Text style={styles.label}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an Account? <Text style={styles.signupLink}>Sign up here</Text>
        </Text>
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
    width: width * 0.8,
    height: height * 0.35,
    alignSelf: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  title: {
    fontSize: width * 0.07,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  label: {
    fontSize: width * 0.045,
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: width * 0.045,
    backgroundColor: '#fff',
    marginBottom: 30,
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
    fontSize: width * 0.05,
    fontWeight: '600',
  },
  signupText: {
    textAlign: 'center',
    fontSize: width * 0.04,
    color: '#666',
  },
  signupLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default LoginScreen;