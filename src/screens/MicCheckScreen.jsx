// import React, { useRef, useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     Pressable,
//     Platform,
//     Animated,
// } from "react-native";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import SuccessModal from "../components/SuccessModal";
// import { Fonts } from "../constants/fonts";

// export default function MicCheckScreen({ navigation, route }) {
//     const { roomName, interviewId, cid } = route.params;
//     const [status, setStatus] = useState("idle");
//     // idle | listening | success

//     const scaleAnim = useRef(new Animated.Value(1)).current;
//     const waveLoop = useRef(null);

//     /* Start mic listening animation */
//     const startWave = () => {
//         console.log("🎤 Mic listening started");

//         waveLoop.current = Animated.loop(
//             Animated.sequence([
//                 Animated.timing(scaleAnim, {
//                     toValue: 1.15,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//                 Animated.timing(scaleAnim, {
//                     toValue: 1,
//                     duration: 300,
//                     useNativeDriver: true,
//                 }),
//             ])
//         );

//         waveLoop.current.start();
//     };

//     /* Stop mic animation and reset state */
//     const stopWave = () => {
//         console.log("🛑 Mic listening stopped");
//         waveLoop.current?.stop();
//         scaleAnim.setValue(1);
//     };

//     /* Handle mic permission and listening flow */
//     const handleMicPress = async () => {
//         if (status !== "idle") return;

//         console.log("🔘 Mic button pressed");
//         setStatus("listening");

//         const result = await request(
//             Platform.OS === "ios"
//                 ? PERMISSIONS.IOS.MICROPHONE
//                 : PERMISSIONS.ANDROID.RECORD_AUDIO
//         );

//         if (result === RESULTS.GRANTED) {
//             console.log("✅ Mic permission granted");
//             startWave();

//             // simulate speaking window
//             setTimeout(() => {
//                 stopWave();
//                 console.log("🎉 Voice detected → mic success");
//                 setStatus("success");
//             }, 1800);
//         } else {
//             console.log("❌ Mic permission denied");
//             setStatus("idle");
//         }
//     };

//     return (
//         <View style={styles.container}>

//             {/* Header
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>Mic Check</Text>
//             </View> */}

//             {/* Center content */}
//             <View style={styles.center}>
//                 {status !== "success" && (
//                     <Animated.Image
//                         source={require("../assets/images/mic_check1.png")}
//                         style={[
//                             styles.waveImage,
//                             { transform: [{ scale: scaleAnim }] },
//                         ]}
//                         resizeMode="contain"
//                     />
//                 )}

//                 {status === "success" && (
//                     <SuccessModal visible={status === "success"}>
//                         <Text style={styles.successText}>
//                             Microphone check successfully
//                         </Text>
//                     </SuccessModal>
//                 )}
//             </View>

//             {/* Bottom action button */}
//             <View style={styles.bottom}>
//                 {status !== "success" ? (
//                     <Pressable style={styles.circleBtn} onPress={handleMicPress}>
//                         <Image
//                             source={require("../assets/images/mic_check2.png")}
//                             style={styles.icon48}
//                             resizeMode="contain"
//                         />
//                     </Pressable>
//                 ) : (
//                     <Pressable
//                         style={styles.circleBtn}
//                         onPress={() =>
//                             navigation.navigate("CameraCheckScreen", {
//                                 roomName,
//                                 interviewId,
//                                 cid,
//                             })
//                         }
//                     >
//                         <Image
//                             source={require("../assets/images/Next_arrow.png")}
//                             style={styles.icon48}
//                             resizeMode="contain"
//                         />
//                     </Pressable>
//                 )}
//             </View>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#FFFFFF",
//     },

//     /* HEADER */
//     header: {
//         height: 56,
//         alignItems: "center",
//         justifyContent: "center",
//         borderBottomWidth: 1,
//         borderBottomColor: "#EEE",
//     },
//     headerText: {
//         fontSize: 16,
//         fontWeight: "600",
//         color: "#000",
//     },

//     /* CENTER */
//     center: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     waveImage: {
//         width: 250,
//         height: 48,
//     },
//     successImage: {
//         width: 260,
//         height: 200,
//     },

