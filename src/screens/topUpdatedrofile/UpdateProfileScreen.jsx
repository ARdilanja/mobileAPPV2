// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   TextInput
// } from 'react-native';
// import PhotoActionModal from '../../components/PhotoActionModal';
// import Header from '../../components/Header';
// // import { TextInput } from 'react-native-gesture-handler';

// const { width } = Dimensions.get('window');
// const scale = width / 390;
// const defaultAvatar = require('../../assets/images/profile_update1.png');
// const editPencilIcon = require('../../assets/images/edit_icon1.png');

// export default function UpdateProfileScreen() {
//   const [modalVisible, setModalVisible] = useState(false);
//   console.log('modalVisible :>> ', modalVisible);
//   return (
//     <View style={styles.container}>

//             <Header title="Your Profile" />
//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         {/* PROFILE IMAGE */}
//         <View style={styles.imageWrapper}>
//           <Image source={defaultAvatar} style={styles.profileImage} />
//           <TouchableOpacity
//             style={styles.editIcon}
//             onPress={() => setModalVisible(true)}
//           >
//             <Image source={editPencilIcon} style={styles.editPencil} />
//           </TouchableOpacity>
//         </View>

//         {/* INPUT CARDS */}
//         <View style={styles.card}>
//           <TextInput
//             value="Claire henry"
//             style={styles.value}
//             placeholder="Name"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.card}>
//           <TextInput
//             value="🇮🇳  +91  86325 92563"
//             style={styles.value}
//             placeholder="Phone number"
//             placeholderTextColor="#999"
//             keyboardType="phone-pad"
//           />
//         </View>

//         <View style={styles.card}>
//           <TextInput
//             value="clairehenry@gmail.com"
//             style={styles.value}
//             placeholder="Email"
//             placeholderTextColor="#999"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         <View style={styles.card}>
//           <TextInput
//             value="********"
//             style={styles.value}
//             placeholder="Password"
//             placeholderTextColor="#999"
//             secureTextEntry
//           />
//         </View>

//         {/* UPDATE BUTTON */}
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* PHOTO ACTION MODAL */}
//       <PhotoActionModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onDelete={() => setModalVisible(false)}
//         onGallery={() => setModalVisible(false)}
//         onCamera={() => setModalVisible(false)}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },

//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },

//   back: {
//     fontSize: 28,
//     marginRight: 8,
//   },

//   headerTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//   },

//   imageWrapper: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },

//   //   profileImage: {
//   //     width: 90 * scale,
//   //     height: 90 * scale,
//   //     borderRadius: 45 * scale,
//   //   },

//   editIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: width / 2 - 45 * scale,
//     backgroundColor: '#fff',
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },

//   editText: {
//     fontSize: 14,
//   },

//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },

//   value: {
//     fontSize: 15,
//     color: '#000',
//     padding: 0,
//   },

//   button: {
//     backgroundColor: '#0A66FF',
//     marginHorizontal: 16,
//     marginTop: 30,
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });



// //////////////////////////////////////////////Without Fetch///////////////////////////////////////////////////////////





// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   Alert,
//   PermissionsAndroid, 
//   Platform,
// } from 'react-native';

// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import PhotoActionModal from '../../components/PhotoActionModal';
// import Header from '../../components/Header';

// const { width } = Dimensions.get('window');
// const scale = width / 390;

// const defaultAvatar = require('../../assets/images/profile_update1.png');
// const editPencilIcon = require('../../assets/images/edit_icon1.png');

// export default function UpdateProfileScreen() {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);

//   /* ================= DELETE PHOTO ================= */
//   const handleDeletePhoto = () => {
//     setProfileImage(null);
//     setModalVisible(false);
//   };

//   /* ================= OPEN GALLERY ================= */
//   const handleGallery = async () => {
//     setModalVisible(false);

//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       quality: 0.8,
//       selectionLimit: 1,
//     });

//     if (!result.didCancel && result.assets?.length) {
//       setProfileImage(result.assets[0].uri);
//     }
//   };

