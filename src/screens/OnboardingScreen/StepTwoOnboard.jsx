import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';
import { Fonts } from '../../constants/fonts';

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
      title: 'Being judged',
      iconBgColor: '#DBE5FF',
      accentColor: '#235DFF',
      icon: require('../../assets/icons/people-network-partner.png'),
    },
    {
      title: 'Confrontation',
      iconBgColor: '#EBE6FF',
      accentColor: '#4A2AC9',
      icon: require('../../assets/icons/boxing-glove.png'),
    },
    {
      title: 'Not sounding \nconfident',
      iconBgColor: '#D8F3DC',
      accentColor: '#009343',
      icon: require('../../assets/icons/queue-alt.png'),
    },
    {
      title: 'Forgetting what to \nsay',
      iconBgColor: '#FFDCE2',
      accentColor: '#800F2F',
      icon: require('../../assets/icons/introduction.png'),
    },
    {
      title: 'Saying the wrong thing',
      iconBgColor: '#FFEDCF',
      accentColor: '#CC5803',
      icon: require('../../assets/icons/document-circle-wrong.png'),
    },
  ];

  const hasText = extraText.trim().length > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What worries you the most?</Text>

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
        {/* Text Input */}
        <TextInput
          placeholder="Anything you want to add..."
          placeholderTextColor="#000"
          style={styles.textInput}
          value={extraText}
          onChangeText={setExtraText}
          multiline={false}
        />
        <Image
          source={require('../../assets/icons/circle-microphone.png')}
          style={styles.micIcon}
        />
        {/* Send Arrow Icon - Right */}
        <Pressable
          onPress={() => {
            // Optional: handle send (e.g., save text, clear input)
            if (hasText) {
              console.log('Sent:', extraText);
              setExtraText('');
            }
          }}
        >
          <Image
            source={require('../../assets/icons/arrow-circle-up.png')} // Your right arrow in circle
            style={[
              styles.sendIcon,
              hasText && styles.sendIconActive, // Optional: color when active
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
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56 * scale,
    width: 358 * scale,
    backgroundColor: '#FFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 16,
    // marginHorizontal: 16,
    margin: 'auto',
    marginBottom: 5,
  },

  micIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  textInput: {
    flex: 1,
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    fontWeight: 400,
    color: '#000',
    paddingVertical: 0,
  },

  sendIcon: {
    width: 28,
    height: 28,
  },
});
