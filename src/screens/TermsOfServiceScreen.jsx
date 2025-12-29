import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import {
  INTRODUCTION_TEXT,
  RESTRICTIONS_TITLE,
  RESTRICTIONS_LIST,
  NOWARRANTIES_TEXT,
  ASSIGNMENT_TEXT,
  VARIATION_TEXT,
  SEVERABILITY_TEXT,
  INDEMNIFICATION_TEXT,
  LIMITATION_TEXT,
} from "../content/termsOfServiceContent";
import { Fonts } from "../constants/fonts";
import Header from "../components/Header";

const screenWidth = Dimensions.get("window").width;

export default function TermsOfServiceScreen() {
  return (
    <ScrollView style={styles.container}>
    <StatusBar backgroundColor="#FFFFFF" />
    <Header title="Terms of service" />

      {/* INTRODUCTION */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>INTRODUCTION</Text>
      </View>

      <Text style={styles.paragraph}>
        {INTRODUCTION_TEXT}
      </Text>

      {/* RESTRICTIONS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>RESTRICTIONS</Text>
      </View>

      <Text style={styles.boldText}>
        {RESTRICTIONS_TITLE}
      </Text>

      {RESTRICTIONS_LIST.map((item, index) => (
        <View key={index} style={styles.listItem}>
          <Text style={styles.listIndex}>{index + 1}.</Text>
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>NO WARRANTIES</Text>
      </View>

      <Text style={styles.paragraph}>
        {NOWARRANTIES_TEXT}
      </Text>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>LIMITATION OF LIABILITY</Text>
      </View>

      <Text style={styles.paragraph}>
        {LIMITATION_TEXT}
      </Text>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>INDEMNIFICATION</Text>
      </View>

      <Text style={styles.paragraph}>
        {INDEMNIFICATION_TEXT}
      </Text>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>SEVERABILITY</Text>
      </View>

      <Text style={styles.paragraph}>
        {SEVERABILITY_TEXT}
      </Text>
       <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>VARIATION OF TERMS</Text>
      </View>

      <Text style={styles.paragraph}>
        {VARIATION_TEXT}
      </Text>
       <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>ASSIGNMENT</Text>
      </View>

      <Text style={styles.paragraph}>
        {ASSIGNMENT_TEXT}
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
    marginTop: 10,
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
});
