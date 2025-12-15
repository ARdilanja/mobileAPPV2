import React from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Fonts } from "../../constants/fonts";


const SCREEN_WIDTH = Dimensions.get("window").width;
const STATS_WIDTH = Math.min(SCREEN_WIDTH - 32, 360); 

export default function StatsSection() {
    return (
        <View style={styles.container}>
            {/* STATS ROW */}
            <View style={styles.row}>
                {/* LEFT STAT */}
                <View style={styles.stat}>
                    <Image
                        source={require("../../assets/images/status_1.png")}
                        style={styles.icon}
                    />
                    <View>
                        <Text style={styles.percent}>80%</Text>
                        <Text style={styles.label} numberOfLines={1}>
                            For this Interview
                        </Text>
                    </View>
                </View>

                {/* VERTICAL DIVIDER */}
                <View style={styles.divider} />

                {/* RIGHT STAT */}
                <View style={styles.stat}>
                    <Image
                        source={require("../../assets/images/status_2.png")}
                        style={styles.icon}
                    />
                    <View>
                        <Text style={styles.percent}>80%</Text>
                        <Text style={styles.label} numberOfLines={1}>
                            For this Question
                        </Text>
                    </View>
                </View>
            </View>

            {/* HORIZONTAL DIVIDER */}
            <View style={styles.bottomLine} />
        </View>
    );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
    container: {
        width: STATS_WIDTH,
        alignSelf: "center",
        marginTop: 20,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    stat: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    icon: {
        width: 32,
        height: 32,
        resizeMode: "contain",
        marginRight: 10,
    },

    percent: {
        fontSize: 24,
        fontFamily: Fonts.SemiBold,
        color: "#000",
        lineHeight: 28,
    },

    label: {
        fontSize: 10,
        fontFamily: Fonts.Regular,
        color: "#000000",
        marginTop: 2,

    },

    divider: {
        width: 1,
        height: 48,
        backgroundColor: "#C8C8C8",

    },

    bottomLine: {
        marginTop: 16,
        height: 1,
        backgroundColor: "#00000033",
    },
});
