
// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// // REQUIRED polyfill
// import "react-native-get-random-values";

// import {
//     LiveKitRoom,
//     useTracks,
//     VideoTrack,
//     isTrackReference,
//     AudioSession,
// } from "@livekit/react-native";

// import { Track } from "livekit-client";

// // CHANGE THIS TO YOUR PC IP
// const API_BASE = "http://192.168.0.8:5000";
// const LIVEKIT_URL = "wss://teststream-lepxfkhc.livekit.cloud";

// export default function LiveRoomScreen() {
//     const [token, setToken] = useState(null);
//     const [error, setError] = useState(null);

//     const roomName = "demo-room";
//     const identity = `mobile-${Date.now()}`;

//     // 🔊 Start audio session (REQUIRED)
//     useEffect(() => {
//         AudioSession.startAudioSession();
//         return () => {
//             AudioSession.stopAudioSession();
//         };
//     }, []);

//     // 🔑 Fetch token from backend
//     useEffect(() => {
//         let mounted = true;

//         const fetchToken = async () => {
//             try {
//                 console.log("🔑 Fetching LiveKit token...");

//                 const res = await fetch(`${API_BASE}/api/livekit/token`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ roomName, identity }),
//                 });

//                 const data = await res.json();

//                 if (!data.ok) {
//                     throw new Error(data.error || "Token API failed");
//                 }

//                 if (mounted) {
//                     setToken(data.token);
//                 }
//             } catch (err) {
//                 console.error("❌ Token fetch error:", err);
//                 setError(err.message);
//             }
//         };

//         fetchToken();
//         return () => {
//             mounted = false;
//         };
//     }, []);

//     // ❌ Error UI
//     if (error) {
//         return <CenterText text={`Error: ${error}`} />;
//     }

//     // ⏳ Loading UI
//     if (!token) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#ffffff" />
//                 <Text style={styles.text}>Connecting to LiveKit…</Text>
//             </View>
//         );
//     }

//     // ✅ LiveKit Room
//     return (
//         <LiveKitRoom
//             serverUrl={LIVEKIT_URL}
//             token={token}
//             connect={true}
//             audio={true}
//             video={true}
//             options={{
//                 adaptiveStream: { pixelDensity: "screen" },
//             }}
//             style={{ flex: 1 }}
//             onConnected={() => console.log("✅ LiveKit connected")}
//             onDisconnected={() => console.log("❌ LiveKit disconnected")}
//         >
//             <RoomView />
//         </LiveKitRoom>
//     );
// }

// // =========================
// // ROOM VIEW (VIDEO GRID)
// // =========================
// function RoomView() {
//     // Get all camera tracks (local + remote)
//     const tracks = useTracks([Track.Source.Camera]);

//     return (
//         <View style={styles.container}>
//             {tracks.map((track) =>
//                 isTrackReference(track) ? (
//                     <VideoTrack
//                         key={track.publication.trackSid}
//                         trackRef={track}
//                         style={styles.video}
//                     />
//                 ) : (
//                     <View key={track.sid} style={styles.video} />
//                 )
//             )}
//         </View>
//     );
// }

// // =========================
// // CENTER TEXT
// // =========================
// function CenterText({ text }) {
//     return (
//         <View style={styles.center}>
//             <Text style={styles.text}>{text}</Text>
//         </View>
//     );
// }

// // =========================
// // STYLES
// // =========================
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "black",
//     },
//     video: {
//         flex: 1,
//         backgroundColor: "black",
//     },
//     center: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "black",
//     },
//     text: {
//         marginTop: 12,
//         color: "white",
//         fontSize: 16,
//     },
// });






import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import "react-native-get-random-values";

import {
    LiveKitRoom,
    useTracks,
    VideoTrack,
    isTrackReference,
    AudioSession,
} from "@livekit/react-native";

import { Track } from "livekit-client";

import QuestionOverlay from "../components/Livekit/QuestionOverlay";
import { LIVEKIT_URL } from "../config/api";
import { fetchLiveKitToken } from "../services/livekit";

const QUESTIONS = [
    { title: "Question 1", text: "How would you approach generating new sales leads?" },
    { title: "Question 2", text: "Explain your design process from start to finish." },
    { title: "Question 3", text: "How do you manage tight deadlines?" },
    { title: "Question 4", text: "Describe a challenging project you handled." },
    { title: "Question 5", text: "Can you walk us through your design process from start to finish?" },
];

export default function LiveRoomScreen() {
    const [token, setToken] = useState(null);
    const [index, setIndex] = useState(0);
    const [videoReady, setVideoReady] = useState(false); // 🔑 KEY STATE

    useEffect(() => {
        AudioSession.startAudioSession();
        return () => AudioSession.stopAudioSession();
    }, []);

    useEffect(() => {
        fetchLiveKitToken({
            roomName: "demo-room",
            identity: `mobile-${Date.now()}`,
        }).then(setToken);
    }, []);

    const handleNext = () => {
        if (index < QUESTIONS.length - 1) {
            setIndex((i) => i + 1);
        } else {
            console.log("📤 Interview submitted");
            // 👉 API submit later
        }
    };

    if (!token) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.root}>
            {/* 🎥 LiveKit Video */}
            <LiveKitRoom
                serverUrl={LIVEKIT_URL}
                token={token}
                connect
                audio
                video
                style={StyleSheet.absoluteFill}
                onConnected={() => {
                    console.log("✅ LiveKit connected");
                }}
            >
                <CameraView onVideoReady={() => setVideoReady(true)} />
            </LiveKitRoom>

            {/* 🧠 SHOW QUESTIONS ONLY AFTER VIDEO */}
            {videoReady && (
                <QuestionOverlay
                    title={QUESTIONS[index].title}
                    question={QUESTIONS[index].text}
                    isLast={index === QUESTIONS.length - 1}
                    onNext={handleNext}
                />
            )}
        </View>
    );
}

// =========================
// CAMERA VIEW
// =========================
function CameraView({ onVideoReady }) {
    const tracks = useTracks([Track.Source.Camera]);

    useEffect(() => {
        if (tracks.length > 0) {
            console.log("📷 Camera track ready");
            onVideoReady();
        }
    }, [tracks]);

    return (
        <View style={StyleSheet.absoluteFill}>
            {tracks.map(
                (t) =>
                    isTrackReference(t) && (
                        <VideoTrack
                            key={t.publication.trackSid}
                            trackRef={t}
                            style={StyleSheet.absoluteFill}
                            resizeMode="cover"
                        />
                    )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "black",
    },
    center: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
});

