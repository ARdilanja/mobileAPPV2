import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Image,
} from "react-native";
import { Fonts } from "../constants/fonts";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

export default function FeedbackScreen() {
  const navigation = useNavigation();

  const [selected, setSelected] = useState(4);
  const [challenge, setChallenge] = useState(null);
  const ratings = [
    { emoji: "😡", label: "Terrible" },
    { emoji: "🙁", label: "Bad" },
    { emoji: "😐", label: "Okay" },
    { emoji: "🙂", label: "Good" },
    { emoji: "😍", label: "Lovely" },
  ];
  const challengeOptions = [
    {
      id: 1,
      label: "Too easy",
      icon: require("../assets/icons/user-blue.png"),
      bgColor: "#E6EEFF",
      width: 8,
      height: 12,
    },
    {
      id: 2,
      label: "Just right",
      icon: require("../assets/icons/user-gear.png"),
      bgColor: "#EFEAFF",
      width: 12,
      height: 12,
    },
    {
      id: 3,
      label: "Too hard",
      icon: require("../assets/icons/employee-man.png"),
      bgColor: "#E8F7EE",
      width: 12,
      height: 12,
    },
  ];


  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('white');
      StatusBar.setTranslucent(false);
    }, []),
  );
  return (
    <View style={styles.maincontainer}>
      <Header title="Feedback" showBack={false} />

      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>How was your session?</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          How likely are you to recommend recroot to a friend?
        </Text>

        {/* Section */}
        <Text style={[styles.title, { marginBottom: 14 }]}>Rate this session</Text>

        {/* Emoji Rating */}
        <View style={styles.ratingRow}>
          {ratings.map((item, index) => {
            const isActive = selected === index;

            return (
              <View key={index} style={styles.ratingItem}>
                <TouchableOpacity
                  onPress={() => setSelected(index)}
                  style={[
                    styles.emojiWrapper,
                    isActive && styles.activeEmoji,
                  ]}
                >
                  {/* Tick */}
                  {isActive && (
                    <View style={styles.tickCircle}>
                      <Text style={styles.tick}>✓</Text>
                    </View>
                  )}

                  <Text style={styles.emoji}>{item.emoji}</Text>
                </TouchableOpacity>

                {/* Active label */}
                {isActive && item.label !== "" && (
                  <Text style={styles.activeLabel}>{item.label}</Text>
                )}
              </View>
            );
          })}
        </View>


        <Text style={[styles.title, { marginBottom: 16 }]}>
          How challenging was it?
        </Text>

        <View style={styles.challengeRow}>
          {challengeOptions.map((item) => (
            <ChallengeCard
              key={item.id}
              item={item}
              selected={challenge}
              onPress={() => setChallenge(item.id)}
            />
          ))}
        </View>
        <Text style={[styles.title, { marginBottom: 16 }]}>
          Any comments or suggestions? (Optional)
        </Text>
        <TextInput
          placeholder="Type here.."
          placeholderTextColor="#989898"
          multiline
          style={styles.textArea}
        />

        {/* Button */}
        <View style={styles.bottomButtonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SessionFeedbackScreen")}>
            <Text style={styles.buttonText}>Create 90 day plan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    // backgroundColor: "#FFFFFF",
    // paddingHorizontal: 16
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    // paddingBottom: 44,
  },

  title: {
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Medium,
    color: '#000',
    marginBottom: 8,
    marginTop: 24 * scale,

  },

  subtitle: {
    fontFamily: Fonts.Regular,
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    color: "#000",
    // marginBottom: 24,
  },

  sectionTitle: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 12,
  },

  ratingRow: {
    // width: screenWidth - 50,
    flexDirection: "row",
    // justifyContent: "space-between",
    // marginBottom: 30,
    gap: 24 * scale
  },

  ratingItem: {
    alignItems: "center",
  },

  emojiWrapper: {
    width: 40 * scale,
    height: 40 * scale,
    borderRadius: 22, // PERFECT CIRCLE
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 2,
    backgroundColor: "#E1F1FF",
    position: "relative",
  },

  activeEmoji: {
    backgroundColor: "#235DFF",
    width: 36 * scale,
    height: 36 * scale,
  },

  emoji: {
    fontSize: 24 * scale,
  },

  tickCircle: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: "#E1F1FF",
    justifyContent: "center",
    alignItems: "center",
  },

  tick: {
    color: "#235DFF",
    fontSize: 8,
  },

  activeLabel: {
    marginTop: 4,
    fontSize: 8 * scale,
    color: "#235DFF",
    fontFamily: Fonts.Medium,
    // marginBottom: 24
  },

  textArea: {
    minHeight: 120,
    // height: 240,
    width: screenWidth - 32,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 12,
    padding: 12,
    color: '#777777',
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    fontFamily: Fonts.Regular,

    textAlignVertical: "top",
    marginBottom: 30,
  },
  bottomButtonWrapper: {
    position: "absolute",
    bottom: 44,
    left: 16,
    right: 16,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 48,
    alignItems: "center",
    marginHorizontal: 'auto',
    width: screenWidth - 32
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Medium,

  },
  challengeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 24,
  },

  challengeCard: {
    width: (screenWidth - 54) / 3,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    // alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",




  },

  challengeCardActive: {
    borderColor: "#235DFF",
  },

  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  challengeText: {
    fontSize: 14 * scale,
    lineHeight: 20 * scale,
    fontFamily: Fonts.Regular,
    color: "#111827",
  },


});
const ChallengeCard = ({ item, selected, onPress }) => {
  const isActive = selected === item.id;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.challengeCard,
        isActive && styles.challengeCardActive,
      ]}
    >
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: item.bgColor },
        ]}
      >
        <Image
          source={item.icon}
          style={[styles.icon, { width: item.width, height: item.height }]}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.challengeText}>{item.label}</Text>
    </TouchableOpacity>
  );
};


