import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    StatusBar,
    Image,
    TextInput,
} from 'react-native';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function EmojiScreen({ onComplete }) {
    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent(true);
        }, []),
    );
    const [selected, setSelected] = useState(null);
    const handleSend = () => {
        onComplete(); // navigate to Edit / Chat screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Complete these actions to unlock more actions
            </Text>

            <View style={styles.card}>
                <View style={styles.tag}>
                    <Text style={styles.tagText}>Action 1</Text>
                </View>

                <Text style={styles.desc}>
                    Note your idea and speak it out in 2–3 simple sentences.
                </Text>

                <Text style={styles.question}>How did it go?</Text>

                <View style={styles.emojiRow}>
                    <Emoji
                        emoji="🙂"
                        line1="It didn’t"
                        line2="went well"
                        active={selected === 'bad'}
                        onPress={() => setSelected('bad')}
                    />
                    <Emoji
                        emoji="😍"
                        line1="Went"
                        line2="well"
                        active={selected === 'good'}
                        onPress={() => setSelected('good')}
                    />
                </View>

                {/* Input row */}
                <View style={styles.inputRow}>
                    <TextInput
                        placeholder="Tell us a bit more"
                        placeholderTextColor="#8A8A8A"
                        style={styles.input}
                    />

                    <Pressable>
                        <Image
                            source={require('../../assets/icons/circle-microphone.png')}
                            style={styles.icon}
                        />
                    </Pressable>

                    <Pressable disabled={!selected} onPress={handleSend}>
                        <Image
                            source={require('../../assets/icons/arrow-circle-up.png')}
                            style={[
                                styles.icon,
                                !selected && { opacity: 0.4 },
                                selected && { tintColor: '#235DFF' },
                            ]}
                        />
                    </Pressable>
                </View>
            </View>
            <ProgressDots activeIndex={selected ? 0 : null} />
        </View>
    );
}
function Emoji({ emoji, line1, line2, active, onPress }) {
    return (
        <Pressable onPress={onPress} style={styles.emojiWrap}>
            <View style={[styles.circle, active && styles.active]}>
                <Text style={styles.emoji}>{emoji}</Text>

                {active && (
                    <View style={styles.tick}>
                        <Image
                            source={require('../../assets/icons/emoji_tick.png')}
                            style={styles.tickImg}
                        />
                    </View>
                )}
            </View>

            <View style={styles.labelBox}>
                <Text style={[styles.label, active && styles.activeText]}>{line1}</Text>
                <Text style={[styles.label, active && styles.activeText]}>{line2}</Text>
            </View>
        </Pressable>
    );
}

function ProgressDots({ activeIndex }) {
    return (
        <View style={styles.dotsWrapper}>
            {[0, 1].map(i => (
                <View
                    key={i}
                    style={[styles.dot, activeIndex === i && styles.activeDot]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * scale,
        paddingTop: 88 * scale,
    },

    title: {
        fontFamily: Fonts.Medium,
        fontSize: 24 * scale,
        lineHeight: 32 * scale,
        marginBottom: 24 * scale,
        // paddingRight: 30 * scale,
        width: width - 16 * scale
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16 * scale,
        padding: 16 * scale,
        marginTop: 88 * scale,
        marginHorizontal: 17 * scale,
    },

    tag: {
        backgroundColor: '#E6DDFF',
        paddingHorizontal: 10 * scale,
        paddingVertical: 4 * scale,
        borderRadius: 6 * scale,
        alignSelf: 'flex-start',
        marginBottom: 16 * scale,
    },

    tagText: {
        fontFamily: Fonts.Regular,
        fontSize: 14 * scale,
        color: '#2A2A2A',
    },

    desc: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,
        marginBottom: 20 * scale,
    },

    question: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,
        marginBottom: 16 * scale,
    },

    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20 * scale,
    },

    emojiWrap: {
        alignItems: 'center',
        width: '45%',
    },

    circle: {
        width: 48 * scale,
        height: 48 * scale,
        borderRadius: 24 * scale,
        backgroundColor: '#F2F2F2',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },

    active: {
        borderColor: '#235DFF',
    },

    emoji: {
        fontSize: 28 * scale,
    },

    labelBox: {
        marginTop: 8 * scale,
    },

    label: {
        fontSize: 14 * scale,
        color: '#777',
        textAlign: 'center',
    },

    activeText: {
        color: '#235DFF',
    },

    /* Input row */
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 10 * scale,
        paddingHorizontal: 12 * scale,
        height: 44 * scale,
        marginBottom: 36 * scale,
    },

    input: {
        flex: 1,
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,
    },

    icon: {
        width: 20 * scale,
        height: 20 * scale,
        marginLeft: 10 * scale,
    },
    tick: {
        position: 'absolute',
        top: -1 * scale,
        right: -5 * scale,
        width: 20 * scale,
        height: 20 * scale,
        borderRadius: 9 * scale,
        // backgroundColor: '#235DFF',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 2,
        // borderColor: '#fff',
    },
    tickImg: {
        width: 15 * scale,
        height: 15 * scale,
    },

    dotsWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24 * scale,
        gap: 8 * scale,
    },

    dot: {
        width: 12 * scale,
        height: 12 * scale,
        borderRadius: 6 * scale,
        backgroundColor: '#D5CAFF',
    },

    activeDot: {
        width: 12 * scale,
        height: 12 * scale,
        borderRadius: 6 * scale,
        backgroundColor: '#4A2AC9',
    },
});
