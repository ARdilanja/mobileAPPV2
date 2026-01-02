// components/OnboardingContainer/ProgressBar.jsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

const TOTAL_STEPS = 4;

const ProgressBar = ({ currentPage, isCurrentStepCompleted }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
        const stepIndex = index + 1;

        if (stepIndex < currentPage) {
          // Previous steps: fully blue
          return <View key={index} style={[styles.segment, styles.fullBlue]} />;
        } else if (stepIndex === currentPage) {
          // Current step
          if (isCurrentStepCompleted) {
            // Fully blue when ready
            return (
              <View key={index} style={[styles.segment, styles.fullBlue]} />
            );
          } else {
            // Partial blue when just entered
            return (
              <View key={index} style={styles.segmentWrapper}>
                <View style={[styles.segment, styles.lightBlue]} />

                <View style={[styles.partialFill, styles.blueFill]} />
              </View>
            );
          }
        } else {
          return <View key={index} style={[styles.segment, styles.gray]} />;
        }
      })}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 14 * scale,
    alignItems: 'center',
  },
  segmentWrapper: {
    flex: 1,
    height: 6 * scale,
    marginHorizontal: 4 * scale,
    borderRadius: 24 * scale,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    height: 6 * scale,
    borderRadius: 4 * scale,
  },
  gray: {
    backgroundColor: '#E6E6E6',
  },
  lightBlue: {
    backgroundColor: '#BEDCFF',
  },
  fullBlue: {
    backgroundColor: '#235DFF',
  },
  partialFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    borderRadius: 4 * scale,
  },
  blueFill: {
    backgroundColor: '#235DFF',
  },
});
