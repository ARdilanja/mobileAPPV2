
// import React from "react";
// import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// export default function ChoiceCard({ icon, text, active, onPress }) {
//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             activeOpacity={0.85}
//             style={[styles.card, active && styles.cardActive]}
//         >
//             <Image source={icon} style={styles.icon} />
//             <Text style={[styles.text, active && styles.textActive]}>
//                 {text}
//             </Text>
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     card: {
//         flexDirection: "row",
//         alignItems: "center",
//         alignSelf: "flex-start",     // hug content
//         paddingVertical: 8,          // 👈 FIGMA
//         paddingHorizontal: 12,       // 👈 FIGMA
//         borderRadius: 24,            // 👈 FIGMA
//         borderWidth: 1,              // 👈 FIGMA
//         borderColor: "#E5E7EB",
//         backgroundColor: "#FFFFFF",
//     },

//     cardActive: {
//         backgroundColor: "#E8F1FF",
//         borderColor: "#1677FF",
//     },

//     icon: {
//         width: 16,
//         height: 16,
//         resizeMode: "contain",
//         marginRight: 4,              // 👈 FIGMA GAP
//     },

//     text: {
//         fontSize: 12,
//         fontWeight: "500",
//         color: "#111827",
//     },

//     textActive: {
//         color: "#1677FF",
//         fontWeight: "600",
//     },
// });


import React from "react";
import {
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Dimensions,
} from "react-native";
import { Fonts } from "../../constants/fonts";

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390
const CARD_GAP = 12;
const H_PADDING = 16;
const CARD_WIDTH = (screenWidth - (H_PADDING * 2) - CARD_GAP) / 2;

export default function ChoiceCard({
    icon,
    text,
    active,
    onPress,
    bgColor,
    iconBg,
}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[
                styles.card,
                { width: CARD_WIDTH },
                active && styles.cardActive,
            ]}
        >
            {/* Tick icon */}
            {active && (
                <Image
                    source={require("../../assets/icons/blue-tick.png")}
                    style={styles.tick}
                />
            )}

            {/* Icon */}
            <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
                <Image source={icon} style={styles.icon} />
            </View>

            {/* Text */}
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        bgColor: 'white',
        borderColor: "#E5E7EB",
        minHeight: 120,
        justifyContent: "space-between",
    },

    cardActive: {
        borderColor: "#235DFF",
    },

    tick: {
        position: "absolute",
        top: 12,
        right: 12,
        width: 16,
        height: 16,
    },

    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },

    icon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    text: {
        fontSize: 18 * scale,
        marginTop:8,
        fontFamily: Fonts.Regular,
        color: "#111827",
        lineHeight: 24 * scale,
    },
});
