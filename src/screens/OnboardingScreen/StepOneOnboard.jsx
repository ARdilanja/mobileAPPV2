// src/screens/OnboardingScreen/StepOneOnboard.jsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function StepOneOnboard({ value = [], onChange = () => {} }) {
  const toggle = id => {
    const nextValue = value.includes(id)
      ? value.filter(i => i !== id)
      : [...value, id];
    onChange(nextValue);
  };

  const OPTIONS = [
    {
      id: 1,
      title: 'Presenting \nideas',
      icon: require('../../assets/icons/person-presenting.png'),
      iconBgColor: '#DBE5FF',
      accentColor: '#235DFF',
    },
    {
      id: 2,
      title: 'Facing \ninterviews',
      icon: require('../../assets/icons/online-interview.png'),
      iconBgColor: '#EBE6FF',
      accentColor: '#4A2AC9',
    },
    {
      id: 3,
      title: 'Speaking in meetings',
      icon: require('../../assets/icons/coworking.png'),
      iconBgColor: '#D8F3DC',
      accentColor: '#009343',
    },
    {
      id: 4,
      title: 'Saying no or setting boundaries',
      icon: require('../../assets/icons/circle-xmark.png'),
      iconBgColor: '#FFDCE2',
      accentColor: '#800F2F',
    },
    {
      id: 5,
      title: 'Talking in \nmanager 1-on-1s',
      icon: require('../../assets/icons/meeting.png'),
      iconBgColor: '#FFEDCF',
      accentColor: '#CC5803',
    },
    {
      id: 6,
      title: 'Showing my work \n/ achievements',
      icon: require('../../assets/icons/membership.png'),
      iconBgColor: '#CAF0F8',
      accentColor: '#0077B6',
    },
    {
      id: 7,
      title: 'Asking for promotion or appraisal',
      icon: require('../../assets/icons/goals.png'),
      iconBgColor: '#FFEBE3',
      accentColor: '#BE3400',
    },
  ];

  return (
    <View>
      <Text style={styles.title}>
        What’s your biggest challenge at work right now?
      </Text>

      <View style={styles.grid}>
        {OPTIONS.map((opt, index) => {
          const isLastCard = index === OPTIONS.length - 1;

          return (
            <OnboardingProCards
              key={opt.id}
              title={opt.title}
              icon={opt.icon}
              iconBgColor={opt.iconBgColor}
              accentColor={opt.accentColor}
              mode="card"
              variant={isLastCard ? 'large' : 'small'}
              selected={value.includes(opt.id)}
              onPress={() => toggle(opt.id)}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32 * scale,
    fontWeight: '500',
    marginBottom: 24 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // rowGap: 16 * scale,
  },
});
