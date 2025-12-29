import React, { useState } from 'react';
import {
  TextInput, StyleSheet, View, Image, Dimensions,
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard,
  Text,
  StatusBar
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';

const screenWidth = Dimensions.get("window").width;

const MobileInput = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('');

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

              {/* TOP SECTION */}
              <View style={styles.topSection}>
                <AuthHeader
                  title="Sign in"
                  subtitle="Sign in and find your dream job"
                  showBack
                  showLogo
                />
                <View style={styles.content}>
                  <Image
                    source={require('../../assets/images/india-flag.png')}
                    style={styles.flag}
                    resizeMode="contain"
                  />

                  {/* Fixed Country Code */}
                  <View style={styles.countryCodeBox}>
                    <Text style={styles.countryCodeText}>+91</Text>
                  </View>

                  {/* Mobile Number Input */}
                  <TextInput
                    style={styles.mob_input}
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phone}
                    onChangeText={(text) =>
                      setPhone(text.replace(/[^0-9]/g, ''))
                    }
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

              </View>

              {/* BOTTOM SECTION */}
              <View style={styles.bottomSection}>
                <AuthButton
                  text="Next"
                  signupText={true}
                  onPress={() => navigation.navigate('OtpVerification', {
                    phone,
                    serverOtp: '2222',
                    otpType: 'mobile', // or 'mobile'
                  })}
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
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  topSection: {
    // alignItems: 'center',
    flex: 1,
  },
  bottomSection: {
    marginBottom: 60,
    // alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 32,
    marginHorizontal: 'auto',
    borderRadius: 48,
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  countryCodeBox: {
    marginRight: 8,
  },
  countryCodeText: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
    color: '#242424',
  },

  flag: {
    width: 24,
    height: 18,
    marginRight: 12,
  },
  mob_input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
    color: '#242424',
  },
});

export default MobileInput;