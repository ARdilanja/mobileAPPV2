import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function StepTwoOnboard({ value = [], onChange = () => {} }) {
  const [extraText, setExtraText] = useState('');

  const toggle = title => {
    const nextValue = value.includes(title)
      ? value.filter(i => i !== title)
      : [...value, title];
    onChange(nextValue);
  };

  const OPTIONS = [
    {
      title: 'Individual contributor',
      iconBgColor: '#DBE5FF',
      accentColor: '#235DFF',
      icon: require('../../assets/icons/meeting.png'),
    },
    {
      title: 'Leading a team',
      iconBgColor: '#EBE6FF',
      accentColor: '#4A2AC9',
      icon: require('../../assets/icons/meeting.png'),
    },
    {
      title: 'Cross-functional role',
      iconBgColor: '#D8F3DC',
      accentColor: '#009343',
      icon: require('../../assets/icons/meeting.png'),
    },
    {
      title: 'Stakeholder-facing',
      iconBgColor: '#FFDCE2',
      accentColor: '#800F2F',
      icon: require('../../assets/icons/meeting.png'),
    },
  ];

  const hasText = extraText.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s your working situation like?</Text>

      <View style={styles.grid}>
        {OPTIONS.map(opt => (
          <OnboardingProCards
            key={opt.title}
            title={opt.title}
            icon={opt.icon}
            iconBgColor={opt.iconBgColor}
            accentColor={opt.accentColor}
            mode="card"
            selected={value.includes(opt.title)}
            onPress={() => toggle(opt.title)}
          />
        ))}
      </View>

      {/* Input bar with Mic (left) + Send (right) */}
      <View style={styles.inputContainer}>
        {/* Mic Icon - Left */}
        <Image
          source={require('../../assets/icons/circle-microphone.png')}
          style={styles.micIcon}
        />

        {/* Text Input */}
        <TextInput
          placeholder="Anything you want to add..."
          placeholderTextColor="#999"
          style={styles.textInput}
          value={extraText}
          onChangeText={setExtraText}
          multiline={false}
        />

        {/* Send Arrow Icon - Right */}
        <Pressable onPress={() => {
          // Optional: handle send (e.g., save text, clear input)
          if (hasText) {
            console.log('Sent:', extraText);
            setExtraText('');
          }
        }}>
          <Image
            source={require('../../assets/icons/arrow-circle-up.png')} // Your right arrow in circle
            style={[
              styles.sendIcon,
              hasText && styles.sendIconActive // Optional: color when active
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 32 * scale,
    fontWeight: '700',
    marginBottom: 24 * scale,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16 * scale,
    marginBottom: 32 * scale,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    backgroundColor: '#FFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginTop: 'auto',    // Pushes to bottom of content
    marginBottom: 20,
  },

  micIcon: {
    width: 24,
    height: 24,
    tintColor: '#666',
    marginRight: 12,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
  },

  sendIcon: {
    width: 28,
    height: 28,
    tintColor: '#CCC', // Gray when empty
  },
  sendIconActive: {
    tintColor: '#2563EB', // Blue when text typed (or your primary color)
  },
});