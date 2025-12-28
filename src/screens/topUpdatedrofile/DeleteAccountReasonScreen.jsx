import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

const reasons = [
  "I’m not using the app anymore",
  "I didn’t find it helpful for my confidence",
  "I expected different features",
  "Too expensive / pricing issue",
  "I had technical problems",
  "I’m getting too many notifications",
  "I want to start fresh / reset my data",
  "I’m concerned about privacy",
  "I found another app I prefer",
];

export default function DeleteAccountReasonScreen() {
      const navigation =useNavigation()

  const [selected, setSelected] = useState([]);

  const toggleReason = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>Delete account</Text>
        <Text style={styles.subtitle}>
          Why would you like to delete your account?
        </Text>

        <View style={styles.card}>
          {reasons.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.row}
              activeOpacity={0.7}
              onPress={() => toggleReason(index)}
            >
              <View style={[
                styles.checkbox,
                selected.includes(index) && styles.checkboxSelected
              ]} />

              <Text style={styles.reasonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.deleteBtn,
          selected.length > 0 && styles.deleteBtnActive
        ]}
        disabled={selected.length === 0}
        onPress={() => navigation.navigate('DeleteAccountConfirmScreen')}
      >
        <Text style={styles.deleteText}>Delete my account</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20 * scale,
    fontWeight: '600',
    marginTop: 12,
    color: '#000',
  },

  subtitle: {
    fontSize: 14 * scale,
    color: '#555',
    marginTop: 8,
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#999',
    marginRight: 12,
  },

  checkboxSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },

  reasonText: {
    fontSize: 14 * scale,
    color: '#111',
    flex: 1,
  },

  deleteBtn: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteBtnActive: {
    backgroundColor: '#007AFF',
  },

  deleteText: {
    color: '#FFFFFF',
    fontSize: 16 * scale,
    fontWeight: '600',
  },
});
