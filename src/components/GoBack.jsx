import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoBack = ({ title  }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        {/* Replace with your actual asset path */}
        <Image 
          source={require('../assets/icons/backward-arrow.png')} 
          style={styles.arrowIcon}
          resizeMode="contain"
        />
        
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {/* Empty view to balance the layout (title stays centered) */}
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44, // Standard iOS-style header height
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#CCCCCC', // Optional subtle bottom border
  },
  backButton: {
    padding: 10,
    marginLeft: 5,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    tintColor: '#232C2E', // If your icon needs tinting
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#232C2E',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  placeholder: {
    width: 44, // Matches the back button width for centering
  },
});

export default GoBack;