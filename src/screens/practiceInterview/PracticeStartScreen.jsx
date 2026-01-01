
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
} from "react-native";

import ChoiceCard from "../../components/PracticeInterview/ChoiceCard";
import { Fonts } from "../../constants/fonts";

const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 390
export default function PracticeStartScreen({ navigation }) {
    const [selected, setSelected] = useState(null);

    // const handleContinue = () => {
    //     navigation.navigate("PracticeConversationScreen", {
    //         startChoice: selected,
    //     });
    // };

   const ROUTES = {
  jd: "JDInputScreen",
  role: "RoleSkillScreen",
  upload: "UploadJDScreen",
};

const handleContinue = () => {
  if (selected?.id) {
    navigation.navigate(ROUTES[selected.id]);
  }
};

    return (
        <View style={styles.container}>
            <StatusBar hidden />

            {/* ===== CONTENT COLUMN ===== */}
            <View style={styles.contentWrapper}>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>
                        Hi James, how do you want to start?
                    </Text>
                </View>

                <View style={styles.rowWrapper}>
                    {/* Row 1 */}
                    <View style={styles.row}>
                        {/* <ChoiceCard
                        icon={require("../../assets/images/job_desc.png")}
                        text="Use job description"
                        active={selected?.id === "jd"}
                        onPress={() =>
                            setSelected({ id: "jd", label: "Use job description" })
                        }
                    /> */}
                        <ChoiceCard
                            icon={require("../../assets/images/job_desc.png")}
                            text="Use job description"
                            iconBg="#DDEAFF"
                            active={selected?.id === "jd"}
                            onPress={() => setSelected({ id: "jd" })}
                        />
                        {/* <ChoiceCard
                        icon={require("../../assets/images/choose_role.png")}
                        text="Choose role & skills"
                        active={selected?.id === "role"}
                        onPress={() =>
                            setSelected({ id: "role", label: "Choose role & skills" })
                        }
                    /> */}
                        <ChoiceCard
                            icon={require("../../assets/images/choose_role.png")}
                            text="Choose role & skills"
                            iconBg="#EBE6FF"
                            active={selected?.id === "role"}
                            onPress={() => setSelected({ id: "role" })}
                        />
                    </View>

                    {/* Row 2 */}
                    <View style={styles.row}>
                        {/* <ChoiceCard
                        icon={require("../../assets/images/upload.png")}
                        text="Upload job description document"
                        active={selected?.id === "upload"}
                        onPress={() =>
                            setSelected({
                                id: "upload",
                                label: "Upload job description document",
                            })
                        }
                    /> */}
                        <ChoiceCard
                            icon={require("../../assets/icons/clip-file.png")}
                            text="Upload jd document"
                            iconBg="#C6F6D5"
                            active={selected?.id === "upload"}
                            onPress={() => setSelected({ id: "upload" })}
                        />
                    </View>
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
                <Text style={styles.continueText}>Next</Text>
            </TouchableOpacity>




        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        marginTop: 16,
        position: 'relative'
        // justifyContent: "center",
    },

    /* SAME COLUMN FOR TITLE + CHOICES */
    contentWrapper: {
        width: screenWidth - 32,              // 👈 FIGMA WIDTH
        alignSelf: "center",
        flex: 1,              // ✅ gives height
        position: "relative",
    },

    titleContainer: {
        // height: 64,
        justifyContent: "center",
        marginTop: 16,
    },

    titleText: {
        fontSize: 32 * scale,
        fontFamily: Fonts.Medium,
        fontWeight: "500",
        textAlign: "Left",
        lineHeight: 48 * scale,
        color: "#2A2A2A",
    },
    rowWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 128,
    },
    row: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },

    continueButton: {
        position: "absolute",
        bottom: 48,
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
        fontSize: 18 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 24 * scale,
    },

});
