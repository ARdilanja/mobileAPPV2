import React from "react";
import { View,Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Fonts } from "../constants/fonts";

const screenWidth = Dimensions.get("window").width;

const ProgressLineChart = ({
    labels,
    datasets,
    legend,
    height = 250
}) => {
    return (
        <View style={styles.chartWrapper}>
            <LineChart
                data={{
                    labels,
                    datasets
                }}
                width={screenWidth - 48}
                height={height}
                withDots={false}
                withInnerLines
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLines
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

            {/* CUSTOM LEGEND */}
            <View style={styles.chartLegend}>
                {legend.map((item, index) => (
                    <LegendItem
                        key={index}
                        color={item.color}
                        label={item.label}
                    />
                ))}
            </View>
        </View>
    );
};

const LegendItem = ({ color, label }) => (
    <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: color }]} />
        <Text style={[styles.legendText, { color }]}>{label}</Text>
    </View>
);

export default ProgressLineChart;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
    chartWrapper: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        marginBottom: 24,
        elevation: 2,
        paddingBottom: 36,
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
        fontFamily: Fonts.Medium
    }
});
