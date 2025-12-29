// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     Dimensions,
//     Image,
//     ScrollView,
// } from "react-native";

// import TabItem from "../../components/PracticeInterview/TabItem";

// const { width } = Dimensions.get("window");

// /* ICON PLACEHOLDERS (replace images if needed) */
// const ROLE_ICON = require("../../assets/images/Interview_info_1.png");
// const EXP_ICON = require("../../assets/images/Interview_info_2.png");
// const LEVEL_ICON = require("../../assets/images/Interview_info_3.png");
// const TIME_ICON = require("../../assets/images/Interview_info_4.png");

// const TECH_ICON = require("../../assets/images/What _to _expect_1.png");
// const BEHAV_ICON = require("../../assets/images/What _to _expect_2.png");
// const SITU_ICON = require("../../assets/images/What _to _expect_3.png");

// const JOB_ICON = require("../../assets/images/Interview_info_1.png");
// const BACK_ICON = require("../../assets/images/back.png");

// export default function PracticeInterviewInfoScreen({ navigation }) {
//     const [activeTab, setActiveTab] = useState("info");

//     return (
//         <View style={styles.container}>
//             {/* HEADER */}
//             <View style={styles.header}>
//                 <TouchableOpacity
//                     onPress={() => navigation.goBack()}
//                     style={styles.backBtn}
//                     activeOpacity={0.7}
//                 >
//                     <Image
//                         source={BACK_ICON}
//                         style={styles.backIcon}
//                     />
//                 </TouchableOpacity>

//                 <Text style={styles.headerTitle}>
//                     Before you begin, here's everything you need to know:
//                 </Text>
//             </View>

//             {/* TABS */}
//             <View style={styles.tabsContainer}>
//                 <ScrollView
//                     horizontal
//                     showsHorizontalScrollIndicator={false}
//                     contentContainerStyle={styles.tabsWrapper}
//                 >
//                     <TabItem
//                         label="Interview info"
//                         active={activeTab === "info"}
//                         onPress={() => setActiveTab("info")}
//                     />
//                     <TabItem
//                         label="What to expect"
//                         active={activeTab === "expect"}
//                         onPress={() => setActiveTab("expect")}
//                     />
//                     <TabItem
//                         label="Sample Job description"
//                         active={activeTab === "sample"}
//                         onPress={() => setActiveTab("sample")}
//                     />
//                 </ScrollView>
//             </View>



//             {/* ===== INTERVIEW INFO ===== */}
//             {activeTab === "info" && (
//                 <>
//                     <Text style={styles.sectionTitle}>Interview info</Text>

//                     <View style={[styles.card, styles.infoCard]}>
//                         <InfoRow icon={ROLE_ICON} text="Java developer" />
//                         <InfoRow icon={EXP_ICON} text="1 - 3 years of experience" />
//                         <InfoRow icon={LEVEL_ICON} text="Intermediate level" />
//                         <InfoRow icon={TIME_ICON} text="60 Minutes" />
//                     </View>
//                 </>
//             )}

//             {/* ===== WHAT TO EXPECT ===== */}
//             {activeTab === "expect" && (
//                 <>
//                     <Text style={styles.sectionTitle}>What to expect</Text>

//                     <View style={[styles.card, styles.expectCard]}>
//                         <InfoRow icon={TECH_ICON} text="Technical questions" />
//                         <InfoRow icon={BEHAV_ICON} text="Behavioral questions" />
//                         <InfoRow icon={SITU_ICON} text="Situational questions" />
//                     </View>
//                 </>
//             )}

//             {/* ===== SAMPLE JOB DESCRIPTION ===== */}
//             {activeTab === "sample" && (
//                 <>
//                     <Text style={styles.sectionTitle}>Sample job description</Text>

//                     <View style={[styles.card, styles.sampleCard]}>
//                         <View style={styles.jobHeader}>
//                             <Image source={JOB_ICON} style={styles.rowIcon} />
//                             <Text style={styles.jobTitle}>Java Developer</Text>
//                         </View>

//                         <Text style={styles.jobDesc}>
//                             We are seeking a skilled Java Developer with 2 to 3
//                             years of experience to join our dynamic team. The
//                             ideal candidate must have strong expertise in core
//                             Java, REST APIs, and backend development.
//                         </Text>
//                     </View>
//                 </>
//             )}

