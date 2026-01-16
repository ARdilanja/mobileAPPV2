

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Fonts } from "../../constants/fonts";
import Header from "../../components/Header";
import PhotoActionModal from "../../components/PhotoActionModal";

import {
  getUserProfile,
  updateProfile,
  updateProfileImageUrl,
} from "../../services/userService";

import { uploadImageToS3 } from "../../services/s3Upload";
import { API_BASE } from '@env';

const { width, height: screenHeight } = Dimensions.get("window");
const scale = width / 390;

const defaultAvatar = require("../../assets/images/profile_update1.png");
const editPencilIcon = require("../../assets/images/edit_icon1.png");
// const indiaFlag = require("../../assets/images/india_flag.png"); // Ensure you have a small flag icon in assets

export default function UpdateProfileScreen() {
  /* ================= STATE ================= */
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState(""); // Added Email
  const [mobile, setMobile] = useState("");
  const [userId, setUserId] = useState(null);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        console.log("🔵 [UI] Loading profile...");
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await getUserProfile(token);
        const user = response.user;

        console.log("👤 [UI] User loaded:", user._id);
        setUserId(user._id);
        setFirstName(user.firstName || "");
        setMobile(user.phone || "");

        setEmail(user.email || ""); // Set Email
        setProfileImage(user.profpicFileLocation?.photo || null);

      } catch (err) {
        console.error("🔥 [UI] Profile load failed:", err);
      }
    };
    loadProfile();
  }, []);

  /* ================= IMAGE LOGIC (UNCHANGED) ================= */
  const requestStoragePermission = async () => {
    if (Platform.OS !== "android") return true;
    const permission = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    const granted = await PermissionsAndroid.request(permission);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  const uploadImage = async (uri) => {
    try {
      console.log("📸 [UI] Image selected:", uri);
      const token = await AsyncStorage.getItem("token");
      if (!token || !userId) return;

      const photoUrl = await uploadImageToS3(uri, userId);
      await updateProfileImageUrl(photoUrl, token);

      const fileKey = photoUrl.split(".amazonaws.com/")[1];
      const proxyUrl = `${API_BASE}/user/open-profpic?photo=${encodeURIComponent(fileKey)}`;

      try { await Image.prefetch(proxyUrl); } catch (e) { }

      console.log("🖼️ [UI] Image updated successfully");
      setProfileImage(fileKey);
      Alert.alert("Success", "Profile photo updated");
    } catch (err) {
      console.error("❌ [UI] Image upload failed:", err);
      Alert.alert("Error", "Image upload failed");
    }
  };



  /* ================= Gallery LOGIC ================= */

  const handleGallery = async () => {
    setModalVisible(false);
    if (await requestStoragePermission()) {
      const result = await launchImageLibrary({ mediaType: "photo", quality: 0.8 });
      if (!result.didCancel && result.assets?.length) uploadImage(result.assets[0].uri);
    }
  };



  /* ================= CAMERA LOGIC ================= */

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs access to your camera to take profile photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // iOS permissions are handled via Info.plist
  };

  const handleCamera = async () => {
    setModalVisible(false);
    const hasPermission = await requestCameraPermission();

    if (hasPermission) {
      const result = await launchCamera({
        mediaType: "photo",
        quality: 0.8,
        saveToPhotos: true, // Optional: saves the taken photo to the device gallery
      });

      if (result.didCancel) {
        console.log("User cancelled camera");
      } else if (result.errorCode) {
        console.log("Camera Error: ", result.errorMessage);
        Alert.alert("Error", "Could not open camera");
      } else if (result.assets && result.assets.length > 0) {
        // Use the same upload logic you already have
        uploadImage(result.assets[0].uri);
      }
    } else {
      Alert.alert("Permission Denied", "Camera permission is required to take a photo.");
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      await updateProfile(
        {
          firstName,
          phone: mobile,        // Sending 'phone' key
          mobile_code: "+91",   // Sending 'mobile_code' key
          email,
        },
        token
      );
      Alert.alert("Success", "Profile updated successfully");
    } catch (err) {
      console.error("🔥 [UI] Update failed:", err);
      Alert.alert("Error", "Profile update failed");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Header title="Your profile" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image */}
        <View style={styles.imageWrapper}>
          <Image
            key={profileImage}
            source={
              profileImage
                ? { uri: `${API_BASE}/user/open-profpic?photo=${encodeURIComponent(profileImage)}` }
                : defaultAvatar
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={() => setModalVisible(true)}>
            <Image source={editPencilIcon} style={styles.editPencil} />
          </TouchableOpacity>
        </View>

        {/* Input Fields - Designed to 358x60 */}
        <View style={styles.inputContainer}>

          {/* Name Field */}
          <View style={styles.card}>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Name"
              style={styles.value}
            />
          </View>

          {/* Mobile number input with country code */}
          <View style={[styles.card, styles.rowCard]}>

            {/* Flag */}
            <Image
              source={require("../../assets/images/india-flag.png")}
              style={styles.flag}
            />

            {/* +91 */}
            <Text style={styles.countryCodeText}>+91</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Mobile number */}
            <TextInput
              style={styles.mob_input}
              keyboardType="phone-pad"
              // maxLength={10}
              value={mobile}
              onChangeText={(text) =>
                setMobile(text.replace(/[^0-9]/g, ""))
              }
              placeholder="86325 92563"
              placeholderTextColor="#9CA3AF"
            />
          </View>



          {/* Email Field */}
          <View style={[styles.card, styles.disabledCard]}>
            <TextInput
              value={email}
              editable={false}          
              selectTextOnFocus={false} 
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.value, styles.disabledText]}
            />
          </View>

        </View>
      </ScrollView>

      {/* Button fixed at bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>

      <PhotoActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={() => {
          setProfileImage(null);
          setModalVisible(false);
        }}
        onGallery={handleGallery}
        onCamera={handleCamera} // <--- Update this from {/* logic */} to handleCamera
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  scrollContent: { alignItems: 'center', paddingBottom: 100 },

  imageWrapper: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30
  },
  profileImage: {
    width: 100 * scale,
    height: 100 * scale,
    borderRadius: 50 * scale,
    backgroundColor: '#DDD'
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  editPencil: { width: 14, height: 14 },

  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#fff",
    width: 358 * scale, // FIGMA WIDTH
    height: 60,         // FIGMA HEIGHT
    marginBottom: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    // Elevation/Shadow to match "Hug" style
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },

  value: {
    fontSize: 18,
    fontFamily: Fonts.Regular,
    fontWeight: 400,
    color: "#242424"
  },

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  flag: {
    width: 24,
    height: 18,
    marginRight: 8,
  },

  countryCodeText: {
    fontSize: 18,
    fontFamily: Fonts.Regular,
    fontWeight: 400,
    marginRight: 10,
    color: "#242424"
  },

  // divider: {
  //   width: 1,
  //   height: 26,
  //   backgroundColor: "#E5E7EB",
  //   marginRight: 10,
  // },

  mob_input: {
    flex: 1,
    fontSize: 18,
    fontFamily: Fonts.Regular,
    fontWeight: 400,
    color: "#242424",
    paddingVertical: 0, // 🔥 IMPORTANT for vertical alignment
  },

  disabledCard: {
  backgroundColor: "#F3F4F6", // light grey
},

infoText: {
  fontSize: 13,
  color: "#9CA3AF",
  marginLeft: 20,
  marginTop: 4,
},

  bottomContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    backgroundColor: '#F5F5F5'
  },
  button: {
    backgroundColor: "#246BFD", // Figma Blue
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});