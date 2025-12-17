import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import {
    LiveKitRoom,
    useTracks,
    VideoTrack,
    isTrackReference,
} from "@livekit/react-native";

import { Track } from "livekit-client";
import { LIVEKIT_URL } from "../config/api";
import { fetchLiveKitToken } from "../services/livekit";

export default function CameraCheckScreen({ navigation }) {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetchLiveKitToken({
            roomName: "demo-room",
            identity: `mobile-${Date.now()}`,
        }).then(setToken);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Camera Check</Text>

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

            {/* ✅ Success Overlay */}
            {ready && (
                <View style={styles.successBox}>
                    <Text style={styles.check}>✓</Text>
                    <Text>Camera Check Successful</Text>
                </View>
            )}

            {/* 🔵 CAMERA BUTTON */}
            {!ready && (
                <View style={styles.circleBtn}>
                    <Text style={styles.icon}>📷</Text>
                </View>
            )}

            {/* ➡ NEXT */}
            {ready && (
                <Pressable
                    style={styles.circleBtn}
                    onPress={() =>
                        navigation.replace("LiveRoomScreen", { token })
                    }
                >
                    <Text style={styles.icon}>›</Text>
                </Pressable>
            )}
        </View>
    );
}

function CameraPreview({ onReady }) {
    const tracks = useTracks([Track.Source.Camera]);

    useEffect(() => {
        if (tracks.length > 0) {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        alignItems: "center",
    },
    title: {
        marginTop: 16,
        fontWeight: "600",
    },
    successBox: {
        position: "absolute",
        top: "40%",
        padding: 24,
        backgroundColor: "#F4FFF8",
        borderRadius: 12,
        alignItems: "center",
    },
    check: {
        fontSize: 28,
        color: "#1BB55C",
    },

    /* 🔵 80x80 BUTTON */
    circleBtn: {
        position: "absolute",
        bottom: 40,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#1E6CFF",
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        fontSize: 48,
        color: "#FFF",
    },
});