//             {/* START BUTTON */}
//             <TouchableOpacity style={styles.startBtn}>
//                 <Text style={styles.startText}>Start Interview</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

//  // Reusable row component to display an icon with text


// function InfoRow({ icon, text }) {
//     return (
//         <View style={styles.row}>
//             <Image source={icon} style={styles.rowIcon} />
//             <Text style={styles.rowText}>{text}</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F5F5F5",
//         padding: width * 0.05,
//         // paddingBottom: 90, 
//     },
//     tabsContainer: {
//         height: 48,
//         marginBottom: 16,
//     },

//     header: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 20,
//     },

//     backBtn: {
//         padding: 4,              
//         marginRight: 12,
//     },

//     backIcon: {
//         width: 24,
//         height: 24,
//         resizeMode: "contain",
//         marginBottom:13
//     },
//     backText: {
//         fontSize: 26,
//         marginRight: 12,
//     },

//     headerTitle: {
//         fontSize: 14,
//         color: "#111827",
//         flex: 1,
//         lineHeight: 20,
//     },

//     tabsWrapper: {
//         flexDirection: "row",
//         paddingHorizontal: 6,
//         alignItems: "center",
//         gap: 2,                 // ✅ proper spacing
//     },

//     sectionTitle: {
//         fontSize: 16,
//         fontWeight: "700",
//         color: "#111827",
//         marginBottom: 12,
//     },

//     card: {
//         borderRadius: 16,
//         padding: 16,
//         gap: 14,
//     },

//     infoCard: {
//         backgroundColor: "#DFE3FF",
//         borderWidth: 1,
//         borderColor: "#0178FF",
//     },

//     expectCard: {
//         backgroundColor: "#E0D8FF",
//         borderWidth: 1,
//         borderColor: "#590CAC",
//     },

//     sampleCard: {
//         backgroundColor: "#FDDFCE",
//         borderWidth: 1,
//         borderColor: "#AC5B2F",
//     },

//     row: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 10,
//     },

//     rowIcon: {
//         width: 20,
//         height: 20,
//         resizeMode: "contain",
//     },

//     rowText: {
//         fontSize: 14,
//         color: "#111827",
//     },

//     jobHeader: {
//         flexDirection: "row",
//         alignItems: "center",
//         gap: 8,
//         marginBottom: 6,
//     },

//     jobTitle: {
//         fontSize: 14,
//         fontWeight: "700",
//         color: "#111827",
//     },

//     jobDesc: {
//         fontSize: 13,
//         color: "#374151",
//         lineHeight: 18,
//     },

//     startBtn: {
//         position: "absolute",
//         bottom: 20,
//         left: width * 0.05,
//         right: width * 0.05,
//         backgroundColor: "#0178FF",
//         height: 52,
//         borderRadius: 28,
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     startText: {
//         color: "#fff",
//         fontSize: 16,
//         fontWeight: "700",
//     },
// });




import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
} from "react-native";

import TabItem from "../../components/PracticeInterview/TabItem";

const { width } = Dimensions.get("window");

/* ICON PLACEHOLDERS (replace images if needed) */
const ROLE_ICON = require("../../assets/images/Interview_info_1.png");
const EXP_ICON = require("../../assets/images/Interview_info_2.png");
const LEVEL_ICON = require("../../assets/images/Interview_info_3.png");
const TIME_ICON = require("../../assets/images/Interview_info_4.png");

const TECH_ICON = require("../../assets/images/What _to _expect_1.png");
const BEHAV_ICON = require("../../assets/images/What _to _expect_2.png");
const SITU_ICON = require("../../assets/images/What _to _expect_3.png");

const JOB_ICON = require("../../assets/images/Interview_info_1.png");
const BACK_ICON = require("../../assets/images/back.png");

