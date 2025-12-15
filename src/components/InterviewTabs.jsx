import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function InterviewTabs() {
    const [activeTab, setActiveTab] = useState("expertise");

    return (
        <View style={styles.wrapper}>
            <View style={styles.tabContainer}>
                {/* Subject Matter Expertise */}
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "expertise" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("expertise")}
                    activeOpacity={0.9}
                >
                    <Image
                        source={require("../assets/images/trophy-star.png")}
                        style={styles.icon}
                    />
                    <Text
                        style={[
                            styles.text,
                            activeTab === "expertise" && styles.activeText,
                        ]}
                        numberOfLines={1}
                    >
                        Subject Matter Expertise
                    </Text>
                </TouchableOpacity>

                {/* Communication Skills */}
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "communication" && styles.activeTab,
                    ]}
                    onPress={() => setActiveTab("communication")}
                    activeOpacity={0.9}
                >
                    <Image
                        source={require("../assets/images/megaphone.png")}
                        style={styles.icon}
                    />
                    <Text
                        style={[
                            styles.text,
                            activeTab === "communication" && styles.activeText,
                        ]}
                        numberOfLines={1}
                    >
                        Communication Skills
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        marginTop: 12,
    },

    /* Outer pill (325 × 32) */
    tabContainer: {
        width: 325,
        height: 32,
        flexDirection: "row",
        backgroundColor: "#E9EEF5",
        borderRadius: 16,
        padding: 2,
    },

    /* Each tab */
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
    },

    activeTab: {
        backgroundColor: "#2563EB",
    },

    /* Icon size tuned for 32px height */
    icon: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        marginRight: 4,
    },

    /* Text tuned WITHOUT custom font */
    text: {
        fontSize: 10,
        lineHeight: 12,      // slightly > fontSize for visual centering
        letterSpacing: 0,
        color: "#000",
    },

    activeText: {
        color: "#fff",
    },
});
