import React, { useState } from "react";
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

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
    const [selectedCard, setSelectedCard] = useState(null);
    return (
        <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
            <Header title="Dashboard" />
            <View style={styles.container}>
                {/* INTERVIEWS CARDS */}
                <Text style={styles.sectionTitle}>Interviews</Text>

                <View style={styles.cardRow}>
                    <InfoCard icon={require("../assets/icons/Case.png")} title="Available" value="08" color="#3B82F6" />
                    <InfoCard icon={require("../assets/icons/list.png")} title="Completed" value="02" color="#10B981" />
                    <InfoCard icon={require("../assets/icons/case-clock.png")} title="Incomplete" value="08" color="#F59E0B" />
                </View>

                {/* PROGRESSION */}
                <Text style={styles.sectionTitle}>Your Progression</Text>

                {/* <View style={styles.chartWrapper}>
                    <LineChart
                        data={{
                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
                            datasets: [
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
                            ],

                        }}
                        width={screenWidth - 48}
                        height={250}
                        withDots={false}
                        withInnerLines={true}
                        withOuterLines={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                        bezier
                        chartConfig={{
                            backgroundGradientFrom: "#FFFFFF",
                            backgroundGradientTo: "#FFFFFF",
                            fillShadowGradientFrom: "#3B82F6",
                            fillShadowGradientTo: "#FFFFFF",
                            fillShadowGradientOpacity: 0.15,
                            decimalPlaces: 0,
                            color: () => "#E5E7EB",
                            labelColor: () => "#9CA3AF",
                            propsForBackgroundLines: {
                                strokeDasharray: "4",
                                stroke: "#E5E7EB"
                            }
                        }}
                        style={styles.chart}
                    />
                    <View style={styles.chartLegend}>
                        <LegendItem color="#9D00EA" label="Overall" />
                        <LegendItem color="#1A6CFF" label="Subject Matter Expertise" />
                        <LegendItem color="#00BDAC" label="Communication Skills" />
                    </View>
                </View> */}
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

            <InterviewCard
                name="Infosys"
                role="React Native Developer"
                logo={require("../assets/icons/infosys-logo.png")}
             isSelected={selectedCard === 0}
    onPress={() => setSelectedCard(0)}
            />

            <InterviewCard
                name="Accenture"
                role="UX Designer"
                logo={require("../assets/icons/Accenture-logo.png")}
            isSelected={selectedCard === 1}
    onPress={() => setSelectedCard(1)}
            />

            <InterviewCard
                name="Recroot"
                role="UI Designer"
                success
                logo={require("../assets/icons/Recroot-logo.png")}
                isSelected={selectedCard === 2}
    onPress={() => setSelectedCard(2)}
    />
    <InterviewCard
                name="Infosys"
                role="React Native Developer"
                logo={require("../assets/icons/infosys-logo.png")}
             isSelected={selectedCard === 3}
    onPress={() => setSelectedCard(3)}
            />
            <InterviewCard
                name="Infosys"
                role="React Native Developer"
                logo={require("../assets/icons/infosys-logo.png")}
             isSelected={selectedCard === 4}
    onPress={() => setSelectedCard(4)}
            />
            <InterviewCard
                name="Infosys"
                role="React Native Developer"
                logo={require("../assets/icons/infosys-logo.png")}
             isSelected={selectedCard === 5}
    onPress={() => setSelectedCard(5)}
            />


        </ScrollView>
    );
}

/* ---------------- COMPONENTS ---------------- */

const InfoCard = ({ title, value, color, icon }) => (
    <View style={styles.infoCard}>

        {/* ICON + TITLE ROW */}
        <View style={styles.titleRow}>
            <View style={[styles.iconWrapper,]}>
                <Image
                    source={icon}
                    style={styles.icon}
                    resizeMode="contain"
                />
            </View>

            <Text style={[styles.cardTitle]}>{title}</Text>
        </View>

        {/* VALUE */}
        <Text style={[styles.cardValue, { color }]}>{value}</Text>

    </View>
);

const InterviewCard = ({ name, role, logo, isSelected, onPress }) => (
    <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[
            styles.interviewCard,
            isSelected && styles.selectedCard
        ]}
    >
        {/* LEFT */}
        <View style={styles.interviewLeft}>
            <View style={styles.logoWrapper}>
                <Image source={logo} style={styles.companyLogo} resizeMode="contain" />
            </View>

            <View>
                <Text style={styles.company}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
            </View>
        </View>

        {/* RIGHT BUTTON */}
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
);


/* ---------------- STYLES ---------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 0,

    },

    sectionTitle: {
        fontSize: 14,
        // fontWeight: "600",
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
        justifyContent: 'center',
        marginBottom: 6,
    },

    iconWrapper: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        marginRight: '8px'
    },

    icon: {
        width: 12,
        height: 12
    },

    cardTitle: {
        fontSize: 12,
        // fontWeight: "400",
        fontFamily: Fonts.Regular,
        lineHeight: '100%'
    },

    cardValue: {
        lineHeight: '32px',
        fontSize: 24,
        fontFamily: Fonts.Bold,
        color: "#111827"
    },

    interviewCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        paddingVertical: 14,
        backgroundColor: "#E8F1FF", // light gray like Figma
        paddingHorizontal: 12,
        paddingLeft: 24,
        minHeight: '76px',
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
        // borderRadius: 24,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12
    },

    companyLogo: {
        width: '100%',
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
        lineHeight: '22px',
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
        // fontWeight: "500"

        fontFamily: Fonts.Medium
    }
});
