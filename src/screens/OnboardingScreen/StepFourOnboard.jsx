// src/screens/OnboardingScreen/StepFourOnboard.jsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const OPTIONS = [
  {
    title: 'Individual contributor',
    icon: require('../../assets/icons/Junior.png'),
    iconBgColor: '#DBE5FF',
    // accentColor: '#235DFF',
  },
  {
    title: 'Leading a \nteam',
    icon: require('../../assets/icons/people-line.png'),
    iconBgColor: '#EBE6FF',
    accentColor: '#4A2AC9',
  },
  {
    title: 'Cross-functional role',
    icon: require('../../assets/icons/function-process.png'),
    iconBgColor: '#D8F3DC',
    accentColor: '#009343',
  },
  {
    title: 'Stakeholder-facing (clients / execs)',
    icon: require('../../assets/icons/target-audience.png'),
    iconBgColor: '#FFDCE2',
    accentColor: '#800F2F',
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
    fontSize: 32 * scale,
    fontWeight: '500',
    marginBottom: 24 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: scale * 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // rowGap: 16 * scale,
    marginTop: 12 * scale,
  },
});
