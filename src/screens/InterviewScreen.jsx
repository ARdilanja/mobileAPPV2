import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import InterviewTabs from "../components/InterviewTabs";

export default function InterviewScreen() {
    return (
        <View style={styles.container}>
            <Header />
            <InterviewTabs />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
