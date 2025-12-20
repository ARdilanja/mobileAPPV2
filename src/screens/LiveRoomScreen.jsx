

//////////////////////////////////////////////////////without the screenshare///////////////////////////////////////



// import React, { useEffect, useState, useRef } from "react";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import "react-native-get-random-values";

// import {
//     LiveKitRoom,
//     useTracks,
//     VideoTrack,
//     isTrackReference,
//     AudioSession,
// } from "@livekit/react-native";

// import { Track } from "livekit-client";

// import QuestionOverlay from "../components/Livekit/QuestionOverlay";
// import { LIVEKIT_URL } from "../config/api";
// import {
//     startEgressRecording,
//     stopEgressRecording,
// } from "../services/livekit.jsx"; 

// /* =========================
//    STATIC QUESTIONS (UNCHANGED)
// ========================= */
// const QUESTIONS = [
//     { title: "Question 1", text: "How would you approach generating new sales leads?" },
//     { title: "Question 2", text: "Explain your design process from start to finish." },
//     { title: "Question 3", text: "How do you manage tight deadlines?" },
//     { title: "Question 4", text: "Describe a challenging project you handled." },
//     { title: "Question 5", text: "Can you walk us through your design process from start to finish?" },
// ];

// export default function LiveRoomScreen({ route }) {
//     const token = route?.params?.token;
//     const roomName = route?.params?.roomName;
//     const interviewId = route?.params?.interviewId;

//     const [index, setIndex] = useState(0);
//     const [videoReady, setVideoReady] = useState(false);

//     const egressIdRef = useRef(null); // ✅ store egress id safely

//     /* =========================
//        AUDIO SESSION (UNCHANGED)
//     ========================= */
//     useEffect(() => {
//         AudioSession.startAudioSession();
//         return () => AudioSession.stopAudioSession();
//     }, []);

//     /* =========================
//        START EGRESS ON CONNECT
//     ========================= */
//     const handleConnected = async () => {
//         console.log("✅ [MOBILE] LiveKit connected");

//         if (!egressIdRef.current) {
//             try {
//                 const egressId = await startEgressRecording({
//                     roomName,
//                     interviewId,
//                 });

//                 egressIdRef.current = egressId;
//                 console.log("🎥 [MOBILE] Egress started:", egressId);
//             } catch (err) {
//                 console.error("❌ [MOBILE] Failed to start egress", err);
//             }
//         }
//     };

//     /* =========================
//        STOP EGRESS
//     ========================= */
//     const stopRecording = async () => {
//         if (egressIdRef.current) {
//             try {
//                 console.log("🛑 [MOBILE] Stopping egress:", egressIdRef.current);
//                 await stopEgressRecording(egressIdRef.current);
//                 console.log("🎉 [MOBILE] Recording saved to S3");
//                 egressIdRef.current = null;
//             } catch (err) {
//                 console.error("❌ [MOBILE] Failed to stop egress", err);
//             }
//         }
//     };

//     /* =========================
//        NEXT / SUBMIT HANDLER
//     ========================= */
//     const handleNext = async () => {
//         if (index < QUESTIONS.length - 1) {
//             setIndex((prev) => prev + 1);
//         } else {
//             console.log("📤 [MOBILE] Interview submitted");
//             await stopRecording();
//         }
//     };

//     /* =========================
//        SAFETY: STOP ON UNMOUNT
//     ========================= */
//     useEffect(() => {
//         return () => {
//             console.log("⚠️ [MOBILE] Screen unmounted → stopping egress");
//             stopRecording();
//         };
//     }, []);

//     /* =========================
//        SAFETY CHECK
//     ========================= */
//     if (!token) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#fff" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.root}>
//             {/* 🎥 LIVEKIT ROOM */}
//             <LiveKitRoom
//                 serverUrl={LIVEKIT_URL}
//                 token={token}
//                 connect
//                 audio
//                 video
//                 style={StyleSheet.absoluteFill}
//                 onConnected={handleConnected}
//                 onDisconnected={() =>
//                     console.log("❌ [MOBILE] LiveKit disconnected")
//                 }
//             >
//                 <CameraView onVideoReady={() => setVideoReady(true)} />
//             </LiveKitRoom>

//             {/* 🧠 QUESTIONS */}
//             {videoReady && (
//                 <QuestionOverlay
//                     title={QUESTIONS[index].title}
//                     question={QUESTIONS[index].text}
//                     isLast={index === QUESTIONS.length - 1}
//                     onNext={handleNext}
//                 />
//             )}
//         </View>
//     );
// }

// /* =========================
//    CAMERA VIEW (UNCHANGED)
// ========================= */
// function CameraView({ onVideoReady }) {
//     const tracks = useTracks([Track.Source.Camera]);

//     useEffect(() => {
//         if (tracks.length > 0) {
//             console.log("📷 Camera video ready");
//             onVideoReady();
//         }
//     }, [tracks]);

//     return (
//         <View style={StyleSheet.absoluteFill}>
//             {tracks.map(
//                 (track) =>
//                     isTrackReference(track) && (
//                         <VideoTrack
//                             key={track.publication.trackSid}
//                             trackRef={track}
//                             style={StyleSheet.absoluteFill}
//                             resizeMode="cover"
//                         />
//                     )
//             )}
//         </View>
//     );
// }

