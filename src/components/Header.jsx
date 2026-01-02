import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../constants/fonts';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
        hitSlop={{ top: 0, bottom: 10, left: 10, right: 10 }}
      >
        <Image
          source={require('../assets/images/back.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right spacer to center title */}
      <View style={styles.rightSpace} />
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 16,
    marginTop:30,
  },

  backBtn: {
    padding: 6,
    paddingHorizontal:20
  },

  backIcon: {
    width: 22,
    height: 22,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    fontFamily:Fonts.Bold,
    paddingRight:30
  },

  rightSpace: {
    width: 22, // same width as back icon
  },
});
