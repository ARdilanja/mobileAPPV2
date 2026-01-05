// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Pressable,
//   Image,
//   Dimensions,
//   Platform,
//   Animated,
//   StatusBar,
// } from "react-native";
// import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
// import { Fonts } from "../constants/fonts";
// import Voice from "@react-native-voice/voice"; // <-- Add this package

// const { width } = Dimensions.get("window");
// const scale = width / 390;

// export default function MicCameraCheckScreen({ route }) {
//   const { roomName } = route.params;

//   const [camStatus, setCamStatus] = useState("idle"); // idle, checking, success, error
//   const [micStatus, setMicStatus] = useState("idle"); // idle, checking, success, error

//   const micAnimRef = useRef(new Animated.Value(1)).current;

//   // Final result
//   const bothSuccess = camStatus === "success" && micStatus === "success";
//   const hasFailure = camStatus === "error" || micStatus === "error";
//   const anyCheckDone = camStatus !== "idle" || micStatus !== "idle";

//   // Auto start camera check when screen opens
//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   // Cleanup Voice on unmount
//   useEffect(() => {
//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const requestCameraPermission = async () => {
//     setCamStatus("checking");

//     const result = await request(
//       Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
//     );

//     if (result === RESULTS.GRANTED) {
//       setCamStatus("success");
//     } else {
//       setCamStatus("error");
//     }
//   };

//   const startMicCheck = async () => {
//     if (micStatus !== "idle") return;

//     setMicStatus("checking");

//     const result = await request(
//       Platform.OS === "ios"
//         ? PERMISSIONS.IOS.MICROPHONE
//         : PERMISSIONS.ANDROID.RECORD_AUDIO
//     );

//     if (result !== RESULTS.GRANTED) {
//       setMicStatus("error");
//       return;
//     }

//     // Start pulsing animation
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(micAnimRef, { toValue: 1.3, duration: 500, useNativeDriver: true }),
//         Animated.timing(micAnimRef, { toValue: 1, duration: 500, useNativeDriver: true }),
//       ])
//     ).start();

//     try {
//       await Voice.start("en-US");

//       Voice.onSpeechResults = (e) => {
//         const spokenText = e.value?.[0]?.toLowerCase() || "";
//         console.log("🗣 Spoken:", spokenText);

//         if (spokenText.length > 3) { // Any reasonable speech
//           Voice.stop();
//           setMicStatus("success");
//           micAnimRef.stopAnimation();
//         }
//       };

//       Voice.onSpeechError = (e) => {
//         console.log("Speech error:", e);
//         setMicStatus("error");
//         micAnimRef.stopAnimation();
//       };

//       // Timeout fallback
//       setTimeout(() => {
//         if (micStatus === "checking") {
//           Voice.stop();
//           setMicStatus("error");
//           micAnimRef.stopAnimation();
//         }
//       }, 10000);
//     } catch (err) {
//       console.error("Voice start error:", err);
//       setMicStatus("error");
//       micAnimRef.stopAnimation();
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       <Text style={styles.title}>
//         Now position yourself in the frame and say,{"\n"}
//         <Text style={bothSuccess ? styles.bold : styles.normal}>
//           “Hello Recroot, I’m ready.”
//         </Text>
//       </Text>

//       <View style={styles.previewCard}>
//         {/* Camera preview (no LiveKit needed - just permission + native preview) */}
//         <View style={StyleSheet.absoluteFill}>
//           {camStatus === "success" ? (
//             <View style={{ flex: 1, backgroundColor: "#000" }}>
//               {/* Native camera preview would go here if using expo-camera or react-native-vision-camera */}
//               {/* For now, show placeholder success */}
//               <View style={styles.cameraPlaceholder}>
//                 <Text style={styles.cameraText}>Camera Active ✓</Text>
//               </View>
//             </View>
//           ) : camStatus === "checking" ? (
//             <View style={styles.cameraPlaceholder}>
//               <Text style={styles.cameraText}>Requesting Camera...</Text>
//             </View>
//           ) : camStatus === "error" ? (
//             <View style={styles.cameraPlaceholder}>
//               <Text style={styles.cameraText}>Camera Denied ✗</Text>
//             </View>
//           ) : (
//             <Image
//               source={require("../assets/images/friends-interview.png")}
//               style={StyleSheet.absoluteFill}
//               resizeMode="cover"
//             />
//           )}
//         </View>