// /* =========================
//    STYLES (UNCHANGED)
// ========================= */
// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         backgroundColor: "black",
//     },
//     center: {
//         flex: 1,
//         backgroundColor: "black",
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });















///////////////////////////////////////////////with camera validation///////////////////////////////////////////////






import React, { useEffect, useState, useRef } from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
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
import CameraStateMonitor from "../components/Livekit/CameraStateMonitor";
import AppExitMonitor from "../components/Livekit/AppExitMonitor";


import { LIVEKIT_URL } from "../config/api";
import {
    startEgressRecording,
    stopEgressRecording,
} from "../services/livekit.jsx";

/* =========================
   QUESTIONS (UNCHANGED)
========================= */
const QUESTIONS = [
    { title: "Question 1", text: "How would you approach generating new sales leads?" },
    { title: "Question 2", text: "Explain your design process from start to finish." },
    { title: "Question 3", text: "How do you manage tight deadlines?" },
    { title: "Question 4", text: "Describe a challenging project you handled." },
    { title: "Question 5", text: "Can you walk us through your design process from start to finish?" },
];

export default function LiveRoomScreen({ route, navigation }) {
    const token = route?.params?.token;
    const roomName = route?.params?.roomName;
    const interviewId = route?.params?.interviewId;

    const [index, setIndex] = useState(0);
    const [videoReady, setVideoReady] = useState(false);

    const egressIdRef = useRef(null);
    const terminatedRef = useRef(false);

    /* =========================
       AUDIO SESSION
    ========================= */
    useEffect(() => {
        AudioSession.startAudioSession();
        return () => AudioSession.stopAudioSession();
    }, []);

    /* =========================
       START EGRESS AFTER CONNECT
    ========================= */
    const handleConnected = async () => {
        console.log("✅ [MOBILE] LiveKit connected");

        if (!egressIdRef.current) {
            try {
                const egressId = await startEgressRecording({
                    roomName,
                    interviewId,
                });
                egressIdRef.current = egressId;
                console.log("🎥 [MOBILE] Egress started:", egressId);
            } catch (err) {
                console.error("❌ [MOBILE] Failed to start egress", err);
            }
        }
    };

    /* =========================
       STOP EGRESS (SAFE)
    ========================= */
    const stopRecording = async () => {
        if (!egressIdRef.current) return;

        try {
            console.log("🛑 [MOBILE] Stopping egress:", egressIdRef.current);
            await stopEgressRecording(egressIdRef.current);
            console.log("🎉 [MOBILE] Recording saved to S3");
            egressIdRef.current = null;
        } catch (err) {
            console.error("❌ [MOBILE] Failed to stop egress", err);
        }
    };

    /* =========================
       TERMINATE INTERVIEW (SINGLE SOURCE)
    ========================= */
    const terminateInterview = async (reason) => {
        if (terminatedRef.current) return;
        terminatedRef.current = true;

        console.log("❌ [MOBILE] Interview terminated:", reason);
        await stopRecording();

        navigation.reset({
            index: 0,
            routes: [{ name: "CreateRoomScreen" }],
        });
    };

    /* =========================
       NEXT / SUBMIT
    ========================= */
    const handleNext = async () => {
        if (index < QUESTIONS.length - 1) {
            setIndex((prev) => prev + 1);
        } else {
            console.log("📤 [MOBILE] Interview submitted");
            await terminateInterview("SUBMIT");
        }
    };

    /* =========================
       SAFETY CHECK
    ========================= */
    if (!token) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    return (
        <View style={styles.root}>
            {/* 🎥 LIVEKIT ROOM */}
            <LiveKitRoom
                serverUrl={LIVEKIT_URL}
                token={token}
                connect
                audio
                video
                style={StyleSheet.absoluteFill}
                onConnected={handleConnected}
            >
                <CameraView onVideoReady={() => setVideoReady(true)} />

                {/* ✅ TERMINATE ONLY ON MANUAL CAMERA OFF */}
                <CameraStateMonitor
                    enabled={videoReady}
                    onTerminate={terminateInterview}
                />

                {/* ✅ TERMINATE ON APP EXIT / BACKGROUND */}
                <AppExitMonitor onTerminate={terminateInterview} />
            </LiveKitRoom>

            {/* 🧠 QUESTIONS */}
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

/* =========================
   CAMERA VIEW (UNCHANGED)
========================= */
function CameraView({ onVideoReady }) {
    const tracks = useTracks([Track.Source.Camera]);

    useEffect(() => {
        if (tracks.length > 0) {
            console.log("📷 Camera ready");
            onVideoReady();
        }
    }, [tracks]);

    return (
        <View style={StyleSheet.absoluteFill}>
            {tracks.map(
                (track) =>
                    isTrackReference(track) && (
                        <VideoTrack
                            key={track.publication.trackSid}
                            trackRef={track}
                            style={StyleSheet.absoluteFill}
                            resizeMode="cover"
                        />
                    )
            )}
        </View>
    );
}

/* =========================
   STYLES
========================= */
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
