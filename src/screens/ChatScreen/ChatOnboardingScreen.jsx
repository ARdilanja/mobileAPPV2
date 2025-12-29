// import React, { useEffect, useRef, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet,
//   Image,
// } from "react-native";
// import { Fonts } from "../../constants/fonts";

// /* 🔊 VOICE COMPONENTS */
// import VoiceRecorder from "../../components/VoiceMessage/VoiceRecorder";
// import VoiceMessageBubble from "../../components/VoiceMessage/VoiceMessageBubble";

// /* ICONS */
// const checkIcon = require("../../assets/images/check.png");
// const sendIcon = require("../../assets/images/send.png");

// /* DATA */
// const challengesList = [
//   "Speaking in meetings",
//   "Presenting ideas",
//   "Asking for promotion or appraisal",
//   "Saying no or setting boundaries",
//   "Talking in manager 1-on-1s",
//   "Showing my work / achievements",
//   "Facing interviews"
// ];

// const worriesList = [
//   "Being judged",
//   "Saying the wrong thing",
//   "Not sounding confident",
//   "Confrontation",
//   "Forgetting what to say",
// ];

// export default function ChatOnboardingScreen() {
//   const [chat, setChat] = useState([]);
//   const [step, setStep] = useState(1);

//   const [input, setInput] = useState("");
//   const [extraNote, setExtraNote] = useState("");
//   const [challenges, setChallenges] = useState([]);
//   const [worries, setWorries] = useState([]);

//   const initialized = useRef(false);

//   useEffect(() => {
//     if (initialized.current) return;
//     initialized.current = true;

//     setChat([
//       {
//         id: "bot-1",
//         type: "bot",
//         text: "What’s your current role or field?",
//       },
//     ]);
//   }, []);

//   const addBotMessage = (text) => {
//     setChat((prev) => [
//       ...prev,
//       { id: Date.now() + Math.random(), type: "bot", text },
//     ]);
//   };

//   const addUserMessage = (text) => {
//     setChat((prev) => [
//       ...prev,
//       { id: Date.now() + Math.random(), type: "user", text },
//     ]);
//   };

//   const addVoiceMessage = (path) => {
//     setChat((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         type: "user",
//         voice: true,
//         path,
//       },
//     ]);
//   };

//   const toggleSelection = (item, list, setList) => {
//     setList(
//       list.includes(item)
//         ? list.filter((i) => i !== item)
//         : [...list, item]
//     );
//   };

//   const isNextEnabled = () => {
//     if (step === 1) return input.trim().length > 0;
//     if (step === 2) return challenges.length > 0;
//     if (step === 3) return worries.length > 0;
//     return false;
//   };

//   const handleNext = () => {
//     if (!isNextEnabled()) return;

//     if (step === 1) {
//       addUserMessage(input);
//       setInput("");
//       setStep(2);
//       addBotMessage("What’s your biggest challenge at work right now?");
//     } else if (step === 2) {
//       addUserMessage(challenges.join(", "));
//       setStep(3);
//       addBotMessage("What worries you the most?");
//     } else if (step === 3) {
//       addUserMessage(
//         worries.join(", ") + (extraNote ? ` | ${extraNote}` : "")
//       );
//       setStep(4);
//       addBotMessage("Creating your 90-day plan 🚀");
//     }
//   };

//   const renderItem = ({ item }) => {
//     if (item.type === "bot") {
//       return (
//         <Text style={styles.botText}>
//           {item.text}
//         </Text>
//       );
//     }

//     return (
//       <View style={styles.userBubble}>
//         {item.voice ? (
//           <VoiceMessageBubble path={item.path} />
//         ) : (
//           <Text style={styles.userText}>{item.text}</Text>
//         )}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={chat}
//         keyExtractor={(item) => item.id.toString()}
//         contentContainerStyle={styles.chatContainer}
//         renderItem={renderItem}
//         ListHeaderComponent={
//           <Text style={styles.topHeaderText}>
//             Let’s personalize this for you
//           </Text>
//         }
//         ListFooterComponent={
//           <>
//             {step === 2 && (
//               <View style={styles.checkboxWrap}>
//                 {challengesList.map((item) => (
//                   <PillCheckbox
//                     key={item}
//                     label={item}
//                     selected={challenges.includes(item)}
//                     onPress={() =>
//                       toggleSelection(item, challenges, setChallenges)
//                     }
//                   />
//                 ))}
//               </View>
//             )}

//             {step === 3 && (
//               <View style={styles.checkboxWrap}>
//                 {worriesList.map((item) => (
//                   <PillCheckbox
//                     key={item}
//                     label={item}
//                     selected={worries.includes(item)}
//                     onPress={() =>
//                       toggleSelection(item, worries, setWorries)
//                     }
//                   />
//                 ))}
//               </View>
//             )}
//           </>
//         }
//       />


