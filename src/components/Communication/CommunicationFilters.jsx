import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const FILTER_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

const FILTERS = [
  "All",
//   "Ideal Answer",
  "Strengths",
  "Areas of Improvement",
  "Recommendations",
];

export default function CommunicationFilters({ activeFilter, setActiveFilter }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {FILTERS.map((item) => {
          const isActive = activeFilter === item;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.pill, isActive && styles.activePill]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[styles.text, isActive && styles.activeText]}
                numberOfLines={1}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: FILTER_WIDTH,
    alignSelf: "center",
    marginTop: 16,
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },

  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2563EB",
    backgroundColor: "#fff",
  },

  activePill: {
    backgroundColor: "#2563EB",
  },

  text: {
    fontSize: 12,
    color: "#2563EB",
  },

  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
});
