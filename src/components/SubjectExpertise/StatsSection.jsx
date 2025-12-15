import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function StatsSection() {
    return (
        <View style={styles.container}>
            {/* STATS ROW */}
            <View style={styles.row}>
                {/* LEFT STAT */}
                <View style={styles.stat}>
                    <Image
                        source={require("../../assets/images/status_1.png")}
                        style={styles.icon}
                    />

                    <View>
                        <Text style={styles.percent}>80%</Text>
                        <Text style={styles.label}>For this Interview</Text>
                    </View>
                </View>

                {/* VERTICAL DIVIDER */}
                <View style={styles.divider} />

                {/* RIGHT STAT */}
                <View style={styles.stat}>
                    <Image
                        source={require("../../assets/images/status_2.png")}
                        style={styles.icon}
                    />

                    <View>
                        <Text style={styles.percent}>80%</Text>
                        <Text style={styles.label}>For this Question</Text>
                    </View>
                </View>
            </View>

            {/* HORIZONTAL DIVIDER */}
            <View style={styles.bottomLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginTop: 16,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    stat: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        width: 32,
        height: 32,
        resizeMode: "contain",
        marginRight: 10, // 👈 space between icon & text
    },

    percent: {
        fontSize: 24,
        fontWeight: "700",
        color: "#000",
        lineHeight: 28,
    },

    label: {
        fontSize: 10,
        color: "#6B7280",
        marginTop: 2,
    },

    divider: {
        width: 1,
        height: 48,
        backgroundColor: "#E5E7EB",
    },

    bottomLine: {
        marginTop: 16,
        height: 1,
        backgroundColor: "#E5E7EB",
    },
});
