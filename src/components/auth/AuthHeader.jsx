import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';

 const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const AuthHeader = ({
  title,
  subtitle,

  showBack,
  showLogo,

  onBackPress,
}) => {
  const navigation = useNavigation();
 

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* 🔹 Top Row: Back + Logo */}
      <View style={styles.topRow}>
        {showBack ? (
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Image
              source={require('../../assets/icons/angle-small-back.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.sidePlaceholder} />
        )}

        {showLogo ? (
          <Image
            source={require('../../assets/images/recroot-logo2.png')}
            style={{ width: 109, height: 24 }}
          // resizeMode="contain"
          />
        ) : (
          <View style={styles.sidePlaceholder} />
        )}

        <View style={styles.sidePlaceholder} />
      </View>

      {/* 🔹 Title & Subtitle */}
      <View style={styles.textContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 0,
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  /* Top Row */
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    gap: 8,
    marginBottom: 24,
    paddingVertical: 10
  },
  backBtn: {
    width: 24,
    height: 24,
    borderRadius:24,
    backgroundColor:'#F5F5F51A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 7.17,
    height: 14,
  },
  sidePlaceholder: {
    width: 32,
  },

  /* Text */
  textContainer: {
    paddingTop: 16,
  },
  title: {
    fontSize: 40 * scale,
    lineHeight: 56 * scale,
    fontWeight: '500',
    fontFamily: Fonts.Medium,
    color: '#000',
  },
  subtitle: {
    fontSize: 14 * scale,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Regular, color: '#2A2A2A',
    marginTop: 4,
  },
});


export default AuthHeader;
