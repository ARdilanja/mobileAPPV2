
import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Fonts } from "../../constants/fonts";

export default function ChoiceCard({ icon, text, active, onPress, full }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[
                styles.card,
                !full && styles.halfWidth,   // only first row
                full && styles.hugContent,   // third card hugs text
                active && styles.cardActive,
            ]}
        >
            <Image source={icon} style={styles.icon} />
            <Text
                style={[styles.text, active && styles.textActive]}

            >
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
        minWidth: 0,
    },

    halfWidth: {
        width: "48%",
    },

    hugContent: {
        alignSelf: "flex-start", // 👈 left aligned, not centered
    },
    cardActive: {
        backgroundColor: "#E8F1FF",
        borderColor: "#1677FF",
    },

    icon: {
        width: 16,
        height: 16,
        resizeMode: "contain",
        marginRight: 6,
    },

    text: {
        fontSize: 14,
        fontFamily: Fonts.Regular,
        color: "#111827",
        flexShrink: 1,     // 👈 KEY FIX
    },

    textActive: {
        color: "#1677FF",
        fontFamily: Fonts.Medium,
    },
});
