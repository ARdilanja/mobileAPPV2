// src/screens/OnboardingScreen/StepThreeOnboard.jsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const OPTIONS = [
  {
    title: 'Junior',
    icon: require('../../assets/icons/Junior.png'),
    iconBgColor: '#DBE5FF',
    accentColor: '#235DFF',
  },
  {
    title: 'Senior',
    icon: require('../../assets/icons/user-gear.png'),
    iconBgColor: '#EBE6FF',
    accentColor: '#4A2AC9',
  },
  {
    title: 'Manager',
    icon: require('../../assets/icons/employee-man-alt.png'),
    iconBgColor: '#D8F3DC',
    accentColor: '#009343',
  },
];

const StepThreeOnboard = ({ value = '', onChange = () => { } }) => {
  return (
    <View>
      <Text style={styles.title}>How would you describe your level?</Text>

      <View style={styles.grid}>
        {OPTIONS.map(opt => (
          <OnboardingProCards
            key={opt.title}
            title={opt.title}
            icon={opt.icon}
            iconBgColor={opt.iconBgColor}
            accentColor={opt.accentColor}
            mode="radio"
            selectionType="single"
            selected={value === opt.title}
            onPress={() => onChange(opt.title)}
          />
        ))}
      </View>
    </View>
  );
};

export default StepThreeOnboard;

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
    gap: 10 * scale,
    rowGap: 8 * scale,
    marginTop: 10 * scale,

  },
});
