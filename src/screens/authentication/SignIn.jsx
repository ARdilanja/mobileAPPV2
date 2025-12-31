import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialButton from '../../components/auth/SocialButton';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';

const SignIn = () => {
  const navigation = useNavigation()
  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <View style={styles.container}>

        {/* Sign-in header */}
        <AuthHeader
          title="Sign in"
          subtitle="Log in your way: choose an option below"
          showBack={false}
          showLogo={false}
        />
<View style={{marginTop:15}}>
        {/* Google sign-in option */}
        <SocialButton text="Sign in with Google" icon={require('../../assets/icons/google.png')}
          onPress={() => navigation.navigate('BottomDash')}
          iconWidth={24}

        />

        
        {/* apple sign-in option */}
        <SocialButton
          text="Sign in with apple"
          iconWidth={24}
          icon={require('../../assets/icons/apple.png')}
          onPress={() => navigation.navigate('MobileInput')}
        />

        {/* faceboook sign-in option */}
        <SocialButton
          text="Sign in with facebook"
          iconWidth={24}

          icon={require('../../assets/icons/facebook.png')}
          onPress={() => navigation.navigate('EmailInput')}
        />

        {/* Email sign-in option */}
        <SocialButton
          text="Sign in with email"
          iconWidth={24}

          icon={require('../../assets/icons/email.png')}
          onPress={() => navigation.navigate('EmailInput')}
        />

        </View>
        {/* Footer sign-up link */}
        <Text style={styles.footer}
        >
          Don’t have an account? <Text style={styles.link} onPress={() => navigation.navigate('ChooseSignupMethod')}>Sign up</Text>
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
    marginTop: 32,
  },
  link: {
    color: '#0178FF',
    fontWeight: '500',
  },
});

export default SignIn;
