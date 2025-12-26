

// import React from "react";
// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// export default function ChoiceCard({ icon, text, active, onPress }) {
//     return (
//         <TouchableOpacity
//             onPress={onPress}
//             activeOpacity={0.8}
//             style={[
//                 styles.card,
//                 active && styles.cardActive,
//             ]}
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
//         // alignItems: "center",
//         alignSelf: "flex-start",   // Hug content
//         paddingVertical: 8,        // 👈 Figma
//         paddingHorizontal: 12,     // 👈 Figma
//         borderRadius: 24,          // 👈 Figma
//         borderWidth: 1,            // 👈 Figma
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
//         marginRight: 4,            // 👈 Figma gap
//     },
//     text: {
//         fontSize: 12,              // Better legibility than 10.5
//         fontWeight: "500",
//         color: "#111827",
//     },
//     textActive: {
//         color: "#1677FF",
//         fontWeight: "600",
//     },
// });




import React from "react";
import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function ChoiceCard({ icon, text, active, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            style={[styles.card, active && styles.cardActive]}
        >
            <Image source={icon} style={styles.icon} />
            <Text style={[styles.text, active && styles.textActive]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",     // hug content
        paddingVertical: 8,          // 👈 FIGMA
        paddingHorizontal: 12,       // 👈 FIGMA
        borderRadius: 24,            // 👈 FIGMA
        borderWidth: 1,              // 👈 FIGMA
        borderColor: "#E5E7EB",
        backgroundColor: "#FFFFFF",
    },

    cardActive: {
        backgroundColor: "#E8F1FF",
        borderColor: "#1677FF",
    },

    icon: {
        width: 16,
        height: 16,
        resizeMode: "contain",
        marginRight: 4,              // 👈 FIGMA GAP
    },

    text: {
        fontSize: 12,
        fontWeight: "500",
        color: "#111827",
    },

    textActive: {
        color: "#1677FF",
        fontWeight: "600",
    },
});
