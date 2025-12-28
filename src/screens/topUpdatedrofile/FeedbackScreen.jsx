import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function FeedbackScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send feedback</Text>
      <Text style={styles.subtitle}>
        Tell us what you love about the app, or what we could be doing better.
      </Text>

      <View style={styles.inputCard}>
        <TextInput
          placeholder="Enter your feedback"
          multiline
          style={styles.input}
           placeholderTextColor="#9898A0"
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 6,
    marginBottom: 16,
  },

  inputCard: {
    height: 120 * scale,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  input: {
    flex: 1,
    textAlignVertical: 'top',
    color:'#000',
  },

  button: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    width: width - 64,
    height: 48,
    backgroundColor: '#9E9E9E',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
