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
import RNFS from "react-native-fs";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scale = width / 390;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/*  AUDIO CONFIG  */
const audioConfig = {
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
  audioSource: 6,
  wavFile: "mic_check.wav",
};

/*  DEEPGRAM  */
const DEEPGRAM_API_KEY = "4ef7bd0d54281e63169e5a58c6149205e86cc758";

async function transcribeWithDeepgram(filePath) {
  const audioBase64 = await RNFS.readFile(filePath, "base64");
  const binary = Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0));
  const response = await fetch(
    "https://api.deepgram.com/v1/listen?model=nova-2&smart_format=true",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
        "Content-Type": "audio/wav",
      },
      body: binary,
    }
  );
  const data = await response.json();
  return data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
}

function normalizeBrandName(text = "") {
  return text.replace(
    /\b(recruit|recuirt|record|rekroot|recuit)\b/gi,
    "Recroot"
  );
}

export default function MicCameraCheckScreen({ route }) {
  const navigation = useNavigation();
  const { roomName, interviewId, cid } = route.params;
  const hasNavigatedRef = useRef(false);

  const [token, setToken] = useState(null);
  const [camStatus, setCamStatus] = useState("idle");
  const [micStatus, setMicStatus] = useState("idle");
  const [showBlueSuccess, setShowBlueSuccess] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [showCamera, setShowCamera] = useState(true);
  const [showRedError, setShowRedError] = useState(false);

  const micAnim = useRef(new Animated.Value(1)).current;
  const stopAnimRef = useRef(null);

  const bothSuccess = camStatus === "success" && micStatus === "success";

  /*  CAMERA AUTO CHECK  */
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
      setShowRedError(true);
      return;
    }

    try {
      const t = await fetchLiveKitToken({
        roomName,
        interviewId,
        cid,
        identity: `cam-${Date.now()}`,
      });

      setToken(t);
      setCamStatus("success");
    } catch {
      setCamStatus("error");
      setShowRedError(true);
    }

  }

  /*  MIC CHECK  */
  async function handleMicPress() {
    if (micStatus !== "idle" || camStatus !== "success" || showBlueSuccess) return;

    const res = await request(
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO
    );
    if (res !== RESULTS.GRANTED) {
      setMicStatus("error");
      setShowRedError(true);
      return;
    }

    setMicStatus("listening");
    setSpokenText(""); // Reset to show default again if retrying

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
      const level = sum / (buffer.length / 2);
      maxLevel = Math.max(maxLevel, level);
    });

    setTimeout(async () => {
      const filePath = await AudioRecord.stop();
      subscription?.remove();
      stopAnimRef.current?.stop();
      micAnim.setValue(1);

      try {
        const transcript = await transcribeWithDeepgram(filePath);
        const normalizedDisplayText = normalizeBrandName(transcript);
        setSpokenText(normalizedDisplayText || "No speech detected");

        const normalized = normalizeBrandName(transcript || "")
          .toLowerCase()

          .replace(/[^a-z ]/g, "")
          .trim();
        console.log("RAW TRANSCRIPT:", transcript);
        console.log("NORMALIZED:", normalized);
        console.log("MAX LEVEL:", maxLevel);
        const isHello =
          normalized.includes("hello") &&
          (normalized.includes("recroot") ||
            normalized.includes("recruit") ||
            normalized.includes("record"));

        const isReady =
          normalized.includes("ready");
        if (maxLevel > 120 && isHello && isReady) {
          setMicStatus("success");
        } else {
          setMicStatus("error");
          setShowRedError(true);
        }
      } catch (err) {
        console.error("Transcription error:", err);
        setSpokenText("Transcription failed");
        setMicStatus("error");
      }
    }, 5000);
  }

  /*  BOTH SUCCESS HANDLER  */
  useEffect(() => {
    if (!bothSuccess) return;
    if (hasNavigatedRef.current) return;

    hasNavigatedRef.current = true;

    // 1️⃣ Unmount LiveKit COMPLETELY
    setShowCamera(false);

    // 2️⃣ Show blue tick
    setShowBlueSuccess(true);

    // 3️⃣ Navigate after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace("SpeakInMeetingsScreen", {
        roomName,
        interviewId,
        cid,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [bothSuccess]);

  useEffect(() => {
    console.log("STATUS:", camStatus, micStatus, bothSuccess);
  }, [camStatus, micStatus]);


  return (
    <View style={styles.container}>
      <Header
        title="Video & Mic check"
        titleStyle={styles.headerTitle}
      />
      <StatusBar barStyle="dark-content" />

      {/* Single combined text line matching the screenshot exactly */}
      <View style={styles.textWrapper}>
        <Text style={styles.instructionText}>
          Now position yourself in the frame and say,{" "}
          <Text
            style={[
              styles.quoteText,
              spokenText && styles.transcriptText,
            ]}
          >
            {spokenText ? `"${spokenText}"` : "“Hello Recroot, I’m ready.”"}
          </Text>
        </Text>
      </View>

      <View
        style={[
          styles.previewCard,
          showBlueSuccess && { backgroundColor: "#FFF" },
        ]}
      >
        {/* CAMERA PREVIEW */}
        {showCamera && token && !showBlueSuccess && (
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

        {/* SUCCESS SCREEN */}
        {
          showBlueSuccess && (
            <View style={styles.successContainer}>
              <Image
                source={require("../assets/images/mic-cam-check.png")}
                style={styles.successImage}
              />
            </View>
          )
        }
        {showRedError && (
          <View style={styles.successContainer}>
            <Image
              source={require("../assets/images/mic-cam-redcicrle.png")}
              style={styles.successImage}
            />
          </View>
        )}

        {/* ONLY MIC ICON - centered at bottom */}
        {!showBlueSuccess && !showRedError && (
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
/*  CAMERA PREVIEW  */
function CameraPreview() {
  const tracks = useTracks([Track.Source.Camera]);
  return (
    <View style={styles.cameraWrapper}>
      {tracks.map(
        (t) =>
          isTrackReference(t) && (
            <VideoTrack
              key={t.publication.trackSid}
              trackRef={t}
              style={styles.video}
              mirror
            />
          )
      )}
    </View>
  );
}


/*  STYLES - Matches screenshot perfectly  */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 16 * scale,
  },
  headerTitle: {
    fontFamily: Fonts.Medium,
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    color: "#000",
  },

  textWrapper: {
    width: SCREEN_WIDTH,
  },


  instructionText: {
    fontFamily: Fonts.Regular,
    fontSize: 32 * scale,
    lineHeight: 48 * scale,
    letterSpacing: 0,
    color: "#000",
  },

  quoteText: {
    fontFamily: Fonts.Regular,
    fontSize: 32 * scale,
    lineHeight: 48 * scale,
    letterSpacing: 0,
  },

  transcriptText: {
    fontFamily: Fonts.Medium,
    color: "#000",
  },

  bold: {
    fontFamily: Fonts.Medium,
  },
  previewCard: {
    width: (SCREEN_WIDTH * 92) / 100,
    height: (SCREEN_HEIGHT * 65) / 100,
    borderRadius: 16,
    marginTop: 24 * scale,
    overflow: "hidden",
    backgroundColor: "#EEE",
    alignSelf: "center",
  },

  bottomControls: {
    position: "absolute",
    bottom: (SCREEN_HEIGHT * 4) / 100,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  controlIcon: {
    width: (SCREEN_WIDTH * 12) / 100,
    height: (SCREEN_WIDTH * 12) / 100,
    marginHorizontal: 12 * scale,
    tintColor: "#2563EB",
  },

  successContainer: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  successImage: {
    width: (SCREEN_WIDTH * 60) / 100,
    height: (SCREEN_WIDTH * 60) / 100,
    resizeMode: "contain",
  },
  cameraWrapper: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  video: {
    width: "100%",
    height: "100%",
  },
  livekitWrapper: {
    width: "100%",
    height: "100%",
  },


});

