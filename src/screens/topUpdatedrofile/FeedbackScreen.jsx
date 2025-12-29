import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function FeedbackScreen() {
  return (
    <View style={styles.container}>
    <StatusBar backgroundColor="#F6F6F6" />
      <Header title="Feedback" />
      <View style={styles.heading}>
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
  },
  heading:{
    paddingHorizontal:20,
    paddingTop:20
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    fontFamily:Fonts.Medium,
    color:'#000000',
    lineHeight:20,
    marginBottom:8
  },

  subtitle: {
    fontSize: 13,
    color: '#000000',
    marginBottom: 16,
    fontFamily:Fonts.Regular,
    fontWeight:'400',
    lineHeight:20
  },

  inputCard: {
    height: 120 * scale,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingLeft:10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  input: {
    flex: 1,
    textAlignVertical: 'top',
    color: '#000',
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
    color: '#FFFFFF',
    fontWeight: 500,
    fontSize:20,
    fontFamily:Fonts.Medium
  },
});
