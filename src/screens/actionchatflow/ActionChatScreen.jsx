import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Pressable,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import { Fonts } from '../../constants/fonts';
import Header from '../../components/Header';
import AudioRecord from 'react-native-audio-record';
import Sound from 'react-native-sound';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const scale = width / 390;

const STEPS = [
    {
        bot: 'How did it go?',
    },
    {
        bot: `Thanks for letting me know about the action.
Can you share a bit about why this action didn’t go as expected?`,
    },
    {
        bot: 'Got it, thank you for sharing that. That makes sense.',
    },
    {
        bot: 'Based on what you told me, we can try this action again to make it easier.',
    },
    {
        bot: 'Would you like to redo this module now, or shall I schedule it for tomorrow so you have a fresh start?',
        chips: true,
    },
];


export default function ChatScreen({ onBack }) {
    const [messages, setMessages] = useState([
        { id: 1, from: 'bot', type: 'text', text: STEPS[0].bot },
    ]);

    const navigation = useNavigation();
    const [text, setText] = useState('');
    const [recording, setRecording] = useState(false);
    const startTimeRef = useRef(null);

    const [step, setStep] = useState(0);
    const [showChips, setShowChips] = useState(false);
    const [action, setAction] = useState(null);
    const scrollRef = useRef(null);

    /* ---------------- MIC PERMISSION ---------------- */
    const requestMicPermission = async () => {
        if (Platform.OS !== 'android') return true;

        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
    };

    /* ---------------- NEXT QUESTION ---------------- */
    const goNext = () => {
        const nextStep = step + 1;

        if (!STEPS[nextStep]) return;

        setTimeout(() => {
            setMessages(p => [
                ...p,
                {
                    id: Date.now(),
                    from: 'bot',
                    type: 'text',
                    text: STEPS[nextStep].bot,
                },
            ]);

            setStep(nextStep);

            if (STEPS[nextStep].chips) {
                setShowChips(true);
            }
        }, 400);
    };


    /* ---------------- SEND TEXT ---------------- */
    const send = () => {
        if (!text.trim()) return;

        setMessages(p => [
            ...p,
            { id: Date.now(), from: 'user', type: 'text', text },
        ]);

        setText('');
        goNext();
    };

    /* ---------------- AUDIO RECORD ---------------- */
    const startRecording = async () => {
        const allowed = await requestMicPermission();
        if (!allowed) return;

        AudioRecord.init({
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            wavFile: 'voice.wav',
        });

        startTimeRef.current = Date.now();
        await AudioRecord.start();
        setRecording(true);
    };

    const stopRecording = async () => {
        const audioFile = await AudioRecord.stop();
        setRecording(false);

        const diff = Math.floor(
            (Date.now() - startTimeRef.current) / 1000,
        );

        setMessages(p => [
            ...p,
            {
                id: Date.now(),
                from: 'user',
                type: 'voice',
                duration: `0:${diff < 10 ? '0' + diff : diff}`,
                uri: audioFile,
            },
        ]);

        goNext();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <Header title=" " onBackPress={onBack}/>

            <ScrollView
                ref={scrollRef}
                contentContainerStyle={styles.body}
                keyboardShouldPersistTaps="handled"
                onContentSizeChange={() =>
                    scrollRef.current?.scrollToEnd({ animated: true })
                }
            >

                {messages.map(m => (
                    <View
                        key={m.id}
                        style={[
                            styles.msg,
                            m.from === 'user' && m.type === 'text' && styles.user,
                            m.from === 'user' && m.type === 'voice' && styles.voiceWrapper,
                            m.from === 'bot' && styles.bot,
                        ]}
                    >
                        {m.type === 'text' ? (
                            <Text
                                style={[
                                    styles.msgText,
                                    m.from === 'user' && styles.userText,
                                ]}
                            >
                                {m.text}
                            </Text>
                        ) : (
                            <VoiceMessageBubble uri={m.uri} duration={m.duration} />
                        )}

                    </View>
                ))}

                {/* -------- CHIPS -------- */}
                {showChips && !action && (
                    <View style={styles.chipRow}>
                        <Pressable
                            style={styles.chip}
                            onPress={() => setAction('now')}
                        >
                            <Text style={styles.chipText}>Try now</Text>
                        </Pressable>

                        <Pressable
                            style={styles.chip}
                            onPress={() => setAction('tomorrow')}
                        >
                            <Text style={styles.chipText}>Try tomorrow</Text>
                        </Pressable>
                    </View>
                )}

                {/* -------- CTA -------- */}
                {action === 'now' && (
                    <Pressable style={styles.primaryBtn}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.primaryText}>Start practice</Text>
                    </Pressable>
                )}

                {action === 'tomorrow' && (
                    <Pressable style={styles.primaryBtn} onPress={onBack}>
                        <Text style={styles.primaryText}>Go back</Text>
                    </Pressable>
                )}
            </ScrollView>

            {/* -------- INPUT -------- */}
            {!showChips && (
                <View style={styles.bottomWrapper}>
                    <View style={styles.chatCard}>
                        <TextInput
                            placeholder="Type here..."
                            value={text}
                            onChangeText={setText}
                            style={styles.chatInput}
                            placeholderTextColor="#9CA3AF"
                        />

                        <View style={styles.divider} />

                        <View style={styles.chatActions}>
                            <Pressable
                                onPress={recording ? stopRecording : startRecording}
                            >
                                <Image
                                    source={require('../../assets/icons/circle-microphone.png')}
                                    style={[
                                        styles.chatIcon,
                                        recording && { tintColor: '#2D6BFF' },
                                    ]}
                                />
                            </Pressable>

                            <Pressable
                                onPress={send}
                                disabled={!text.trim() || recording}
                            >
                                <Image
                                    source={
                                        text.trim()
                                            ? require('../../assets/icons/arrow-circle-up-active.png')
                                            : require('../../assets/icons/arrow-circle-up.png')
                                    }
                                    style={styles.chatIcon}
                                />
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

/* ---------------- VOICE BUBBLE ---------------- */
function VoiceMessageBubble({ uri, duration }) {
    const soundRef = useRef(null);

    const play = () => {
        if (!uri) return;

        soundRef.current = new Sound(uri, '', () => {
            soundRef.current.play(() => {
                soundRef.current.release();
            });
        });
    };

    return (
        <Pressable style={styles.voiceBubble} onPress={play}>
            <Image
                source={require('../../assets/icons/play.png')}
                style={styles.playIcon}
            />

            <Image
                source={require('../../assets/icons/voice_wave.png')}
                style={styles.waveImage}
                resizeMode="contain"
            />

            <Text style={styles.duration}>{duration}</Text>
        </Pressable>
    );
}


/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: { flex: 1 },

    body: {
        padding: 16 * scale,
        gap: 12 * scale,
    },

    msg: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        color: "#FFF"
    },
    userText: {
        color: '#FFFFFF',
    },

    user: {
        backgroundColor: '#2D6BFF',
        alignSelf: 'flex-end',
        paddingVertical: 8 * scale,
        paddingHorizontal: 12 * scale,
        gap: 10,
        borderTopLeftRadius: 16 * scale,
        borderTopRightRadius: 16 * scale,
        borderBottomLeftRadius: 16 * scale,
        borderBottomRightRadius: 4 * scale,
        maxWidth: 304 * scale,
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,

    },


    bot: {
        backgroundColor: '#FFFFFF',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 12,
        gap: 10,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 4,
        maxWidth: 304 * scale,
    },


    msgText: {
        fontSize: 14 * scale,
        lineHeight: 20 * scale,
        fontFamily: Fonts.Regular,
        color: '#000',
    },

    voiceWrapper: {
        alignSelf: 'flex-end',
        backgroundColor: 'transparent',
    },

    voiceBubble: {
        width: 232 * scale,
        height: 36 * scale,
        paddingVertical: 8,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#2D6BFF',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 16,
    },



    playIcon: {
        width: 16,
        height: 16,
        tintColor: '#fff',
    },


    duration: {
        fontSize: 12,
        color: '#fff',
        fontFamily: Fonts.Regular,
    },

    bottomWrapper: {
        padding: 16,
    },

    chatCard: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#fff',
    },

    chatInput: {
        height: 44,
        fontSize: 16 * scale,
        fontFamily: Fonts.Regular,
    },

    divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginVertical: 12,
    },

    chatActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    chatIcon: {
        width: 24,
        height: 24,
        marginLeft: 12,
    },

    chipRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginTop: 16,
    },

    chip: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
        minWidth: 117,
        alignItems: 'center',
    },

    chipText: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,
        color: '#111827',
    },

    primaryBtn: {
        marginTop: 24,
        backgroundColor: '#2D6BFF',
        borderRadius: 28,
        paddingVertical: 14,
        alignItems: 'center',
    },

    primaryText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.Medium,
    },
    waveImage: {
        flex: 1,
        height: 12,
    },

});
