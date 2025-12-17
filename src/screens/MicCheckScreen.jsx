import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

export default function MicCheckScreen({ navigation }) {
    const [success, setSuccess] = useState(false);
    const [listening, setListening] = useState(false);

    const checkMic = async () => {
        setListening(true);

        const result = await request(
            Platform.OS === "ios"
                ? PERMISSIONS.IOS.MICROPHONE
                : PERMISSIONS.ANDROID.RECORD_AUDIO
        );

        if (result === RESULTS.GRANTED) {
            setTimeout(() => {
                setListening(false);
                setSuccess(true);
            }, 1500); // simulate speaking
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mic Check</Text>

            {/* 🔊 Wave */}
            {!success && (
                <View style={styles.waveBox}>
                    <Text style={styles.waveText}>
                        {listening ? "🎧 Listening..." : "Speak something"}
                    </Text>
                </View>
            )}

            {/* ✅ Success */}
            {success && (
                <View style={styles.successBox}>
                    <Text style={styles.check}>✓</Text>
                    <Text>Microphone Check Successful</Text>
                </View>
            )}

            {/* 🔵 MIC BUTTON */}
            {!success && (
                <Pressable style={styles.circleBtn} onPress={checkMic}>
                    <Text style={styles.icon}>🎤</Text>
                </Pressable>
            )}

            {/* ➡ NEXT */}
            {success && (
                <Pressable
                    style={styles.circleBtn}
                    onPress={() => navigation.navigate("CameraCheckScreen")}
                >
                    <Text style={styles.icon}>›</Text>
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
        paddingTop: 70,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
    },
    waveBox: {
        marginTop: 120,
        width: 260,
        height: 60,
        borderWidth: 1,
        borderColor: "#1E6CFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    waveText: {
        color: "#1E6CFF",
    },
    successBox: {
        marginTop: 120,
        padding: 24,
        borderRadius: 12,
        backgroundColor: "#F4FFF8",
        alignItems: "center",
    },
    check: {
        fontSize: 28,
        color: "#1BB55C",
    },

    /* 🔵 80x80 BUTTON */
    circleBtn: {
        marginTop: 40,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#1E6CFF",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 48, // 👈 icon size
        color: "#FFF",
    },
});