//       <View style={styles.bottomArea}>
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder="Type here..."
//             value={step === 3 ? extraNote : input}
//             onChangeText={step === 3 ? setExtraNote : setInput}
//             style={styles.input}
//           />

//           <VoiceRecorder onRecorded={addVoiceMessage} />

//           <TouchableOpacity
//             onPress={handleNext}
//             disabled={!isNextEnabled()}
//           >
//             <Image
//               source={sendIcon}
//               style={[
//                 styles.sendIcon,
//                 !isNextEnabled() && { opacity: 0.4 },
//               ]}
//             />
//           </TouchableOpacity>
//         </View>

//         {step <= 3 && (
//           <TouchableOpacity
//             style={[
//               styles.nextButton,
//               !isNextEnabled() && styles.disabled,
//             ]}
//             disabled={!isNextEnabled()}
//             onPress={handleNext}
//           >
//             <Text style={styles.nextText}>
//               {step === 3 ? "Create my 90-day plan" : "Next"}
//             </Text>
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// }

// /* CHECKBOX FIXED */
// const PillCheckbox = ({ label, selected, onPress }) => (
//   <TouchableOpacity
//     activeOpacity={0.85}
//     onPress={onPress}
//     style={[styles.pill, selected && styles.pillSelected]}
//   >
//     <View
//       style={[
//         styles.checkbox,
//         selected && styles.checkboxSelected,
//       ]}
//     >
//       {selected && (
//         <Image
//           source={checkIcon}
//           style={styles.checkIcon}
//         />
//       )}
//     </View>

//     <Text
//       style={[
//         styles.pillText,
//         selected && styles.pillTextSelected,
//       ]}
//     >
//       {label}
//     </Text>
//   </TouchableOpacity>
// );

// /* STYLES */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },
//   topHeaderText: {
//     fontSize: 24,
//     fontWeight: "400",
//     color: "#2A2A2A",
//     marginBottom: 16,
//   },

//   chatContainer: {
//     padding: 16,
//   },

//   /* 🧠 BOT MESSAGE */
//   botText: {
//     fontSize: 32,
//     fontWeight: "500",
//     lineHeight: 48,
//     color: "#2A2A2A",
//     marginBottom: 16,
//   },

//   /* 👤 USER MESSAGE */
//   userBubble: {
//     alignSelf: "flex-end",
//     backgroundColor: "#007AFF",
//     borderRadius: 24,
//     paddingLeft: 12,
//     paddingRight: 12,
//     paddingTop: 8,
//     paddingBottom: 8,
//     marginBottom: 10,
//     gap: 4,
//   },

//   userText: {
//     fontSize: 14,
//     color: "#FFFFFF",
//     lineHeight: 20,
//   },

//   checkboxWrap: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginTop: 12,
//   },

//  pill: {
//   flexDirection: "row",
//   alignItems: "center",

//   // 🔥 CONTENT-BASED WIDTH
//   alignSelf: "flex-start",
//   maxWidth: "100%",

//   height: 36,
//   borderRadius: 24,

//   paddingVertical: 8,
//   paddingHorizontal: 12,
//   gap: 4,

//   backgroundColor: "#fff",

//   marginRight: 12,   // spacing between pills
//   marginBottom: 12,  // spacing between rows

//   elevation: 2,
//   shadowColor: "#000",
//   shadowOpacity: 0.06,
//   shadowRadius: 4,
//   shadowOffset: { width: 0, height: 2 },
// },


//   pillSelected: {
//     backgroundColor: "#1E88FF",
//   },

//   checkbox: {
//     width: 18,
//     height: 18,
//     borderRadius: 4,
//     borderWidth: 1.5,
//     borderColor: "#D0D0D0",
//     marginRight: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },

//   checkboxSelected: {
//     backgroundColor: "#fff",
//     borderColor: "#fff",
//   },

//   checkIcon: {
//     width: 12,
//     height: 12,
//     tintColor: "#1E88FF",
//   },

//   pillText: {
//   fontSize: 13,
//   color: "#333",
//   lineHeight: 20,
//   flexShrink: 1,     // 🔥 allows wrapping
// },

//   pillTextSelected: {
//     color: "#fff",
//   },

//   bottomArea: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },

//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F1F1F1",
//     borderRadius: 24,
//     paddingHorizontal: 12,
//     height: 56,
//   },

//   input: { flex: 1 },

//   sendIcon: {
//     tintColor: "#316BFF",
//     width: 22,
//     height: 22,
//     marginLeft: 8,
//   },

//   nextButton: {
//     backgroundColor: "#007AFF",
//     padding: 14,
//     borderRadius: 48,
//     alignItems: "center",
//     marginTop: 12,
//     height:56
//   },

//   disabled: { backgroundColor: "#00000040" },

