import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Pressable,
    Dimensions,
    Image,
} from "react-native";
import { Fonts } from "../constants/fonts";
import Header from "../components/Header";
// import CheckBox from "@react-native-community/checkbox";
import binIcon from "../assets/images/bin.png";
import closeIcon from "../assets/images/Vector-cross.png";
import source from "../assets/images/success.png";

const screenWidth = Dimensions.get("window").width;
const container_Width = screenWidth - 40
const reasonsList = [
    "I no longer need the account",
    "I receive too many notifications",
    "I'm not satisfied with the app",
    "I have privacy concerns",
    "I found another platform",
    "Technical issues",
    "Others",
];

const DeleteAccountScreen = () => {
    const [selectedReason, setSelectedReason] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [otherText, setOtherText] = useState("");

    const onDeletePress = () => {
        if (selectedReason.length === 0) return;
        setShowModal(true);
    };
    const toggleReason = (reason) => {
        setSelectedReason((prev) => {
            if (prev.includes(reason)) {
                return prev.filter((item) => item !== reason); // uncheck
            } else {
                return [...prev, reason]; // check
            }
        });
    };

    return (

        <View style={styles.container}>
            <Text style={styles.subtitle}>
                Please let us know why you're deleting your Recroot Lea account
            </Text>

            {/* CHECKBOX LIST */}
            <View style={styles.checkboxCard}>
                {reasonsList.map((reason, index) => {
                    const isLast = index === reasonsList.length - 1;
                    const isSelected = selectedReason.includes(reason);

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.option,
                                !isLast && styles.optionDivider, // 👈 NO border for last
                                isSelected && styles.selectedOption,
                            ]}
                            onPress={() => toggleReason(reason)}
                            activeOpacity={0.8}
                        >
                            <CustomCheckbox checked={isSelected} />
                            <Text
                                style={[
                                    styles.optionText,
                                    isSelected && styles.selectedOptionText,
                                ]}
                            >
                                {reason}
                            </Text>
                        </TouchableOpacity>
                    );
                })}


                {/* OTHERS INPUT */}
                {selectedReason.includes("Others") && (
                    <TextInput
                        style={styles.input}
                        placeholder="Specify here"
                        placeholderTextColor="#646464"
                        value={otherText}
                        onChangeText={setOtherText}
                        multiline
                    />
                )}
            </View>
            {/* DELETE BUTTON */}
            <TouchableOpacity style={styles.deleteBtn} onPress={onDeletePress}>
                <Text style={styles.deleteBtnText}>Delete My Account</Text>
            </TouchableOpacity>

            {/* CONFIRM MODAL */}
            <Modal
                visible={showModal}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={styles.modalDeleteImage}>
                            {/* BIN IMAGE */}
                            <Image
                                source={binIcon}
                                style={styles.modalIcon}
                                resizeMode="contain"
                            />

                            {/* CLOSE ICON */}
                            <TouchableOpacity
                                style={styles.closeIconWrapper}
                                onPress={() => setShowModal(false)}
                                activeOpacity={0.7}
                            >
                                <Image
                                    source={closeIcon}
                                    style={styles.closeIcon}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                            <Image source={closeIcon} style={styles.crossSmall1} />
                            <Image source={closeIcon} style={styles.crossSmall2} />
                            <Image source={closeIcon} style={styles.crossMedium} />
                            <Image source={closeIcon} style={styles.crossSmall4} />
                            <Image source={closeIcon} style={styles.crossSmall5} />
                        </View>

                        <Text style={styles.modalTitle}>
                            Are you sure you want to delete your account?
                        </Text>
                        <Text style={styles.modalDesc}>
                            You’re requesting to delete your account. You can stop the
                            deletion process by logging in before July 27, 2024.
                        </Text>

                        <TouchableOpacity
                            style={styles.confirmBtn}
                            onPress={() => {
                                setShowModal(false);          // close confirm modal
                                setShowSuccessModal(true);
                                setTimeout(() => {
                                    setShowSuccessModal(false);
                                }, 2000);   // open success modal
                            }}
                        >
                            <Text style={styles.confirmBtnText}>Yes, Delete</Text>
                        </TouchableOpacity>

                        <Pressable onPress={() => setShowModal(false)}>
                            <Text style={styles.cancelText}>Keep Account</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* SUCCESS MODAL */}
            <Modal
                visible={showSuccessModal}
                transparent
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.successCard}>
                        {/* SUCCESS IMAGE */}
                        <Image
                            source={source} // replace with your grouped tick image
                            style={styles.successImage}
                            resizeMode="contain"
                        />

                        <Text style={styles.successText}>
                            Account deleted successfully.
                        </Text>
                    </View>
                </View>
            </Modal>


        </View >
    );
};
const CustomCheckbox = ({ checked }) => (
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <View style={styles.checkboxInner} />}
    </View>
);
export default DeleteAccountScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingLeft: 20,
        // width:container_Width,
        // paddingRight: 20,
        alignSelf: "center",
        paddingHorizontal: 20,
        backgroundColor: "#F6F6F6",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#505050",
        fontFamily: Fonts.Regular,
        marginBottom: 16,
    },
    checkboxCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        elevation: 1,
        overflow: "hidden",
        // gap: 1
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
        // borderRadius: 10,
        // marginBottom: 1,
        // borderLeftWidth: 3,
        // border
        // borderColor: "#E5E7EB",
    },

    selectedOption: {
        backgroundColor: "#EBF3FF",
        borderLeftWidth: 1,
        borderLeftColor: "#2563EB",
    },
    optionText: {
        fontSize: 14,
        // marginLeft: 8,
        color: "#111827",
        fontFamily: Fonts.Regular,
        marginLeft: 12,
    },
    selectedOptionText: {
        color: '#0069FF'
    },
    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 4,
        padding: 12,
        minHeight: 100,
        margin: 14,
        textAlignVertical: "top",
        color: '#646464',
        fontFamily: Fonts.Regular,
        fontSize: 10,
        lineHeight: 14.5,
    },
    optionDivider: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    deleteBtn: {
        backgroundColor: "#262626",
        padding: 12,
        width: screenWidth - 96,
        borderRadius: 8,
        alignItems: "center",
        marginHorizontal: 'auto',
        marginBottom: 56,
        marginTop: 'auto',
        elevation: 6,
    },
    deleteBtnText: {
        color: "#FFFFFF",
        fontFamily: Fonts.Medium,
        fontSize: 14
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        width: screenWidth - 56,
        // width: "85%",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    modalDeleteImage: {
        position: "relative",        // 🔑 key
        width: 184,                  // same as design
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    modalIcon: {
        width: 112,
        height: 112,
    },



    modalIcon: {
        width: 112,
        height: 112,
        marginBottom: 12,
    },
    modalTitle: {
        paddingHorizontal: 30,
        fontSize: 14,
        fontFamily: Fonts.Medium,
        textAlign: "center",
        marginBottom: 8,
    },
    modalDesc: {
        paddingHorizontal: 30,
        fontSize: 14,
        fontFamily: Fonts.Regular,
        color: "#434343",
        textAlign: "center",
        marginBottom: 16,
    },
    confirmBtn: {
        backgroundColor: "#EF4444",
        padding: 12,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    confirmBtnText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    cancelText: {
        color: "#EF4444",
        fontSize: 14,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: "#9CA3AF", // darker border
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },

    checkboxChecked: {
        backgroundColor: "transparent",
        borderColor: "#0069FF",
        borderWidth: 0.5
    },

    checkboxInner: {
        width: 10,
        height: 10,
        backgroundColor: "#0069FF",
        borderRadius: 2,
    },
    closeIconWrapper: {
        position: "absolute",
        bottom: 6,
        right: 15,
    },

    closeIcon: {
        width: 18,                   // smaller cross
        height: 18,
    },
    crossSmall1: {
        position: "absolute",
        width: 7,
        height: 7,
        top: '40%',
        left: 28,
        opacity: 1,
    },

    crossSmall2: {
        position: "absolute",
        width: 12,
        height: 12,
        top: 12,
        right: 0,
        opacity: 1,
    },

    crossMedium: {
        position: "absolute",
        width: 9,
        height: 9,
        top: '30%',
        right: 30,
        opacity: 1,
    },
    crossSmall4: {
        position: "absolute",
        width: 16,
        height: 16,
        top: 3,
        left: 3,
        opacity: 1,
    },

    crossSmall5: {
        position: "absolute",
        width: 10,
        height: 10,
        bottom: '18%',
        left: 12,
        opacity: 1,
    },
    successCard: {
        backgroundColor: "#FFFFFF",
        width: screenWidth - 56,
        borderRadius: 20,
        paddingVertical: 32,
        alignItems: "center",
    },
    successImage: {
        width: 160,
        height: 160,
        marginBottom: 20,
    },


    successText: {
        fontSize: 14,
        fontFamily: Fonts.Medium,
        color: "#111827",
    },

});
