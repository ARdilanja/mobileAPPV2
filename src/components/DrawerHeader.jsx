import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Menu = require("../assets/images/burger-menu.png");
const Profile = require("../assets/images/profile.png"); // your profile image

const DrawerHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* LEFT: MENU */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        hitSlop={10}
      >
        <Image source={Menu} style={styles.menuIcon} />
      </TouchableOpacity>

      {/* RIGHT: PROFILE */}
      <TouchableOpacity
        onPress={() => navigation.navigate("EditProfileScreen")}
      >
        <Image source={Profile} style={styles.profileImage} />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerHeader;


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    width: "100%",  
  },

  menuIcon: {
    width: 22,
    height: 22,
  },

  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18, // 🔥 makes it circle
    backgroundColor: "#ebe5eaff",
  },
});

