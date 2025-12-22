import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { Fonts } from "../constants/fonts";

const screenWidth = Dimensions.get("window").width;

export default function FeedbackScreen() {
  const [selected, setSelected] = useState(4);

  const ratings = [
  { emoji: "😡", label: "Terrible" },
  { emoji: "🙁", label: "Bad" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
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
  {ratings.map((item, index) => {
    const isActive = selected === index;

    return (
      <View key={index} style={styles.ratingItem}>
        <TouchableOpacity
          onPress={() => setSelected(index)}
          style={[
            styles.emojiWrapper,
            isActive && styles.activeEmoji,
          ]}
        >
          {/* Tick */}
          {isActive && (
            <View style={styles.tickCircle}>
              <Text style={styles.tick}>✓</Text>
            </View>
          )}

          <Text style={styles.emoji}>{item.emoji}</Text>
        </TouchableOpacity>

        {/* Active label */}
        {isActive && item.label !== "" && (
          <Text style={styles.activeLabel}>{item.label}</Text>
        )}
      </View>
    );
  })}
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
    padding: 25,
  },

  title: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: "#111827",
    marginBottom: 6,
  },

  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 20,
  },

  sectionTitle: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 12,
  },

  ratingRow: {
    width: screenWidth - 50,
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
  borderRadius: 22, // PERFECT CIRCLE
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#E1F1FF",
  position: "relative",
},

activeEmoji: {
  backgroundColor: "#0087FF",
},

emoji: {
  fontSize: 22,
},

tickCircle: {
  position: "absolute",
  top: -4,
  right: -4,
  width: 16,
  height: 16,
  borderRadius: 8,
  backgroundColor: "#22C55E",
  justifyContent: "center",
  alignItems: "center",
},

tick: {
  color: "#FFFFFF",
  fontSize: 10,
  fontWeight: "700",
},

activeLabel: {
  marginTop: 6,
  fontSize: 11,
  color: "#2563EB",
  fontFamily: Fonts.Medium,
},

  textArea: {
    minHeight: 120,
    height: 240,
    width: screenWidth - 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 12,
    color: '#777777',
    fontSize: 12,
    textAlignVertical: "top",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginHorizontal: 'auto',
    maxWidth: 240,
    width: 230
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: Fonts.Medium,

  },
});
