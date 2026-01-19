import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../redux/slices/onboardingSlice';
import { Fonts } from '../../constants/fonts';
const { width } = Dimensions.get('window');
const scale = width / 390;

const ROLES = [
    'React native developer',
    'Full stack developer',
    'UI Developer',
    'UI Designer',
    'Java developer',
];

export default function StepZeroOneRole() {
    const dispatch = useDispatch();
    const role = useSelector(state => state.onboarding.role);
    const [extraText, setExtraText] = useState(''); // ✅ FIX
    const [recording, setRecording] = useState(false); // ✅ REQUIRED
    const hasCustomInput = false;
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
    return (
        <View style={styles.container}>
            <Text style={styles.title}>What role do you currently work in?</Text>

            {role !== '' && (
                <View style={styles.selectedPill}>
                    <Text style={styles.selectedText}>{role}</Text>
                </View>
            )}

            
             <View style={styles.bottomContainer}>
                <View style={styles.options}>
                {ROLES.map(item => (
                    <Pressable
                        key={item}
                        onPress={() => dispatch(setRole(item))}
                        style={[
                            styles.option,
                            role === item && styles.optionActive,
                        ]}
                    >
                        <Text style={styles.optionText}>{item}</Text>
                    </Pressable>
                ))}
            </View>
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
            </View></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
  flex: 1,
},
bottomContainer: {
  position: 'absolute',
  bottom: 10,
  left: 0,  
  right: 0,
  alignItems: 'center',
},

    title: {
        fontSize: 32 * scale,
        marginBottom: 10 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 48,
    },
    selectedPill: {
        alignSelf: 'flex-start',
        backgroundColor: '#2563EB',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 16,
        marginBottom: 16,
    },
    selectedText: {
        color: '#fff',
        fontFamily: Fonts.Medium,
    },
    options: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    option: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor:'#fff',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    optionActive: {
        borderColor: '#2563EB',
    },
    optionText: {
        fontSize: 14,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56 * scale,
        width: 358 * scale,
        backgroundColor: '#FFF',
        borderRadius: 28,
        paddingHorizontal: 16,
        marginTop:16
        
    },
    fixedInput: {
        // position: 'absolute',
        // bottom: 10,
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
