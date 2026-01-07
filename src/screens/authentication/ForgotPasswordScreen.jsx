import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Gradient from "../../constants/Gradient";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthButton from "../../components/auth/AuthButton";
import MessagePopup from "../../components/MessagePopup";
import { Fonts } from "../../constants/fonts";
import { API_BASE } from "../../config/api";
import axios from "axios";

const { width } = Dimensions.get("window");
const scale = width / 390;

export default function ForgotPasswordScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("error");

    const showPopup = (message, type = "error") => {
        setPopupMessage(message);
        setPopupType(type);
        setPopupVisible(true);
    };

    const handleContinue = async () => {
        if (!email.trim()) {
            showPopup("Please enter your email");
            return;
        }

        const res = await axios.post(
            `${API_BASE}/auth/forgot-password/send-otp`,
            { email }
        );

        navigation.navigate("OtpVerification", {
            email: res.data.email,
            userId: res.data.userId,
            isForgotPassword: true,
        });
    };


    return (
        <Gradient>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <MessagePopup
                visible={popupVisible}
                message={popupMessage}
                type={popupType}
                onHide={() => setPopupVisible(false)}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1 }}>
                            {/* ===== TOP SECTION ===== */}
                            <View style={styles.topSection}>
                                <AuthHeader
                                    title="Forgot Password"
                                    subtitle="Enter your email"
                                    showBack={true}
                                    showLogo={true}
                                />

                                <TextInput
                                    placeholder="Email id"
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.input}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            {/* ===== BOTTOM BUTTON ===== */}
                            <View style={styles.bottomSection}>
                                <AuthButton
                                    text="Continue"
                                    onPress={handleContinue}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </Gradient>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },

    topSection: {
        flex: 1,
    },

    bottomSection: {
        marginBottom: 60,
        alignItems: "center",
    },

    input: {
        width: width - 32,
        backgroundColor: "#fff",
        alignSelf: "center",
        borderRadius: 48,
        paddingVertical: 16,
        paddingLeft: 24,
        fontSize: 18 * scale,
        lineHeight: 28 * scale,
        fontFamily: Fonts.Regular,
        fontWeight: 400,
        color: "#242424",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
});
