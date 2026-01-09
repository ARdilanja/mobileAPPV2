import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import Header from '../../components/Header';

const { width, height } = Dimensions.get('window');
const scale = width / 390; // base design width

export default function SettingsScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F6F6F6" />
      <Header title="Settings" />

      {/* CARD */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('DeleteAccountReasonScreen')}
        >
          <Text style={styles.text}>Delete account</Text>

          <Image
            source={require('../../assets/images/Arrow-icon.png')}
            style={styles.arrow}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: width * 0.04, // responsive horizontal padding
    paddingTop: height * 0.02,       // responsive top padding
  },

  card: {
    width: width - width * 0.08,   // responsive: full width minus margins
    backgroundColor: '#FFFFFF',
    borderRadius: 16 * scale,      // scaled border radius
    height: 56 * scale,            // scaled height
    alignSelf: 'center',
    justifyContent: 'center',

    // shadow
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 16 * scale,      // spacing between cards if more added
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16 * scale, // scaled horizontal padding
  },

  text: {
    fontSize: 14 * scale,
    color: '#000000',
    fontWeight: '400',
  },

  arrow: {
    width: 16 * scale,
    height: 16 * scale,
    tintColor: '#999',
  },
});
