import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    SafeAreaView,
} from "react-native";

import {
    LiveKitRoom,
    useTracks,
    VideoTrack,
    isTrackReference,
} from "@livekit/react-native";

import { Track } from "livekit-client";
import { LIVEKIT_URL } from "../config/api";
import { fetchLiveKitToken } from "../services/livekit";
import { Fonts } from "../constants/fonts";

/* =========================
   CAMERA CHECK SCREEN
========================= */
export default function CameraCheckScreen({ navigation }) {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);

    /* 🔑 FETCH TOKEN */
    useEffect(() => {
        fetchLiveKitToken({
            roomName: "demo-room",
            identity: `mobile-${Date.now()}`,
        }).then((t) => {
            console.log("🎫 CameraCheck token received:", t);
            setToken(t);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Camera Check</Text>
            </View>

            {/* 🎥 CAMERA PREVIEW */}
            {token && (
                <LiveKitRoom
                    serverUrl={LIVEKIT_URL}
                    token={token}
                    connect
                    video
                    audio={false}
                    style={StyleSheet.absoluteFill}
                >
                    <CameraPreview onReady={() => setReady(true)} />
                </LiveKitRoom>
            )}

            {/* ✅ SUCCESS MODAL */}
            {ready && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Image
                            source={require("../assets/images/success_modal.png")}
                            style={styles.successImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.successText}>
                            Camera check successfully
                        </Text>
                    </View>
                </View>
            )}

            {/* 🔵 BOTTOM BUTTON */}
            <View style={styles.bottom}>
                {!ready ? (
                    <Pressable style={styles.circleBtn}>
                        <Image
                            source={require("../assets/images/Video_check.png")}
                            style={styles.icon48}
                            resizeMode="contain"
                        />
                    </Pressable>
                ) : token ? (
                    <Pressable
                        style={styles.circleBtn}
                        onPress={() => {
                            console.log("➡ Navigating to LiveRoomScreen");
                            navigation.replace("LiveRoomScreen", { token });
                        }}
                    >
                        <Image
                            source={require("../assets/images/Next_arrow.png")}
                            style={styles.icon48}
                            resizeMode="contain"
                        />
                    </Pressable>
                ) : null}
            </View>
        </SafeAreaView>
    );
}

/* =========================
   CAMERA PREVIEW
========================= */
function CameraPreview({ onReady }) {
    const tracks = useTracks([Track.Source.Camera]);

    useEffect(() => {
        if (tracks.length > 0) {
            console.log("📷 Camera ready");
            onReady();
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

/* =========================
   STYLES
========================= */
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
        zIndex: 10,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },

    /* BOTTOM */
    bottom: {
        position: "absolute",
        bottom: 32,
        width: "100%",
        alignItems: "center",
        zIndex: 10,
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

    /* SUCCESS MODAL */
    modalOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 20,
        pointerEvents: "box-none",
    },
    modalCard: {
        width: 300,
        paddingVertical: 24,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        pointerEvents: "auto",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
    },
    successImage: {
        width: 160,
        height: 160,
        marginBottom: 12,
    },
    successText: {
        fontSize: 16,
        fontFamily:Fonts.Medium,
        color: "#333",
        textAlign: "center",
    },
});