//   /* ================= OPEN CAMERA ================= */
//   const handleCamera = async () => {
//   setModalVisible(false);

//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: "Camera Permission",
//           message: "App needs access to your camera to take a profile picture.",
//           buttonNeutral: "Ask Me Later",
//           buttonNegative: "Cancel",
//           buttonPositive: "OK"
//         }
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert("Permission Denied", "Camera permission is required to take photos.");
//         return;
//       }
//     } catch (err) {
//       console.warn(err);
//       return;
//     }
//   }

//   const result = await launchCamera({
//     mediaType: 'photo',
//     quality: 0.8,
//     saveToPhotos: true, // Recommended to ensure the image is saved correctly
//     cameraType: 'front',
//   });

//   if (!result.didCancel && result.assets?.length) {
//     setProfileImage(result.assets[0].uri);
//   } else if (result.errorCode) {
//     Alert.alert('Error', result.errorMessage);
//   }
// };

//   return (
//     <View style={styles.container}>
//       <Header title="Your Profile" />

//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         {/* PROFILE IMAGE */}
//         <View style={styles.imageWrapper}>
//           <Image
//             source={profileImage ? { uri: profileImage } : defaultAvatar}
//             style={styles.profileImage}
//           />

//           <TouchableOpacity
//             style={styles.editIcon}
//             onPress={() => setModalVisible(true)}
//           >
//             <Image source={editPencilIcon} style={styles.editPencil} />
//           </TouchableOpacity>
//         </View>

//         {/* INPUT CARDS */}
//         <View style={styles.card}>
//           <TextInput
//             value="Claire henry"
//             style={styles.value}
//             placeholder="Name"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.card}>
//           <TextInput
//             value="🇮🇳  +91  86325 92563"
//             style={styles.value}
//             placeholder="Phone number"
//             placeholderTextColor="#999"
//             keyboardType="phone-pad"
//           />
//         </View>

//         <View style={styles.card}>
//           <TextInput
//             value="clairehenry@gmail.com"
//             style={styles.value}
//             placeholder="Email"
//             placeholderTextColor="#999"
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         <View style={styles.card}>
//           <TextInput
//             value="********"
//             style={styles.value}
//             placeholder="Password"
//             placeholderTextColor="#999"
//             secureTextEntry
//           />
//         </View>

//         {/* UPDATE BUTTON */}
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* PHOTO ACTION MODAL */}
//       <PhotoActionModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onDelete={handleDeletePhoto}
//         onGallery={handleGallery}
//         onCamera={handleCamera}
//       />
//     </View>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },

//   imageWrapper: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },

//   profileImage: {
//     width: 90 * scale,
//     height: 90 * scale,
//     borderRadius: 45 * scale,
//   },

//   editIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: width / 2 - 45 * scale,
//     backgroundColor: '#fff',
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },

//   editPencil: {
//     width: 14,
//     height: 14,
//     resizeMode: 'contain',
//   },

//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//   },

//   value: {
//     fontSize: 15,
//     color: '#000',
//     padding: 0,
//   },

//   button: {
//     backgroundColor: '#0A66FF',
//     marginHorizontal: 16,
//     marginTop: 30,
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });













////////////////////////////////////////////////With Fetch///////////////////////////////////////////////////////////



// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   ScrollView,
//   TextInput,
//   Alert,
//   PermissionsAndroid,
//   Platform,
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// import Header from '../../components/Header';
// import PhotoActionModal from '../../components/PhotoActionModal';

// import {
//   getUserProfile,
//   uploadProfileImage,
//   updateUserInfo,
// } from '../../services/userService';

// const { width } = Dimensions.get('window');
// const scale = width / 390;

// const defaultAvatar = require('../../assets/images/profile_update1.png');
// const editPencilIcon = require('../../assets/images/edit_icon1.png');

// export default function UpdateProfileScreen() {
//   /* ================= STATE ================= */
//   const [modalVisible, setModalVisible] = useState(false);
//   const [token, setToken] = useState(null);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [profileImage, setProfileImage] = useState(null);

