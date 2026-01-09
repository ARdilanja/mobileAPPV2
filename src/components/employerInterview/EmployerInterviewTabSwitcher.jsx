// src/components/InterviewTabSwitcher.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../../constants/fonts';

export default function InterviewTabSwitcher({
  activeTab,
  setActiveTab,
  employerCount = 0,
  mockCount = 0,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setActiveTab('employer')}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === 'employer' && styles.activeText,
          ]}
        >
          {/* {employerCount} */}
          Employer Interview{employerCount !== 1 ? 's' : ''}
        </Text>
        {activeTab === 'employer' && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('mock')}>
        <Text
          style={[styles.tabText, activeTab === 'mock' && styles.activeText]}
        >
          {/* {mockCount} */}
          Mock Interview{mockCount !== 1 ? 's' : ''}
        </Text>
        {activeTab === 'mock' && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    // alignItems: 'center',
    paddingVertical: 12,
    position: 'relative',
  },
  tabText: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    // marginLeft:24,
  },
  activeText: {
    color: '#115CC7',
    fontFamily: Fonts.Medium,
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: '#115CC7',
    borderRadius: 1,
  },
});
