// components/OnboardingContainer/ProgressBar.jsx
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

const TOTAL_STEPS = 6;

const ProgressBar = ({ currentPage, isCurrentStepCompleted }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => {
        const stepIndex = index + 1;
        const isLast = index === TOTAL_STEPS - 1;

        const spacingStyle = !isLast && { marginRight: 7 * scale };

        if (stepIndex < currentPage) {
          return (
            <View
              key={index}
              style={[styles.segment, styles.fullBlue, spacingStyle]}
            />
          );
        }

        if (stepIndex === currentPage) {
          if (isCurrentStepCompleted) {
            return (
              <View
                key={index}
                style={[styles.segment, styles.fullBlue, spacingStyle]}
              />
            );
          }

          return (
            <View key={index} style={[styles.segmentWrapper, spacingStyle]}>
              <View style={[styles.segment, styles.lightBlue]} />
              <View style={[styles.partialFill, styles.blueFill]} />
            </View>
          );
        }

        return (
          <View
            key={index}
            style={[styles.segment, styles.gray, spacingStyle]}
          />
        );
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
    width: '42%',
    borderRadius: 4 * scale,
  },
  blueFill: {
    backgroundColor: '#235DFF',
  },
});
