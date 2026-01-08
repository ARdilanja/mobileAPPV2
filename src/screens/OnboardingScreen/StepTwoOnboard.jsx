import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  Keyboard,
  Animated,
} from 'react-native';

import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';
import { Fonts } from '../../constants/fonts';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import Sound from 'react-native-sound';
import { transcribeWithDeepgram } from '../../utils/deepgram';

Sound.setCategory('Playback');

const { width } = Dimensions.get('window');
const scale = width / 390;

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
    title: 'Not sounding confident',
    iconBgColor: '#D8F3DC',
    accentColor: '#009343',
    icon: require('../../assets/icons/queue-alt.png'),
  },
  {
    title: 'Forgetting what to say',
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

export default function StepTwoOnboard({ value = [], onChange = () => { } }) {
  const [extraText, setExtraText] = useState('');
  const [recording, setRecording] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [lineWidths, setLineWidths] = useState({});
  const [audioProgress, setAudioProgress] = useState({});
  const [audioDurations, setAudioDurations] = useState({});

  const soundRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressInterval = useRef(null);

  const { startRecording, stopRecording } = useAudioRecorder();

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const toggleOption = title => {
    const next = value.includes(title)
      ? value.filter(i => i !== title)
      : [...value, title];
    onChange(next);
  };

  const toggleCustom = id => {
    onChange(
      value.map(item =>
        typeof item === 'object' && item.id === id
          ? { ...item, selected: !item.selected }
          : item,
      ),
    );
  };

  const handleSend = () => {
    if (extraText.trim().length < 10) return;
    onChange([
      ...value,
      {
        id: Date.now().toString(),
        type: 'text',
        value: extraText,
        selected: true,
      },
    ]);

    setExtraText('');
    Keyboard.dismiss();
  };

  const handleMicPress = async () => {
    if (!recording) {
      await startRecording();
      setRecording(true);
    } else {
      const path = await stopRecording();
      setRecording(false);
      if (!path) return;

      await transcribeWithDeepgram(path);

      onChange([
        ...value,
        {
          id: Date.now().toString(),
          type: 'audio',
          uri: path,
          selected: true,
        },
      ]);
    }
  };

  const togglePlayAudio = item => {
    if (playingId === item.id) {
      soundRef.current?.stop();
      soundRef.current?.release();
      clearInterval(progressInterval.current);
      setPlayingId(null);
      return;
    }

    const sound = new Sound(item.uri, null, err => {
      if (err) return;

      const duration = sound.getDuration();
      setAudioDurations(prev => ({ ...prev, [item.id]: duration }));
      setAudioProgress(prev => ({ ...prev, [item.id]: 0 }));

      soundRef.current = sound;
      setPlayingId(item.id);

      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: duration * 1000,
        useNativeDriver: false,
      }).start();

      progressInterval.current = setInterval(() => {
        sound.getCurrentTime(sec => {
          setAudioProgress(prev => ({ ...prev, [item.id]: sec }));
        });
      }, 200);

      sound.play(() => {
        clearInterval(progressInterval.current);
        sound.release();
        setPlayingId(null);
        progressAnim.setValue(0);
      });
    });
  };

  const customItems = value.filter(v => typeof v === 'object');

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>What worries you the most?</Text>

        <View style={styles.grid}>
          {OPTIONS.map(opt => (
            <OnboardingProCards
              key={opt.title}
              title={opt.title}
              icon={opt.icon}
              iconBgColor={opt.iconBgColor}
              accentColor={opt.accentColor}
              selected={value.includes(opt.title)}
              onPress={() => toggleOption(opt.title)}
            />
          ))}

          {customItems.map(item => {
            if (item.type === 'text') {
              return (
                <OnboardingProCards
                  key={item.id}
                  title={item.value}
                  icon={require('../../assets/icons/text-icon.png')}
                  iconBgColor="#FFEBE3"
                  accentColor="#BE3400"
                  selected={item.selected}
                  variant="small"
                  onPress={() => toggleCustom(item.id)}
                />
              );
            }

            if (item.type === 'audio') {
              const fullWidth = lineWidths[item.id] || 0;

              const animatedWidth = progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, fullWidth],
              });

              return (
                <OnboardingProCards
                  key={item.id}
                  icon={require('../../assets/icons/record-audio.png')}
                  iconBgColor="#E0F7FF"
                  accentColor="#0EA5E9"
                  selected={item.selected}
                  variant="small"
                  onPress={() => toggleCustom(item.id)}
                  title={
                    <View style={styles.audioWrapper}>
                      {/* PLAY + LINE */}
                      <View style={styles.audioRow}>
                        <Pressable onPress={() => togglePlayAudio(item)}>
                          <Image
                            source={require('../../assets/icons/play.png')}
                            style={{ width: 22, height: 22, marginRight: 8 }}
                          />
                        </Pressable>

                        <View
                          style={styles.lineContainer}
                          onLayout={e => {
                            setLineWidths(prev => ({
                              ...prev,
                              [item.id]: e.nativeEvent.layout.width,
                            }));
                          }}
                        >
                          <Animated.View
                            style={[
                              styles.lineProgress,
                              { width: animatedWidth },
                            ]}
                          />
                          <Animated.View
                            style={[
                              styles.circle,
                              { left: animatedWidth },
                            ]}
                          />
                        </View>
                      </View>

                      {/* TIME – BOTTOM RIGHT */}
                      <Text style={styles.audioTime}>
                        {formatTime(audioProgress[item.id] || 0)}
                      </Text>
                    </View>
                  }
                />
              );
            }


            return null;
          })}
        </View>
      </ScrollView>

      <View style={[styles.inputContainer, styles.fixedInput]}>
        <TextInput
          placeholder="Anything you want to add..."
          placeholderTextColor="#2A2A2A"
          style={styles.textInput}
          value={extraText}
          onChangeText={setExtraText}
          maxLength={50}
        />

        <Pressable onPress={handleMicPress}>
          <Image
            source={require('../../assets/icons/circle-microphone.png')}
            style={[styles.micIcon, recording && { tintColor: '#235DFF' }]}
          />
        </Pressable>

        <Pressable disabled={extraText.trim().length < 10} onPress={handleSend}>
          <Image
            source={require('../../assets/icons/arrow-circle-up.png')}
            style={[
              styles.sendIcon,
              extraText.trim().length >= 10 && { tintColor: '#235DFF' },]}
          />
        </Pressable>
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
    lineHeight: scale * 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
     gap: 10 * scale,
    rowGap: 8 * scale,
    marginTop: 10*scale,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56 * scale,
    width: 358 * scale,
    backgroundColor: '#FFF',
    borderRadius: 28,
    paddingHorizontal: 16,
  },
  fixedInput: { position: 'absolute', bottom: 10, alignSelf: 'center' },
  micIcon: { width: 24, height: 24, marginRight: 12 },
  textInput: {
    flex: 1,
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    color: '#000',
  },
  sendIcon: { width: 28, height: 28 },
  audioWrapper: {
    flex: 1,
    width: '100%',
  },

  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 16 * scale,
  },

  lineContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginRight: 12 * scale, // ensures space for dot
  },
  lineProgress: {
    height: 4,
    backgroundColor: '#0EA5E9',
    borderRadius: 2,
    marginRight: 12 * scale,

  },
  circle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0077B6',
    top: -3,
    marginLeft: -5, // keeps dot inside bar
  },

  audioTime: {
    marginBottom: 15 * scale,
    marginRight: 12 * scale,
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    color: '#2A2A2A',
    textAlign: 'right',
  },

});
