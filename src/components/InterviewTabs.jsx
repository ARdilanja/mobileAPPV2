// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     Dimensions,
// } from "react-native";


// const SCREEN_WIDTH = Dimensions.get("window").width;
// const TAB_WIDTH = Math.min(SCREEN_WIDTH - 32, 325); 

// export default function InterviewTabs() {
//     const [activeTab, setActiveTab] = useState("expertise");

//     return (
//         <View style={styles.wrapper}>
//             {/* OUTER PILL */}
//             <View style={styles.tabContainer}>
//                 {/* LEFT TAB */}
//                 <TouchableOpacity
//                     style={[
//                         styles.tab,
//                         activeTab === "expertise" && styles.activeLeftTab,
//                     ]}
//                     onPress={() => setActiveTab("expertise")}
//                     activeOpacity={0.9}
//                 >
//                     <Image
//                         source={require("../assets/images/trophy-star.png")}
//                         style={[
//                             styles.icon,
//                             activeTab === "expertise" && styles.activeIcon,
//                         ]}
//                     />
//                     <Text
//                         style={[
//                             styles.text,
//                             activeTab === "expertise" && styles.activeText,
//                         ]}
//                         numberOfLines={1}
//                     >
//                         Subject Matter Expertise
//                     </Text>
//                 </TouchableOpacity>

//                 {/* RIGHT TAB */}
//                 <TouchableOpacity
//                     style={[
//                         styles.tab,
//                         activeTab === "communication" && styles.activeRightTab,
//                     ]}
//                     onPress={() => setActiveTab("communication")}
//                     activeOpacity={0.9}
//                 >
//                     <Image
//                         source={require("../assets/images/megaphone.png")}
//                         style={[
//                             styles.icon,
//                             activeTab === "communication" && styles.activeIcon,
//                         ]}
//                     />
//                     <Text
//                         style={[
//                             styles.text,
//                             activeTab === "communication" && styles.activeText,
//                         ]}
//                         numberOfLines={1}
//                     >
//                         Communication Skills
//                     </Text>
//                 </TouchableOpacity>
//             </View>

//             {/* CONTENT */}
//             <View style={styles.content}>
//                 {activeTab === "expertise" ? (
//                     <Text>📘 Subject Matter Expertise Content</Text>
//                 ) : (
//                     <Text>💬 Communication Skills Content</Text>
//                 )}
//             </View>
//         </View>
//     );
// }

// /* ---------- STYLES ---------- */
// const styles = StyleSheet.create({
//     wrapper: {
//         alignItems: "center",
//         marginTop: 12,
//     },

//     /* Outer segmented control */
//     tabContainer: {
//         width: TAB_WIDTH,
//         height: 32,
//         flexDirection: "row",
//         backgroundColor: "#E9EEF5",
//         borderRadius: 16,
//         padding: 2,
//         overflow: "hidden", // IMPORTANT: fixes border cut issue
//     },

//     /* Base tab */
//     tab: {
//         flex: 1,
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     /* Active LEFT tab (outer radius only) */
//     activeLeftTab: {
//         backgroundColor: "#2563EB",
//         borderTopLeftRadius: 14,
//         borderBottomLeftRadius: 14,
//     },

//     /* Active RIGHT tab (outer radius only) */
//     activeRightTab: {
//         backgroundColor: "#2563EB",
//         borderTopRightRadius: 14,
//         borderBottomRightRadius: 14,
//     },

//     /* Icons */
//     icon: {
//         width: 12,
//         height: 12,
//         resizeMode: "contain",
//         marginRight: 4,
//         tintColor: "#000",
//     },

//     activeIcon: {
//         tintColor: "#fff",
//     },

//     /* Text (no custom font) */
//     text: {
//         fontSize: 10,
//         lineHeight: 12,
//         color: "#000",
//     },

//     activeText: {
//         color: "#fff",
//     },

//     content: {
//         marginTop: 20,
//         alignSelf: "flex-start",
//         paddingHorizontal: 16,
//     },
// });





import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const TAB_WIDTH = Math.min(SCREEN_WIDTH - 32, 325);

export default function InterviewTabs({ activeTab, setActiveTab }) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.tabContainer}>
                {/* LEFT TAB */}
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "expertise" && styles.activeLeftTab,
                    ]}
                    onPress={() => setActiveTab("expertise")}
                    activeOpacity={0.9}
                >
                    <Image
                        source={require("../assets/images/trophy-star.png")}
                        style={[
                            styles.icon,
                            activeTab === "expertise" && styles.activeIcon,
                        ]}
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

                {/* RIGHT TAB */}
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === "communication" && styles.activeRightTab,
                    ]}
                    onPress={() => setActiveTab("communication")}
                    activeOpacity={0.9}
                >
                    <Image
                        source={require("../assets/images/megaphone.png")}
                        style={[
                            styles.icon,
                            activeTab === "communication" && styles.activeIcon,
                        ]}
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

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        marginTop: 12,
    },

    tabContainer: {
        width: TAB_WIDTH,
        height: 32,
        flexDirection: "row",
        backgroundColor: "#E9EEF5",
        borderRadius: 16,
        padding: 2,
        overflow: "hidden",
    },

    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    activeLeftTab: {
        backgroundColor: "#2563EB",
        borderTopLeftRadius: 14,
        borderBottomLeftRadius: 14,
    },

    activeRightTab: {
        backgroundColor: "#2563EB",
        borderTopRightRadius: 14,
        borderBottomRightRadius: 14,
    },

    icon: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        marginRight: 4,
        tintColor: "#000",
    },

    activeIcon: {
        tintColor: "#fff",
    },

    text: {
        fontSize: 10,
        lineHeight: 12,
        color: "#000",
    },

    activeText: {
        color: "#fff",
    },
});
