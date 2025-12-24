import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#9acbff','#c3ddf8ff', '#fff', '#ffffff']}
      style={[styles.container, style]}
    >
      {children}
    </LinearGradient>
  );
};

export default Gradient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
