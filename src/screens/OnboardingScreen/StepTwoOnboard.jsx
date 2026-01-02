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
import { Fonts } from '../../constants/fonts';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { transcribeWithDeepgram } from '../../utils/deepgram';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function StepTwoOnboard({ value = [], onChange = () => {} }) {
  const [extraText, setExtraText] = useState('');
  const { startRecording, stopRecording, recording } = useAudioRecorder();

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

  const toggle = title => {
    const nextValue = value.includes(title)
      ? value.filter(i => i !== title)
      : [...value, title];
    onChange(nextValue);
  };

  const handleMicPress = async () => {
    if (!recording) {
      await startRecording();
    } else {
      const filePath = await stopRecording();
      const text = await transcribeWithDeepgram(filePath);
      if (text) {
        setExtraText(prev => (prev ? prev + ' ' + text : text));
      }
    }
  };

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

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Anything you want to add..."
          placeholderTextColor="#9CA3AF"
          style={styles.textInput}
          value={extraText}
          onChangeText={setExtraText}
        />

        {/* Mic */}
        <Pressable onPress={handleMicPress}>
          <Image
            source={require('../../assets/icons/circle-microphone.png')}
            style={[
              styles.micIcon,
              recording && { tintColor: '#EF4444' }, // red when recording
            ]}
          />
        </Pressable>

        {/* Send Arrow */}
        <Pressable
          disabled={!hasText}
          onPress={() => {
            console.log('Sent:', extraText);
            setExtraText('');
          }}
        >
          <Image
            source={require('../../assets/icons/arrow-circle-up.png')}
            style={[
              styles.sendIcon,
              hasText ? styles.sendActive : styles.sendDisabled,
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
    marginTop: 17 * scale,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56 * scale,
    width: 358 * scale,
    backgroundColor: '#FFF',
    borderRadius: 28,
    paddingHorizontal: 16,
    margin: 'auto',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  textInput: {
    flex: 1,
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    color: '#000',
    paddingVertical: 0,
  },

  micIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },

  sendIcon: {
    width: 28,
    height: 28,
  },

  sendActive: {
    tintColor: '#2563EB', // 🔵 BLUE when active
  },

  sendDisabled: {
    tintColor: '#9CA3AF', // ⚪ Grey when disabled
  },
});
