// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     TouchableOpacity,
//     TextInput,
//     Image,
//     Dimensions,
// } from "react-native";

// import CheckBox from "@react-native-community/checkbox";
// import { PRACTICE_QUESTIONS } from "./practiceConversationConfig";

// const { width } = Dimensions.get("window");

// const EDIT_ICON = require("../../assets/images/pencil.png");
// const MIC_ICON = require("../../assets/images/circle-microphone.png");
// const SEND_ICON = require("../../assets/images/send.png");

// export default function PracticeConversationScreen({ route, navigation }) {
//     const { startChoice } = route.params;

//     const [step, setStep] = useState(0);
//     const [multiAnswers, setMultiAnswers] = useState([]);
//     const [typedText, setTypedText] = useState("");

//     // Maintains full question–answer chat history

//     const [history, setHistory] = useState([
//         {
//             question: "Hi James, how do you want to start?",
//             answer: {
//                 label: startChoice.label,
//                 icon: startChoice.icon,
//             },
//         },
//     ]);

//     const currentQuestion = PRACTICE_QUESTIONS[step];

//     // Handles option selection for both single and multi-select questions

//     const handleOptionSelect = (option) => {
//         if (currentQuestion.type === "multi") {
//             setMultiAnswers((prev) =>
//                 prev.includes(option)
//                     ? prev.filter((o) => o !== option)
//                     : [...prev, option]
//             );
//             return;
//         }

//         setHistory((prev) => [
//             ...prev,
//             { question: currentQuestion.question, answer: option },
//         ]);
//         setStep((prev) => prev + 1);
//     };

//     // Handles sending typed text as an answer

//     const handleSendText = () => {
//         if (!typedText.trim()) return;

//         if (currentQuestion.type === "multi") {
//             setMultiAnswers((prev) => [...prev, typedText.trim()]);
//             setTypedText("");
//             return;
//         }

//         setHistory((prev) => [
//             ...prev,
//             { question: currentQuestion.question, answer: typedText.trim() },
//         ]);

//         setTypedText("");
//         setStep((prev) => prev + 1);
//     };

//     // Navigates to interview info screen after selections are completed

//     const handleGetStarted = () => {
//         navigation.navigate("PracticeInterviewInfoScreen");
//     };


//     return (
//         <View style={styles.container}>
//             {/* CHAT */}
//             <ScrollView
//                 style={styles.chat}
//                 contentContainerStyle={{ paddingBottom: 180 }}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* HISTORY */}
//                 {history.map((item, index) => (
//                     <View key={index} style={styles.block}>
//                         <Text style={styles.questionText}>
//                             {item.question}
//                         </Text>

//                         <View style={styles.answerWrap}>
//                             {/* ===== MULTI ANSWER ===== */}
//                             {Array.isArray(item.answer) &&
//                                 item.answer.map((ans) => (
//                                     <View key={ans} style={styles.answerPill}>
//                                         <CheckBox
//                                             value={true}
//                                             disabled
//                                             tintColors={{
//                                                 true: "#FFFFFF",
//                                                 false: "#FFFFFF",
//                                             }}
//                                         />
//                                         <Text style={styles.answerText}>
//                                             {ans}
//                                         </Text>
//                                     </View>
//                                 ))}

//                             {/* ===== NORMAL STRING ANSWER ===== */}
//                             {typeof item.answer === "string" && (
//                                 <View style={styles.answerPill}>
//                                     <Text style={styles.answerText}>
//                                         {item.answer}
//                                     </Text>
//                                 </View>
//                             )}

//                             {/* ===== FIRST ANSWER (ICON + LABEL) ===== */}
//                             {typeof item.answer === "object" &&
//                                 !Array.isArray(item.answer) && (
//                                     <View style={styles.answerEditContainer}>
//                                         <View style={styles.answerPill}>
//                                             <Image
//                                                 source={item.answer.icon}
//                                                 style={styles.answerIcon}
//                                             />
//                                             <Text style={styles.answerText}>
//                                                 {item.answer.label}
//                                             </Text>
//                                         </View>

//                                         {index === 0 && (
//                                             <TouchableOpacity style={styles.editBelow}>
//                                                 <Image
//                                                     source={EDIT_ICON}
//                                                     style={styles.editIcon}
//                                                 />
//                                             </TouchableOpacity>
//                                         )}
//                                     </View>
//                                 )}
//                         </View>
//                     </View>
//                 ))}

