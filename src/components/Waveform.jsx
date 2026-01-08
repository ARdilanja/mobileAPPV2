import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const BARS = 20;

const Waveform = ({ isRecording }) => {
  const animations = useRef(
    Array.from({ length: BARS }, () => new Animated.Value(4))
  ).current;

  useEffect(() => {
    if (!isRecording) {
      animations.forEach(a => a.setValue(4));
      return;
    }

    const loops = animations.map(anim =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: Math.random() * 20 + 6,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(anim, {
            toValue: 4,
            duration: 300,
            useNativeDriver: false,
          }),
        ])
      )
    );

    loops.forEach(l => l.start());

    return () => loops.forEach(l => l.stop());
  }, [isRecording]);

  return (
    <View style={styles.container}>
      {animations.map((height, i) => (
        <Animated.View
          key={i}
          style={[styles.bar, { height }]}
        />
      ))}
    </View>
  );
};

export default Waveform;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
  },
  bar: {
    width: 3,
    backgroundColor: '#2563EB',
    marginHorizontal: 1,
    borderRadius: 2,
  },
});
