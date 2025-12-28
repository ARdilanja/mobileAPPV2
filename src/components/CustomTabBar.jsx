import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Fonts } from "../constants/fonts";

const TAB_ICONS = {
  Bottom: require('../assets/images/Home.png'),
  StartInterview: require('../assets/images/StartInterview.png'),
  PracticeStartScreen: require('../assets/images/CompletedInterview.png'),
  ProfileTopScreen: require('../assets/images/MyProfile.png'),
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  
  // Filter the routes to include only "Bottom" and "StartInterview"
  const filteredRoutes = state.routes.filter(
    route => route.name === 'Bottom' || route.name === 'StartInterview' || route.name === 'PracticeStartScreen' || route.name === 'ProfileTopScreen',
  );

  return (
    <View style={styles.tabBar}>
      {filteredRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        
        // Determine the label
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // Check if this specific tab is currently active
        // We compare the current active index from 'state' with the route's key
        const isFocused = state.routes[state.index].key === route.key;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get the image based on the route name (fallback to first if not found)
        const iconSource = TAB_ICONS[route.name];

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <View style={styles.iconContainer}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  { tintColor: isFocused ? '#0069FF' : '#525252' }
                ]}
              />
            </View>
            <Text
              style={{
                color: isFocused ? '#0069FF' : '#525252', // Yellow : White
                fontSize: 8, // Replaced getResponsiveFontSize
                fontWeight: '400', // Replaced Fonts.Medium
                marginTop: 4,
                fontFamily:Fonts.Regular
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60, // Increased slightly for images
    backgroundColor: '#FFFFFF', // Replaced Colors.primary (assuming black/dark)
    paddingBottom: 5,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default CustomTabBar;