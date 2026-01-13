import React, { useCallback, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../components/Header";
import { Fonts } from "../constants/fonts";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { transcribeWithDeepgram } from "../utils/deepgram";

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

export default function SessionFeedbackScreen() {
  const flatListRef = useRef(null);
  const { startRecording, stopRecording } = useAudioRecorder();

 const initialMessages = [
  {
    id: "1",
    type: "system",
    text:
      "Thanks for completing all three answers! Let’s start by going through your first response. I can hear that you’re giving context really well, that part comes across clearly.",
    // avatar: require("../assets/images/profile-rounded-lea.png"),
  },
  {
    id: "2",
    type: "system",
    text:
      "Where it could be stronger is around the main point. Right now, it comes a bit later, so someone listening might need to wait to understand the key message.",
    // avatar: require("../assets/images/profile-rounded-lea.png"),
  },
  {
    id: "3",
    type: "system",
    text:
      "Do you want to try answering that one again, using that approach?",
    avatar: require("../assets/images/profile-rounded-lea.png"),
  },
];


  const [messages, setMessages] = useState(initialMessages);
  const [showAction, setShowAction] = useState(true);
const [recording, setRecording] = useState(false);
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle("dark-content");
      StatusBar.setBackgroundColor("#FFFFFF");
      StatusBar.setTranslucent(false);
    }, [])
  );
const handleMicPress = async () => {
  if (!recording) {
    await startRecording();
    setRecording(true);
    console.log("🎤 Recording started");
  } else {
    const path = await stopRecording();
    setRecording(false);

    console.log("🛑 Recording stopped. File path:", path);

    if (!path) return;

    const transcript = await transcribeWithDeepgram(path);

    // 🔥 CONSOLE OUTPUT
    console.log("🎙️ Deepgram Transcript:", transcript);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        text: transcript || "Voice message",
        audioUri: path,
        avatar: require("../assets/images/profile-rounded-user.png"),
      },
    ]);
  }
};

 const handleNextFeedback = () => {
  setMessages((prev) => [
    ...prev,
    {
      id: Date.now().toString(),
      type: "user",
      text: "No, move to next feedback",
      avatar: require("../assets/images/profile-rounded-user.png"),
    },
  ]);

  setShowAction(false);
};


 const renderItem = ({ item }) => {
  const isUser = item.type === "user";

  return (
    <View
      style={[
        styles.messageRow,
        isUser ? styles.rowRight : styles.rowLeft,
      ]}
    >
      {/* LEFT AVATAR */}
      {!isUser && (
        <View style={styles.avatarWrapper}>
          <Image source={item.avatar} style={styles.avatar} />
        </View>
      )}

      {/* MESSAGE */}
      <View
        style={[
          styles.messageBubble,
          isUser ? styles.userBubble : styles.systemBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser && styles.userText,
          ]}
        >
          {item.text}
        </Text>
      </View>

      {/* RIGHT AVATAR */}
      {isUser && (
        <View style={styles.avatarWrapper}>
          <Image source={item.avatar} style={styles.avatar} />
        </View>
      )}
    </View>
  );
};



  return (
    <View style={styles.container}>

      <ImageBackground
        source={require("../assets/images/Chat-bg.png")} // optional bg
        style={styles.chatBackground}
          resizeMode="repeat"

      >
      <Header title="Session Feedback"  />

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContainer}
          showsVerticalScrollIndicator={false}
        />

        {showAction && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleNextFeedback}
          >
            <Text style={styles.actionText}>
              No, move to next feedback
            </Text>
          </TouchableOpacity>
        )}

        {/* Mic Button (UI only) */}
      <TouchableOpacity style={styles.micWrapper} onPress={handleMicPress}>
  <View style={styles.micCircle}>
    <ImageBackground
      source={require("../assets/images/Micscreen_button.png")}
      style={styles.micBg}
      resizeMode="contain"
    >
      <Image
        source={require("../assets/images/micnew.png")}
        style={styles.micImage}
        resizeMode="contain"
      />
    </ImageBackground>
  </View>
</TouchableOpacity>



      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chatBackground: {
    flex: 1,
  },

  chatContainer: {
    padding: 10,
    // paddingBottom: 140,
  },
messageRow: {
  flexDirection: "row",
  alignItems: "flex-end",
  marginBottom: 12,
  width: "100%",              // 🔥 REQUIRED
  paddingHorizontal: 8,
},

rowLeft: {
  justifyContent: "flex-start",
},

rowRight: {
  justifyContent: "flex-end",
},
avatarWrapper: {
  width: 48,
  alignItems: "center",
  justifyContent: "flex-end",
},
avatar: {
  width: 48,
  height: 48,
  borderRadius: 14,
  marginHorizontal: 12,
},

messageBubble: {
  maxWidth: screenWidth  - 42 -48 -12, // 🔥 CRITICAL
  padding: 12,
  borderRadius: 24,
},


systemBubble: {
  backgroundColor: "#fff",
  marginLeft:12,
  borderBottomLeftRadius: 4,
},

userBubble: {
  backgroundColor: "#2563EB",
  marginRight:12,
  borderBottomRightRadius: 4,
},

messageText: {
  fontSize: 14,
  lineHeight: 20,
  color: "#111827",
  fontFamily: Fonts.Regular,
},

userText: {
  color: "#FFFFFF",
},

  actionButton: {
    alignSelf: "flex-end",
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 16,
    marginBottom: 12,
  },

  actionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: Fonts.Medium,
  },

 micWrapper: {
  position: "absolute",
  bottom: 32,
  alignSelf: "center",
},


micBg: {
  width: 180,
  height: 180,
  justifyContent: "center",
  alignItems: "center",
},

micImage: {
  width: 48,
  height: 48,
},
voiceCard: {
  backgroundColor: '#F6F7FB',
  padding: 12,
  borderRadius: 10,
  marginBottom: 12,
},

playBtn: {
  color: '#235DFF',
  fontFamily: Fonts.SemiBold,
},

transcriptText: {
  marginTop: 6,
  color: '#333',
  fontFamily: Fonts.Regular,
  fontSize: 14,
},


});
