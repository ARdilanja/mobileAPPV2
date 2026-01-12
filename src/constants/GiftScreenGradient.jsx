import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GiftScreenGradient = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[
        '#9ACBFF', // strong blue top
        '#CFE3FF', // soft blue fade
        '#FFFFFF', // white
        '#FFFFFF', // white till bottom
      ]}
      locations={[0, 0.25, 0.45, 1]} // 👈 KEY PART
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default GiftScreenGradient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
