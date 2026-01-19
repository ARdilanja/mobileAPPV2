import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setExperience } from '../../redux/slices/onboardingSlice';
import { Fonts } from '../../constants/fonts';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function StepZeroTwoExp() {
  const dispatch = useDispatch();
  const experience = useSelector(state => state.onboarding.experience);

  const OPTIONS = [
    {
      id: 1,
      title: '0 - 1 year',
      icon: require('../../assets/icons/Group.png'),
      iconBgColor: '#DBE5FF',
      accentColor: '#235DFF',
    },
    {
      id: 2,
      title: '1 - 3 years',
      icon: require('../../assets/icons/user-gear.png'),
      iconBgColor: '#EBE6FF',
      accentColor: '#4A2AC9',
    },
    {
      id: 3,
      title: '3 - 5 years',
      icon: require('../../assets/icons/employee-man-alt.png'),
      iconBgColor: '#D8F3DC',
      accentColor: '#009343',
    },
    {
      id: 4,
      title: '5 - 10 years',
      icon: require('../../assets/icons/employee-man 1.png'),
      iconBgColor: '#FFEDCF',
      accentColor: '#CC5803',
    },
    {
      id: 5,
      title: '10+ years',
      icon: require('../../assets/icons/user-briefcase-yellow.png'),
      iconBgColor: '#FFDCE2',
      accentColor: '#800F2F',
    },
  ];

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>
          How many years of experience do you have?
        </Text>

        <View style={styles.grid}>
          {OPTIONS.map(opt => (
            <OnboardingProCards
              key={opt.id}
              title={opt.title}
              icon={opt.icon}
              iconBgColor={opt.iconBgColor}
              accentColor={opt.accentColor}
              mode="card"
              variant="small"
              selected={experience === opt.title}
              onPress={() => dispatch(setExperience(opt.title))}
            />
          ))}
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    // paddingHorizontal: 16,
  },
  title: {
    fontSize: 32 * scale,
    marginBottom: 10 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10 * scale,
    rowGap: 8 * scale,
  },
});
