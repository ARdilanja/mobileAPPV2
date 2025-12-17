// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

// export default function MicCheckScreen({ navigation }) {
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         checkMic();
//     }, []);

//     const checkMic = async () => {
//         const result = await request(
//             Platform.OS === "ios"
//                 ? PERMISSIONS.IOS.MICROPHONE
//                 : PERMISSIONS.ANDROID.RECORD_AUDIO
//         );

//         if (result === RESULTS.GRANTED) {
//             setTimeout(() => setSuccess(true), 800);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Mic Check</Text>

//             {!success ? (
//                 <View style={styles.box}>
//                     <Text>🎤 Checking microphone…</Text>
//                 </View>
//             ) : (
//                 <View style={styles.success}>
//                     <Text style={styles.check}>✓</Text>
//                     <Text>Microphone Check Successful</Text>
//                 </View>
//             )}

//             {success && (
//                 <Pressable
//                     style={styles.nextBtn}
//                     onPress={() => navigation.navigate("CameraCheckScreen")}
//                 >
//                     <Text style={styles.arrow}>›</Text>
//                 </Pressable>
//             )}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, alignItems: "center", paddingTop: 80 },
//     title: { fontSize: 16, fontWeight: "600" },
//     box: {
//         marginTop: 100,
//         width: 260,
//         height: 80,
//         borderWidth: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     success: {
//         marginTop: 100,
//         padding: 24,
//         borderRadius: 12,
//         backgroundColor: "#F4FFF8",
//         alignItems: "center",
//     },
//     check: { fontSize: 28, color: "#1BB55C" },
//     nextBtn: {
//         marginTop: 40,
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         backgroundColor: "#1E6CFF",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     arrow: { color: "#FFF", fontSize: 28 },
// });




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

export default function MicCheckScreen({ navigation }) {
    const [status, setStatus] = useState("idle");
    // idle | listening | success

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const waveLoop = useRef(null);

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

    const stopWave = () => {
        console.log("🛑 Mic listening stopped");
        waveLoop.current?.stop();
        scaleAnim.setValue(1);
    };

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

            // ⏱ simulate speaking window
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
            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Mic Check</Text>
            </View>

            {/* CENTER */}
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

            {/* BOTTOM BUTTON */}
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
                        onPress={() => navigation.navigate("CameraCheckScreen")}
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
