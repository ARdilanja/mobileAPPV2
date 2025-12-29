import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

export default function OptionChip({ label, onPress }) {
    return (
        <TouchableOpacity
            style={styles.chip}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 13,
        fontWeight: "500",
    },
});
