import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function PlanCard({
  title,
  price,
  features = [],
  active,
  current,
}) {
  return (
    <View style={[styles.card, active && styles.activeCard]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        <View style={[styles.badge, active && styles.activeBadge]}>
          <Text style={[styles.badgeText, active && styles.activeBadgeText]}>
            {price}
          </Text>
        </View>
      </View>

      {current && (
        <View style={styles.currentTag}>
          <Text style={styles.currentText}>Current plan</Text>
        </View>
      )}

      {features.map((item, index) => (
        <Text key={index} style={styles.feature}>
          • {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 358 * scale,
    minHeight: 176 * scale,
    borderRadius: 16,
    backgroundColor: '#d9d9d946',
    padding: 16 * scale,
    marginBottom: 16 * scale,
    alignSelf: 'center',

    position: 'relative',
  },

  activeCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#B08C4F',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24,
  },

  badge: {
    backgroundColor: '#D5E9FF',
    borderRadius: 16,
    paddingHorizontal: 12 * scale,
    paddingVertical: 4 * scale,
    fontFamily: Fonts.Medium,
  },

  activeBadge: {
    backgroundColor: '#827157',
    color: '#fff',
  },

  badgeText: {
    fontSize: 12 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 20,
    color: '#000000',
  },
  activeBadgeText: {
    color: '#FFFFFF',
  },

  currentTag: {
    position: 'absolute',
    top: 0,
    left: 130 * scale,
    backgroundColor: '#D5E9FF',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 12 * scale,
    paddingVertical: 4 * scale,
  },

  currentText: {
    fontSize: 12 * scale,
    lineHeight: 16,
    fontFamily: Fonts.Regular,
  },

  feature: {
    fontSize: 14 * scale,
    marginTop: 6 * scale,
    color: '#333',
    fontFamily: Fonts.Medium,
    letterSpacing: 0,
  },
});