//   /* ================= FETCH PROFILE ================= */
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         console.log('🔵 [PROFILE] Loading profile...');

//         const storedToken = await AsyncStorage.getItem('token');
//         if (!storedToken) {
//           console.warn('❌ [PROFILE] No token found');
//           return;
//         }

//         setToken(storedToken);

//         const user = await getUserProfile(storedToken);
//         console.log('👤 [PROFILE] User data:', user);

//         setName(`${user.firstName} ${user.lastName}`);
//         setEmail(user.email);
//         setPhone(user.phoneNumber || '');

//         if (user.profpicFileLocation?.photoUrl) {
//           console.log('🖼️ [PROFILE] Image URL:', user.profpicFileLocation.photoUrl);
//           setProfileImage(user.profpicFileLocation.photoUrl);
//         } else {
//           console.log('ℹ️ [PROFILE] No profile image');
//         }
//       } catch (error) {
//         console.error('🔥 [PROFILE] Fetch error:', error);
//       }
//     };

//     loadProfile();
//   }, []);

//   /* ================= CAMERA PERMISSION ================= */
//   const requestCameraPermission = async () => {
//     if (Platform.OS !== 'android') return true;

//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       {
//         title: 'Camera Permission',
//         message: 'App needs camera access to take profile photo',
//         buttonPositive: 'OK',
//         buttonNegative: 'Cancel',
//       }
//     );

//     console.log('📷 [PERMISSION] Camera:', granted);
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   };

//   /* ================= DELETE PHOTO (UI ONLY) ================= */
//   const handleDeletePhoto = () => {
//     console.log('🗑️ [PROFILE] Delete clicked (UI only)');
//     setProfileImage(null);
//     setModalVisible(false);
//   };

//   /* ================= GALLERY ================= */
//   const handleGallery = async () => {
//     console.log('🖼️ [IMAGE] Open gallery');
//     setModalVisible(false);

//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       selectionLimit: 1,
//       quality: 0.8,
//     });

//     if (!result.didCancel && result.assets?.length) {
//       uploadImage(result.assets[0].uri);
//     }
//   };

//   /* ================= CAMERA ================= */
//   const handleCamera = async () => {
//     console.log('📷 [IMAGE] Open camera');
//     setModalVisible(false);

//     const hasPermission = await requestCameraPermission();
//     if (!hasPermission) {
//       Alert.alert('Permission denied', 'Camera permission is required');
//       return;
//     }

//     const result = await launchCamera({
//       mediaType: 'photo',
//       cameraType: 'front',
//       saveToPhotos: true,
//       quality: 0.8,
//     });

//     if (!result.didCancel && result.assets?.length) {
//       uploadImage(result.assets[0].uri);
//     }
//   };

//   /* ================= UPLOAD IMAGE ================= */
//   const uploadImage = async (uri) => {
//     try {
//       console.log('⬆️ [UPLOAD] Start');
//       console.log('🖼️ [UPLOAD] URI:', uri);

//       const response = await uploadProfileImage(uri, token);
//       console.log('✅ [UPLOAD] Response:', response);

//       if (response.profileImage?.photoUrl) {
//         console.log('🖼️ [UPLOAD] New image URL:', response.profileImage.photoUrl);
//         setProfileImage(response.profileImage.photoUrl);
//       }

//       Alert.alert('Success', 'Profile photo updated!');
//     } catch (error) {
//       console.error('🔥 [UPLOAD] Failed:', error);
//       Alert.alert('Upload failed', 'Please check your internet or server');
//     }
//   };

//   /* ================= UPDATE TEXT DATA ================= */
//   const handleUpdateProfile = async () => {
//     try {
//       const nameParts = name.trim().split(' ');
//       const firstName = nameParts[0];
//       const lastName = nameParts.slice(1).join(' ') || '';

//       await updateUserInfo(
//         { firstName, lastName, phoneNumber: phone },
//         token
//       );

