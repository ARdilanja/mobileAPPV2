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
  rightElement,
   iconSize = 20,
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
            <Image source={icon} style={[
    styles.icon,
    { width: scale * iconSize, height: scale * iconSize },
  ]} />
          </View>
        )}

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
        </View>

        {rightElement && (
          <View style={styles.rightElement}>{rightElement}</View>
        )}

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
    // paddingBottom: 12,
    paddingLeft: 12,
    paddingTop: 12,
    backgroundColor: '#FFF',
    position: 'relative',
    // minHeight: 120 * scale,

  },

  smallCard: {
    width: SMALL_CARD_WIDTH,
    minHeight: 120 * scale,
  },

  largeCard: {
    width: LARGE_CARD_WIDTH,
    minHeight: 100 * scale,
  },

  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 28,
    // marginLeft: 12 * scale,
    // marginTop: 12 * scale,
  },

 icon: {
  resizeMode: 'contain',
},

  titleWrapper: {
    // paddingLeft: 15 * scale,
    // paddingRight: 3 * scale,
    minHeight: 48 * scale,
    justifyContent: 'center',
  },

  title: {
    fontSize: scale * 18,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Regular,
    color: '#000',
  },

  rightElement: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  checkIcon: {
    width: 12 * scale,
    height: 12 * scale,
  },

  radioSelected: {
    position: 'absolute',
    top: 8,
    right: 12 * scale,
    width: 18,
    height: 18,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkSelected: {
    position: 'absolute',
    top: 8,
    right:12 * scale,
    width: 18,
    height: 18,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
