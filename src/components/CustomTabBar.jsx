import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Fonts } from "../constants/fonts";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserProfile } from "../services/userService";
// import { API_BASE } from "../config/api";
import { API_BASE } from '@env';

// 1. IMPORT YOUR SVGs
import HomeActive from '../assets/svg/Home_Active.svg';
import HomeInactive from '../assets/svg/Home.svg';
import PracticeActive from '../assets/svg/Practice_Active.svg';
import PracticeInactive from '../assets/svg/Practice.svg';
import ActionActive from '../assets/svg/Action_Active.svg';
import ActionInactive from '../assets/svg/Action.svg';

const TAB_CONFIG = {
  Bottom: { active: HomeActive, inactive: HomeInactive, type: 'svg' },
  Practice: { active: PracticeActive, inactive: PracticeInactive, type: 'svg' },
  Action: { active: ActionActive, inactive: ActionInactive, type: 'svg' },
  Profile: { type: 'image' },
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const [profileImage, setProfileImage] = useState(null);

  // FETCH PROFILE IMAGE FROM DB
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await getUserProfile(token);
        if (response?.user?.profpicFileLocation?.photo) {
          setProfileImage(response.user.profpicFileLocation.photo);
        }
      } catch (err) {
        console.log("Tab Bar Profile Fetch Error:", err);
      }
    };

    fetchProfile();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchProfile();
    });
    return unsubscribe;
  }, [navigation]);

  const filteredRoutes = state.routes.filter(
    route => ['Bottom', 'Practice', 'Action', 'Profile'].includes(route.name)
  );

  return (
    <View style={[styles.tabBar, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {filteredRoutes.map((route) => {
        const { options } = descriptors[route.key];
        const isFocused = state.routes[state.index].key === route.key;
        const config = TAB_CONFIG[route.name];
        const label = options.tabBarLabel ?? options.title ?? route.name;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress} activeOpacity={0.7} style={styles.tab}>
            <View style={styles.iconContainer}>
              {config?.type === 'svg' ? (
                (() => {
                  const IconComponent = isFocused ? config.active : config.inactive;
                  return IconComponent ? <IconComponent width={24} height={24} /> : null;
                })()
              ) : (
                /* DYNAMIC PROFILE IMAGE LOGIC */
                <Image
                  source={
                    profileImage
                      ? { uri: `${API_BASE}/user/open-profpic?photo=${encodeURIComponent(profileImage)}` }
                      : require('../assets/images/Bottom_Profile.png')
                  }
                  style={[
                    styles.icon,
                    profileImage ? styles.profileCircle : null,

                    // ✅ CHANGE HERE: Border only shows if it's the real photo AND active
                    profileImage && isFocused && { borderWidth: 1.5, borderColor: '#0069FF' },

                    // Only apply blue tint if using the placeholder icon
                    !profileImage && { tintColor: isFocused ? '#0069FF' : '#525252' }
                  ]}
                />
              )}
            </View>

            <Text style={{
              color: isFocused ? '#0069FF' : '#2A2A2A',
              fontSize: 10,
              fontWeight: '400',
              marginTop: 4,
              lineHeight: 14,
              fontFamily: Fonts.Regular
            }}>
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
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#EEEEEE',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 3 },
  iconContainer: { alignItems: 'center', justifyContent: 'center', height: 20, width: 20 },
  icon: { width: 24, height: 24, resizeMode: 'contain' },

  profileCircle: {
    width: 28,
    height: 28,
    borderRadius: 14, // Half of 28 for perfect circle
    resizeMode: 'cover'
  }
});

export default CustomTabBar;