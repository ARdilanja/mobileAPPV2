import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const EmployerInterviewCard = ({ companyLogo, companyName, role, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.left}>
        <Image source={companyLogo} style={styles.logo} resizeMode="contain" />
        <View>
          <Text style={styles.company}>{companyName}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  company: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  role: {
    fontFamily: 'Inter',
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  startText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default EmployerInterviewCard;