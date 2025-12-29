
import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Dimensions,
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard,
  StatusBar
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';
import MessagePopup from '../../components/MessagePopup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
const screenWidth = Dimensions.get("window").width;

const EmailInput = () => {
  const navigation = useNavigation()

  const [email, setEmail] = useState('');

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('info');

  const showPopup = (message, type = 'info') => {
    setPopupMessage(message);
    setPopupType(type);
    setPopupVisible(true);
  };

  const handleNext = async () => {
    if (!email.trim()) {
      showPopup('Please enter your email', 'error');
      return;
    }

    try {
      // console.log('first', API_BASE,"checkUser")
      const response = await axios.post(`https://api.arinnovate.io/api/checkUser`, { email });

      const user = response.data.updatedUser || response.data.existingUser;

      if (!user) {
        showPopup('User not found. Please sign up.', 'error');
        navigation.navigate('SignUp');
        return;
      }

      // ✅ Navigate to password screen
      navigation.navigate('Password', { email });

    } catch (error) {
      showPopup(
        error?.response?.data?.message || 'Something went wrong',
        'error'
      );
    }
  };
  return (

    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <MessagePopup
        visible={popupVisible}
        message={popupMessage}
        type={popupType}
        onClose={() => setPopupVisible(false)}
      />
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

              {/* TOP SECTION: Header + Input */}
              <View style={styles.topSection}>
                <AuthHeader
                  title="Sign in"
                  subtitle="Sign in and find your dream job"
                  showBack={true}
                  showLogo={true}
                />
                <TextInput
                  placeholderTextColor="#242424"
                  placeholder="Email id"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* BOTTOM SECTION: Pushed to bottom by space-between */}
              <View style={styles.bottomSection}>
                <AuthButton
                  text="Next"
                  signupText={true}
                  onPress={handleNext}
                  onFooterPress={() => navigation.navigate('SignUp')}
                />
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
    flexGrow: 1, // Ensures content fills the screen height
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  topSection: {
    flex: 1, // Takes up remaining space pushing bottomSection down
  },
  bottomSection: {
    marginBottom: 60, // Space from very bottom of device
    alignItems: 'center',
  },
  input: {
    width: screenWidth - 32,
    backgroundColor: '#fff',
    marginHorizontal: 'auto',
    borderRadius: 48,
    paddingVertical: 16,
    color: '#242424',
    paddingLeft: 24,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default EmailInput;