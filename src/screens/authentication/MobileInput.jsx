// import React from 'react';
// import { TextInput, StyleSheet, View, Image, Dimensions } from 'react-native';
// import AuthHeader from '../../components/auth/AuthHeader';
// import AuthButton from '../../components/auth/AuthButton';
// import Gradient from '../../constants/Gradient';

// const screenWidth = Dimensions.get("window").width;

// const MobileInput = ({ navigation }) => {
//   return (
//     <Gradient>
//       <AuthHeader
//         title="Sign in"
//         subtitle="Sign in and find your dream job"
//         showBack
//         showLogo
//       />
//       <View style={styles.content}>
//         <Image
//           source={require('../../assets/images/india-flag.png')} // ✅ use require for local images
//           style={styles.flag}
//           resizeMode="contain"
//         />
//         <TextInput
//           placeholder="+91"
//           keyboardType="phone-pad"
//           style={styles.input}
//           placeholderTextColor="#242424"
//         />
//       </View>
//       <AuthButton
//         text="Next"
//         signupText={true}
//         onPress={() => navigation.navigate('OtpVerification')}
//         onFooterPress={() => navigation.navigate('SignUp')}

//       />
//       {/* <Text style={styles.footer}>
//         Don’t have an account? <Text style={styles.link}>Sign up</Text>
//       </Text> */}
//     </Gradient>
//   );
// }; 

// const styles = StyleSheet.create({

//   content: {
//     flexDirection: 'row',      // ✅ side by side
//     alignItems: 'center',      // vertically center
//     borderWidth: 1,
//     borderColor: '#D1D5DB',
//     width: screenWidth - 32,
//     marginHorizontal: 'auto',
//     borderRadius: 48,
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   flag: {
//     width: 24,
//     height: 18,
//     marginRight: 12,           // space between image and input
//   },
//   input: {
//     flex: 1,                    // ✅ take remaining width
//     lineHeight: 28,
//     fontSize: 18,
//     fontWeight: 400,
//     color: '#242424',
//   },
// });

// export default MobileInput;





import React, { useState } from 'react';
import {
  TextInput, StyleSheet, View, Image, Dimensions,
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import { useNavigation } from '@react-navigation/native';
import Gradient from '../../constants/Gradient';

const screenWidth = Dimensions.get("window").width;

const MobileInput = () => {
  const navigation = useNavigation()
  const [phone, setPhone] = useState('');

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
                  <TextInput
                    placeholder="+91"
                    keyboardType="phone-pad"
                    style={styles.mob_input}
                    value={phone}
                    onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                    placeholderTextColor="#242424"
                  />
                </View>
              </View>

              {/* BOTTOM SECTION */}
              <View style={styles.bottomSection}>
                <AuthButton
                  text="Next"
                  signupText={true}
                  onPress={() => navigation.navigate('OtpVerification', {
                    email,
                    phone,
                    serverOtp,
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
  },
  topSection: {
    alignItems: 'center',
    flex: 1,
  },
  bottomSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: screenWidth - 32,
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
  flag: {
    width: 24,
    height: 18,
    marginRight: 12,
  },
  mob_input: {
    flex: 1,
    fontSize: 18,
    color: '#242424',
  },
});

export default MobileInput;