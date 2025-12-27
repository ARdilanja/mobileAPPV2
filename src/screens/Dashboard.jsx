import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";
import { Fonts } from "../constants/fonts";
import Header from "../components/Header";
import ProgressLineChart from "../components/ProgressLineChart";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjhjYjlkMDQ3Yjk0MDZhN2JiMTdiMjQ2IiwiZW1haWwiOiJ1ZGVzaGluaWV0aGFyYW5nYUBnbWFpbC5jb20iLCJpYXQiOjE3NjY3NDQ0NzgsImV4cCI6MTc2NjgzMDg3OH0.0qwVmUswoDaKr8I4TyLxCVJOZRnCe5ghZEwbhugQO0c";
    const CANDIDATE_ID = '6672592aa821dc12db9fc26e';

    const [selectedCard, setSelectedCard] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [interviewData, setInterviewData] = useState(null);

    // ✅ NEW STATE
    const [latestCompleted, setLatestCompleted] = useState([]);

    // ===============================
    // EXISTING API (STATS)
    // ===============================
    const fetchInterviewDetails = async () => {
        try {
            const response = await axios.post(
                "https://api.arinnovate.io/api/getStudentDetailsInterview",
                {
                    id: CANDIDATE_ID,
                },
                {
                    headers: {
                        "x-access-token": token,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("✅ Dashboard Interview Count API:", response.data);

            setInterviewData({
                completedInterviews: response.data.completedInterviews || 0,
                expired: response.data.expired || 0,
                availableInterviews: response.data.availableInterviews || 0,
            });

        } catch (error) {
            console.error(
                "❌ Error fetching interview details:",
                error.response?.data || error.message
            );
        }
    };


    // ===============================
    // ✅ REUSED COMPLETED INTERVIEWS API
    // ===============================
    const fetchLatestCompletedInterviews = async () => {
        try {
            const res = await axios.get(
                `${API_BASE_URL}/getScheduleInterCandByStatus/${CANDIDATE_ID}`,
                {
                    params: {
                        status: "completed",
                    },
                }
            );

            const allCompleted = res?.data?.data || [];

            // ✅ SORT BY createdAt (LATEST FIRST)
            const sortedByLatest = allCompleted.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );

            // ✅ TAKE ONLY TOP 5
            const latestFive = sortedByLatest.slice(0, 5);

            setLatestCompleted(latestFive);

        } catch (error) {
            console.error("Latest completed interviews error:", error);
            setLatestCompleted([]);
        }
    };


    useEffect(() => {
        fetchInterviewDetails();
        fetchLatestCompletedInterviews();
    }, []);

    return (
        <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {/* INTERVIEWS CARDS */}
                <Text style={styles.sectionTitle}>Interviews</Text>

                <View style={styles.cardRow}>
                    <InfoCard
                        icon={require("../assets/icons/Case.png")}
                        title="Available"
                        value={interviewData?.availableInterviews ?? 0}
                        color="#3B82F6"
                    />

                    <InfoCard
                        icon={require("../assets/icons/list.png")}
                        title="Completed"
                        value={interviewData?.completedInterviews ?? 0}
                        color="#10B981"
                    />

                    <InfoCard
                        icon={require("../assets/icons/case-clock.png")}
                        title="Expired"
                        value={interviewData?.expired ?? 0}
                        color="#F59E0B"
                    />
                </View>

                {/* PROGRESSION */}
                <Text style={styles.sectionTitle}>Your Progression</Text>

                <ProgressLineChart
                    labels={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
                    datasets={[
                        {
                            data: [70, 68, 50, 55, 62, 70, 78, 58, 48, 60],
                            color: () => "#9D00EA",
                            strokeWidth: 2
                        },
                        {
                            data: [20, 35, 30, 60, 15, 25, 55, 45, 40, 85],
                            color: () => "#1A6CFF",
                            strokeWidth: 2
                        },
                        {
                            data: [55, 50, 25, 45, 75, 60, 65, 30, 25, 35],
                            color: () => "#00BDAC",
                            strokeWidth: 2
                        }
                    ]}
                    legend={[
                        { label: "Overall", color: "#9D00EA" },
                        { label: "Subject Matter Expertise", color: "#1A6CFF" },
                        { label: "Communication Skills", color: "#00BDAC" }
                    ]}
                />

                {/* LATEST COMPLETED INTERVIEWS */}
                <Text style={styles.sectionTitle}>Latest Completed Interviews</Text>
            </View>

            {/* ✅ DYNAMIC COMPLETED INTERVIEWS */}
            {latestCompleted.map((item, index) => {
                const logoPath = item?.companyId?.companyLogo?.logo;
                const logoUrl = logoPath
                    ? `${API_BASE_URL}/openProfpic?photo=${logoPath}`
                    : null;

                return (
                    <InterviewCard
                        key={item._id}
                        name={item?.companyId?.company_name}
                        role={item?.job_title}
                        logo={logoUrl ? { uri: logoUrl } : null}
                        isSelected={selectedCard === index}
                        onPress={() => setSelectedCard(index)}
                        interviewId={item._id}
                    />
                );
            })}
        </ScrollView>
    );
}

/* ---------------- COMPONENTS ---------------- */

const InfoCard = ({ title, value, color, icon }) => (
    <View style={styles.infoCard}>
        <View style={styles.titleRow}>
            <View style={styles.iconWrapper}>
                <Image source={icon} style={styles.icon} resizeMode="contain" />
            </View>
            <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <Text style={[styles.cardValue, { color }]}>{value}</Text>
    </View>
);

const InterviewCard = ({ name, role, logo, isSelected, onPress, interviewId }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[
                styles.interviewCard,
                isSelected && styles.selectedCard
            ]}
        >
            <View style={styles.interviewLeft}>
                <View style={styles.logoWrapper}>
                    {logo && (
                        <Image source={logo} style={styles.companyLogo} resizeMode="contain" />
                    )}
                </View>

                <View>
                    <Text style={styles.company}>{name}</Text>
                    <Text style={styles.role}>{role}</Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() =>
                    navigation.navigate("InterviewScreen", {
                        interviewId,
                    })
                }
            >
                <View
                    style={[
                        styles.button,
                        isSelected && styles.selectedButton
                    ]}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            isSelected && styles.selectedButtonText
                        ]}
                    >
                        View Report
                    </Text>
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 24,
        paddingTop: 20,
    },

    sectionTitle: {
        fontSize: 14,
        color: "#111827",
        fontFamily: Fonts.SemiBold,
        marginBottom: 12
    },

    cardRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },

    infoCard: {
        width: "31%",
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 12,
        alignItems: "center",
        elevation: 2
    },

    titleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 6,
    },

    iconWrapper: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8
    },

    icon: {
        width: 12,
        height: 12
    },

    cardTitle: {
        fontSize: 12,
        fontFamily: Fonts.Regular,
    },

    cardValue: {
        fontSize: 24,
        fontFamily: Fonts.Bold,
    },

    interviewCard: {
        backgroundColor: "#E8F1FF",
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 12,
        paddingLeft: 24,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2
    },

    interviewLeft: {
        flexDirection: "row",
        alignItems: "center"
    },

    logoWrapper: {
        width: 48,
        height: 48,
        marginRight: 12
    },

    companyLogo: {
        width: "100%",
        height: "100%"
    },

    company: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827"
    },

    role: {
        fontSize: 13,
        color: "#5C6363",
        marginTop: 2,
        fontFamily: Fonts.Light,
    },

    button: {
        borderWidth: 1,
        borderColor: "#0069FF",
        borderRadius: 6,
        paddingVertical: 7.5,
        paddingHorizontal: 18
    },

    selectedCard: {
        backgroundColor: "#FFFFFF"
    },

    selectedButton: {
        borderColor: "#10B981"
    },

    selectedButtonText: {
        color: "#10B981"
    },

    buttonText: {
        color: "#0069FF",
        fontSize: 14,
        fontFamily: Fonts.Medium
    }
});
