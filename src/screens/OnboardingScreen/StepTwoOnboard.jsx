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
  Alert,
} from 'react-native';

import OnboardingProCards from '../../components/OnboardingContainer/OnboardingProCards';
import { Fonts } from '../../constants/fonts';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import Sound from 'react-native-sound';
import { transcribeWithDeepgram } from '../../utils/deepgram';

Sound.setCategory('Playback');

const { width } = Dimensions.get('window');
const scale = width / 390;

/* ----------------------------------------------------
   Semantic relevance check (relaxed & correct)
---------------------------------------------------- */
const isRelevantToWork = (text) => {
  // 🔐 Normalize everything into a string
  if (!text) return false;

  let normalized = '';

  if (typeof text === 'string') {
    normalized = text;
  } else if (typeof text === 'object') {
    // Deepgram sometimes returns { transcript: "..." }
    normalized =
      text.transcript ||
      text.text ||
      text.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
      '';
  }

  if (!normalized || typeof normalized !== 'string') return false;

  const lower = normalized.toLowerCase().trim();

  const irrelevant = [
    'pizza',
    'food',
    'movie',
    'cricket',
    'football',
    'song',
    'music',
    'weather',
    'travel',
  ];

  if (irrelevant.some(w => lower.includes(w))) return false;

  return lower.length >= 10;
};


/* ----------------------------------------------------
   OPTIONS
---------------------------------------------------- */
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

export default function StepTwoOnboard({ value = [], onChange = () => {} }) {
  const [extraText, setExtraText] = useState('');
  const [recording, setRecording] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const [lineWidths, setLineWidths] = useState({});
  const [audioProgress, setAudioProgress] = useState({});

  const soundRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressInterval = useRef(null);

  const { startRecording, stopRecording } = useAudioRecorder();

  /* ----------------------------------------------------
     DERIVED FLOW STATE
  ---------------------------------------------------- */
  const hasCustomInput = value.some(v => typeof v === 'object');
  const customItems = value.filter(v => typeof v === 'object');

  /* ----------------------------------------------------
     OPTION TOGGLE (MULTI)
  ---------------------------------------------------- */
  const toggleOption = title => {
    const next = value.includes(title)
      ? value.filter(v => v !== title)
      : [...value, title];
    onChange(next);
  };

  /* ----------------------------------------------------
     TOGGLE TEXT / VOICE SELECTION (MANUAL)
  ---------------------------------------------------- */
  const toggleCustom = id => {
    onChange(
      value.map(item =>
        typeof item === 'object' && item.id === id
          ? { ...item, selected: !item.selected }
          : item,
      ),
    );
  };

  /* ----------------------------------------------------
     TEXT SEND (NOT AUTO-SELECTED)
  ---------------------------------------------------- */
  const handleSend = () => {
    if (extraText.trim().length < 10) return;
    if (hasCustomInput) return;

    if (!isRelevantToWork(extraText)) {
      Alert.alert(
        'Hmm…',
        'It seems your response isn’t directly related to work worries. Could you tell me what worries you most at work?',
      );
      setExtraText('');
      return;
    }

    onChange([
      ...value,
      {
        id: Date.now().toString(),
        type: 'text',
        value: extraText.trim(),
        selected: false, // 👈 IMPORTANT
      },
    ]);

    setExtraText('');
    Keyboard.dismiss();
  };

  /* ----------------------------------------------------
     VOICE RECORD (NOT AUTO-SELECTED)
  ---------------------------------------------------- */
  const handleMicPress = async () => {
    if (hasCustomInput) return;

    if (!recording) {
      await startRecording();
      setRecording(true);
    } else {
      const path = await stopRecording();
      setRecording(false);
      if (!path) return;

      const dg = await transcribeWithDeepgram(path);

const transcript =
  typeof dg === 'string'
    ? dg
    : dg?.transcript ||
      dg?.results?.channels?.[0]?.alternatives?.[0]?.transcript ||
      '';

      if (!isRelevantToWork(transcript)) {
  Alert.alert(
    'Hmm…',
    'It seems your response isn’t directly related to work worries. Could you tell me what worries you most at work?',
  );
  return;
}
      onChange([
        ...value,
        {
          id: Date.now().toString(),
          type: 'audio',
          uri: path,
          selected: false, // 👈 IMPORTANT
        },
      ]);
    }
  };

  /* ----------------------------------------------------
     DELETE TEXT / VOICE
  ---------------------------------------------------- */
  const deleteCustomItem = id => {
    onChange(value.filter(v => v.id !== id));
  };

  /* ----------------------------------------------------
     AUDIO PLAYBACK (UNCHANGED)
  ---------------------------------------------------- */
  const togglePlayAudio = item => {
    if (playingId === item.id) {
      soundRef.current?.stop();
      clearInterval(progressInterval.current);
      setPlayingId(null);
      return;
    }

    const sound = new Sound(item.uri, null, err => {
      if (err) return;

      soundRef.current = sound;
      setPlayingId(item.id);

      progressAnim.setValue(0);
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: sound.getDuration() * 1000,
        useNativeDriver: false,
      }).start();

      progressInterval.current = setInterval(() => {
        sound.getCurrentTime(sec => {
          setAudioProgress(prev => ({ ...prev, [item.id]: sec }));
        });
      }, 200);

      sound.play(() => {
        clearInterval(progressInterval.current);
        setPlayingId(null);
        progressAnim.setValue(0);
      });
    });
  };

  /* ----------------------------------------------------
     UI
  ---------------------------------------------------- */
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
                  onPress={() => toggleCustom(item.id)}
                  rightElement={
                   <View pointerEvents="box-none" style={styles.leftDeleteIcon}>
  <Pressable
    onPress={() => deleteCustomItem(item.id)}
    style={{
      backgroundColor: '#FFF',
      borderRadius: 10,
      // padding: 4,
    }}
  >
    <Image
      source={require('../../assets/images/delete_icon.png')}
      style={{ width: 20, height: 20 }}
    />
  </Pressable>
</View>

                  }
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
                  onPress={() => toggleCustom(item.id)}
                  rightElement={
                    <View pointerEvents="box-none" style={styles.leftDeleteIcon}>
  <Pressable
    onPress={() => deleteCustomItem(item.id)}
    style={{
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 4,
    }}
  >
    <Image
      source={require('../../assets/images/delete_icon.png')}
      style={{ width: 18, height: 18 }}
    />
  </Pressable>
</View>

                  }
                  title={
                    <View style={styles.audioWrapper}>
                      <View style={styles.audioRow}>
                        <Pressable onPress={() => togglePlayAudio(item)}>
                          <Image
                            source={require('../../assets/icons/play.png')}
                            style={{ width: 22, height: 22, marginRight: 8 }}
                          />
                        </Pressable>

                        <View
                          style={styles.lineContainer}
                          onLayout={e =>
                            setLineWidths(prev => ({
                              ...prev,
                              [item.id]: e.nativeEvent.layout.width,
                            }))
                          }
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

                      <Text style={styles.audioTime}>
                        {Math.floor(audioProgress[item.id] || 0)}s
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

      {/* INPUT BAR */}
      <View style={[styles.inputContainer, styles.fixedInput]}>
        <TextInput
          placeholder="Anything you want to add..."
          placeholderTextColor="#2A2A2A"
          style={styles.textInput}
          value={extraText}
          onChangeText={setExtraText}
          maxLength={50}
          editable={!hasCustomInput}
        />

        <Pressable onPress={handleMicPress} disabled={hasCustomInput}>
          <Image
            source={require('../../assets/icons/circle-microphone.png')}
            style={[
              styles.micIcon,
              recording && { tintColor: '#235DFF' },
              hasCustomInput && { opacity: 0.4 },
            ]}
          />
        </Pressable>

        <Pressable
          disabled={extraText.trim().length < 10 || hasCustomInput}
          onPress={handleSend}
        >
          <Image
            source={require('../../assets/icons/arrow-circle-up.png')}
            style={[
              styles.sendIcon,
              extraText.trim().length >= 10 &&
                !hasCustomInput && { tintColor: '#235DFF' },
            ]}
          />
        </Pressable>
      </View>
    </View>
  );
}