//                 {/* CURRENT QUESTION */}
//                 {currentQuestion && (
//                     <View>
//                         <Text style={styles.questionText}>
//                             {currentQuestion.question}
//                         </Text>

//                         {currentQuestion.type === "multi" &&
//                             multiAnswers.length > 0 && (
//                                 <View style={styles.answerWrap}>
//                                     {multiAnswers.map((ans) => (
//                                         <View key={ans} style={styles.answerPill}>
//                                             <CheckBox
//                                                 value={true}
//                                                 disabled
//                                                 tintColors={{
//                                                     true: "#FFFFFF",
//                                                     false: "#FFFFFF",
//                                                 }}
//                                             />
//                                             <Text style={styles.answerText}>
//                                                 {ans}
//                                             </Text>
//                                         </View>
//                                     ))}
//                                 </View>
//                             )}
//                     </View>
//                 )}
//             </ScrollView>

//             {/* OPTIONS */}
//             {currentQuestion && (
//                 <View style={styles.options}>
//                     {currentQuestion.options.map((opt) => {
//                         const selected =
//                             currentQuestion.type === "multi" &&
//                             multiAnswers.includes(opt);

//                         return (
//                             <TouchableOpacity
//                                 key={opt}
//                                 style={styles.optionChip}
//                                 onPress={() => handleOptionSelect(opt)}
//                             >
//                                 {currentQuestion.type === "multi" && (
//                                     <CheckBox
//                                         value={selected}
//                                         onValueChange={() => handleOptionSelect(opt)}
//                                         tintColors={{
//                                             true: "#1677FF",
//                                             false: "#9CA3AF",
//                                         }}
//                                         style={styles.checkbox}
//                                     />

//                                 )}
//                                 <Text style={styles.optionText}>{opt}</Text>
//                             </TouchableOpacity>
//                         );
//                     })}
//                 </View>
//             )}

//             {/* INPUT / GET STARTED */}
//             {currentQuestion?.type === "multi" ? (
//                 multiAnswers.length > 0 && (
//                     <TouchableOpacity
//                         style={styles.getStartedBtn}
//                         onPress={handleGetStarted}
//                     >
//                         <Text style={styles.getStartedText}>
//                             Get Started
//                         </Text>
//                     </TouchableOpacity>
//                 )
//             ) : (
//                 <View style={styles.inputWrapper}>
//                     <TextInput
//                         value={typedText}
//                         onChangeText={setTypedText}
//                         placeholder="Type here..."
//                         style={styles.textInput}
//                     />

//                     <TouchableOpacity>
//                         <Image source={MIC_ICON} style={styles.icon} />
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress={handleSendText}>
//                         <Image source={SEND_ICON} style={styles.icon} />
//                     </TouchableOpacity>
//                 </View>
//             )}
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#F5F5F5" },
//     chat: { padding: width * 0.05 },
//     block: { marginBottom: 20 },

//     questionText: {
//         fontSize: 14,
//         fontWeight: "500",
//         marginBottom: 10,
//     },

//     checkbox: {
//     transform: [{ scaleX: 0.75 }, { scaleY: 0.75 }], 
// },
//     answerWrap: {
//         alignItems: "flex-end",
//         marginTop: 10,
//     },

//     answerPill: {
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#0178FF",
//         paddingHorizontal: 14,
//         paddingVertical: 8,
//         borderRadius: 18,
//         marginBottom: 6,
//         gap: 6,
//     },

//     answerText: {
//         color: "#fff",
//         fontSize: 14,
//         fontWeight: "500",
//     },

//     answerEditContainer: {
//         alignItems: "flex-end",
//     },

//     answerIcon: {
//         width: 16,
//         height: 16,
//         resizeMode: "contain",
//         marginRight: 6,
//         tintColor: "#FFFFFF",
//     },

//     editBelow: {
//         marginTop: 6,
//         marginRight: 6,
//     },

//     editIcon: {
//         width: 16,
//         height: 16,
//         resizeMode: "contain",
//     },

//     options: {
//         position: "absolute",
//         bottom: 90,
//         left: width * 0.05,
//         right: width * 0.05,
//         flexDirection: "row",
//         flexWrap: "wrap",
//     },

//     optionChip: {
//         flexDirection: "row",
//         alignItems: "center",
//         borderWidth: 1,
//         borderColor: "#E5E7EB",
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 18,
//         marginRight: 8,
//         marginBottom: 8,
//         gap: 6,
//     },

//     optionText: {
//         fontSize: 13,
//         fontWeight: "500",
//     },

