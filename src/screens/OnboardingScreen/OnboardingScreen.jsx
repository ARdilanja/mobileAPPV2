import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';

const { width } = Dimensions.get('window');
const scale = width / 390;

const options = [
  'Presenting ideas',
  'Facing interviews',
  'Speaking in meetings',
  'Saying no or setting boundaries',
  'Talking in manager 1-on-1s',
  'Showing my work / achievements',
//   'Asking for promotion or appraisal',
  'Practice interviews',
];

const StepOne = ({ value = [], onChange }) => {
  const toggle = (item) => {
    onChange(
      value.includes(item)
        ? value.filter((i) => i !== item)
        : [...value, item]
    );
  };

  return (
    <View>
      <Text style={styles.title}>
        What’s your biggest challenge at work right now?
      </Text>

      <View style={styles.grid}>
        {options.map((item) => (
          <OnboardingProCards
            key={item}
            title={item}
            icon={require('../../assets/icons/person-presenting.png')}
            variant="small"
            selected={value.includes(item)}
            onPress={() => toggle(item)}
          />
        ))}
      </View>
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  title: {
    fontSize: 22 * scale,
    fontWeight: '700',
    marginBottom: 24 * scale,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    rowGap: 16 * scale,
  },
});
