
// import React, { useEffect, useState, useRef, memo } from "react";
// import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
// import "react-native-get-random-values";
// import { useDispatch } from "react-redux";
// import { saveAnswer } from "../redux/interviewSlice";

// import {
//     LiveKitRoom,
//     useTracks,
//     VideoTrack,
//     isTrackReference,
//     AudioSession,
// } from "@livekit/react-native";

// import { Track } from "livekit-client";
// import { API_BASE, LIVEKIT_URL } from "../config/api";
// import QuestionOverlay from "../components/Livekit/QuestionOverlay";
// import CameraStateMonitor from "../components/Livekit/CameraStateMonitor";
// import AppExitMonitor from "../components/Livekit/AppExitMonitor";
// import useDeepgramRN from "../components/Livekit/useDeepgramRN.jsx";

// import {
//     startEgressRecording,
//     stopEgressRecording,
// } from "../services/livekit.jsx";

// export default function LiveRoomScreen({ route, navigation }) {
//     const dispatch = useDispatch();
//     const { token, roomName, interviewId, cid } = route.params;

//     // --- INTERVIEW STATE ---
//     const [parentQuestions, setParentQuestions] = useState([]); 
//     const [pIndex, setPIndex] = useState(0); // Current parent question index
//     const [currentQuestion, setCurrentQuestion] = useState(null); // Active text being shown
//     const [fuIndex, setFuIndex] = useState(0); // 0=Parent, 1=FU1, 2=FU2, 3=FU3
//     const [followupHistory, setFollowupHistory] = useState([]); // Context for AI

//     const [videoReady, setVideoReady] = useState(false);
//     const [loadingQuestions, setLoadingQuestions] = useState(true);
//     const [isAILoading, setIsAILoading] = useState(false);

//     const [startTime, setStartTime] = useState(Date.now());
//     const { getTranscript, resetTranscript } = useDeepgramRN(videoReady);

//     const egressIdRef = useRef(null);
//     const terminatedRef = useRef(false);

//     useEffect(() => {
//         AudioSession.startAudioSession();
//         return () => AudioSession.stopAudioSession();
//     }, []);

//     /* 1. FETCH PARENT QUESTIONS */
//     useEffect(() => {
//         if (!interviewId) return;
//         const fetchQuestions = async () => {
//             try {
//                 const res = await fetch(`${API_BASE}/api/interview/questions/${interviewId}`);
//                 const data = await res.json();
//                 if (data.ok && Array.isArray(data.questions)) {
//                     const theoryOnly = data.questions.filter(
//                         q => q.quesType?.toLowerCase() === "theoretical" || q.quesType?.toLowerCase() === "general"
//                     );
//                     setParentQuestions(theoryOnly);

//                     // Set first question
//                     if (theoryOnly.length > 0) {
//                         setCurrentQuestion({
//                             _id: theoryOnly[0]._id,
//                             text: theoryOnly[0].question,
//                             title: "Question 1",
//                         });
//                     }
//                     setStartTime(Date.now());
//                 }
//             } catch (err) { console.error("Fetch Error", err); }
//             finally { setLoadingQuestions(false); }
//         };
//         fetchQuestions();
//     }, [interviewId]);

//     const handleConnected = async () => {
//         if (!egressIdRef.current) {
//             try {
//                 const egressId = await startEgressRecording({ roomName, interviewId });
//                 egressIdRef.current = egressId;
//             } catch (err) { console.error("Egress Error", err); }
//         }
//     };

//     const terminateInterview = async (reason) => {
//         if (terminatedRef.current) return;
//         terminatedRef.current = true;
//         if (egressIdRef.current) await stopEgressRecording(egressIdRef.current);
//         resetTranscript();
//         navigation.reset({ index: 0, routes: [{ name: "CreateRoomScreen" }] });
//     };

//     /* 2. NEXT QUESTION LOGIC (Handles Parent -> AI Followup -> Next Parent) */
//     const handleNext = async () => {
//         if (isAILoading) return;

