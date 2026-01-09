import React, { useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
} from "react-native";
import Gradient from "../constants/Gradient";
import Header from "../components/Header";
import { Fonts } from "../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import { fetchLiveKitToken } from "../services/livekit";

const { width, height } = Dimensions.get("window");

export default function SpeakInMeetingsScreen({ route }) {

    const handleStartConversation = async () => {
        try {
            const token = await fetchLiveKitToken({
                roomName,
                interviewId,
                cid,
                identity: `user-${Date.now()}`,
            });

            navigation.navigate("LiveRoomScreen", {
                roomName,
                interviewId,
                cid,
                token,
            });
        } catch (err) {
            console.error("Failed to fetch LiveKit token:", err);
        }
    };

    const navigation = useNavigation();
    const { roomName, interviewId, cid } = route.params || {};
    useEffect(() => {
        console.log("SpeakInMeetings params:", {
            roomName,
            interviewId,
            cid,
        });
    }, []);


    return (
        <Gradient>
            {/* HEADER */}
            <Header title="Speak in Meetings" />

            {/* CENTER CONTENT (TRUE CENTER) */}
            <View style={styles.centerWrapper} pointerEvents="box-none">
                <View style={styles.centerContent}>
                    <Text style={styles.sectionTitle}>Scenario</Text>

                    <Text style={styles.description}>
                        You're in your daily standup. The product manager asks everyone
                        to share updates and blockers.
                    </Text>
                </View>
            </View>

            {/* BOTTOM BUTTON */}
            <View style={styles.bottom}>
                <Pressable style={styles.primaryButton} onPress={handleStartConversation}>
                    <Text style={styles.buttonText}>Start conversation</Text>
                </Pressable>

            </View>
        </Gradient>
    );
}

/* =====================
   STYLES
===================== */
const styles = StyleSheet.create({
    /* CENTERING MAGIC */
    centerWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },

    centerContent: {
        width: "100%",
        paddingHorizontal: 24,
        alignItems: "center",
        marginTop: 20, // small offset because of header
    },

    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        fontWeight: 500,
        color: "#000",
        marginBottom: 12,
    },

    description: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        fontWeight: 400,
        fontFamily: Fonts.Regular,
        color: "#000",
        textAlign: "center",
        lineHeight: 20,
        maxWidth: width * 0.85,
    },

    /* BOTTOM */
    bottom: {
        position: "absolute",
        bottom: 32,
        left: 0,
        right: 0,
        alignItems: "center",
    },

    primaryButton: {
        width: width * 0.85,
        height: 48,
        backgroundColor: "#2F5BFF",
        borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        fontWeight: 500,
        color: "#FFFFFF",
    },
});