//       Alert.alert('Success', 'Profile details updated!');
//     } catch (error) {
//       console.error('🔥 [UPDATE] Failed:', error);
//       Alert.alert('Error', 'Failed to update profile details');
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <View style={styles.container}>
//       <Header title="Your Profile" />

//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         {/* PROFILE IMAGE */}
//         <View style={styles.imageWrapper}>
//           <Image
//             source={profileImage ? { uri: profileImage } : defaultAvatar}
//             style={styles.profileImage}
//           />

//           <TouchableOpacity
//             style={styles.editIcon}
//             onPress={() => setModalVisible(true)}
//           >
//             <Image source={editPencilIcon} style={styles.editPencil} />
//           </TouchableOpacity>
//         </View>

//         {/* NAME */}
//         <View style={styles.card}>
//           <TextInput
//             value={name}
//             onChangeText={setName}
//             placeholder="Name"
//             style={styles.value}
//           />
//         </View>

//         {/* PHONE */}
//         <View style={styles.card}>
//           <TextInput
//             value={phone}
//             onChangeText={setPhone}
//             placeholder="Phone number"
//             keyboardType="phone-pad"
//             style={styles.value}
//           />
//         </View>

//         {/* EMAIL */}
//         <View style={styles.card}>
//           <TextInput
//             value={email}
//             editable={false}
//             style={[styles.value, { color: '#999' }]}
//           />
//         </View>

//         {/* UPDATE BUTTON */}
//         <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
//           <Text style={styles.buttonText}>Update</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* PHOTO ACTION MODAL */}
//       <PhotoActionModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         onDelete={handleDeletePhoto}
//         onGallery={handleGallery}
//         onCamera={handleCamera}
//       />
//     </View>
//   );
// }

// /* ================= STYLES ================= */

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F5F5' },
//   imageWrapper: { alignItems: 'center', marginVertical: 20 },
//   profileImage: {
//     width: 90 * scale,
//     height: 90 * scale,
//     borderRadius: 45 * scale,
//   },
//   editIcon: {
//     position: 'absolute',
//     bottom: 0,
//     right: width / 2 - 45 * scale,
//     backgroundColor: '#fff',
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//   },
//   editPencil: { width: 14, height: 14, resizeMode: 'contain' },
//   card: {
//     backgroundColor: '#fff',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     elevation: 4,
//   },
//   value: { fontSize: 15, color: '#000', padding: 0 },
//   button: {
//     backgroundColor: '#0A66FF',
//     marginHorizontal: 16,
//     marginTop: 30,
//     paddingVertical: 16,
//     borderRadius: 30,
//     alignItems: 'center',
//   },
//   buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
// });


















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
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

import Header from "../../components/Header";
import PhotoActionModal from "../../components/PhotoActionModal";

import {
  getUserProfile,
  updateProfile,
  uploadProfileImage,
} from "../../services/userService";
import { API_BASE } from "../../config/api";

const { width } = Dimensions.get("window");
const scale = width / 390;

const defaultAvatar = require("../../assets/images/profile_update1.png");
const editPencilIcon = require("../../assets/images/edit_icon1.png");

