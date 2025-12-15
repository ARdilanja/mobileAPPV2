import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Fonts } from "../constants/fonts";

export default function Header({title}) {
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
            <Text style={styles.title}>{title}</Text>

            {/* Right: Profile */}
            <View style={styles.profileWrapper}>
                <Image
                    source={require("../assets/images/profile.png")}
                    style={styles.profile}
                />
            </View>

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
        fontSize: 14,
        fontFamily: Fonts.SemiBold,
        color: "#000",
    },
    profileWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "#E6F0FF", 
        borderWidth: 2,
        borderColor: "#0087FF",      
        alignItems: "center",
        justifyContent: "center",
    },

    profile: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },

});
