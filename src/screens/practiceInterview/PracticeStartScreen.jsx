
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
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
        <StatusBar hidden />

            {/* ===== CONTENT COLUMN ===== */}
            <View style={styles.contentWrapper}>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Hi James, how do you want{"\n"}to start?
                    </Text>
                </View>

                {/* Row 1 */}
                {/* Row 1 – EXACTLY 2 IN ROW */}
                <View style={styles.twoColRow}>
                    <ChoiceCard
                        icon={require("../../assets/images/job_desc.png")}
                        text="Use job description"
                        active={selected?.id === "jd"}
                        onPress={() =>
                            setSelected({
                                id: "jd",
                                label: "Use job description",
                                icon: require("../../assets/images/job_desc.png"),
                            })
                        }
                    />

                    <ChoiceCard
                        icon={require("../../assets/images/choose_role.png")}
                        text="Choose role & skills"
                        active={selected?.id === "role"}
                        onPress={() =>
                            setSelected({
                                id: "role",
                                label: "Choose role & skills",
                                icon: require("../../assets/images/choose_role.png"),
                            })
                        }
                    />
                </View>

                {/* Row 2 – SINGLE CARD */}
                <View style={styles.singleRow}>
                    <ChoiceCard
                        icon={require("../../assets/images/upload.png")}
                        text="Upload job description document"
                        active={selected?.id === "upload"}
                        onPress={() =>
                            setSelected({
                                id: "upload",
                                label: "Upload job description document",
                                icon: require("../../assets/images/upload.png"),
                            })
                        }
                        full
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
        width: "90%",
        maxWidth: 360,   
        alignSelf: "center",
    },

    titleContainer: {
        height: 64,
        justifyContent: "center",
        marginBottom: 16,
    },

    titleText: {
        fontSize: 24,
        fontFamily: Fonts.Medium,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 32,
        color: "#2A2A2A",
    },


    twoColRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    singleRow: {
        alignItems: "flex-start",
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
        fontFamily: Fonts.Medium,
        fontWeight: "500",
        lineHeight: 24,
    },

});
