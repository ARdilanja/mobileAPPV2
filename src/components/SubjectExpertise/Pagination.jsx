import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Pagination({
  activePage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const MAX_VISIBLE = 5;

  let start = Math.max(
    1,
    activePage - Math.floor(MAX_VISIBLE / 2)
  );
  let end = start + MAX_VISIBLE - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }

  const visiblePages = [];
  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {/* LEFT ARROW */}
        <TouchableOpacity
          disabled={activePage === 1}
          onPress={() => onPageChange(activePage - 1)}
          style={styles.arrowBtn}
        >
          <Text
            style={[
              styles.arrow,
              activePage === 1 && styles.disabled,
            ]}
          >
            ‹
          </Text>
        </TouchableOpacity>

        {/* PAGE NUMBERS */}
        {visiblePages.map((page) => {
          const isActive = page === activePage;

          return (
            <TouchableOpacity
              key={page}
              style={[
                styles.page,
                isActive && styles.activePage,
              ]}
              onPress={() => onPageChange(page)}
            >
              <Text
                style={[
                  styles.pageText,
                  isActive && styles.activePageText,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* RIGHT ARROW */}
        <TouchableOpacity
          disabled={activePage === totalPages}
          onPress={() => onPageChange(activePage + 1)}
          style={styles.arrowBtn}
        >
          <Text
            style={[
              styles.arrow,
              activePage === totalPages && styles.disabled,
            ]}
          >
            ›
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    marginVertical: 16,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 48,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },

  arrowBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  arrow: {
    fontSize: 22,
    color: "#787878",
  },

  page: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },

  activePage: {
    backgroundColor: "#0069FF",
  },

  pageText: {
    fontSize: 13,
    color: "#2D2D2D",
  },

  activePageText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  disabled: {
    opacity: 0.3,
  },
});

