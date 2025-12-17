import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

const Profile = require("../assets/images/profile.png");

const ProfileHeader = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={Profile} style={styles.profileImage} />
    </TouchableOpacity>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
  },
});
