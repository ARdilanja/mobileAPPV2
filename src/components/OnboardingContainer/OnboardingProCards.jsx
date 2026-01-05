// components/OnboardingContainer/OnboardingProCards.jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const H_PADDING = 16 * 2;
const GAP = 12;

const SMALL_CARD_WIDTH = (width - H_PADDING - GAP) / 2;

const LARGE_CARD_WIDTH = width - H_PADDING;


const OnboardingProCards = ({
  title,
  icon,
  selected = false,
  onPress,
  iconBgColor,
  accentColor = '#235DFF',
  selectionType = 'multi', // 'multi' | 'single'
  variant = 'small',
}) => {
  const isSmall = variant === 'small';

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.card,
          isSmall ? styles.smallCard : styles.largeCard,
          selected && { borderColor: accentColor },
        ]}
      >
        {icon && (
          <View style={[styles.iconBg, { backgroundColor: iconBgColor }]}>
            <Image source={icon} style={styles.icon} />
          </View>
        )}

        <View style={styles.titleWrapper}>
          <Text style={styles.title}
          >{title}</Text>
        </View>

        {/* Selection indicator */}
        {selected && (
          <View
            style={[
              selectionType === 'single'
                ? styles.radioSelected
                : styles.checkSelected,
              { backgroundColor: accentColor },
            ]}
          >
            <Image
              source={require('../../assets/icons/check.png')}
              style={styles.checkIcon}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default OnboardingProCards;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingBottom: 12,
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 8,
    backgroundColor: '#FFF',
    position: 'relative',
  },
  smallCard: {
    width: SMALL_CARD_WIDTH,
    paddingBottom: 12 * scale,
    paddingLeft: 12 * scale,
    paddingTop: 12 * scale,
    paddingRight: 8 * scale,
    position: 'relative',
    // height: 110,
  },

  largeCard: {
    width: LARGE_CARD_WIDTH,
    // height: 100,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  icon: {
    width: scale * 20,
    height: scale * 20,
  },
  titleWrapper: {
    justifyContent: 'flex-start',
    includeFontPadding: false,   // 🔥 FIX ANDROID EXTRA SPACE
    textAlignVertical: 'top',
    paddingLeft: 4,
  },

  title: {
    fontSize: scale * 18,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Regular,
    color: '#000',

    // lineHeight: scale * 19,      // 🔥 MUST be close to fontSize
    // includeFontPadding: false,   // 🔥 Android only
  },

  checkBg: {
    position: 'absolute',
    top: 8 * scale,
    right: 8 * scale,
    width: 16 * scale,
    height: 16 * scale,
    borderRadius: 4 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  checkIcon: {
    width: 12 * scale,
    height: 12 * scale,
    padding: 2 * scale,
  },

  // Radio mode
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  radioOuter: {
    width: 16 * scale,
    height: 16 * scale,
    borderRadius: 16 * scale,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16 * scale,
  },
  radioInnerBg: {
    width: 16 * scale,
    height: 16 * scale,
    borderRadius: 16 * scale,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  // radioTitle: {
  //   fontSize: 18 * scale,
  //   fontWeight: '500',
  //   color: '#000',
  //   flex: 1,
  // },
  radioSelected: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 18, // 🔵 ROUND
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkSelected: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
