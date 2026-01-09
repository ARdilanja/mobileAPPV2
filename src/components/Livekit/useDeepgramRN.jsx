// import { useEffect, useRef, useState } from "react";
// import LiveAudioStream from "react-native-live-audio-stream";
// import { Buffer } from "buffer";

// // CHANGE THIS to your backend server IP (use your machine's IP, not localhost for physical devices)
// const STT_WS_URL = "ws://192.168.0.5:5000/stt"; 

// export default function useDeepgramRN(active) {
//     const [transcript, setTranscript] = useState("");
//     const [liveTranscript, setLiveTranscript] = useState("");
//     const socketRef = useRef(null);

//     useEffect(() => {
//         if (!active) {
//             stopStreaming();
//             return;
//         }

//         console.log("🎙️ [STT] Initializing Deepgram Socket...");
//         socketRef.current = new WebSocket(STT_WS_URL);

//         socketRef.current.onopen = () => {
//             console.log("✅ [STT] WebSocket Connected to Backend");
//             startStreaming();
//         };

//         socketRef.current.onmessage = (e) => {
//             try {
//                 const data = JSON.parse(e.data);
//                 if (!data.transcript) return;

//                 if (data.isFinal) {
//                     setTranscript(prev => prev + (prev ? " " : "") + data.transcript);
//                     setLiveTranscript(""); 
//                 } else {
//                     setLiveTranscript(data.transcript);
//                 }
//             } catch (err) {
//                 console.error("❌ [STT] Parse Error:", err);
//             }
//         };

//         socketRef.current.onerror = (err) => console.log("❌ [STT] Socket Error:", err);
//         socketRef.current.onclose = () => console.log("🔌 [STT] Socket Closed");

//         return () => stopStreaming();
//     }, [active]);

//     const startStreaming = () => {
//         const options = {
//             sampleRate: 16000,
//             channels: 1,
//             bitsPerSample: 16,
//             audioSource: 6,
//             bufferSize: 4096,
//         };

//         LiveAudioStream.init(options);
//         LiveAudioStream.on("data", (data) => {
//             if (socketRef.current?.readyState === WebSocket.OPEN) {
//                 // Convert base64 string from library to Buffer binary for your backend
//                 const chunk = Buffer.from(data, "base64");
//                 socketRef.current.send(chunk);
//             }
//         });
//         LiveAudioStream.start();
//     };

//     const stopStreaming = () => {
//         LiveAudioStream.stop();
//         if (socketRef.current) {
//             socketRef.current.close();
//             socketRef.current = null;
//         }
//     };

//     return {
//         transcript,
//         liveTranscript: liveTranscript ? transcript + " " + liveTranscript : transcript,
//         resetTranscript: () => {
//             setTranscript("");
//             setLiveTranscript("");
//         },
//     };
// }







import { useEffect, useRef } from "react";
import LiveAudioStream from "react-native-live-audio-stream";
import { Buffer } from "buffer";

// CHANGE THIS to your backend server IP
const STT_WS_URL = "ws://192.168.0.6:5000/stt"; 

export default function useDeepgramRN(active) {
    const socketRef = useRef(null);
    // Use Ref instead of State to prevent the whole screen from re-rendering while talking
    const fullTranscriptRef = useRef(""); 

    useEffect(() => {
        if (!active) {
            stopStreaming();
            return;
        }

        console.log("🎙️ [STT] Initializing Deepgram Socket...");
        socketRef.current = new WebSocket(STT_WS_URL);

        socketRef.current.onopen = () => {
            console.log("✅ [STT] WebSocket Connected to Backend");
            startStreaming();
        };

        socketRef.current.onmessage = (e) => {
            try {
                const data = JSON.parse(e.data);
                if (!data.transcript) return;

                if (data.isFinal) {
                    // Store the text in the Ref (no re-render triggered)
                    fullTranscriptRef.current += (fullTranscriptRef.current ? " " : "") + data.transcript;
                }
            } catch (err) {
                console.error("❌ [STT] Parse Error:", err);
            }
        };

        socketRef.current.onerror = (err) => console.log("❌ [STT] Socket Error:", err);
        socketRef.current.onclose = () => console.log("🔌 [STT] Socket Closed");

        return () => stopStreaming();
    }, [active]);

    const startStreaming = () => {
        const options = {
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            audioSource: 6,
            bufferSize: 4096,
        };

        LiveAudioStream.init(options);
        LiveAudioStream.on("data", (data) => {
            if (socketRef.current?.readyState === WebSocket.OPEN) {
                const chunk = Buffer.from(data, "base64");
                socketRef.current.send(chunk);
            }
        });
        LiveAudioStream.start();
    };

    const stopStreaming = () => {
        LiveAudioStream.stop();
        if (socketRef.current) {
            socketRef.current.close();
            socketRef.current = null;
        }
    };

    return {
        // Function to get current text for Redux
        getTranscript: () => fullTranscriptRef.current,
        resetTranscript: () => {
            fullTranscriptRef.current = "";
            console.log("🔄 [STT] Transcript Reset");
        },
    };
}