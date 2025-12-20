import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function FeedbackScreen() {
  const [selected, setSelected] = useState(4);

  const ratings = [
    { emoji: "😡", label: "" },
    { emoji: "😕", label: "" },
    { emoji: "🙂", label: "" },
    { emoji: "😊", label: "" },
    { emoji: "😍", label: "Lovely" },
  ];

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Please Rate us</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        How likely are you to recommend recroot to a friend?
      </Text>

      {/* Section */}
      <Text style={styles.sectionTitle}>Rate your Experience</Text>

      {/* Emoji Rating */}
      <View style={styles.ratingRow}>
        {ratings.map((item, index) => (
          <View key={index} style={styles.ratingItem}>
            <TouchableOpacity
              onPress={() => setSelected(index)}
              style={[
                styles.emojiWrapper,
                selected === index && styles.activeEmoji,
              ]}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
            </TouchableOpacity>

            {selected === index && item.label !== "" && (
              <Text style={styles.activeLabel}>{item.label}</Text>
            )}
          </View>
        ))}
      </View>

      {/* Feedback */}
      <Text style={styles.sectionTitle}>
        How can we make things better for you?
      </Text>

      <TextInput
        placeholder="Enter your message*"
        placeholderTextColor="#9CA3AF"
        multiline
        style={styles.textArea}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 12,
  },

  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  ratingItem: {
    alignItems: "center",
  },

  emojiWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  activeEmoji: {
    backgroundColor: "#2563EB",
  },

  emoji: {
    fontSize: 22,
  },

  activeLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#2563EB",
    fontWeight: "500",
  },

  textArea: {
    height: 120,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    textAlignVertical: "top",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
