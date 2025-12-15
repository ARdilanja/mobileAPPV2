import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function Header() {
    return (
        <View style={styles.container}>
            {/* Left: Burger */}
            <TouchableOpacity activeOpacity={1}>
                <Image
                    source={require("../assets/images/burger-menu.png")}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* Center: Title */}
            <Text style={styles.title}>Digital Marketing Interview</Text>

            {/* Right: Profile */}
            <Image
                source={require("../assets/images/profile.png")}
                style={styles.profile}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        backgroundColor: "#fff",
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: "contain",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    profile: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
});