//         const endTime = Date.now();
//         const transcriptText = getTranscript().trim();
//         console.log(`➡️ [MOBILE] Next Pressed | Parent Index: ${pIndex} | FU Index: ${fuIndex}`);

//         // Build turn context for Redux and AI
//         const turnData = {
//             question: currentQuestion.text,
//             candiAnswer: transcriptText,
//             quesType: "theory",
//             followUpIndex: fuIndex,
//             timestamp: new Date().toISOString(),
//             startTime,
//             endTime
//         };

//         const updatedHistory = [...followupHistory, turnData];
//         setFollowupHistory(updatedHistory);

//         // Save to Redux (Payload matches your web format)
//         dispatch(saveAnswer({
//             interviewId,
//             questionId: parentQuestions[pIndex]._id,
//             ...turnData
//         }));

//         setIsAILoading(true);

//         try {
//             console.log("📤 [MOBILE] Requesting AI Follow-up...");
//             const aiRes = await fetch(`${API_BASE}/api/interview/generate-followup`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     interviewId,
//                     questionId: parentQuestions[pIndex]._id,
//                     questionText: currentQuestion.text,
//                     answer: transcriptText,
//                     questionType: "theory",
//                     timings: { startTime, endTime },
//                     followUpIndex: fuIndex,
//                     followupResponse: updatedHistory,
//                     employerTesting: false,
//                     schedule_id: cid || "",
//                 }),
//             });

//             const result = await aiRes.json();
//             console.log("🤖 [MOBILE] AI Result:", result);

//             // Logic: If result has a question and we haven't hit 3 follow-ups (Total 4 turns)
//             if (result.ok && result.followUpQuestion && fuIndex < 3) {
//                 const nextFU = fuIndex + 1;
//                 setFuIndex(nextFU);
//                 setCurrentQuestion({
//                     _id: `ai-${Date.now()}`,
//                     text: result.followUpQuestion.question,
//                     title: `Question ${pIndex + 1}.${nextFU}`, // Format: 1.1, 1.2
//                 });
//                 resetTranscript();
//                 setStartTime(Date.now());
//             } else {
//                 // MOVE TO NEXT PARENT
//                 console.log(`✅ [MOBILE] Q${pIndex + 1} Sequence Complete. Moving to next parent.`);
//                 if (pIndex < parentQuestions.length - 1) {
//                     const nextP = pIndex + 1;
//                     setPIndex(nextP);
//                     setFuIndex(0);
//                     setFollowupHistory([]); // Reset history for new parent question
//                     setCurrentQuestion({
//                         _id: parentQuestions[nextP]._id,
//                         text: parentQuestions[nextP].question,
//                         title: `Question ${nextP + 1}`,
//                     });
//                     resetTranscript();
//                     setStartTime(Date.now());
//                 } else {
//                     console.log("🏁 [MOBILE] All parents and follow-ups finished.");
//                     await terminateInterview("SUBMIT");
//                 }
//             }
//         } catch (error) {
//             console.error("❌ AI API Failed", error);
//             // Fallback to next parent if API fails
//             if (pIndex < parentQuestions.length - 1) {
//                 setPIndex(pIndex + 1); setFuIndex(0); setFollowupHistory([]);
//             }
//         } finally {
//             setIsAILoading(false);
//         }
//     };

//     if (loadingQuestions || !token) {
//         return <View style={styles.center}><ActivityIndicator size="large" color="#fff" /></View>;
//     }

//     return (
//         <View style={styles.root}>
//             <LiveKitRoom
//                 serverUrl={LIVEKIT_URL}
//                 token={token}
//                 connect audio video
//                 style={StyleSheet.absoluteFill}
//                 onConnected={handleConnected}
//             >
//                 <MemoizedCameraView onVideoReady={() => setVideoReady(true)} />
//                 <CameraStateMonitor enabled={videoReady} onTerminate={terminateInterview} />
//                 <AppExitMonitor onTerminate={terminateInterview} />
//             </LiveKitRoom>

