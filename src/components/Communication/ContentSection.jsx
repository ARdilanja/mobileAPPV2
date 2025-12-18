import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
// import { CONTENT_DATA, SECTION_ORDER } from "./ContentData";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTENT_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

const SECTION_ORDER = [
  "Strengths",
  "Areas of Improvement",
  "Recommendations",
];

export default function ContentSection({ activeFilter, feedback = {} }) {
  const sections =
    activeFilter === "All"
      ? SECTION_ORDER
      : [activeFilter];

  return (
    <View style={styles.wrapper}>
      {sections.map((key) => {
        const text = feedback[key];
        if (!text) return null;

        return (
          <View key={key} style={styles.section}>
            <View style={styles.headingRow}>
              <View style={styles.line} />
              <Text style={styles.heading}>{key.toUpperCase()}</Text>
              <View style={styles.line} />
            </View>

            <Text style={styles.contentText}>{text}</Text>
          </View>
        );
      })}
    </View>
  );
}



const styles = StyleSheet.create({
  wrapper: {
    width: CONTENT_WIDTH,
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 24,
  },

  section: {
    marginBottom: 24,
  },

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
    fontWeight: "600",
  },

  line: {
    flex: 1,
    height: 1,
    borderBottomColor: '#00000033',
    borderWidth: 0.5
  },

  contentText: {
    fontSize: 12,
    lineHeight: 20,
    color: "#000",
  },
});
