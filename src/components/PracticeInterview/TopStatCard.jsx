import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function TopStatCard({ title, value, bg }) {
    return (
        <View style={[styles.card, { backgroundColor: bg }]}>
            <View style={styles.row}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: width * 0.43,
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 14,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,          // ✅ label size
        color: "#222",
        // fontWeight: "500",
    },
    value: {
        fontSize: 18,          // ✅ number size
        fontWeight: "700",
        color: "#000",
        fontWeight: "500",
    },
});