//             {videoReady && currentQuestion && (
//                 <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
//                     <QuestionOverlay
//                         title={currentQuestion.title}
//                         question={currentQuestion.text}
//                         isLast={pIndex === parentQuestions.length - 1 && fuIndex === 3}
//                         onNext={handleNext}
//                     />

//                     {isAILoading && (
//                         <View style={styles.aiLoading}>
//                             <ActivityIndicator size="small" color="#1E6CFF" />
//                             <Text style={styles.aiText}>Generating Follow-up...</Text>
//                         </View>
//                     )}
//                 </View>
//             )}
//         </View>
//     );
// }

// const CameraView = ({ onVideoReady }) => {
//     const tracks = useTracks([Track.Source.Camera]);
//     useEffect(() => {
//         if (tracks.length > 0) onVideoReady();
//     }, [tracks]);

//     return (
//         <View style={StyleSheet.absoluteFill}>
//             {tracks.map(t => isTrackReference(t) && (
//                 <VideoTrack key={t.publication.trackSid} trackRef={t} style={StyleSheet.absoluteFill} resizeMode="cover" />
//             ))}
//         </View>
//     );
// }
// const MemoizedCameraView = memo(CameraView);

// const styles = StyleSheet.create({
//     root: { flex: 1, backgroundColor: "black" },
//     center: { flex: 1, backgroundColor: "black", alignItems: "center", justifyContent: "center" },
//     aiLoading: {
//         position: 'absolute',
//         bottom: 50,
//         alignSelf: 'center',
//         flexDirection: 'row',
//         backgroundColor: 'white',
//         padding: 10,
//         borderRadius: 20,
//         alignItems: 'center',
//         elevation: 5
//     },
//     aiText: { marginLeft: 8, color: '#000', fontWeight: 'bold', fontSize: 12 }
// });










import React, { useEffect, useState, useRef, memo } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import "react-native-get-random-values";


import {
    LiveKitRoom,
    useTracks,
    VideoTrack,
    isTrackReference,
    AudioSession,
} from "@livekit/react-native";

import { Track } from "livekit-client";
import { API_BASE, LIVEKIT_URL } from "../config/api";
import QuestionOverlay from "../components/Livekit/QuestionOverlay";
import CameraStateMonitor from "../components/Livekit/CameraStateMonitor";
import AppExitMonitor from "../components/Livekit/AppExitMonitor";
import useDeepgramRN from "../components/Livekit/useDeepgramRN.jsx";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswer, resetInterview } from "../redux/interviewSlice";

import {
    startEgressRecording,
    stopEgressRecording,
} from "../services/livekit.jsx";