export default function PracticeInterviewInfoScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState("info");

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backBtn}
                    activeOpacity={0.7}
                >
                    <Image
                        source={BACK_ICON}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Before you begin, here's everything you need to know:
                </Text>
            </View>

            {/* TABS */}
            <View style={styles.tabsContainer}>
                <View style={styles.tabsWrapper}>
                    <TabItem
                        label="Interview info"
                        active={activeTab === "info"}
                        onPress={() => setActiveTab("info")}
                    />
                    <TabItem
                        label="What to expect"
                        active={activeTab === "expect"}
                        onPress={() => setActiveTab("expect")}
                    />
                    <TabItem
                        label="Sample Job description"
                        active={activeTab === "sample"}
                        onPress={() => setActiveTab("sample")}
                    />
                </View>
            </View>



            {/* ===== INTERVIEW INFO ===== */}
            {activeTab === "info" && (
                <>
                    <Text style={styles.sectionTitle}>Interview info</Text>

                    <View style={[styles.card, styles.infoCard]}>
                        <InfoRow icon={ROLE_ICON} text="Java developer" />
                        <InfoRow icon={EXP_ICON} text="1 - 3 years of experience" />
                        <InfoRow icon={LEVEL_ICON} text="Intermediate level" />
                        <InfoRow icon={TIME_ICON} text="60 Minutes" />
                    </View>
                </>
            )}

            {/* ===== WHAT TO EXPECT ===== */}
            {activeTab === "expect" && (
                <>
                    <Text style={styles.sectionTitle}>What to expect</Text>

                    <View style={[styles.card, styles.expectCard]}>
                        <InfoRow icon={TECH_ICON} text="Technical questions" />
                        <InfoRow icon={BEHAV_ICON} text="Behavioral questions" />
                        <InfoRow icon={SITU_ICON} text="Situational questions" />
                    </View>
                </>
            )}

            {/* ===== SAMPLE JOB DESCRIPTION ===== */}
            {activeTab === "sample" && (
                <>
                    <Text style={styles.sectionTitle}>Sample job description</Text>

                    <View style={[styles.card, styles.sampleCard]}>
                        <View style={styles.jobHeader}>
                            <Image source={JOB_ICON} style={styles.rowIcon} />
                            <Text style={styles.jobTitle}>Java Developer</Text>
                        </View>

                        <Text style={styles.jobDesc}>
                            We are seeking a skilled Java Developer with 2 to 3 years of experience to join our dynamic team. The ideal candidate must have strong expertise in
                        </Text>
                    </View>
                </>
            )}

            {/* START BUTTON */}
            <TouchableOpacity style={styles.startBtn}>
                <Text style={styles.startText}>Start Interview</Text>
            </TouchableOpacity>
        </View>
    );
}

// Reusable row component to display an icon with text


function InfoRow({ icon, text }) {
    return (
        <View style={styles.row}>
            <Image source={icon} style={styles.rowIcon} />
            <Text style={styles.rowText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: width * 0.05,
        // paddingBottom: 90, 
    },
    tabsContainer: {
        // height: 48,
        marginBottom: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },

    backBtn: {
        padding: 4,
        marginRight: 12,
    },

    backIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        marginBottom: 13
    },
    backText: {
        fontSize: 26,
        marginRight: 12,
    },

    headerTitle: {
        fontSize: 14,
        color: "#111827",
        flex: 1,
        lineHeight: 20,
    },

    tabsWrapper: {
        flexDirection: "row",
        flexWrap: "wrap",        // ✅ allows next line
        alignItems: "flex-start",
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },

    card: {
        borderRadius: 16,
        padding: 16,
        gap: 14,
    },

    infoCard: {
        backgroundColor: "#DFE3FF",
        borderWidth: 1,
        borderColor: "#0178FF",
    },

    expectCard: {
        backgroundColor: "#E0D8FF",
        borderWidth: 1,
        borderColor: "#590CAC",
    },

    sampleCard: {
        backgroundColor: "#FDDFCE",
        borderWidth: 1,
        borderColor: "#AC5B2F",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    rowIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
    },

    rowText: {
        fontSize: 14,
        color: "#111827",
        lineHeight: 30,
    },

    jobHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 6,
    },

    jobTitle: {
        fontSize: 14,
        fontWeight: "700",
        color: "#111827",
    },

    jobDesc: {
        fontSize: 15,
        color: "#374151",
        lineHeight:20,
    },

    startBtn: {
        position: "absolute",
        bottom: 20,
        left: width * 0.05,
        right: width * 0.05,
        backgroundColor: "#0178FF",
        height: 52,
        borderRadius: 28,
        alignItems: "center",
        justifyContent: "center",
    },

    startText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },
});