import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity
} from "react-native";
import { LineChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
    return (
        <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
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

                <View style={styles.chartWrapper}>
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
                </View>


                {/* LATEST COMPLETED INTERVIEWS */}
                <Text style={styles.sectionTitle}>Latest Completed Interviews</Text>
            </View>

            <InterviewCard
                name="Infosys"
                role="React Native Developer"
                logo={require("../assets/icons/infosys-logo.png")}
            />

            <InterviewCard
                name="Accenture"
                role="UX Designer"
                logo={require("../assets/icons/Accenture-logo.png")}
            />

            <InterviewCard
                name="Recroot"
                role="UI Designer"
                success
                logo={require("../assets/icons/Recroot-logo.png")}
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

const InterviewCard = ({ name, role, success, logo }) => (
    <View style={styles.interviewCard}>

        {/* LEFT: LOGO + TEXT */}
        <View style={styles.interviewLeft}>
            <View style={styles.logoWrapper}>
                <Image
                    source={logo}
                    style={styles.companyLogo}
                    resizeMode="contain"
                />
            </View>

            <View>
                <Text style={styles.company}>{name}</Text>
                <Text style={styles.role}>{role}</Text>
            </View>
        </View>

        {/* RIGHT: BUTTON */}
        <TouchableOpacity
            style={[
                styles.button,
                success && { borderColor: "#10B981" }
            ]}
        >
            <Text
                style={[
                    styles.buttonText,
                    success && { color: "#10B981" }
                ]}
            >
                View Report
            </Text>
        </TouchableOpacity>

    </View>
);


const LegendItem = ({ color, label }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: color }]} />
        <Text style={[styles.legendText, { color }]}>{label}</Text>
    </View>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 24
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
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
        fontWeight: "400",
        lineHeight: '100%'
    },

    cardValue: {
        lineHeight: '32px',
        fontSize: 24,
        fontWeight: "700",
        color: "#111827"
    },

    chartWrapper: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 24,
        elevation: 2,
        paddingBottom: 36, // 🔥 space for legend
        position: "relative"
    },

    chart: {
        borderRadius: 12
    },

    chartLegend: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },

    legendItem: {
        flexDirection: "row",
        alignItems: "center"
    },

    legendDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 6
    },

    legendText: {
        fontSize: 11,
        fontWeight: "500"
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
        elevation: 1
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
        fontSize: 12,
        color: "#6B7280",
        marginTop: 2
    },

    button: {
        borderWidth: 1,
        borderColor: "#0069FF",
        borderRadius: 6,
        paddingVertical: 7.5,
        paddingHorizontal: 18
    },

    buttonText: {
        color: "#0069FF",
        fontSize: 14,
        fontWeight: "500"
    }
});
