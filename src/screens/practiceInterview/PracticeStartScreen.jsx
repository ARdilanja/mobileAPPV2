

// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Dimensions,
// } from "react-native";

// import ChoiceCard from "../../components/PracticeInterview/ChoiceCard";

// const { width, height } = Dimensions.get("window");

// export default function PracticeStartScreen({ navigation }) {
//     const [selected, setSelected] = useState(null);

//     const handleContinue = () => {
//         navigation.navigate("PracticeConversationScreen", {
//             startChoice: selected,
//         });
//     };

//     return (
//         <View style={styles.container}>
//             {/* Centered Title */}
//             <View style={styles.titleContainer}>
//                 <Text style={styles.titleText}>
//                     Hi James, how do you want{"\n"}to start?
//                 </Text>
//             </View>


//             {/* Row 1: Two choices centered */}
//             <View style={styles.row}>
//                 <ChoiceCard
//                     icon={require("../../assets/images/job_desc.png")}
//                     text="Use job description"
//                     active={selected?.id === "jd"}
//                     onPress={() => setSelected({ id: "jd", label: "Use job description" })}
//                 />
//                 <ChoiceCard
//                     icon={require("../../assets/images/choose_role.png")}
//                     text="Choose role & skills"
//                     active={selected?.id === "role"}
//                     onPress={() => setSelected({ id: "role", label: "Choose role & skills" })}
//                 />
//             </View>

//             {/* Row 2: Single choice centered */}
//             <View style={styles.row}>
//                 <ChoiceCard
//                     icon={require("../../assets/images/upload.png")}
//                     text="Upload job description document"
//                     active={selected?.id === "upload"}
//                     onPress={() => setSelected({ id: "upload", label: "Upload job description document" })}
//                 />
//             </View>

//             <TouchableOpacity
//                 style={[styles.button, !selected && { opacity: 0.5 }]}
//                 disabled={!selected}
//                 onPress={handleContinue}
//             >
//                 <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // paddingHorizontal: 20,
//         backgroundColor: "#F5F5F5",
//         // alignItems: "center",      // Centers content horizontally
//         justifyContent: "center",  // Centers content vertically like your 2nd image
//     },

//     titleContainer: {
//         width: 320,
//         height: 64,
//         marginLeft: 24,          // 👈 EXACT FIGMA LEFT
//         justifyContent: "center",
//         marginBottom:15
//     },

//     titleText: {
//         fontSize: 24,
//         fontWeight: "700",
//         textAlign: "center",
//         lineHeight: 32, // IMPORTANT for 2-line vertical balance
//         color: "#2A2A2A",
//         alignSelf: "center",
//     },

// row: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     // justifyContent: "center",  // 👈 center the group

//     gap: 8,                    // spacing between pills
//     marginBottom: 12,
// },

//     button: {
//         position: "absolute",
//         bottom: 20,
//         left: 20,
//         right: 20,
//         backgroundColor: "#0178FF",
//         paddingVertical: 16,
//         borderRadius: 48,
//         alignItems: "center",
//     },
//     buttonText: {
//         color: "#FFFFFF",
//         fontSize: 18,
//         fontWeight: "700",
//     },
// });




import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

import ChoiceCard from "../../components/PracticeInterview/ChoiceCard";
import { Fonts } from "../../constants/fonts";

export default function PracticeStartScreen({ navigation }) {
    const [selected, setSelected] = useState(null);

    const handleContinue = () => {
        navigation.navigate("PracticeConversationScreen", {
            startChoice: selected,
        });
    };

    return (
        <View style={styles.container}>

            {/* ===== CONTENT COLUMN ===== */}
            <View style={styles.contentWrapper}>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Hi James, how do you want{"\n"}to start?
                    </Text>
                </View>

                {/* Row 1 */}
                <View style={styles.row}>
                    <ChoiceCard
                        icon={require("../../assets/images/job_desc.png")}
                        text="Use job description"
                        active={selected?.id === "jd"}
                        onPress={() =>
                            setSelected({ id: "jd", label: "Use job description" })
                        }
                    />
                    <ChoiceCard
                        icon={require("../../assets/images/choose_role.png")}
                        text="Choose role & skills"
                        active={selected?.id === "role"}
                        onPress={() =>
                            setSelected({ id: "role", label: "Choose role & skills" })
                        }
                    />
                </View>

                {/* Row 2 */}
                <View style={styles.row}>
                    <ChoiceCard
                        icon={require("../../assets/images/upload.png")}
                        text="Upload job description document"
                        active={selected?.id === "upload"}
                        onPress={() =>
                            setSelected({
                                id: "upload",
                                label: "Upload job description document",
                            })
                        }
                    />
                </View>

            </View>

            {/* Continue Button */}
            <TouchableOpacity
                disabled={!selected}
                onPress={handleContinue}
                activeOpacity={0.85}
                style={[
                    styles.continueButton,
                    !selected && styles.continueDisabled,
                ]}
            >
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        justifyContent: "center",
    },

    /* SAME COLUMN FOR TITLE + CHOICES */
    contentWrapper: {
        width: 320,              // 👈 FIGMA WIDTH
        alignSelf: "center",
    },

    titleContainer: {
        height: 64,
        justifyContent: "center",
        marginBottom: 16,
    },

    titleText: {
        fontSize: 24,
        fontFamily:Fonts.Medium,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 32,
        color: "#2A2A2A",
    },

    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 12,
    },

    continueButton: {
        position: "absolute",
        bottom: 16,
        left: 16,
        right: 16,
        height: 56,
        backgroundColor: "#0178FF",
        borderRadius: 48,
        paddingVertical: 12,
        paddingHorizontal: 40,
        justifyContent: "center",
        alignItems: "center",
    },

    continueDisabled: {
        opacity: 0.5,
    },

    continueText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 24,
    },

});