export default function UpdateProfileScreen() {
  /* ================= STATE ================= */
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");



  useEffect(() => {
    fetch(`${API_BASE}/ping`)
      .then(res => res.json())
      .then(data => console.log("🏓 PING SUCCESS:", data))
      .catch(err => console.error("❌ PING FAILED:", err));
  }, []);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        console.log("🔵 Loading profile...");

        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await getUserProfile(token);
        const user = response.user;

        console.log("👤 User:", user);

        setFirstName(user.firstName || "");
        setLastName(user.lastName || "");
        setMobile(user.phoneNumber || "");

        if (user.profpicFileLocation?.photoUrl) {
          setProfileImage(user.profpicFileLocation.photoUrl);
        }
      } catch (err) {
        console.error("🔥 Profile load failed:", err);
      }
    };

    loadProfile();
  }, []);

  const requestStoragePermission = async () => {
  if (Platform.OS !== "android") return true;

  try {
    if (Platform.Version >= 33) {
      // Android 13+
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // Android 12 and below
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (err) {
    console.warn("Storage permission error:", err);
    return false;
  }
};


  /* ================= CAMERA PERMISSION ================= */
  const requestCameraPermission = async () => {
    if (Platform.OS !== "android") return true;

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  };

  /* ================= DELETE PHOTO (UI ONLY) ================= */
  const handleDeletePhoto = () => {
    console.log("🗑️ Remove image (UI only)");
    setProfileImage(null);
    setModalVisible(false);
  };

  /* ================= GALLERY ================= */
  const handleGallery = async () => {
  setModalVisible(false);

  const hasStorage = await requestStoragePermission();
  if (!hasStorage) {
    Alert.alert("Permission required", "Storage permission is required");
    return;
  }

  const result = await launchImageLibrary({
    mediaType: "photo",
    selectionLimit: 1,
    quality: 0.8,
  });

  if (!result.didCancel && result.assets?.length) {
    uploadImage(result.assets[0].uri);
  }
};


  /* ================= CAMERA ================= */
  const handleCamera = async () => {
  setModalVisible(false);

  const hasCamera = await requestCameraPermission();
  const hasStorage = await requestStoragePermission();

  if (!hasCamera || !hasStorage) {
    Alert.alert("Permission required", "Camera & storage permission required");
    return;
  }

  const result = await launchCamera({
    mediaType: "photo",
    cameraType: "front",
    quality: 0.8,
  });

  if (!result.didCancel && result.assets?.length) {
    uploadImage(result.assets[0].uri);
  }
};


  /* ================= UPLOAD IMAGE ================= */
  const uploadImage = async (uri) => {
    try {
      const token = await AsyncStorage.getItem("token");

      console.log("⬆️ Uploading image:", uri);

      const response = await uploadProfileImage(uri, token);

      if (response.image?.photoUrl) {
        setProfileImage(response.image.photoUrl);
      }

      Alert.alert("Success", "Profile photo updated");
    } catch (err) {
      console.error("🔥 Image upload failed:", err);
      Alert.alert("Error", "Image upload failed");
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      console.log("📝 Updating profile...");
      console.log({ firstName, lastName, mobile });

      await updateProfile(
        { firstName, lastName, mobile },
        token
      );

      Alert.alert("Success", "Profile updated successfully");
    } catch (err) {
      console.error("🔥 Update failed:", err);
      Alert.alert("Error", "Profile update failed");
    }
  };

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      <Header title="Your Profile" />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* PROFILE IMAGE */}
        <View style={styles.imageWrapper}>
          <Image
            source={profileImage ? { uri: profileImage } : defaultAvatar}
            style={styles.profileImage}
          />

          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setModalVisible(true)}
          >
            <Image source={editPencilIcon} style={styles.editPencil} />
          </TouchableOpacity>
        </View>

        {/* FIRST NAME */}
        <View style={styles.card}>
          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First name"
            style={styles.value}
          />
        </View>

        {/* LAST NAME */}
        <View style={styles.card}>
          <TextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last name"
            style={styles.value}
          />
        </View>

        {/* MOBILE */}
        <View style={styles.card}>
          <TextInput
            value={mobile}
            onChangeText={setMobile}
            placeholder="Mobile number"
            keyboardType="phone-pad"
            style={styles.value}
          />
        </View>

        {/* UPDATE BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      <PhotoActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleDeletePhoto}
        onGallery={handleGallery}
        onCamera={handleCamera}
      />
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  imageWrapper: { alignItems: "center", marginVertical: 20 },
  profileImage: {
    width: 90 * scale,
    height: 90 * scale,
    borderRadius: 45 * scale,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: width / 2 - 45 * scale,
    backgroundColor: "#fff",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  editPencil: { width: 14, height: 14 },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
  },
  value: { fontSize: 15, color: "#000" },
  button: {
    backgroundColor: "#0A66FF",
    marginHorizontal: 16,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