export default function LiveRoomScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const { token, roomName, interviewId, cid } = route.params;

    // ---------------- INTERVIEW STATE ----------------
    const [parentQuestions, setParentQuestions] = useState([]);
    const [pIndex, setPIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [fuIndex, setFuIndex] = useState(0);
    const [followupHistory, setFollowupHistory] = useState([]);

    const [videoReady, setVideoReady] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(true);
    const [isAILoading, setIsAILoading] = useState(false);

    // ⭐ NEW STATE (IMPORTANT)
    const [maxFollowUps, setMaxFollowUps] = useState(3);

    const [startTime, setStartTime] = useState(Date.now());
    const answers = useSelector((state) => state.interview.answers);
    const { getTranscript, resetTranscript } = useDeepgramRN(videoReady);

    const egressIdRef = useRef(null);
    const terminatedRef = useRef(false);



    // ---------------- AUDIO SESSION ----------------
    useEffect(() => {
        AudioSession.startAudioSession();
        return () => AudioSession.stopAudioSession();
    }, []);

    // ---------------- FETCH QUESTIONS ----------------
    useEffect(() => {
        if (!interviewId) return;

        const fetchQuestions = async () => {
            try {
                const res = await fetch(
                    `${API_BASE}/api/interview/questions/${interviewId}`
                );
                const data = await res.json();

                console.log("📥 [MOBILE] Interview Questions Response:", data);

                if (data.ok && Array.isArray(data.questions)) {
                    const theoryOnly = data.questions.filter(
                        (q) =>
                            q.quesType?.toLowerCase() === "theoretical" ||
                            q.quesType?.toLowerCase() === "general"
                    );

                    setParentQuestions(theoryOnly);

                    if (theoryOnly.length > 0) {
                        setCurrentQuestion({
                            _id: theoryOnly[0]._id,
                            text: theoryOnly[0].question,
                            title: "Question 1",
                        });
                    }

                    setStartTime(Date.now());
                }
            } catch (err) {
                console.error("❌ [MOBILE] Fetch Questions Error:", err);
            } finally {
                setLoadingQuestions(false);
            }
        };

        fetchQuestions();
    }, [interviewId]);

    // ---------------- LIVEKIT CONNECT ----------------
    const handleConnected = async () => {
        if (!egressIdRef.current) {
            try {
                const egressId = await startEgressRecording({ roomName, interviewId });
                egressIdRef.current = egressId;
                console.log("🎥 [MOBILE] Egress started:", egressId);
            } catch (err) {
                console.error("❌ [MOBILE] Egress Error:", err);
            }
        }
    };

    // ---------------- TERMINATE ----------------
    // const terminateInterview = async (reason) => {
    //     if (terminatedRef.current) return;
    //     terminatedRef.current = true;

    //     console.log("🛑 [MOBILE] Interview terminated:", reason);

    //     if (egressIdRef.current) {
    //         await stopEgressRecording(egressIdRef.current);
    //     }

    //     resetTranscript();

    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: "CreateRoomScreen" }],
    //     });
    // };

    const terminateInterview = async (reason) => {
        if (terminatedRef.current) return;
        terminatedRef.current = true;

        console.log("🛑 [MOBILE] Interview terminated:", reason);

        try {
            // 1️⃣ Stop recording
            if (egressIdRef.current) {
                await stopEgressRecording(egressIdRef.current);
            }

            // 2️⃣ SAVE ANSWERS (🔥 THIS WAS MISSING)
            if (answers.length > 0) {
                await fetch(`${API_BASE}/api/interview/save-structured-answers`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        interviewId,
                        answers,
                    }),
                });

                console.log("✅ Answers saved to DB");
            }

            // 3️⃣ Clear redux
            dispatch(resetInterview());

        } catch (err) {
            console.error("❌ Terminate error:", err);
        } finally {
            resetTranscript();

            navigation.reset({
                index: 0,
                routes: [{ name: "CreateRoomScreen" }],
            });
        }
    };


    // ---------------- NEXT QUESTION ----------------
    const handleNext = async () => {
        if (isAILoading) return;

        const endTime = Date.now();
        const transcriptText = getTranscript().trim();

        console.log(
            `➡️ [MOBILE] Next | Parent=${pIndex} | FU=${fuIndex} | MaxFU=${maxFollowUps}`
        );

        const turnData = {
            question: currentQuestion.text,
            candiAnswer: transcriptText,
            quesType: "theory",
            followUpIndex: fuIndex,
            timestamp: new Date().toISOString(),
            startTime,
            endTime,
        };

        const updatedHistory = [...followupHistory, turnData];
        setFollowupHistory(updatedHistory);

        dispatch(
            saveAnswer({
                interviewId,
                questionId: parentQuestions[pIndex]._id,
                ...turnData,
            })
        );

        setIsAILoading(true);

        try {
            console.log("📤 [MOBILE] Calling AI Follow-up API");

            const aiRes = await fetch(
                `${API_BASE}/api/interview/generate-followup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        interviewId,
                        questionId: parentQuestions[pIndex]._id,
                        questionText: currentQuestion.text,
                        answer: transcriptText,
                        questionType: "theory",
                        timings: { startTime, endTime },
                        followUpIndex: fuIndex,
                        followupResponse: updatedHistory,
                        employerTesting: false,
                        schedule_id: cid || "",
                    }),
                }
            );

            const result = await aiRes.json();

            console.log("🤖 [MOBILE] AI Response:", result);
            console.log("🏷 [MOBILE] interview_type:", result.interview_type);
            console.log("🔢 [MOBILE] maxFollowUps:", result.maxFollowUps);
            console.log(
                "🏷 [MOBILE] Interview Follow-up Limit:",
                result.maxFollowUps
            );

            if (typeof result.maxFollowUps === "number") {
                setMaxFollowUps(result.maxFollowUps);
            }

            const allowedFU = result.maxFollowUps ?? maxFollowUps;

            if (result.ok && result.followUpQuestion && fuIndex < allowedFU) {
                const nextFU = fuIndex + 1;

                console.log(`➡️ [MOBILE] Moving to FU ${nextFU}`);

                setFuIndex(nextFU);
                setCurrentQuestion({
                    _id: `ai-${Date.now()}`,
                    text: result.followUpQuestion.question,
                    title: `Question ${pIndex + 1}.${nextFU}`,
                });

                resetTranscript();
                setStartTime(Date.now());
            } else {
                console.log(
                    `✅ [MOBILE] Parent ${pIndex + 1} completed (MaxFU=${allowedFU})`
                );


                if (pIndex < parentQuestions.length - 1) {
                    const nextP = pIndex + 1;

                    setPIndex(nextP);
                    setFuIndex(0);
                    setFollowupHistory([]);

                    setCurrentQuestion({
                        _id: parentQuestions[nextP]._id,
                        text: parentQuestions[nextP].question,
                        title: `Question ${nextP + 1}`,
                    });

                    resetTranscript();
                    setStartTime(Date.now());
                } else {
                    console.log("🏁 [MOBILE] Interview fully completed");
                    await terminateInterview("SUBMIT");
                }

            }

        } catch (error) {
            console.error("❌ [MOBILE] AI Error:", error);
        } finally {
            setIsAILoading(false);
        }
    };

    // ---------------- LOADING ----------------
    if (loadingQuestions || !token) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    // ---------------- UI ----------------
    return (
        <View style={styles.root}>
            <LiveKitRoom
                serverUrl={LIVEKIT_URL}
                token={token}
                connect
                audio
                video
                style={StyleSheet.absoluteFill}
                onConnected={handleConnected}
            >
                <MemoizedCameraView onVideoReady={() => setVideoReady(true)} />
                <CameraStateMonitor
                    enabled={videoReady}
                    onTerminate={terminateInterview}
                />
                <AppExitMonitor onTerminate={terminateInterview} />
            </LiveKitRoom>

            {videoReady && currentQuestion && (
                <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
                    <QuestionOverlay
                        title={currentQuestion.title}
                        question={currentQuestion.text}
                        isLast={
                            pIndex === parentQuestions.length - 1 &&
                            fuIndex === maxFollowUps
                        }
                        onNext={handleNext}
                    />

                    {isAILoading && (
                        <View style={styles.aiLoading}>
                            <ActivityIndicator size="small" color="#1E6CFF" />
                            <Text style={styles.aiText}>Generating Follow-up...</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

// ---------------- CAMERA VIEW ----------------
const CameraView = ({ onVideoReady }) => {
    const tracks = useTracks([Track.Source.Camera]);

    useEffect(() => {
        if (tracks.length > 0) onVideoReady();
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
};

const MemoizedCameraView = memo(CameraView);

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "black" },
    center: {
        flex: 1,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
    },
    aiLoading: {
        position: "absolute",
        bottom: 50,
        alignSelf: "center",
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        elevation: 5,
    },
    aiText: { marginLeft: 8, color: "#000", fontWeight: "bold", fontSize: 12 },
});