//         {/* Final Status Overlay */}
//         {anyCheckDone && (
//           <View style={styles.statusOverlay}>
//             <Image
//               source={
//                 bothSuccess
//                   ? require("../assets/images/mic-cam-check.png")
//                   : require("../assets/images/mic-cam-redcicrle.png")
//               }
//               style={styles.statusIcon}
//             />
//           </View>
//         )}

//         {/* MIC BUTTON */}
//         <Pressable style={styles.micBtn} onPress={startMicCheck} disabled={micStatus !== "idle"}>
//           <Animated.Image
//             source={require("../assets/icons/Mic_Vector.png")}
//             style={[
//               styles.icon,
//               micStatus === "checking" && { transform: [{ scale: micAnimRef }] },
//               micStatus !== "idle" && styles.disabledIcon,
//             ]}
//           />
//         </Pressable>

//         {/* CAMERA BUTTON - hidden since auto-checked */}
//         {/* You can show it if you want manual retry */}
//       </View>
//     </View>
//   );
// }

// /* Styles */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF", alignItems: "center" },
//   title: {
//     fontSize: 32 * scale,
//     fontFamily: Fonts.Regular,
//     marginTop: 24,
//     lineHeight: 48 * scale,
//     textAlign: "center",
//   },
//   normal: { fontFamily: Fonts.Regular },
//   bold: { fontFamily: Fonts.Medium },
//   previewCard: {
//     width: 358 * scale,
//     height: 552 * scale,
//     borderRadius: 16,
//     marginTop: 24,
//     overflow: "hidden",
//     backgroundColor: "#EEE",
//   },
//   cameraPlaceholder: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#222",
//   },
//   cameraText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontFamily: Fonts.Medium,
//   },
//   statusOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(255,255,255,0.35)",
//   },
//   statusIcon: { width: 120 * scale, height: 120 * scale },
//   micBtn: { position: "absolute", left: 160 * scale, bottom: 24 * scale }, // Centered
//   icon: { width: 48 * scale, height: 48 * scale },
//   disabledIcon: { opacity: 0.5 },
// });










import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  Platform,
  Animated,
  StatusBar,
} from "react-native";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import AudioRecord from "react-native-audio-record";
import {
  LiveKitRoom,
  useTracks,
  VideoTrack,
  isTrackReference,
} from "@livekit/react-native";
import { Track } from "livekit-client";
import { Buffer } from "buffer";

import { LIVEKIT_URL } from "../config/api";
import { fetchLiveKitToken } from "../services/livekit";
import { Fonts } from "../constants/fonts";
import Header from "../components/Header";

const { width } = Dimensions.get("window");
const scale = width / 390;

/* ================= AUDIO CONFIG ================= */
const audioConfig = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  audioSource: 6, // ANDROID: VOICE_RECOGNITION
};

