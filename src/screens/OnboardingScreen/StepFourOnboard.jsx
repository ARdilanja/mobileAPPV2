// src/screens/OnboardingScreen/StepFourOnboard.jsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';

const { width } = Dimensions.get('window');
const scale = width / 390;

const OPTIONS = [
  {
    title: 'Being judged',
    icon: require('../../assets/icons/person-presenting.png'),
    iconBgColor: '#FFDCE2',
    accentColor: '#800F2F',
  },
  {
    title: 'Confrontation',
    icon: require('../../assets/icons/meeting.png'),
    iconBgColor: '#DBE5FF',
    accentColor: '#235DFF',
  },
  {
    title: 'Not sounding confident',
    icon: require('../../assets/icons/coworking.png'),
    iconBgColor: '#EBE6FF',
    accentColor: '#4A2AC9',
  },
  {
    title: 'Forgetting what to say',
    icon: require('../../assets/icons/goals.png'),
    iconBgColor: '#D8F3DC',
    accentColor: '#009343',
  },
  {
    title: 'Saying the wrong thing',
    icon: require('../../assets/icons/circle-xmark.png'),
    iconBgColor: '#FFEDCF',
    accentColor: '#CC5803',
  },
];

const StepFourOnboard = ({ value = '', onChange = () => {} }) => {
  return (
    <View>
      <Text style={styles.title}>What worries you the most?</Text>

      <View style={styles.grid}>
        {OPTIONS.map(opt => (
          <OnboardingProCards
            key={opt.title}
            title={opt.title}
            icon={opt.icon}
            iconBgColor={opt.iconBgColor}
            accentColor={opt.accentColor}
            mode="card" // ✅ CARD UI
            selectionType="single" // ✅ RADIO BEHAVIOR
            selected={value === opt.title}
            onPress={() => onChange(opt.title)}
          />
        ))}
      </View>
    </View>
  );
};

export default StepFourOnboard;

const styles = StyleSheet.create({
  title: {
    fontSize: 22 * scale,
    fontWeight: '700',
    marginBottom: 24 * scale,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16 * scale,
  },
});