//   nextText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//   },
// });


import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import VoiceRecorder from "../../components/VoiceMessage/VoiceRecorder";
import VoiceMessageBubble from "../../components/VoiceMessage/VoiceMessageBubble";
import { useNavigation } from "@react-navigation/native";

/* ICONS */
const checkIcon = require("../../assets/images/check.png");
const sendIcon = require("../../assets/images/send.png");

/* DATA */
const levelOptions = ["Junior", "Senior", "Manager"];
const experienceOptions = ["0–1", "2–4", "5–7", "8–10", "10+"];

const industryOptions = [
  "Tech / IT",
  "Healthcare",
  "Finance",
  "Retail / E-commerce",
  "Education",
];

const workingSituationOptions = [
  "Individual contributor",
  "Leading a team",
  "Cross-functional role",
  "Stakeholder-facing (clients / execs)",
];

const challengesList = [
  "Speaking in meetings",
  "Presenting ideas",
  "Asking for promotion or appraisal",
  "Saying no or setting boundaries",
  "Talking in manager 1-on-1s",
  "Showing my work / achievements",
  "Facing interviews",
];

const worriesList = [
  "Being judged",
  "Saying the wrong thing",
  "Not sounding confident",
  "Confrontation",
  "Forgetting what to say",
];

export default function ChatOnboardingScreen() {
    const navigation = useNavigation()

  const [step, setStep] = useState(1);
console.log('hi :>> ');
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [step1Answered, setStep1Answered] = useState(false);

  const [level, setLevel] = useState(null);
  const [experience, setExperience] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [workingSituations, setWorkingSituations] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [worries, setWorries] = useState([]);
  const [extraNote, setExtraNote] = useState("");

  const handleSendStep1 = () => {
    if (!input.trim()) return;
    setChat((prev) => [...prev, { id: Date.now(), value: input }]);
    setInput("");
    setStep1Answered(true);
  };

  const toggleMulti = (item, list, setList) => {
    setList(
      list.includes(item)
        ? list.filter((i) => i !== item)
        : [...list, item]
    );
  };

  const isButtonEnabled = () => {
    if (step === 1) return step1Answered;
    if (step === 2) return !!level;
    if (step === 3) return !!experience;
    if (step === 4) return industries.length > 0;
    if (step === 5) return workingSituations.length > 0;
    if (step === 6) return challenges.length > 0;
    if (step === 7) return worries.length > 0;
    return false;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Let’s personalize this for you</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <Text style={styles.question}>
              What role do you currently work in?
            </Text>

            {chat.map((item) => (
              <View key={item.id} style={styles.userBubble}>
                <Text style={styles.userText}>{item.value}</Text>
              </View>
            ))}
          </>
        )}

        {/* STEP 2 – RADIO */}
        {step === 2 && (
          <>
            <Text style={styles.question}>
              How would you describe your level?
            </Text>

            <View style={styles.bottomOptions}>
              <View style={styles.radioWrap}>
                {levelOptions.map((item) => (
                  <RadioPill
                    key={item}
                    label={item}
                    selected={level === item}
                    onPress={() => setLevel(item)}
                  />
                ))}
              </View>
            </View>
          </>
        )}

        {/* STEP 3 – RADIO */}
        {step === 3 && (
          <>
            <Text style={styles.question}>
              How many years of experience do you have?
            </Text>

            <View style={styles.bottomOptions}>
              <View style={styles.radioWrap}>
                {experienceOptions.map((item) => (
                  <RadioPill
                    key={item}
                    label={item}
                    selected={experience === item}
                    onPress={() => setExperience(item)}
                  />
                ))}
              </View>
            </View>
          </>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <>
            <Text style={styles.question}>
              Which industry do you work in?
            </Text>

            <View style={styles.bottomOptions}>
              <View style={styles.checkboxWrap}>
                {industryOptions.map((item) => (
                  <PillCheckbox
                    key={item}
                    label={item}
                    selected={industries.includes(item)}
                    onPress={() =>
                      toggleMulti(item, industries, setIndustries)
                    }
                  />
                ))}
              </View>
            </View>
          </>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <>
            <Text style={styles.question}>
              What’s your working situation like?
            </Text>

            <View style={styles.bottomOptions}>
              <View style={styles.checkboxWrap}>
                {workingSituationOptions.map((item) => (
                  <PillCheckbox
                    key={item}
                    label={item}
                    selected={workingSituations.includes(item)}
                    onPress={() =>
                      toggleMulti(item, workingSituations, setWorkingSituations)
                    }
                  />
                ))}
              </View>
            </View>
          </>
        )}

        {/* STEP 6 */}
        {step === 6 && (
          <>
            <Text style={styles.question}>
              What’s your biggest challenge at work right now?
            </Text>

            <View style={styles.bottomOptions}>
              <View style={styles.checkboxWrap}>
                {challengesList.map((item) => (
                  <PillCheckbox
                    key={item}
                    label={item}
                    selected={challenges.includes(item)}
                    onPress={() =>
                      toggleMulti(item, challenges, setChallenges)
                    }
                  />
                ))}
              </View>
            </View>
          </>
        )}

        {/* STEP 7 */}
        {step === 7 && (
          <>
            <Text style={styles.question}>
              What worries you the most?
            </Text>

            <View style={styles.bottomOptions}>
              <View style={styles.checkboxWrap}>
                {worriesList.map((item) => (
                  <PillCheckbox
                    key={item}
                    label={item}
                    selected={worries.includes(item)}
                    onPress={() =>
                      toggleMulti(item, worries, setWorries)
                    }
                  />
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* STEP 1 INPUT – UNCHANGED */}
      {step === 1 && (
        <View style={styles.bottomArea}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type here..."
              placeholderTextColor="#000"
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />
            <VoiceRecorder onRecorded={() => { }} />
            <TouchableOpacity onPress={handleSendStep1}>
              <Image source={sendIcon} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* STEP 7 INPUT */}
      {/* STEP 7 INPUT */}
      {step === 7 && (
        <View style={styles.bottomArea}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Anything you want to add?"
              placeholderTextColor="#000"
              value={extraNote}
              onChangeText={setExtraNote}
              style={styles.input}
            />

            {/* Mic icon – UI only */}
            <TouchableOpacity activeOpacity={0.7}>
              <VoiceRecorder onRecorded={() => { }} />
            </TouchableOpacity>

            {/* Send icon – UI only */}
            <TouchableOpacity activeOpacity={0.7}>
              <Image source={sendIcon} style={styles.sendIcon} />
            </TouchableOpacity>
          </View>
        </View>
      )}


      {/* BUTTON */}
      <View style={styles.buttonWrap}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isButtonEnabled() && styles.disabled,
          ]}
          disabled={!isButtonEnabled()}
          onPress={() => {
            if (step < 7) {
              setStep(step + 1);
            } else {
              navigation.navigate("startDayOne");
            }
          }}
        >
          <Text style={styles.nextText}>
            {step === 7 ? "Create my 90-day plan" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* RADIO */
const RadioPill = ({ label, selected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    style={[
      styles.radioPill,
      selected && styles.radioPillSelected,
    ]}
  >
    <View
      style={[
        styles.radioCircle,
        selected && styles.radioCircleSelected,
      ]}
    >
      {selected && <View style={styles.radioDot} />}
    </View>

    <Text
      style={[
        styles.radioText,
        selected && styles.radioTextSelected,
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

/* CHECKBOX – UNCHANGED */
const PillCheckbox = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.pill, selected && styles.pillSelected]}
  >
    <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
      {selected && (
        <Image source={checkIcon} style={styles.checkIcon} />
      )}
    </View>
    <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* STYLES */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  headerText: { fontSize: 24, padding: 16 },
  content: { paddingHorizontal: 16, flexGrow: 1 },
  question: { fontSize: 32, marginBottom: 16 },

  bottomOptions: {
    marginTop: "auto",
    paddingBottom: 100,
  },

  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 24,
    marginBottom: 8,
  },
  userText: { color: "#fff" },

  radioWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  radioPill: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 10,
    borderRadius: 24,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 12,
    marginBottom: 12,
    elevation: 3,
  },

  radioPillSelected: { borderColor: "#1E88FF" },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#CFCFCF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  radioCircleSelected: { borderColor: "#1E88FF" },

  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1E88FF",
  },

  radioText: { fontSize: 14, color: "#2A2A2A" },
  radioTextSelected: { color: "#1E88FF", fontWeight: "500" },

  checkboxWrap: { flexDirection: "row", flexWrap: "wrap" },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 24,
    backgroundColor: "#fff",
    marginRight: 12,
    marginBottom: 12,
    elevation: 2,
  },

  pillSelected: { backgroundColor: "#1E88FF" },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: "#D0D0D0",
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  checkboxSelected: { borderColor: "#fff" },
  checkIcon: { width: 12, height: 12, tintColor: "#1E88FF" },

  pillText: { fontSize: 13, color: "#333" },
  pillTextSelected: { color: "#fff" },

  bottomArea: { padding: 16,bottom:100 },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E2E2E2",
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 56,
  },

  input: { flex: 1 },

  sendIcon: {
    width: 22,
    height: 22,
    tintColor: "#316BFF",
    marginLeft: 8,
  },

  buttonWrap: { padding: 16,bottom:100 },

  nextButton: {
    height: 56,
    borderRadius: 48,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },

  disabled: { backgroundColor: "#999" },

  nextText: { color: "#fff", fontSize: 18 },
});
