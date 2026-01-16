// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     StyleSheet,
//     Dimensions,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     TouchableWithoutFeedback,
//     Keyboard,
//     StatusBar,
//     Alert,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";
// import Gradient from "../../constants/Gradient";
// import AuthHeader from "../../components/auth/AuthHeader";
// import AuthButton from "../../components/auth/AuthButton";
// import MessagePopup from "../../components/MessagePopup";
// import { Fonts } from "../../constants/fonts";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_BASE } from "../../config/api";

// const { width } = Dimensions.get("window");
// const scale = width / 390;

// export default function ResetPassword({ route }) {
//     const navigation = useNavigation();
//     const { email } = route.params;

//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const [popupVisible, setPopupVisible] = useState(false);
//     const [popupMessage, setPopupMessage] = useState("");
//     const [popupType, setPopupType] = useState("error");

//     const showPopup = (msg, type = "error") => {
//         setPopupMessage(msg);
//         setPopupType(type);
//         setPopupVisible(true);
//     };

//     const handleResetPassword = async () => {
//         if (!password || !confirmPassword) {
//             showPopup("Please fill all fields");
//             return;
//         }

//         if (password !== confirmPassword) {
//             showPopup("Passwords do not match");
//             return;
//         }

//         try {
//             const response = await axios.post(`${API_BASE}/auth/set-password`, {
//                 email,
//                 password,
//                 confirmPassword,
//             });


//             const { token, user } = response.data;

//             await AsyncStorage.multiSet([
//                 ["token", token],
//                 ["user", JSON.stringify(user)],
//             ]);

//             Alert.alert("Success", "Password reset successfully", [
//                 {
//                     text: "Sign in",
//                     onPress: () =>
//                         navigation.reset({
//                             index: 0,
//                             routes: [{ name: "EmailInput" }],
//                         }),
//                 },
//             ]);
//         } catch (error) {
//             showPopup(
//                 error?.response?.data?.message || "Failed to reset password"
//             );
//         }
//     };

//     return (
//         <Gradient>
//             <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

//             <MessagePopup
//                 visible={popupVisible}
//                 message={popupMessage}
//                 type={popupType}
//                 onHide={() => setPopupVisible(false)}
//             />

//             <KeyboardAvoidingView
//                 behavior={Platform.OS === "ios" ? "padding" : "height"}
//                 style={{ flex: 1 }}
//             >
//                 <ScrollView
//                     contentContainerStyle={styles.scrollContainer}
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={false}
//                 >
//                     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//                         <View style={{ flex: 1 }}>
//                             {/* TOP */}
//                             <View style={styles.topSection}>
//                                 <AuthHeader
//                                     title="Reset password"
//                                     subtitle="Set your new password"
//                                     showBack={true}
//                                     showLogo={true}
//                                 />

//                                 <TextInput
//                                     placeholder="New password"
//                                     secureTextEntry
//                                     style={styles.input}
//                                     value={password}
//                                     onChangeText={setPassword}
//                                 />

//                                 <TextInput
//                                     placeholder="Confirm password"
//                                     secureTextEntry
//                                     style={styles.input}
//                                     value={confirmPassword}
//                                     onChangeText={setConfirmPassword}
//                                 />
//                             </View>

//                             {/* BOTTOM */}
//                             <View style={styles.bottomSection}>
//                                 <AuthButton
//                                     text="Sign in"
//                                     onPress={handleResetPassword}
//                                 />
//                             </View>
//                         </View>
//                     </TouchableWithoutFeedback>
//                 </ScrollView>
//             </KeyboardAvoidingView>
//         </Gradient>
//     );
// }

// const styles = StyleSheet.create({
//     scrollContainer: {
//         flexGrow: 1,
//         paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//     },
//     topSection: {
//         flex: 1,
//     },
//     bottomSection: {
//         marginBottom: 80,
//         alignItems: "center",
//     },
//     input: {
//         width: width - 32,
//         backgroundColor: "#fff",
//         alignSelf: "center",
//         borderRadius: 48,
//         paddingVertical: 16,
//         paddingLeft: 24,
//         fontSize: 18 * scale,
//         fontFamily: Fonts.Regular,
//         marginBottom: 16,
//         elevation: 4,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//     },
// });





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
    Alert,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Gradient from "../../constants/Gradient";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthButton from "../../components/auth/AuthButton";
import MessagePopup from "../../components/MessagePopup";
import { Fonts } from "../../constants/fonts";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from '@env';

const { width } = Dimensions.get("window");
const scale = width / 390;

export default function ResetPassword({ route }) {
    const navigation = useNavigation();
    const { email } = route.params;

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupType, setPopupType] = useState("error");

    // 🔐 PASSWORD VALIDATOR (NO LENGTH RULE)
    const isStrongPassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^]).+$/;
        return regex.test(password);
    };

    const showPopup = (msg, type = "error") => {
        setPopupMessage(msg);
        setPopupType(type);
        setPopupVisible(true);
    };

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            showPopup("Please fill all fields");
            return;
        }

        if (!isStrongPassword(password)) {
            showPopup(
                "Password validation not Reach"
            );
            return;
        }

        if (password !== confirmPassword) {
            showPopup("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE}/auth/set-password`, {
                email,
                password,
                confirmPassword,
            });

            const { token, user } = response.data;

            await AsyncStorage.multiSet([
                ["token", token],
                ["user", JSON.stringify(user)],
            ]);

            Alert.alert("Success", "Password reset successfully", [
                {
                    text: "Sign in",
                    onPress: () =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "EmailInput" }],
                        }),
                },
            ]);
        } catch (error) {
            showPopup(
                error?.response?.data?.message || "Failed to reset password"
            );
        }
    };

    return (
        <Gradient>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

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
                            <View style={styles.topSection}>
                                <AuthHeader
                                    title="Reset password"
                                    subtitle="Set your new password"
                                    showBack
                                    showLogo
                                />

                                {/* NEW PASSWORD */}
                                <TextInput
                                    placeholder="New password"
                                    secureTextEntry
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                />

                                {/* ℹ️ INFO ROW */}
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoIcon}>ⓘ</Text>
                                    <Text style={styles.infoText}>
                                        Password must contain at least one uppercase, one lowercase,
                                        one number and one special character
                                    </Text>
                                </View>

                                {/* CONFIRM PASSWORD */}
                                <TextInput
                                    placeholder="Confirm password"
                                    secureTextEntry
                                    style={styles.input}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>

                            <View style={styles.bottomSection}>
                                <AuthButton
                                    text="Sign in"
                                    onPress={handleResetPassword}
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
        marginBottom: 80,
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
        fontFamily: Fonts.Regular,
        marginBottom: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    /* INFO ROW */
    infoRow: {
        width: width - 64,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16,
    },
    infoIcon: {
        fontSize: 14,
        color: "#6B7280",
        marginRight: 6,
        marginTop: 2,
    },
    infoText: {
        flex: 1,
        fontSize: 13 * scale,
        color: "#6B7280",
        fontFamily: Fonts.Regular,
        lineHeight: 18,
    },
});
