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
import { useAudioRecorder } from "../../hooks/useAudioRecorder";
import Sound from 'react-native-sound';
import { transcribeWithDeepgram } from "../../utils/deepgram";

Sound.setCategory('Playback');

const { width } = Dimensions.get('window');
const scale = width / 390;

const OPTIONS = [
  { title: 'Being judged', iconBgColor: '#DBE5FF', accentColor: '#235DFF', icon: require('../../assets/icons/people-network-partner.png') },
  { title: 'Confrontation', iconBgColor: '#EBE6FF', accentColor: '#4A2AC9', icon: require('../../assets/icons/boxing-glove.png') },
  { title: 'Not sounding confident', iconBgColor: '#D8F3DC', accentColor: '#009343', icon: require('../../assets/icons/queue-alt.png') },
  { title: 'Forgetting what to say', iconBgColor: '#FFDCE2', accentColor: '#800F2F', icon: require('../../assets/icons/introduction.png') },
  { title: 'Saying the wrong thing', iconBgColor: '#FFEDCF', accentColor: '#CC5803', icon: require('../../assets/icons/document-circle-wrong.png') },
];

export default function StepTwoOnboard({ value = [], onChange = () => { } }) {
  const [extraText, setExtraText] = useState('');
  const [recording, setRecording] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [lineWidths, setLineWidths] = useState({});

  const soundRef = useRef(null);
  const waveformRef = useRef([]);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const { startRecording, stopRecording } = useAudioRecorder(amp => {
    waveformRef.current = [...waveformRef.current.slice(-30), amp];
  });

  const PREDEFINED_TITLES = OPTIONS.map(opt => opt.title);

  const customOptions = value.filter(
    item => typeof item === 'string' && !PREDEFINED_TITLES.includes(item)
  );

  const toggle = title => {
    const nextValue = value.includes(title) ? value.filter(i => i !== title) : [...value, title];
    onChange(nextValue);
  };

  // 🎙️ Audio recording
  const handleMicPress = async () => {
    if (!recording) {
      await startRecording();
      setRecording(true);
    } else {
      const path = await stopRecording();
      setRecording(false);
      if (!path) return;

      await transcribeWithDeepgram(path); // Ignored in UI

      onChange([
        ...value,
        {
          id: Date.now().toString(),
          type: 'audio',
          uri: path,
        },
      ]);
    }
  };

  // ▶️ Play audio
  const togglePlayAudio = (item) => {
    if (playingId === item.id) {
      soundRef.current?.stop();
      soundRef.current?.release();
      soundRef.current = null;
      setPlayingId(null);
      return;
    }

    if (soundRef.current) {
      soundRef.current.release();
      soundRef.current = null;
    }

    const sound = new Sound(item.uri, null, err => {
      if (err) return console.log('Sound load error:', err);

      soundRef.current = sound;
      setPlayingId(item.id);
      progressAnim.setValue(0);

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: sound.getDuration() * 1000,
        useNativeDriver: false,
      }).start();

      sound.play(() => {
        sound.release();
        soundRef.current = null;
        setPlayingId(null);
        progressAnim.setValue(0);
      });
    });
  };

  // 📝 Send text input
  const handleSend = () => {
    const text = extraText.trim();
    if (!text) return;
    onChange([...value, text]);
    setExtraText('');
    Keyboard.dismiss();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>What worries you the most?</Text>

        {/* ✅ Predefined cards */}
        <View style={styles.grid}>
          {OPTIONS.map(opt => (
            <OnboardingProCards
              key={opt.title}
              title={opt.title}
              icon={opt.icon}
              iconBgColor={opt.iconBgColor}
              accentColor={opt.accentColor}
              selected={value.includes(opt.title)}
              onPress={() => toggle(opt.title)}
            />
          ))}
        </View>

        {/* ✅ Custom text cards */}
        {customOptions.length > 0 && (
          <View style={[styles.grid, { marginTop: 16 }]}>
            {customOptions.map(text => (
              <OnboardingProCards
                key={text}
                title={text}
                selected={value.includes(text)}
                onPress={() => toggle(text)}
                variant="large"
                accentColor="#235DFF"
              />
            ))}
          </View>
        )}

        {/* ✅ Audio cards */}
        {value.filter(item => item.type === 'audio').map(item => {
          const animatedWidth = progressAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, lineWidths[item.id] || 0],
          });

          return (
            <OnboardingProCards
              key={item.id}
              icon={require('../../assets/icons/record-audio.png')}
              accentColor="#0EA5E9"
              selected
              onPress={() => { }}
              title={
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  {/* Play button */}
                  <Pressable onPress={() => togglePlayAudio(item)} style={{ marginRight: 8 }}>
                    <Image
                      source={require('../../assets/icons/play.png')}
                      style={{ width: 22, height: 22 }}
                    />
                  </Pressable>

                  {/* Progress line */}
                  <View
                    style={styles.lineContainer}
                    onLayout={e => setLineWidths(prev => ({ ...prev, [item.id]: e.nativeEvent.layout.width }))}
                  >
                    <Animated.View style={[styles.lineProgress, { width: animatedWidth }]} />
                    <Animated.View style={[styles.circle, { left: animatedWidth }]} />
                  </View>

                </View>
              }
              rightElement={null} 
            />
          );
        })}
      </ScrollView>

      {/* Input Bar */}
      <View style={[styles.inputContainer, styles.fixedInput]}>
        <TextInput
          placeholder="Anything you want to add..."
          style={styles.textInput}
          value={extraText}
          onChangeText={setExtraText}
        />
        <Pressable onPress={handleMicPress}>
          <Image
            source={require("../../assets/icons/circle-microphone.png")}
            style={[styles.micIcon, recording && { tintColor: "#235DFF" }]}
          />
        </Pressable>
        <Pressable disabled={!extraText.trim()} onPress={handleSend}>
          <Image
            source={require("../../assets/icons/arrow-circle-up.png")}
            style={[styles.sendIcon, extraText.trim() && { tintColor: "#235DFF" }]}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 32 * scale, fontFamily: Fonts.Medium, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 * scale, rowGap: 8 * scale, marginTop: 10 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', height: 56 * scale, width: 358 * scale, backgroundColor: '#FFF', borderRadius: 28, paddingHorizontal: 16 },
  fixedInput: { position: 'absolute', bottom: 10, alignSelf: 'center' },
  micIcon: { width: 24, height: 24, marginRight: 12 },
  textInput: { flex: 1, fontFamily: Fonts.Regular, fontSize: 18 * scale, paddingVertical: 0, color: '#000' },
  sendIcon: { width: 28, height: 28 },

  // Audio line
  audioRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  lineContainer: { flex: 1, height: 4, backgroundColor: '#E5E5E5', borderRadius: 2, justifyContent: 'center' },
  lineProgress: { height: 4, backgroundColor: '#0EA5E9', borderRadius: 2 },
  circle: { position: 'absolute', width: 10, height: 10, borderRadius: 5, backgroundColor: '#0077B6', top: -3 },
});
