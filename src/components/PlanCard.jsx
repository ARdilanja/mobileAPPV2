import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

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
          <Text style={styles.badgeText}>{price}</Text>
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
    backgroundColor: '#fff',
    padding: 16 * scale,
    marginBottom: 16 * scale,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  activeCard: {
    borderColor: '#B08C4F',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18 * scale,
    fontWeight: '600',
  },

  badge: {
    backgroundColor: '#EAF1FF',
    borderRadius: 16,
    paddingHorizontal: 12 * scale,
    paddingVertical: 4 * scale,
  },

  activeBadge: {
    backgroundColor: '#B08C4F',
  },

  badgeText: {
    fontSize: 12 * scale,
    fontWeight: '600',
    color: '#000',
  },

  currentTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF1FF',
    borderRadius: 12,
    paddingHorizontal: 10 * scale,
    paddingVertical: 4 * scale,
    marginVertical: 8 * scale,
  },

  currentText: {
    fontSize: 12 * scale,
  },

  feature: {
    fontSize: 14 * scale,
    marginTop: 6 * scale,
    color: '#333',
  },
});
