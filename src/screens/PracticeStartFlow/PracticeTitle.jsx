import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../../constants/fonts';


const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;


const ScreenTitle = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32 * scale,
    fontFamily: Fonts.Medium,
    fontWeight:500,
    textAlign: "center",
    lineHeight: 48 * scale,
    color: "#2A2A2A",
    width: screenWidth - 32,
    alignSelf: 'center'
  },
});

export default ScreenTitle;
