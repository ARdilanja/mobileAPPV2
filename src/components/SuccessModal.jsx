import React from "react";
import { View, StyleSheet, Image } from "react-native";

export default function SuccessModal({ visible, children }) {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.card}>
                <Image
                    source={require("../assets/images/success_modal.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
                {children}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: 300,
        paddingVertical: 24,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        alignItems: "center",

        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,

        // Android shadow
        elevation: 6,
    },
    image: {
        width: 160,
        height: 160,
        marginBottom: 12,
    },
});
