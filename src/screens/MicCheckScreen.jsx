import React, { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Platform,
    Animated,
} from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import SuccessModal from "../components/SuccessModal";
import { Fonts } from "../constants/fonts";

export default function MicCheckScreen({ navigation, route }) {
    const { roomName, interviewId, cid } = route.params;
    const [status, setStatus] = useState("idle");
    // idle | listening | success

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const waveLoop = useRef(null);

    /* Start mic listening animation */
    const startWave = () => {
        console.log("🎤 Mic listening started");

        waveLoop.current = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.15,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        );

        waveLoop.current.start();
    };

    /* Stop mic animation and reset state */
    const stopWave = () => {
        console.log("🛑 Mic listening stopped");
        waveLoop.current?.stop();
        scaleAnim.setValue(1);
    };

    /* Handle mic permission and listening flow */
    const handleMicPress = async () => {
        if (status !== "idle") return;

        console.log("🔘 Mic button pressed");
        setStatus("listening");

        const result = await request(
            Platform.OS === "ios"
                ? PERMISSIONS.IOS.MICROPHONE
                : PERMISSIONS.ANDROID.RECORD_AUDIO
        );

        if (result === RESULTS.GRANTED) {
            console.log("✅ Mic permission granted");
            startWave();

            // simulate speaking window
            setTimeout(() => {
                stopWave();
                console.log("🎉 Voice detected → mic success");
                setStatus("success");
            }, 1800);
        } else {
            console.log("❌ Mic permission denied");
            setStatus("idle");
        }
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Mic Check</Text>
            </View>

            {/* Center content */}
            <View style={styles.center}>
                {status !== "success" && (
                    <Animated.Image
                        source={require("../assets/images/mic_check1.png")}
                        style={[
                            styles.waveImage,
                            { transform: [{ scale: scaleAnim }] },
                        ]}
                        resizeMode="contain"
                    />
                )}

                {status === "success" && (
                    <SuccessModal visible={status === "success"}>
                        <Text style={styles.successText}>
                            Microphone check successfully
                        </Text>
                    </SuccessModal>
                )}
            </View>

            {/* Bottom action button */}
            <View style={styles.bottom}>
                {status !== "success" ? (
                    <Pressable style={styles.circleBtn} onPress={handleMicPress}>
                        <Image
                            source={require("../assets/images/mic_check2.png")}
                            style={styles.icon48}
                            resizeMode="contain"
                        />
                    </Pressable>
                ) : (
                    <Pressable
                        style={styles.circleBtn}
                        onPress={() =>
                            navigation.navigate("CameraCheckScreen", {
                                roomName,
                                interviewId,
                                cid,
                            })
                        }
                    >
                        <Image
                            source={require("../assets/images/Next_arrow.png")}
                            style={styles.icon48}
                            resizeMode="contain"
                        />
                    </Pressable>
                )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    /* HEADER */
    header: {
        height: 56,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    headerText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },

    /* CENTER */
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    waveImage: {
        width: 250,
        height: 48,
    },
    successImage: {
        width: 260,
        height: 200,
    },

    /* BOTTOM */
    bottom: {
        paddingBottom: 32,
        alignItems: "center",
    },
    circleBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#1E6CFF",
        alignItems: "center",
        justifyContent: "center",
    },
    icon48: {
        width: 48,
        height: 48,
    },
    successText: {
        fontSize: 16,
        fontFamily: Fonts.Medium,
        color: "#333",
        textAlign: "center",
        marginTop: 8,
    },

});
