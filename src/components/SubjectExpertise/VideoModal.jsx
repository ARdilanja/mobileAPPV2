import React from "react";
import { Modal, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Video from "react-native-video";

export default function VideoModal({ visible, videoUrl, onClose }) {
    if (!videoUrl) return null;

    return (
        <Modal visible={visible} animationType="slide">
            <View style={styles.container}>
                <Video
                    source={{ uri: videoUrl }}
                    style={styles.video}
                    controls
                    resizeMode="contain"
                />

                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    video: { flex: 1 },
    closeBtn: {
        position: "absolute",
        top: 40,
        right: 20,
        backgroundColor: "#000000AA",
        padding: 10,
        borderRadius: 6,
    },
    closeText: { color: "#fff", fontSize: 14 },
});
