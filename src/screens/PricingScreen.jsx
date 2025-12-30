import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';import { useNavigation } from '@react-navigation/native';

import PlanCard from '../components/PlanCard';
import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function PricingScreen() {
  const [selectedPlan, setSelectedPlan] = useState('free');
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar hidden />

      <Text style={styles.heading}>Pick Your Confidence Plan</Text>
      <Text style={styles.textHead}>
        Why would you like to delete your account?
      </Text>

      {/* FREE PLAN */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedPlan('free')}
      >
        <PlanCard
          title="Free Plan"
          price="$0/yearly"
          current
          active={selectedPlan === 'free'}
          features={[
            '1 scenario per day',
            '1 free practice interview',
            'Feedback & report',
            'Confidence progression',
            'Daily points & leaderboard',
          ]}
        />
      </TouchableOpacity>

      {/* PRO PLAN */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setSelectedPlan('pro')}
      >
        <PlanCard
          title="Pro Plan"
          price="$99/yearly"
          active={selectedPlan === 'pro'}
          features={[
            'Unlimited scenarios & interviews',
            'Retry after feedback',
            'Unlimited practice interviews',
            'Full progression & leaderboard perks',
          ]}
        />
      </TouchableOpacity>

      {/* UPGRADE BUTTON (ONLY FOR PRO) */}
      {selectedPlan === 'pro' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PaymentStatusScreen')}
        >
          <Text style={styles.buttonText}>Upgrade</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24 * scale,
    paddingBottom: 40 * scale,
  },

  heading: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    marginLeft: 16 * scale,
    marginBottom: 16 * scale,
    lineHeight: 24,
  },
  textHead: {
    fontFamily: Fonts.Regular,
    marginLeft: 16 * scale,
    marginBottom: 16 * scale,
    lineHeight: 20,
  },
  button: {
    height: 56 * scale,
    width: 358 * scale,
    backgroundColor: '#007AFF',
    borderRadius: 28,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24 * scale,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
  },
});
