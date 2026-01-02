import React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialButton from '../../components/auth/SocialButton';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ChooseSignupMethod = () => {
  const navigation = useNavigation()

  const handleGoogleSignup = async () => {
    try {
      // 1️⃣ Check Play Services
      await GoogleSignin.hasPlayServices();

      // 2️⃣ Open Google popup
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo', userInfo)

      // 3️⃣ Extract ID token
      const googleToken = userInfo.idToken;
      console.log('googleToken', googleToken)

      if (!googleToken) {
        return Alert.alert("Error", "Google token not received");
      }

      // 4️⃣ Send token to backend using AXIOS
      const response = await axios.post("http://192.168.0.18:8000/api/auth/google-login", {
        token: googleToken,
      });
      console.log('response', response)

      // 5️⃣ Backend response
      const { token, refreshToken, User } = response.data;

      // 6️⃣ Store tokens (AsyncStorage / Redux)
      console.log("Logged in user:", User);

      // Example:
      // await AsyncStorage.setItem("token", token);

      // 7️⃣ Navigate
      navigation.replace("MainTabs");

    } catch (error) {
      console.error("Google Login Error:", error);

      Alert.alert(
        "Login Failed",
        error?.response?.data?.message || "Google login failed"
      ); 
    }
  };

  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <View style={styles.container}>

        {/* Sign-in header */}
        <AuthHeader
          title="Sign up"
          subtitle="Sign up and own your career journey"
          showBack={false}
          showLogo={false}
        />

        {/* Google sign-in option */}
        <SocialButton text="Sign up with Google" icon={require('../../assets/icons/google.png')}
        //   onPress={() => navigation.navigate('BottomDash')}
         onPress={handleGoogleSignup}
          iconWidth={24}

        />

        
        {/* apple sign-in option */}
        <SocialButton
          text="Sign up with apple"
          iconWidth={24}
          icon={require('../../assets/icons/apple.png')}
          onPress={() => navigation.navigate('MobileInput')}
        />

        {/* faceboook sign-in option */}
        <SocialButton
          text="Sign up with facebook"
          iconWidth={24}

          icon={require('../../assets/icons/facebook.png')}
          onPress={() => navigation.navigate('EmailInput')}
        />

        {/* Email sign-in option */}
        <SocialButton
          text="Sign up with email"
          iconWidth={24}

          icon={require('../../assets/icons/email.png')}
          onPress={() => navigation.navigate('SignUp')}
        />

        
        {/* Footer sign-up link */}
        <Text style={styles.footer}
        >
          Already have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>Sign in</Text>
        </Text></View>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  footer: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    marginTop: 24,
  },
  link: {
    color: '#0178FF',
    fontWeight: '500',
  },
});

export default ChooseSignupMethod;
