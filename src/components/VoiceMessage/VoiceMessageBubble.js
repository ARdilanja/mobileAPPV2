import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Sound from "react-native-sound";

export default function VoiceMessageBubble({ path, isUser = true }) {
  const soundRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (playing) {
      soundRef.current.pause();
      setPlaying(false);
      return;
    }

    soundRef.current = new Sound(path, "", (error) => {
      if (error) return;

      soundRef.current.play(() => {
        setPlaying(false);
        soundRef.current.release();
      });

      setPlaying(true);
    });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isUser ? styles.user : styles.bot,
      ]}
      onPress={togglePlay}
    >
      <Text style={styles.playText}>
        {playing ? "⏸ Pause" : "▶ Play"}
      </Text>

      <View style={styles.waveRow}>
        {[...Array(14)].map((_, i) => (
          <View key={i} style={styles.wave} />
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 20,
  },
  user: { backgroundColor: "#007AFF" },
  bot: { backgroundColor: "#E5E5E5" },

  playText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  waveRow: {
    flexDirection: "row",
    gap: 3,
  },
  wave: {
    width: 3,
    height: 14,
    backgroundColor: "#fff",
    borderRadius: 2,
    opacity: 0.8,
  },
});
