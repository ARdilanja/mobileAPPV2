import React from 'react';
import { View, Text, StyleSheet, StatusBar, Alert, Dimensions, TouchableOpacity , Image} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
// import SocialButton from '../../components/auth/SocialButton';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';


const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const ChooseSignupMethod = () => {
  const navigation = useNavigation()

  // const handleGoogleSignup = async () => {
  //   try {
  //     // 1️⃣ Check Play Services
  //     await GoogleSignin.hasPlayServices();

  //     // 2️⃣ Open Google popup
  //     const userInfo = await GoogleSignin.signIn();
      
  //     console.log('userInfo', userInfo)

  //     // 3️⃣ Extract ID token
  //     const idToken = userInfo.data.idToken;
  //     console.log('idToken', idToken)

  //     if (!idToken) {
  //       return Alert.alert("Error", "Google token not received");
  //     }

  //     // 4️⃣ Send token to backend using AXIOS
  //     const response = await axios.post("http://192.168.0.5:3000/api/auth/google-login", {
  //       idToken,
  //     });
  //     console.log('response', response)

  //     const { token, refreshToken, User } = response.data;

  //     console.log("Logged in user:", User);

     

  //     navigation.replace("BottomDash");

  //   } catch (error) {
  //     console.error("Google Login Error:", error);

  //     Alert.alert(
  //       "Login Failed",
  //       error?.response?.data?.message || "Google login failed"
  //     ); 
  //   }
  // };


const handleGoogleSignup = async () => {
    try {
      // 1️⃣ Check Play Services
      await GoogleSignin.hasPlayServices();

      // 2️⃣ Force sign out first to ensure clean state
      // Try to get current user to check if signed in
      try {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser) {
          // User is signed in, sign them out
          await GoogleSignin.signOut();
        }
      } catch (error) {
        // If getCurrentUser fails, user is not signed in
        console.log('No current user found');
      }

      // 3️⃣ Open Google popup
      const userInfo = await GoogleSignin.signIn();

      console.log('userInfo', userInfo);

      // 4️⃣ Extract ID token
      const idToken = userInfo.data.idToken; // Note: it's userInfo.idToken, not userInfo.data.idToken
      console.log('idToken', idToken);

      if (!idToken) {
        return Alert.alert("Error", "Google token not received");
      }

      // 5️⃣ Send token to backend using AXIOS
      const response = await axios.post("http://192.168.0.5:3000/api/auth/google-login", {
        idToken,
      });
      console.log('response', response);

      const { token, refreshToken, User } = response.data;

      console.log("Logged in user:", User);

      navigation.replace("BottomDash");

    } catch (error) {
      console.error("Google Login Error:", error);

      // Handle specific Google Signin errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert("Cancelled", "Login was cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("In Progress", "Another sign-in is in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Play Services", "Google Play Services not available");
      } else {
        Alert.alert(
          "Login Failed",
          error?.response?.data?.message || error.message || "Google login failed"
        );
      }
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
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    textAlign: 'center',
    marginTop: 24 * scale,
  },
  link: {
    color: '#0178FF',
    fontWeight: '500',
  },
  socialbutton: {
    backgroundColor: '#fff',
    borderRadius: 48,
    paddingVertical: 14,
    alignItems: 'center',
marginHorizontal: 'auto',
    width: screenWidth - 32,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 16 * scale,
  },

  socialcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'left',
    gap: 10 * scale,
  },
  socialtext: {
    color: '#000',
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
  },
});

export default ChooseSignupMethod;
const SocialButton = ({ text, onPress, style, icon, iconWidth = 22, }) => {
  return (
    <TouchableOpacity style={[styles.socialbutton, style]} onPress={onPress}>
      <View style={styles.socialcontent}>
        {icon && (
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconWidth }}
          // resizeMode="contain"
          />
        )}
        <Text style={styles.socialtext}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

