
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function Filters({
  filters = [],
  activeFilter,
  setActiveFilter,
}) {
  if (!filters.length) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {filters.map((item) => {
          const isActive = activeFilter === item;
          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.pill,
                isActive && styles.activePill,
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text
                style={[
                  styles.text,
                  isActive && styles.activeText,
                ]}
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
  wrapper: { alignSelf: "center", marginTop: 10 },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2563EB",
  },
  activePill: { backgroundColor: "#2563EB" },
  text: { fontSize: 12, color: "#2563EB" },
  activeText: { color: "#fff", fontWeight: "600" },
});