//     /* BOTTOM */
//     bottom: {
//         paddingBottom: 32,
//         alignItems: "center",
//     },
//     circleBtn: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         backgroundColor: "#1E6CFF",
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     icon48: {
//         width: 48,
//         height: 48,
//     },
//     successText: {
//         fontSize: 16,
//         fontFamily: Fonts.Medium,
//         color: "#333",
//         textAlign: "center",
//         marginTop: 8,
//     },

// });




import React, { useCallback, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Platform,
    Animated,
    Dimensions,
    ImageBackground,
    StatusBar,
} from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Fonts } from "../constants/fonts";
import SuccessModal from "../components/SuccessModal";
import Gradient from "../constants/Gradient";
import Header from "../components/Header";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function MicCheckScreen({ navigation, route }) {
    const { roomName, interviewId, cid } = route.params;

    const [status, setStatus] = useState("idle");
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const waveLoop = useRef(null);

    const startWave = () => {
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
        waveLoop.current?.stop();
        scaleAnim.setValue(1);
    };

    const handleMicPress = async () => {
        if (status !== "idle") return;
        setStatus("listening");
        const result = await request(
            Platform.OS === "ios"
                ? PERMISSIONS.IOS.MICROPHONE
                : PERMISSIONS.ANDROID.RECORD_AUDIO
        );
        if (result === RESULTS.GRANTED) {
            startWave();
            setTimeout(() => {
                stopWave();
                setStatus("success");
            }, 1800);
        } else {
            setStatus("idle");
        }
    };

    useFocusEffect(
            useCallback(() => {
                StatusBar.setBarStyle('dark-content');
                StatusBar.setBackgroundColor('transparent');
                StatusBar.setTranslucent(true);
            }, []),
        );
    

    return (
        <Gradient>
            {/* 1. HEADER - stays at the top */}
            <Header title="Mic check" />

            {/* 2. CENTER CONTENT - Mathematically centered on the whole screen */}
            <View style={styles.screenCenterWrapper} pointerEvents="box-none">
                <View style={styles.centerContent}>
                    <Text style={styles.title}>
                        Check your mic before you start
                    </Text>

                    <Text style={styles.subtitle}>
                        Tap the mic below and speak to test your audio
                    </Text>

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
                        <SuccessModal visible>
                            <Text style={styles.successText}>
                                Microphone check successful
                            </Text>
                        </SuccessModal>
                    )}
                </View>
            </View>

            {/* 3. BOTTOM BUTTON - stays at the bottom */}
            <View style={styles.bottom}>
                <Pressable
                    onPress={
                        status === "success"
                            ? () =>
                                navigation.navigate("CameraCheckScreen", {
                                    roomName,
                                    interviewId,
                                    cid,
                                })
                            : handleMicPress
                    }
                >
                    <View style={styles.glowWrapper}>
                        <Image
                            source={require("../assets/images/Micscreen_button.png")}
                            style={styles.glowImage}
                        />

                        <ImageBackground
                            source={require("../assets/images/Micscreen_button.png")}
                            style={styles.gradientCircle}
                            imageStyle={{ borderRadius: 60 }}
                        >
                            <Image
                                source={
                                    status === "success"
                                        ? require("../assets/images/Next_arrow.png")
                                        : require("../assets/images/micnew.png")
                                }
                                style={styles.icon}
                            />
                        </ImageBackground>
                    </View>
                </Pressable>
            </View>
        </Gradient>
    );
}

const styles = StyleSheet.create({
    // This wrapper ensures the content is in the exact center of the screen height
    screenCenterWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },

    centerContent: {
        alignItems: "center",
        paddingHorizontal: 24,
        width: "100%",
        // Optional: add a tiny marginTop if the header feels too close
        marginTop: 20, 
    },

    title: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        color: "#000",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        color: "#000",
        textAlign: "center",
        marginBottom: 28,
        lineHeight: 20,
    },

    waveImage: {
        width: Math.min(width * 0.7, 260),
        height: 56,
    },

    bottom: {
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    glowWrapper: {
        width: 160,
        height: 160,
        alignItems: "center",
        justifyContent: "center",
    },

    glowImage: {
        position: "absolute",
        width: 160,
        height: 160,
        opacity: 0.45,
        transform: [{ scale: 1.1 }],
    },

    gradientCircle: {
        width: 120,
        height: 120,
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
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