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

        <Text style={styles.title}>{title}</Text>

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
  container: {
    marginBottom: 8 * scale,
  },

  card: {
    width: scale * 173,
    height: scale * 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 12,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    position: 'relative',
  },
  smallCard: {
    width: scale * 173,
    height: scale * 120,
  },

  /* Large Card */
  largeCard: {
    width: scale * 358,
    height: scale * 120,
  },
  iconBg: {
    width: scale * 40,
    height: scale * 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: scale * 20,
    height: scale * 20,
  },
  title: {
    fontSize: scale * 18,
    fontFamily: Fonts.Regular,
    fontWeight: '400',
    color: '#000',
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
    width: 10 * scale,
    height: 10 * scale,
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
  radioTitle: {
    fontSize: 18 * scale,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
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