//     inputWrapper: {
//         position: "absolute",
//         bottom: 20,
//         left: width * 0.05,
//         right: width * 0.05,
//         flexDirection: "row",
//         alignItems: "center",
//         backgroundColor: "#E5E7EB",
//         borderRadius: 28,
//         paddingHorizontal: 14,
//         height: 52,
//     },

//     textInput: {
//         flex: 1,
//         fontSize: 14,
//     },

//     icon: {
//         width: 24,
//         height: 24,
//         resizeMode: "contain",
//         marginHorizontal: 6,
//     },

//     getStartedBtn: {
//         position: "absolute",
//         bottom: 20,
//         left: width * 0.05,
//         right: width * 0.05,
//         height: 52,
//         backgroundColor: "#1677FF",
//         borderRadius: 28,
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     getStartedText: {
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "700",
//     },
// });





import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
} from "react-native";

import { PRACTICE_QUESTIONS } from "./practiceConversationConfig";


import { KeyboardAvoidingView, Platform } from "react-native";

import { Fonts } from "../../constants/fonts";

const { width } = Dimensions.get("window");

const THREE_COL_WIDTH = Math.min(
    (width * 0.9 - 16) / 3,
    120
);


const EDIT_ICON = require("../../assets/images/pencil.png");
const MIC_ICON = require("../../assets/images/circle-microphone.png");
const SEND_ICON = require("../../assets/images/send.png");

// Custom 16x16 Checkbox
const CustomCheckbox = ({ selected, isAnswerBubble = false }) => (
    <View style={[
        styles.checkboxBase,
        {
            borderColor: selected ? (isAnswerBubble ? "#FFF" : "#1677FF") : "#D1D5DB",
            backgroundColor: selected ? (isAnswerBubble ? "#FFF" : "#1677FF") : "transparent"
        }
    ]}>
        {selected && (
            <Text style={[styles.tickText, { color: isAnswerBubble ? "#1677FF" : "#FFF" }]}>✓</Text>
        )}
    </View>
);

