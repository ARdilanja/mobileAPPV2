import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import {Applicability_TEXT, CLIENT_RESPONSIBILITIES_INTRO, CLIENT_RESPONSIBILITIES_LIST, DETAILED_POLICY_LIST, DETAILED_POLICY_REQUIREMENTS, FURTHER_INFORMATION_TEXT, POLICYSUMMARY_TEXT, RECROOT_RESPONSIBILITIES_INTRO, RECROOT_RESPONSIBILITIES_LIST} from '../content/settingsSecurityContent'
import { Fonts } from "../constants/fonts";

const screenWidth = Dimensions.get("window").width;

export default function SettingsSecurity() {
  return (
    <ScrollView style={styles.container}>

      {/* INTRODUCTION */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Policy summary</Text>
      </View>

      <Text style={styles.paragraph}>
        {POLICYSUMMARY_TEXT}
      </Text>

      {/* RESTRICTIONS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Applicability</Text>
      </View>

      <Text style={styles.paragraph}>
        {Applicability_TEXT}
      </Text>

      <View style={styles.sectionHeader}>
  <Text style={styles.sectionTitle}>Responsibilities</Text>
</View>

{/* Recroot Responsibilities */}
<Text style={styles.boldText}>Recroot Responsibilities</Text>

<Text style={[styles.paragraph ,{ paddingBottom: 5 }]}>
  {RECROOT_RESPONSIBILITIES_INTRO}
</Text>

{RECROOT_RESPONSIBILITIES_LIST.map((item, index) => (
  <View key={index} style={styles.listItem}>
    <Text style={styles.listIndex}>{index + 1}.</Text>
    <Text style={styles.listText}>{item}</Text>
  </View>
))}

{/* Client Responsibilities */}
<Text style={[styles.boldText, { marginTop: 16 }]}>
  Client Responsibilities
</Text>

<Text style={[styles.paragraph ,{ paddingBottom: 5 }]}>
  {CLIENT_RESPONSIBILITIES_INTRO}
</Text>

{CLIENT_RESPONSIBILITIES_LIST.map((item, index) => (
  <View key={index} style={styles.listItem}>
    <Text style={styles.listIndex}>{index + 1}.</Text>
    <Text style={styles.listText}>{item}</Text>
  </View>
))}

{/* Detailed policy requirements */}
<Text style={[styles.boldText, { marginTop: 16 }]}>
  Detailed policy requirements
</Text>

{DETAILED_POLICY_REQUIREMENTS.map((item, index) => {
  // Normal numbered paragraph (1 & 2)
  if (item.type === "text") {
    return (
      <View key={index} style={styles.listItem}>
        <Text style={styles.listIndex}>{index + 1}.</Text>
        <Text style={styles.listText}>{item.content}</Text>
      </View>
    );
  }

  // Bullet section (3 & 4)
  return (
    <View key={index} style={styles.bulletSection}>
      <View style={styles.listItem}>
        <Text style={styles.listIndex}>{index + 1}.</Text>
        <Text style={[styles.listText, styles.subTitle]}>
          {item.title}
        </Text>
      </View>

      {item.items.map((subItem, subIndex) => (
        <View key={subIndex} style={styles.bulletItem}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{subItem}</Text>
        </View>
      ))}
    </View>
  );
})}

 <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Further information</Text>
      </View>

      <Text style={styles.paragraph}>
        {FURTHER_INFORMATION_TEXT}
      </Text>
      
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // paddingHorizontal: 20,
    paddingbottom: 16,
    marginTop:0,
  },

  sectionHeader: {
    backgroundColor: "#E1F1FF",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: Fonts.Medium,
    color: "#0087FF",
    letterSpacing: 0.5,
  },

   paragraph: {
      fontSize: 12,
      fontFamily: Fonts.Regular,
      color: "#475569",
      // paddingHorizontal: 20,
      lineHeight: 20,
      textAlign:'justify',
      width:screenWidth - 50,
      marginHorizontal:'auto'
    },

  boldText: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: "#034275",
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 2,
  },

  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    textAlign:'justify',
    paddingHorizontal:25,
    // width:screenWidth - 50,
    marginHorizontal:'auto'
  },

  listIndex: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: "#475569",
    marginRight: 3,
  },

  listText: {
    flex: 1,
    fontSize: 12,
    fontFamily: Fonts.Regular,
    color: "#475569",
    lineHeight: 18,
  },
  subTitle: {
  fontFamily: Fonts.Medium,
  color: "#334155",
},

bulletSection: {
  marginBottom: 8,
},

bulletItem: {
  flexDirection: "row",
  alignItems: "flex-start",
  paddingLeft: 30,
  marginBottom: 0,
},

bulletDot: {
  fontSize: 14,
  marginRight: 6,
  color: "#475569",
},

bulletText: {
  flex: 1,
  fontSize: 12,
  fontFamily: Fonts.Regular,
  color: "#475569",
  lineHeight: 18,
}
});
