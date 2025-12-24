import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ length = 4 }) => {
  return (
    <View style={styles.container}>
      {[...Array(length)].map((_, i) => (
        <TextInput
          key={i}
          maxLength={1}
          keyboardType="number-pad"
          style={styles.input}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap:12,
    marginHorizontal: 16,
  },
  input: {
    width: 50,
    height: 50,
    borderRadius:48,
    borderWidth: 1,
    borderColor: '#fff',
    textAlign: 'center',
    backgroundColor:'#fff',
    fontSize: 18,
    lineHeight:28,
    color:'rgba(36, 36, 36, 1)'
  },
});

export default OtpInput;
