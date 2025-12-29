// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// export default function TabItem({ icon, label, active, onPress }) {
//     return (
//         <TouchableOpacity style={styles.container} onPress={onPress}>
//             <View style={styles.content}>
//                 <Image source={icon} style={styles.icon} />
//                 <Text style={[styles.text, active && styles.activeText]}>
//                     {label}
//                 </Text>
//             </View>

//             {active && <View style={styles.underline} />}
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         paddingHorizontal: 10, 
//     },
//     content: {
//         alignItems: "center",
//     },
//     icon: {
//         width: 24,
//         height: 24,
//         marginBottom: 4,
//     },
//     text: {
//         fontSize: 14,
//         color: "#777",
//         fontWeight: "500",
//     },
//     activeText: {
//         color: "#1677FF",
//         fontWeight: "600",
//     },
//     underline: {
//         marginTop: 8,
//         height: 2,
//         width: 90,              // matches text visually
//         backgroundColor: "#1677FF",
//         borderRadius: 2,
//     },
// });





import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function TabItem({ icon, label, active, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.content}>
                {icon && <Image source={icon} style={styles.icon} />}
                <Text style={[styles.text, active && styles.activeText]}>
                    {label}
                </Text>
            </View>

            {active && <View style={styles.underline} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "33.33%",        // ✅ 3 tabs per row max
        alignItems: "center",
        paddingVertical: 8,
    },
    content: {
        alignItems: "center",
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 4,
        resizeMode: "contain",
    },
    text: {
        fontSize: 14,
        color: "#777",
        fontWeight: "500",
        textAlign: "center",
    },
    activeText: {
        color: "#1677FF",
        fontWeight: "600",
    },
    underline: {
        marginTop: 8,
        height: 2,
        width: "80%",   // ✅ underline matches tab width
        backgroundColor: "#1677FF",
        borderRadius: 2,
    },
});
