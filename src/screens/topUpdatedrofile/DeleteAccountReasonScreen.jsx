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
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');
const scale = width / 390;

const reasons = [
  'I’m not using the app anymore',
  'I didn’t find it helpful for my confidence',
  'I expected different features',
  'Too expensive / pricing issue',
  'I had technical problems',
  'I’m getting too many notifications',
  'I want to start fresh / reset my data',
  'I’m concerned about privacy',
  'I found another app I prefer',
];

export default function DeleteAccountReasonScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);

  const toggleReason = index => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Delete account" />
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <Text style={styles.title}>Delete account</Text>
        <Text style={styles.subtitle}>
          Why would you like to delete your account?
        </Text>

        <View style={styles.card}>
          {reasons.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.row}
                activeOpacity={0.7}
                onPress={() => toggleReason(index)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selected.includes(index) && styles.checkboxSelected,
                  ]}
                />
                <Text style={styles.reasonText}>{item}</Text>
              </TouchableOpacity>

              {/* Responsive Divider */}
              {index !== reasons.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.deleteBtn,
          selected.length > 0 && styles.deleteBtnActive,
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
    paddingHorizontal: width * 0.04, // responsive horizontal padding
  },

  title: {
    fontSize: 20 * scale,
    fontWeight: '600',
    marginTop: height * 0.03,
    color: '#000',
  },

  subtitle: {
    fontSize: 14 * scale,
    color: '#555',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12 * scale,
    paddingVertical: height * 0.01,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    width: width - 32,
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.018,
    paddingHorizontal: width * 0.04,
  },

  checkbox: {
    width: 18 * scale,
    height: 18 * scale,
    borderRadius: 4 * scale,
    borderWidth: 1.5,
    borderColor: '#999',
    marginRight: 12 * scale,
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
  divider: {
    height: 1 * scale,
    backgroundColor: '#CFCFCF',
    marginHorizontal: width * 0.04,
    opacity: 1,
  },

  deleteBtn: {
    position: 'absolute',
    bottom: height * 0.03,
    left: width * 0.04,
    right: width * 0.04,
    height: height * 0.065,
    borderRadius: (height * 0.065) / 2,
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
