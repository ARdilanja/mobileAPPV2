import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Fonts } from '../../constants/fonts';
import Sound from 'react-native-sound';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import Header from '../../components/Header';
import { useFocusEffect } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { transcribeWithDeepgram } from '../../utils/deepgram';
const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const FewQuickDetails = () => {
  const QUESTIONS = [
    {
      id: 1,
      question: 'What role do you currently work in?',
      chips: [
        'React native developer',
        'Full stack developer',
        'UI Developer',
        'UI Designer',
        'Java developer',
      ],
    },
    {
      id: 2,
      question: 'How many years of experience do you have?',
      chips: ['Student', 'Fresher', '1 - 3 years', '3 - 5 years', '5+ years'],
    },
    {
      id: 3,
      question: 'Which industry do you work in?',
      chips: [
        'Information technology',
        'Retail / E-commerce',
        'Finance',
        'Education',
        'Healthcare',
      ],
    },
  ];

  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const { startRecording, stopRecording } = useAudioRecorder();
  const [audioDuration, setAudioDuration] = useState(0);
  const [recording, setRecording] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const [playing, setPlaying] = useState(false);
  const soundRef = useRef(null);

  const [recordingTime, setRecordingTime] = useState(0);
  const recordingTimerRef = useRef(null);
  const recordingStartRef = useRef(0);
  const [isRecordingUI, setIsRecordingUI] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const formatTime = (seconds = 0) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const handleMicPress = async () => {
  if (recording) return;

  console.log('▶️ Recording STARTED');

  await startRecording();

  setRecording(true);
  setRecordingStopped(false);
  setIsRecordingUI(true);
  setAudioUri(null);

  recordingStartRef.current = Date.now();
  setRecordingTime(0);

  console.log('⏱️ Timer STARTED');

  recordingTimerRef.current = setInterval(() => {
    const seconds =
      (Date.now() - recordingStartRef.current) / 1000;


    setRecordingTime(seconds);
  }, 500);
};



  const handleStopRecording = async () => {
  if (!recording) return;

  console.log('🛑 Recording STOPPED');

  clearInterval(recordingTimerRef.current);

  const path = await stopRecording();

  console.log('📁 Audio file saved at:', path);

  setRecording(false);
  setRecordingStopped(true);
  setAudioUri(path);
};


  const handleSendVoice = async () => {
  if (!audioUri) return;

  console.log('📤 SEND VOICE PRESSED');
  console.log('🧠 Transcription STARTED');

  const result = await transcribeWithDeepgram(audioUri);

  console.log('📝 Transcript:', result?.transcript);
  console.log('🎯 Confidence:', result?.confidence);
  console.log('⏱️ Audio Duration:', recordingTime.toFixed(1), 'sec');

  if (!result?.transcript || result.confidence < 0.6) {
    console.log('❌ Transcription FAILED or LOW CONFIDENCE');
    handleCancelVoice();
    return;
  }

  console.log('✅ Transcription SUCCESS');
  console.log('💬 Sending message as USER chat');

  addUserMessage(result.transcript);

  setAudioUri(null);
  setIsRecordingUI(false);
  setRecordingStopped(false);
  setRecordingTime(0);
};


  const handleCancelVoice = () => {
  console.log('🗑️ CANCEL RECORDING PRESSED');

  clearInterval(recordingTimerRef.current);

  if (recording) {
    console.log('🛑 Recording force-stopped');
    stopRecording();
  }

  setRecording(false);
  setRecordingStopped(false);
  setAudioUri(null);
  setRecordingTime(0);
  setIsRecordingUI(false);

  console.log('♻️ Voice state RESET');
};





  const togglePlay = () => {
    if (playing) {
      soundRef.current?.stop();
      soundRef.current?.release();
      setPlaying(false);
      return;
    }

    const sound = new Sound(audioUri, null, err => {
      if (err) return;
      soundRef.current = sound;
      setPlaying(true);

      sound.play(() => {
        sound.release();
        setPlaying(false);
      });
    });
  };

  useEffect(() => {
    // Ask first question
    addSystemMessage(QUESTIONS[0].question);
  }, []);

  const addSystemMessage = (text) => {
    setMessages((prev) => [
      ...prev,
      { type: 'system', text },
    ]);
  };

  const addUserMessage = (text) => {
  console.log('👤 USER MESSAGE:', text);

  const newMessages = [...messages];

  if (editingIndex !== null) {
    console.log('✏️ Editing message at index:', editingIndex);
    newMessages[editingIndex].text = text;
    setEditingIndex(null);
  } else {
    newMessages.push({ type: 'user', text });
  }

  setMessages(newMessages);

  console.log('➡️ Moving to next question');

  setInput('');
  setAudioUri(null);

  if (currentIndex < QUESTIONS.length - 1) {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);

    setTimeout(() => {
      console.log('🤖 SYSTEM QUESTION:', QUESTIONS[nextIndex].question);
      addSystemMessage(QUESTIONS[nextIndex].question);
    }, 400);
  }
};



  const handleChipPress = (value) => {
    addUserMessage(value);
  };

  const handleEdit = (index, text) => {
    setInput(text);
    setEditingIndex(index);
  };

  const currentChips = QUESTIONS[currentIndex]?.chips || [];
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#F5F6FA');
      StatusBar.setTranslucent(false);
    }, []),
  );
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Chat-bg.png')} // 👈 your bg image
        resizeMode="repeat"
        style={styles.container}
      >

        <Header title="A few quick details" showBack={false} />
        <FlatList
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item, index }) => (
            // <View
            //   style={[
            //     styles.bubble,
            //     item.type === 'user'
            //       ? styles.userBubble
            //       : styles.systemBubble,
            //   ]}
            // >
            //   <Text
            //     style={[
            //       styles.bubbleText,
            //       item.type === 'user' && { color: '#fff' },
            //     ]}
            //   >
            //     {item.text}
            //   </Text>

            //   {item.type === 'user' && (
            //     <TouchableOpacity
            //       onPress={() => handleEdit(index, item.text)}
            //       style={styles.editIcon}
            //     >
            //       <Image source={require("../../assets/icons/pencil-blue.png")} style={{width:16, height:16}}/>
            //       {/* <Ionicons name="pencil" size={14} color="#fff" /> */}
            //     </TouchableOpacity>
            //   )}
            // </View>
            <View
              style={[
                styles.bubble,
                item.type === 'user'
                  ? styles.userBubble
                  : styles.systemBubble,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  item.type === 'user' && { color: '#fff' },
                ]}
              >
                {item.text}
              </Text>

              {item.type === 'user' && (
                <TouchableOpacity
                  onPress={() => handleEdit(index, item.text)}
                  style={styles.editIcon}
                >
                  <Image
                    source={require('../../assets/icons/pencil-blue.png')}
                    style={styles.pencil}
                  />
                </TouchableOpacity>
              )}
            </View>

          )}
        />

        {/* Chips */}
        {currentIndex < QUESTIONS.length && (
          <View style={styles.chipsWrapper}>
            {currentChips.map((chip, i) => (
              <TouchableOpacity
                key={i}
                style={styles.chip}
                onPress={() => handleChipPress(chip)}
              >
                <Text style={styles.chipText}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Input */}
        <View style={styles.bottomWrapper}>
          <View style={styles.chatCard}>
            {isRecordingUI ? (
              <View>
                <View style={styles.audioRow}>
                  <Text style={styles.audioTime}>
                    {formatTime(recordingTime)}
                  </Text>

                  <Image
                    source={require('../../assets/images/wave-form.png')}
                    style={{ width: 80, height: 24 }}
                  />
                </View>

                <View style={styles.divider} />

                <View style={styles.audioActions}>
                  {/* TRASH */}
                  <TouchableOpacity onPress={handleCancelVoice}>
                    <Image
                      source={require('../../assets/icons/trash-red.png')}
                      style={styles.chatIcon}
                    />
                  </TouchableOpacity>

                  {/* ACTIVE ARROW */}
                  <TouchableOpacity
                    onPress={
                      recording
                        ? handleStopRecording   // ⏹ stop recording
                        : handleSendVoice       // 📤 send transcription
                    }
                  >
                    <Image
                      source={require('../../assets/icons/arrow-circle-up-active.png')}
                      style={styles.chatIcon}
                    />
                  </TouchableOpacity>
                </View>

              </View>
            ) : (
              <>
                <TextInput
                  placeholder="Type here..."
                  value={input}
                  onChangeText={setInput}
                  multiline
                  style={styles.chatInput}
                  placeholderTextColor="#9CA3AF"
                />

                <View style={styles.divider} />

                <View style={styles.chatActions}>
                  <TouchableOpacity onPress={handleMicPress}>
                    <Image
                      source={require('../../assets/icons/circle-microphone.png')}
                      style={styles.chatIcon}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => input.trim() && addUserMessage(input)}
                    disabled={!input.trim()}
                  >
                    <Image
                      source={
                        !input.trim()
                          ? require('../../assets/icons/arrow-circle-up.png')
                          : require('../../assets/icons/arrow-circle-up-active.png')
                      }
                      style={styles.chatIcon}
                    />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

      </ImageBackground>
    </View>
  );
};

export default FewQuickDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  bubble: {
    maxWidth: screenWidth - 32 - 38,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    marginBottom: 16,
    position: 'relative',
  },
  systemBubble: {
    borderBottomLeftRadius: 4,
    backgroundColor: '#fff',
    width: screenWidth - 32 - 38,
    alignSelf: 'flex-start',
  },
  userBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
    alignSelf: 'flex-end',
  },
  bubbleText: {
    fontSize: 14 * scale,
    fontFamily: Fonts.Regular,
    lineHeight: 20 * scale,
    color: '#000',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  editIcon: {
    position: 'absolute',
    top: '50%',
    left: -20

  },

  pencil: {
    width: 16,
    height: 16,
    tintColor: '#235DFF',
    // tintColor:'white'
  },

  chipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    columnGap: 8,
    paddingBottom: 8,
  },
  chip: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  chipText: {
    fontSize: 14 * scale,
    lineHeight: 22 * scale,
    fontFamily: Fonts.Regular,
    color: '#2A2A2A',
  },

  bottomWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 40 * scale,
    // backgroundColor: '#fff',
  },

  chatCard: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    backgroundColor: '#fff',
  },

  chatInput: {
    maxHeight: 168,
    fontSize: 18,
    lineHeight: 28,
    fontFamily: Fonts.Regular,
    color: '#111827',
    textAlignVertical: 'top',
    margin: 0,
  },

  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 12,
  },

  chatActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  audioActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatIcon: {
    width: 28,
    height: 28,
    marginLeft: 12,
  },

  audioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  audioTime: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
  },

});
