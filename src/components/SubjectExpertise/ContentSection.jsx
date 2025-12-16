import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { CONTENT_DATA, SECTION_ORDER } from "./contentData";
import { Fonts } from "../../constants/fonts";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTENT_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

export default function ContentSection({
    activeFilter,
    activePage,
    onPageChange,
}) {
    const renderSections =
        activeFilter === "All"
            ? Object.keys(CONTENT_DATA)
            : [activeFilter];

    return (
        <View style={styles.wrapper}>
            {/* CONTENT */}
            {renderSections.map((key) => {
                const section = CONTENT_DATA[key];
                return (
                    <View key={key} style={styles.section}>
                        <View style={styles.headingRow}>
                            <View style={styles.line} />
                            <Text style={styles.heading}>
                                {section.title}
                            </Text>
                            <View style={styles.line} />
                        </View>

                        <Text style={styles.contentText}>
                            {section.text}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        width: CONTENT_WIDTH,
        alignSelf: "center",
        marginTop: 24,
        marginBottom: 24,
    },

    section: {
        marginBottom: 24,
    },

    headingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    heading: {
        marginHorizontal: 12,
        fontSize: 12,
        fontFamily: Fonts.Medium,
        letterSpacing: 2,
        color: "#115CC7",
    },

    line: {
        flex: 1,
        height: 1,
        backgroundColor: "#B5B5B5",
    },

    contentText: {
        fontSize: 12,
        fontFamily: Fonts.Regular,
        lineHeight: 20,
        color: "#000000",
    },
});