/* ----------------------------------------------------
   STYLES
---------------------------------------------------- */
const styles = StyleSheet.create({
  title: {
    fontSize: 32 * scale,
    fontFamily: Fonts.Medium,
    marginBottom: 24 * scale,
    lineHeight: scale * 48,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10 * scale,
    rowGap: 8 * scale,
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
  fixedInput: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
leftDeleteIcon: {
  position: 'absolute',
  top: 0,                    // keep anchor
  right: 0,                     // keep anchor
  transform: [
    // { translateX: -110 },         // 🔥 move LEFT near icon
    { translateY: -70 },          // 🔥 move UP near icon
  ],
  zIndex: 50,
  elevation: 20,
},


  micIcon: { width: 24, height: 24, marginRight: 12 },
  textInput: {
    flex: 1,
    fontFamily: Fonts.Regular,
    fontSize: 18 * scale,
    color: '#000',
  },
  sendIcon: { width: 28, height: 28 },
  audioWrapper: { flex: 1, width: '100%' },
  audioRow: { flexDirection: 'row', alignItems: 'center', width: '100%' },
  lineContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    marginRight: 12 * scale,
  },
  lineProgress: {
    height: 4,
    backgroundColor: '#0EA5E9',
    borderRadius: 2,
  },
  circle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0077B6',
    top: -3,
    marginLeft: -5,
  },
  audioTime: {
    marginTop: 6 * scale,
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    color: '#2A2A2A',
    textAlign: 'center',
  },
});
