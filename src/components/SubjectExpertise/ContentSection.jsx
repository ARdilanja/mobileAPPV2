
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ContentSection({
  activeFilter,
  content,
}) {
  if (!content) return null;

  const sections =
    activeFilter === "All"
      ? Object.entries(content).filter(
          ([_, value]) => value
        )
      : [[activeFilter, content[activeFilter]]];

  return (
    <View style={styles.wrapper}>
      {sections.map(([title, text]) => (
        <View key={title} style={styles.section}>
          <View style={styles.headingRow}>
            <View style={styles.line} />
            <Text style={styles.heading}>
              {title.toUpperCase()}
            </Text>
            <View style={styles.line} />
          </View>

          <Text style={styles.contentText}>{text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 24, paddingHorizontal: 20 },
  section: { marginBottom: 24 },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  heading: {
    marginHorizontal: 12,
    fontSize: 12,
    letterSpacing: 2,
    color: "#115CC7",
  },
  line: { flex: 1, height: 1, backgroundColor: "#B5B5B5" },
  contentText: { fontSize: 13, lineHeight: 20 },
});
