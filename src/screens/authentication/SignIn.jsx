import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import SocialButton from '../../components/auth/SocialButton';
import Gradient from '../../constants/Gradient';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
  const navigation = useNavigation()
  return (
    <Gradient>
      <AuthHeader
        title="Sign in"
        subtitle="Sign in and find your dream job"
        showBack={false}
        showLogo={false}
      />

      <SocialButton text="Sign in with Google" icon={require('../../assets/icons/google-logo.png')}
        onPress={() => navigation.navigate('BottomDash')}
        // onPress={() => navigation.navigate('SubscriptionAgreement')}
        iconWidth={24}

      />
      <SocialButton
        text="Sign in with Email"
        iconWidth={16}

        icon={require('../../assets/icons/envelop.png')}
        onPress={() => navigation.navigate('EmailInput')}
      />
      <SocialButton
        text="Sign in with Mobile"
        iconWidth={16}
        icon={require('../../assets/icons/language.png')}
        onPress={() => navigation.navigate('MobileInput')}
      />

      <Text style={styles.footer} 
      >
        Don’t have an account? <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>Sign up</Text>
      </Text>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  footer: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: 400,
    textAlign: 'center',
    marginTop: 24,
  },
  link: {
    color: '#1a73e8',
    fontWeight: '500',
  },
});

export default SignIn;
