import React from "react";
import { View, Text, StyleSheet, Pressable, Dimensions, Image } from "react-native";
import { Fonts } from "../../constants/fonts";

const { width } = Dimensions.get("window");

export default function QuestionOverlay({
    title,
    question,
    isLast,
    onNext,
}) {
    return (
        <View style={styles.wrapper}>
            {/* Question Card */}
            <View style={styles.card}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.question}>{question}</Text>
            </View>

            {/* Button */}
            {isLast ? (
                // ✅ SUBMIT BUTTON
                <Pressable style={styles.submitButton} onPress={onNext}>
                    <Text style={styles.submitText}>Submit</Text>
                </Pressable>
            ) : (
                // ✅ NEXT CIRCLE BUTTON
                <Pressable style={styles.nextButton} onPress={onNext}>
                    <Image
                        source={require("../../assets/images/Next_arrow.png")}
                        style={styles.arrowIcon}
                        resizeMode="contain"
                    />
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: "absolute",
        bottom: 24,
        width: "100%",
        alignItems: "center",
    },

    // =========================
    // QUESTION CARD
    // =========================
    card: {
        width: width * 0.9,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 18,
        elevation: 6,
    },

    title: {
        fontSize: 16,
        fontFamily:Fonts.SemiBold,
        fontWeight: "600",
        marginBottom: 6,
        color: "#000",
    },

    question: {
        fontSize: 16,
        fontFamily:Fonts.Regular,
        lineHeight: 20,
        color: "#333",
    },

    // =========================
    // NEXT BUTTON (CIRCLE)
    // =========================
    nextButton: {
        marginTop: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#115CC7",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
    },

    arrowIcon: {
        width: 48,
        height: 48,
        tintColor: "#FFF", // optional if icon is white
    },

    // =========================
    // SUBMIT BUTTON (PILL)
    // =========================
    submitButton: {
        marginTop: 20,
        width: 140,
        height: 40,
        borderRadius: 56,
        backgroundColor: "#1E6CFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,
    },

    submitText: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "600",
    },
});
