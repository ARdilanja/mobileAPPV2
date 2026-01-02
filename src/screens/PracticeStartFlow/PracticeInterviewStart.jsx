import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    StatusBar,
} from "react-native";
import PracticeTitle from './PracticeTitle';
import { Fonts } from "../../constants/fonts";
import Header from "../../components/Header";

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

export default function PracticeInterviewStart({ navigation }) {
    return (
        <View style={styles.container}>
            {/* <StatusBar
    barStyle="dark-content" 
  /> */}
                <Header title="Practice interviews" showNotification={true}/>

            {/* Content */}
            <View style={styles.content}>
                <PracticeTitle
                    title="Perfect! We’re ready to start your interview."
                />

                <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => alert("Start Interview pressed")}
                >
                    <Text style={styles.startButtonText}>Start Interview</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        // paddingTop: StatusBar.currentHeight || 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20 * scale,
        alignItems: "center",
        marginTop: 10 * scale,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30 * scale,
    },

    startButton: {
        backgroundColor: "#0066FF",
        paddingVertical: 16,
        borderRadius: 30 * scale,
        marginTop: 24,
        width: screenWidth - 32,
        alignItems: 'center',

    },
    startButtonText: {
        color: "#fff",
        fontSize: 18 * scale,
        lineHeight: 24 * scale,
        fontFamily: Fonts.Medium
    },
});
