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

        {/* Google sign-in option */}
        <SocialButton text="Sign in with Google" icon={require('../../assets/icons/google-logo.png')}
          onPress={() => navigation.navigate('BottomDash')}
          iconWidth={24}

        />

        {/* Email sign-in option */}
        <SocialButton
          text="Sign in with Email"
          iconWidth={16}

          icon={require('../../assets/icons/envelop.png')}
          onPress={() => navigation.navigate('EmailInput')}
        />

        {/* Mobile sign-in option */}
        <SocialButton
          text="Sign in with Mobile"
          iconWidth={16}
          icon={require('../../assets/icons/language.png')}
          onPress={() => navigation.navigate('MobileInput')}
        />
        {/* Footer sign-up link */}
        <Text style={styles.footer}
        >
          Don’t have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
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

export default SignIn;
