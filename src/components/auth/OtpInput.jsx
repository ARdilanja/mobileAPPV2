import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const OtpInput = ({ length = 4 , value, onChange }) => {
   const inputs = useRef([]);

  const handleChange = (text, index) => {
    const otpArray = value.split('');
    otpArray[index] = text;
    const updatedOtp = otpArray.join('');
    onChange(updatedOtp);

    // Auto focus next box
    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
     <View style={styles.container}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => (inputs.current[i] = ref)}
          maxLength={1}
          keyboardType="number-pad"
          style={styles.input}
          value={value[i] || ''}
          onChangeText={(text) => handleChange(text, i)}
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
