import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";

export default function Pagination({
    activePage,
    totalPages,
    onPageChange,
}) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {/* LEFT ARROW */}
                <TouchableOpacity
                    onPress={() =>
                        onPageChange(Math.max(activePage - 1, 1))
                    }
                >
                    <Text style={styles.arrow}>‹</Text>
                </TouchableOpacity>

                {/* PAGE NUMBERS */}
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    const isActive = page === activePage;

                    return (
                        <TouchableOpacity
                            key={page}
                            style={[
                                styles.page,
                                isActive && styles.activePage,
                            ]}
                            onPress={() => onPageChange(page)}
                        >
                            <Text
                                style={[
                                    styles.pageText,
                                    isActive && styles.activePageText,
                                ]}
                            >
                                {page}
                            </Text>
                        </TouchableOpacity>
                    );
                })}

                {/* RIGHT ARROW */}
                <TouchableOpacity
                    onPress={() =>
                        onPageChange(
                            Math.min(activePage + 1, totalPages)
                        )
                    }
                >
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    /* OUTER WRAPPER (for floating) */
    wrapper: {
        alignItems: "center",
    },

    /* PILL CONTAINER */
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 14,
        paddingVertical: 8,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,

        /* SHADOW */
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8, // Android shadow
    },

    arrow: {
        fontSize: 25,
        color: "#787878",
        paddingHorizontal: 6,
    },

    page: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 4,
    },

    activePage: {
        backgroundColor: "#0069FF",
    },

    pageText: {
        fontSize: 12,
        color: "#2D2D2D",
    },

    activePageText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
});