export default function PracticeConversationScreen({ route, navigation }) {
    const { startChoice } = route.params;
    const [step, setStep] = useState(0);
    const [multiAnswers, setMultiAnswers] = useState([]);
    const [typedText, setTypedText] = useState("");
    const [history, setHistory] = useState([
        {
            question: "Hi James, how do you want to start?",
            answer: { label: startChoice.label, icon: startChoice.icon },
        },
    ]);

    const currentQuestion = PRACTICE_QUESTIONS[step];

    const handleOptionSelect = (option) => {
        if (currentQuestion.type === "multi") {
            setMultiAnswers((prev) =>
                prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
            );
            return;
        }
        setHistory((prev) => [...prev, { question: currentQuestion.question, answer: option }]);
        setStep((prev) => prev + 1);
    };

    const handleSendText = () => {
        if (!typedText.trim()) return;
        setHistory((prev) => [...prev, { question: currentQuestion.question, answer: typedText.trim() }]);
        setTypedText("");
        setStep((prev) => prev + 1);
    };

    const handleGetStarted = () => {

        navigation.navigate("PracticeInterviewInfoScreen");
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.chat}
                contentContainerStyle={{ paddingBottom: 220 }}
                showsVerticalScrollIndicator={false}
            >
                {/* PREVIOUS CHAT HISTORY */}
                {history.map((item, index) => (
                    <View key={index} style={styles.block}>
                        <Text style={styles.questionText}>{item.question}</Text>
                        <View style={styles.answerWrap}>
                            {Array.isArray(item.answer) ? (
                                <View style={styles.multiAnswerContainer}>
                                    {item.answer.map((ans) => (
                                        <View key={ans} style={styles.answerPill}>
                                            <CustomCheckbox selected={true} isAnswerBubble={true} />
                                            <Text style={styles.answerText}>{ans}</Text>
                                        </View>
                                    ))}
                                </View>
                            ) : typeof item.answer === "object" ? (
                                <View style={styles.answerEditContainer}>
                                    <View style={styles.answerPill}>
                                        <Image
                                            source={item.answer.icon}
                                            style={[styles.answerIcon, { tintColor: "#FFFFFF" }]}
                                        />
                                        <Text style={styles.answerText}>{item.answer.label}</Text>
                                    </View>
                                    {index === 0 && (
                                        <TouchableOpacity style={styles.editBelow}>
                                            <Image source={EDIT_ICON} style={styles.editIcon} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ) : (
                                <View style={styles.answerPill}>
                                    <Text style={styles.answerText}>{item.answer}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                ))}

                {/* CURRENT ACTIVE QUESTION (ALWAYS VISIBLE) */}
                {currentQuestion && (
                    <View style={styles.block}>
                        <Text style={styles.questionText}>{currentQuestion.question}</Text>

                        {/* Selected answers show here immediately for multi-select */}
                        {currentQuestion.type === "multi" && multiAnswers.length > 0 && (
                            <View style={styles.multiAnswerContainer}>
                                {multiAnswers.map((ans) => (
                                    <View key={ans} style={styles.answerPill}>
                                        <CustomCheckbox selected={true} isAnswerBubble={true} />
                                        <Text style={styles.answerText}>{ans}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            {/* OPTIONS SECTION */}
            {currentQuestion && (
                <View style={styles.optionsArea}>
                    <View style={[
                        styles.optionsGrid,
                        currentQuestion.type !== "multi" && { flexWrap: 'wrap', justifyContent: 'flex-start' }
                    ]}>
                        {currentQuestion.options.map((opt) => {
                            const isMulti = currentQuestion.type === "multi";
                            const isSelected = multiAnswers.includes(opt);

                            return (
                                <TouchableOpacity
                                    key={opt}
                                    style={[
                                        styles.optionChip,
                                        isMulti ? { width: THREE_COL_WIDTH } : styles.singleOptionChip
                                    ]}
                                    onPress={() => handleOptionSelect(opt)}
                                >
                                    {isMulti && <CustomCheckbox selected={isSelected} />}
                                    <Text style={styles.optionText} numberOfLines={1}>{opt}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            )}

            {/* BOTTOM BUTTON/INPUT */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={80}
            >
                <View style={styles.bottomWrapper}>
                    {currentQuestion?.type === "multi" ? (
                        // Show Get Started button only when items are selected
                        multiAnswers.length > 0 ? (
                            <TouchableOpacity style={styles.getStartedBtn} onPress={handleGetStarted}>
                                <Text style={styles.getStartedText}>Get Started</Text>
                            </TouchableOpacity>
                        ) : null // Or keep input wrapper here if you want typing for multi-select
                    ) : (
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={typedText}
                                onChangeText={setTypedText}
                                placeholder="Type here..."
                                style={styles.textInput}
                            />
                            <Image source={MIC_ICON} style={styles.icon} />
                            <TouchableOpacity onPress={handleSendText}>
                                <Image source={SEND_ICON} style={styles.icon1} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB" },
    chat: { padding: width * 0.05 },
    block: { marginBottom: 24 },
    questionText: { fontSize: 14, fontWeight: "400", color: "#4B5563", marginBottom: 10, fontFamily: Fonts.Regular },

    checkboxBase: {
        width: 16,
        height: 16,
        borderRadius: 2,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tickText: { fontSize: 10, fontWeight: "900" },

    answerWrap: { alignItems: "flex-end", marginTop: 8 },
    multiAnswerContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: 12,
        marginTop: 8
    },
    answerPill: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1677FF",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    answerText: { color: "#FFF", fontSize: 14, fontWeight: "400", fontFamily: Fonts.Regular },
    answerIcon: { width: 16, height: 16, tintColor: "#FFFFFF", },
    editBelow: { marginTop: 4, alignSelf: 'flex-end' },
    editIcon: { width: 16, height: 16, tintColor: "#000000" },

    optionsArea: {
        position: "absolute",
        bottom: 90,
        width: '100%',
        paddingHorizontal: width * 0.05,
    },
    optionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    optionChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        gap: 4,
    },
    singleOptionChip: {
        paddingHorizontal: 12,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
    },
    optionText: { fontSize: 13, fontWeight: "400", color: "#374151", fontFamily: Fonts.Regular },

    bottomWrapper: {
        position: "absolute",
        bottom: 20,
        width: width * 0.9,
        alignSelf: 'center',
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E2E2E2",
        borderRadius: 30,
        paddingHorizontal: 16,
        height: 52,
    },
    textInput: { flex: 1, fontSize: 14, fontWeight: "400", fontFamily: Fonts.Regular },
    icon: { width: 22, height: 22, marginHorizontal: 8, tintColor: "#454545" },
    icon1: { width: 22, height: 22, marginHorizontal: 4, tintColor: "#1677FF" },
    getStartedBtn: {
        height: 52,
        backgroundColor: "#1677FF",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    getStartedText: { color: "#FFF", fontSize: 18, fontWeight: "500", fontFamily: Fonts.Medium },
});