export default function MicCameraCheckScreen({ route }) {
  const { roomName } = route.params;

  const [token, setToken] = useState(null);
  const [camStatus, setCamStatus] = useState("idle"); // idle | success | error
  const [micStatus, setMicStatus] = useState("idle"); // idle | listening | success | error
  const [showBlueSuccess, setShowBlueSuccess] = useState(false);

  const micAnim = useRef(new Animated.Value(1)).current;
  const stopAnimRef = useRef(null);

  const bothSuccess = camStatus === "success" && micStatus === "success";

  /* ================= CAMERA AUTO CHECK ================= */
  useEffect(() => {
    initCamera();
    return () => AudioRecord.stop();
  }, []);

  async function initCamera() {
    const res = await request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    );

    if (res !== RESULTS.GRANTED) {
      setCamStatus("error");
      return;
    }

    try {
      const t = await fetchLiveKitToken({
        roomName,
        identity: `cam-${Date.now()}`,
      });
      setToken(t);
      setCamStatus("success");
    } catch {
      setCamStatus("error");
    }
  }

  /* ================= MIC CHECK ================= */
  async function handleMicPress() {
    if (micStatus !== "idle" || camStatus !== "success") return;

    const res = await request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO
    );

    if (res !== RESULTS.GRANTED) {
      setMicStatus("error");
      return;
    }

    setMicStatus("listening");

    stopAnimRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(micAnim, {
          toValue: 1.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(micAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    stopAnimRef.current.start();

    AudioRecord.init(audioConfig);
    AudioRecord.start();

    let maxLevel = 0;

    const subscription = AudioRecord.on("data", (data) => {
      const buffer = Buffer.from(data, "base64");
      let sum = 0;

      for (let i = 0; i < buffer.length; i += 2) {
        sum += Math.abs(buffer.readInt16LE(i));
      }

      const level = sum / buffer.length;
      maxLevel = Math.max(maxLevel, level);

      console.log(`🎤 audio level: ${Math.round(level)} | max: ${Math.round(maxLevel)}`);
    });

    setTimeout(() => {
      AudioRecord.stop();
      subscription?.remove();
      stopAnimRef.current?.stop();
      micAnim.setValue(1);

      if (maxLevel > 250) {
        setMicStatus("success");
      } else {
        setMicStatus("error");
      }
    }, 5000);
  }

  /* ================= BOTH SUCCESS HANDLER ================= */
  useEffect(() => {
    if (!bothSuccess) return;

    // Turn off camera & LiveKit
    setTimeout(() => {
      setToken(null); // DISCONNECT CAMERA
      setShowBlueSuccess(true);
    }, 800);
  }, [bothSuccess]);

  return (
    <View style={styles.container}>
      <Header title="Video & Mic check" />
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>
        Now position yourself in the frame and say,
        <Text style={bothSuccess ? styles.bold : styles.normal}>
          “Hello Recroot, I’m ready.”
        </Text>
      </Text>
      <View style={styles.previewCard}>
        {/* CAMERA PREVIEW */}
        {token && !showBlueSuccess && (
          <LiveKitRoom
            serverUrl={LIVEKIT_URL}
            token={token}
            connect
            video
            audio={false}
            options={{ adaptiveStream: false, dynacast: false }}
            style={StyleSheet.absoluteFill}
          >
            <CameraPreview />
          </LiveKitRoom>
        )}

        {/* BLUE SUCCESS SCREEN */}
        {showBlueSuccess && (
          <View style={styles.successContainer}>
            <Image
              source={require("../assets/images/mic-cam-check.png")}
              style={styles.successImage}
            />
          </View>
        )}

        {/* MIC + CAMERA BUTTONS */}
        {!showBlueSuccess && (
          <View style={styles.bottomControls}>
            <Pressable onPress={handleMicPress}>
              <Animated.Image
                source={require("../assets/icons/Mic_Vector.png")}
                style={[
                  styles.controlIcon,
                  micStatus === "listening" && {
                    transform: [{ scale: micAnim }],
                  },
                ]}
              />
            </Pressable>

            <View style={{ width: 20 }} />

            <Image
              source={require("../assets/icons/video-camera.png")}
              style={styles.controlIcon}
            />
          </View>
        )}
      </View>

    </View>
  );
}

/* ================= CAMERA PREVIEW ================= */
function CameraPreview() {
  const tracks = useTracks([Track.Source.Camera]);
  return (
    <>
      {tracks.map(
        (t) =>
          isTrackReference(t) && (
            <VideoTrack
              key={t.publication.trackSid}
              trackRef={t}
              style={StyleSheet.absoluteFill}
              mirror
            />
          )
      )}
    </>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32 * scale,
    textAlign: "justify",
    fontFamily: Fonts.Regular,
    lineHeight: 48 * scale,
    paddingTop:16*scale,
  },
  bold: { fontFamily: Fonts.Medium },
  previewCard: {
    width: 358 * scale,
    height: 535 * scale,
    borderRadius: 16,
    marginTop: 24,
    overflow: "hidden",
    backgroundColor: "#EEE",
  },
  fullImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "center",
    width: 280,
    height: 280
  },
  micBtn: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
  },
  icon: {
    width: 48 * scale,
    height: 48 * scale,
  },
  bottomControls: {
    position: "absolute",
    bottom: 24,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  controlIcon: {
    width: 48 * scale,
    height: 48 * scale,
    tintColor: "#2563EB", // BLUE like screenshot
  },

  successContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingTop: 42 * scale
  },

  successImage: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },

});
