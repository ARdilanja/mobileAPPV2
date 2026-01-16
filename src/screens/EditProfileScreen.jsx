// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { Fonts } from '../constants/fonts';
// import RemovePhotoModal from '../components/RemovePhotoModal';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { pick, types } from '@react-native-documents/picker';

// // Icons & Assets
// const cameraIcon = require('../assets/images/camera.png');
// const galleryIcon = require('../assets/images/gallery.png');
// const deleteIcon = require('../assets/images/delete_icon.png');
// const editPencilIcon = require('../assets/images/edit_icon.png');
// const defaultAvatar = require('../assets/images/edit_profile.png');

// const { width } = Dimensions.get('window');

// const USER_ID = '668b843dec65884f31c54252';

// // ✅ USING TOKEN DIRECTLY (NO ASYNC STORAGE BUG)
// const TOKEN =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY4Yjg0M2RlYzY1ODg0ZjMxYzU0MjUyIiwiZW1haWwiOiJnb3BhbC5kaGFnZTU0QGdtYWlsLmNvbSIsImlhdCI6MTc2NjEzMjY5MSwiZXhwIjoxNzY2MjE5MDkxfQ.x7zQ35unbQhkVeYlDyM_yCoLjiFcDzav1kqPkwcm_7o';

// const GET_USER_API = `https://api.arinnovate.io/getUser/${USER_ID}`;
// const UPDATE_API = 'https://api.arinnovate.io/api/updateCandidateUser';

// // ---------- helper ----------
// const normalizeUri = uri =>
//   Platform.OS === 'android' && !uri.startsWith('file://')
//     ? `file://${uri}`
//     : uri;

// const EditProfileScreen = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [jobTitle, setJobTitle] = useState('');
//   const [email, setEmail] = useState('');

//   const [profileImage, setProfileImage] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [resumeName, setResumeName] = useState('');

//   const [showPhotoOptions, setShowPhotoOptions] = useState(false);
//   const [showRemoveModal, setShowRemoveModal] = useState(false);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   // ================= FETCH USER =================
//   const fetchUser = async () => {
//     try {
//       const res = await fetch(GET_USER_API);
//       const json = await res.json();

//       if (json?.success && json?.User) {
//         const user = json.User;

//         setFirstName(user.firstName || '');
//         setLastName(user.lastName || '');
//         setEmail(user.email || '');

//         const photo = user.profpicFileLocation?.photo;
//         if (photo) setProfileImage(photo);

//         const resume = user.resume?.resumeFileLocation?.[0];
//         if (resume) setResumeName(resume.resumeName || '');
//       }
//     } catch (e) {
//       console.log('Fetch user error:', e);
//     }
//   };

//   // ================= IMAGE PICKER =================
//   const imageOptions = { mediaType: 'photo', quality: 0.8 };

//   const pickFromCamera = () => {
//     launchCamera(imageOptions, res => {
//       if (res?.assets?.[0]?.uri) {
//         setProfileImage(res.assets[0].uri);
//       }
//       setShowPhotoOptions(false);
//     });
//   };

//   const pickFromGallery = () => {
//     launchImageLibrary(imageOptions, res => {
//       if (res?.assets?.[0]?.uri) {
//         setProfileImage(res.assets[0].uri);
//       }
//       setShowPhotoOptions(false);
//     });
//   };

//   // ================= RESUME PICKER =================
//   const pickResume = async () => {
//     try {
//       const results = await pick({
//         type: [types.pdf, types.doc, types.docx],
//         allowMultiSelection: false,
//       });

//       if (!results || results.length === 0) return;

//       const file = results[0];
//       const maxSize = 2 * 1024 * 1024;

//       if (file.size > maxSize) {
//         Alert.alert('File too large', 'Resume must be under 2 MB');
//         return;
//       }

//       setResumeFile(file);
//       setResumeName(file.name);
//     } catch (err) {
//       // ✅ Cancel → ignore silently
//       if (err?.code === 'DOCUMENT_PICKER_CANCELED') return;

//       console.log('Resume picker error:', err);
//       Alert.alert('Error', 'Unable to select resume');
//     }
//   };

//   // ================= UPDATE API =================
// const handleSaveSubmit = async () => {
//   try {
//     const formData = new FormData();

//     formData.append('userId', USER_ID);
//     formData.append('firstName', firstName);
//     formData.append('lastName', lastName);
//     formData.append('job_title', jobTitle);

//     if (profileImage && profileImage.startsWith('file')) {
//       formData.append('profileImage', {
//         uri: normalizeUri(profileImage),
//         type: 'image/jpeg',
//         name: 'profile.jpg',
//       });
//     }

//     if (resumeFile) {
//       formData.append('resume', {
//         uri: normalizeUri(resumeFile.uri),
//         type: resumeFile.type || 'application/pdf',
//         name: resumeFile.name,
//       });
//     }

//     const res = await fetch(UPDATE_API, {
//       method: 'POST', // ✅ IMPORTANT
//       body: formData,
//       headers: {
//         Authorization: `Bearer ${TOKEN}`,
//         Accept: 'application/json',
//       },
//     });

//     const text = await res.text();
//     console.log('UPDATE RESPONSE RAW:', text);

//     if (!res.ok) {
//       Alert.alert('Error', 'Server rejected request');
//       return;
//     }

//     const json = text ? JSON.parse(text) : {};
//     Alert.alert('Success', 'Profile updated successfully');

//   } catch (e) {
//     console.log('FINAL UPDATE ERROR:', e);
//     Alert.alert(
//       'Network Error',
//       'Check Android permission, API method, or SSL'
//     );
//   }
// };


//   // ================= UI =================
//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
//         <View style={styles.profileHeader}>
//           <View style={styles.avatarRow}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={profileImage ? { uri: profileImage } : defaultAvatar}
//                 style={styles.avatar}
//               />
//               <TouchableOpacity
//                 style={styles.editIconOverlay}
//                 onPress={() => setShowPhotoOptions(true)}
//               >
//                 <Image source={editPencilIcon} style={styles.editPencil} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.nameJobContainer}>
//               <Text style={styles.name}>{firstName} {lastName}</Text>
//               <Text style={styles.job}>{jobTitle}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           <Text style={styles.label}>First name</Text>
//           <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

//           <Text style={styles.label}>Last name</Text>
//           <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

//           <Text style={styles.label}>Job Title</Text>
//           <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />

//           <Text style={styles.label}>Email</Text>
//           <TextInput style={styles.input} value={email} editable={false} />

//           <Text style={styles.label}>Resume</Text>
//           <TouchableOpacity style={styles.input} onPress={pickResume}>
//             <Text style={{ fontFamily: Fonts.Regular }}>
//               {resumeName
//                 ? `Change Resume (${resumeName})`
//                 : 'Upload Resume (Max 2 MB)'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       <View style={styles.saveButtonContainer}>
//         <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubmit}>
//           <Text style={styles.saveButtonText}>Save & Submit</Text>
//         </TouchableOpacity>
//       </View>

//       {showPhotoOptions && (
//         <TouchableOpacity style={styles.overlay} onPress={() => setShowPhotoOptions(false)}>
//           <View style={styles.bottomSection}>
//             <View style={styles.photoOptionsRow}>
//               <TouchableOpacity onPress={pickFromCamera}>
//                 <Image source={cameraIcon} style={styles.optionIcon} />
//                 <Text style={styles.optionText}>Camera</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={pickFromGallery}>
//                 <Image source={galleryIcon} style={styles.optionIcon} />
//                 <Text style={styles.optionText}>Gallery</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}

//       <RemovePhotoModal
//         visible={showRemoveModal}
//         onCancel={() => setShowRemoveModal(false)}
//         onRemove={() => setProfileImage(null)}
//       />
//     </View>
//   );
// };



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 12,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontFamily: Fonts.Bold,
//     fontSize: 16,
//     color: '#000',
//   },
//   profileHeader: {
//     paddingHorizontal: 21,
//     marginTop: 24,
//     marginBottom: 32,
//   },
//   avatarRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginRight: 16,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   editIconOverlay: {
//     position: 'absolute',
//     bottom: 6,
//     right: 6,
//     backgroundColor: '#fff',
//     borderRadius: 12.5,
//     width: 25,
//     height: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },

//   nameJobContainer: {
//     flex: 1,
//   },
//   name: {
//     fontFamily: Fonts.Bold,
//     fontSize: 20,
//     color: '#03130C',
//   },
//   job: {
//     fontFamily: Fonts.Regular,
//     fontSize: 14,
//     color: '#03130C',
//     marginTop: 4,
//   },
//   formContainer: {
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontFamily: Fonts.Bold,
//     fontSize: 16,
//     lineHeight: 26,
//     color: '#03130C',
//     marginBottom: 16,
//   },
//   label: {
//     fontFamily: Fonts.Bold,
//     fontSize: 14,
//     lineHeight: 24,
//     color: '#000',
//     marginBottom: 8,
//   },
//   input: {
//     width: '100%',
//     maxWidth: 327,
//     alignSelf: 'center',
//     height: 40,
//     backgroundColor: '#EFF6FF',
//     borderRadius: 6,
//     paddingHorizontal: 12,
//     fontFamily: Fonts.Regular,
//     fontSize: 14,
//     marginBottom: 16,
//   },
//   saveButtonContainer: {
//     position: 'absolute',
//     bottom: 40,
//     left: 20,
//     right: 20,
//     alignItems: 'center',
//   },
//   saveButton: {
//     width: '100%',
//     maxWidth: 335,
//     height: 48,
//     backgroundColor: '#0069FF',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 28,
//   },
//   saveButtonText: {
//     fontFamily: Fonts.Bold,
//     fontSize: 14,
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//   },
//   bottomSection: {
//     width: width,
//     height: 200,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingTop: 16,
//     paddingHorizontal: 24,
//   },
//   divider: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#0A0A0C',
//     borderRadius: 2,
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   bottomTitle: {
//     fontFamily: Fonts.Bold,
//     fontSize: 16,
//     color: '#000',
//   },
//   deleteTopButton: {
//     padding: 8,
//   },
//   deleteTopIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     tintColor: '#666',
//   },
//   photoOptionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 60,
//   },
//   photoOption: {
//     alignItems: 'center',
//   },
//   iconCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#A5A5A5',
//     marginBottom: 8,
//   },
//   optionIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   optionText: {
//     fontFamily: Fonts.Regular,
//     fontSize: 12,
//     color: '#0069FF',
//   },
// });

// export default EditProfileScreen;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   Alert,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { Fonts } from '../constants/fonts';
// import RemovePhotoModal from '../components/RemovePhotoModal';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const cameraIcon = require('../assets/images/camera.png');
// const galleryIcon = require('../assets/images/gallery.png');
// const deleteIcon = require('../assets/images/delete_icon.png');
// const editPencilIcon = require('../assets/images/edit_icon.png');
// const defaultAvatar = require('../assets/images/edit_profile.png');

// const { width } = Dimensions.get('window');

// const USER_API =
//   'https://api.arinnovate.io/getUser/668b843dec65884f31c54252';

// const EditProfileScreen = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [jobTitle, setJobTitle] = useState('');
//   const [email, setEmail] = useState('');

//   const [profileImage, setProfileImage] = useState(null);
//   const [showPhotoOptions, setShowPhotoOptions] = useState(false);
//   const [showRemoveModal, setShowRemoveModal] = useState(false);

//   // 🔹 FETCH USER DATA
//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await fetch(USER_API);
//       const json = await res.json();

//       if (json?.success && json?.User) {
//         const user = json.User;

//         setFirstName(user.firstName || '');
//         setLastName(user.lastName || '');
//         setEmail(user.email || '');

//         // Job title from experience
//         const experience = user.newExperience?.[0];
//         setJobTitle(experience?.job_title || '');

//         // Profile photo
//         const photo = user.profpicFileLocation?.photo;
//         if (photo) {
//           setProfileImage(photo);
//         }
//       }
//     } catch (err) {
//       console.log('Fetch user error:', err);
//     }
//   };

//   const options = {
//     mediaType: 'photo',
//     quality: 0.8,
//   };

//   const pickFromCamera = () => {
//     launchCamera(options, response => {
//       if (response?.assets?.[0]?.uri) {
//         setProfileImage(response.assets[0].uri);
//       }
//       setShowPhotoOptions(false);
//     });
//   };

//   const pickFromGallery = () => {
//     launchImageLibrary(options, response => {
//       if (response?.assets?.[0]?.uri) {
//         setProfileImage(response.assets[0].uri);
//       }
//       setShowPhotoOptions(false);
//     });
//   };

//   const handleSaveSubmit = () => {
//     Alert.alert('Success', 'Profile saved successfully!');
//     // 🔥 You can send updated payload here
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
//         <View style={styles.profileHeader}>
//           <View style={styles.avatarRow}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={profileImage ? { uri: profileImage } : defaultAvatar}
//                 style={styles.avatar}
//               />
//               <TouchableOpacity
//                 style={styles.editIconOverlay}
//                 onPress={() => setShowPhotoOptions(true)}
//               >
//                 <Image source={editPencilIcon} style={styles.editPencil} />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.nameJobContainer}>
//               <Text style={styles.name}>
//                 {firstName} {lastName}
//               </Text>
//               <Text style={styles.job}>{jobTitle}</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.formContainer}>
//           <Text style={styles.sectionTitle}>Personal Information</Text>

//           <Text style={styles.label}>First name</Text>
//           <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />

//           <Text style={styles.label}>Last name</Text>
//           <TextInput style={styles.input} value={lastName} onChangeText={setLastName} />

//           <Text style={styles.label}>Job Title</Text>
//           <TextInput style={styles.input} value={jobTitle} onChangeText={setJobTitle} />

//           <Text style={styles.label}>Email</Text>
//           <TextInput style={styles.input} value={email} editable={false} />
//         </View>
//       </ScrollView>

//       <View style={styles.saveButtonContainer}>
//         <TouchableOpacity style={styles.saveButton} onPress={handleSaveSubmit}>
//           <Text style={styles.saveButtonText}>Save & Submit</Text>
//         </TouchableOpacity>
//       </View>

//       {showPhotoOptions && (
//         <TouchableOpacity style={styles.overlay} onPress={() => setShowPhotoOptions(false)}>
//           <View style={styles.bottomSection}>
//             <View style={styles.divider} />
//             <View style={styles.photoOptionsRow}>
//               <TouchableOpacity onPress={pickFromCamera}>
//                 <Image source={cameraIcon} style={styles.optionIcon} />
//                 <Text style={styles.optionText}>Camera</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={pickFromGallery}>
//                 <Image source={galleryIcon} style={styles.optionIcon} />
//                 <Text style={styles.optionText}>Gallery</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )}

//       <RemovePhotoModal
//         visible={showRemoveModal}
//         onCancel={() => setShowRemoveModal(false)}
//         onRemove={() => setProfileImage(null)}
//       />
//     </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingTop: 12,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontFamily: Fonts.Bold,
//     fontSize: 16,
//     color: '#000',
//   },
//   profileHeader: {
//     paddingHorizontal: 21,
//     marginTop: 24,
//     marginBottom: 32,
//   },
//   avatarRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatarContainer: {
//     position: 'relative',
//     marginRight: 16,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//   },
//   editIconOverlay: {
//     position: 'absolute',
//     bottom: 6,
//     right: 6,
//     backgroundColor: '#fff',
//     borderRadius: 12.5,
//     width: 25,
//     height: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 3,
//   },

//   nameJobContainer: {
//     flex: 1,
//   },
//   name: {
//     fontFamily: Fonts.Bold,
//     fontSize: 20,
//     color: '#03130C',
//   },
//   job: {
//     fontFamily: Fonts.Regular,
//     fontSize: 14,
//     color: '#03130C',
//     marginTop: 4,
//   },
//   formContainer: {
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontFamily: Fonts.Bold,
//     fontSize: 16,
//     lineHeight: 26,
//     color: '#03130C',
//     marginBottom: 16,
//   },
//   label: {
//     fontFamily: Fonts.Bold,
//     fontSize: 14,
//     lineHeight: 24,
//     color: '#000',
//     marginBottom: 8,
//   },
//   input: {
//     width: '100%',
//     maxWidth: 327,
//     alignSelf: 'center',
//     height: 40,
//     backgroundColor: '#EFF6FF',
//     borderRadius: 6,
//     paddingHorizontal: 12,
//     fontFamily: Fonts.Regular,
//     fontSize: 14,
//     marginBottom: 16,
//   },
//   saveButtonContainer: {
//     position: 'absolute',
//     bottom: 40,
//     left: 20,
//     right: 20,
//     alignItems: 'center',
//   },
//   saveButton: {
//     width: '100%',
//     maxWidth: 335,
//     height: 48,
//     backgroundColor: '#0069FF',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 28,
//   },
//   saveButtonText: {
//     fontFamily: Fonts.Bold,
//     fontSize: 14,
//     color: '#FFFFFF',
//     textAlign: 'center',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'flex-end',
//   },
//   bottomSection: {
//     width: width,
//     height: 200,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 24,
//     borderTopRightRadius: 24,
//     paddingTop: 16,
//     paddingHorizontal: 24,
//   },
//   divider: {
//     width: 40,
//     height: 4,
//     backgroundColor: '#0A0A0C',
//     borderRadius: 2,
//     marginBottom: 16,
//     alignSelf: 'center',
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 32,
//   },
//   bottomTitle: {
//     fontFamily: Fonts.Bold,
//     fontSize: 16,
//     color: '#000',
//   },
//   deleteTopButton: {
//     padding: 8,
//   },
//   deleteTopIcon: {
//     width: 20,
//     height: 20,
//     resizeMode: 'contain',
//     tintColor: '#666',
//   },
//   photoOptionsRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 60,
//   },
//   photoOption: {
//     alignItems: 'center',
//   },
//   iconCircle: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#A5A5A5',
//     marginBottom: 8,
//   },
//   optionIcon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   optionText: {
//     fontFamily: Fonts.Regular,
//     fontSize: 12,
//     color: '#0069FF',
//   },
// });

// export default EditProfileScreen;




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Fonts } from '../constants/fonts';
import RemovePhotoModal from '../components/RemovePhotoModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import { API_BASE, IMAGE_UPLOAD_BASE } from '../config/api';

import { API_BASE } from '@env';


const cameraIcon = require('../assets/images/camera.png');
const galleryIcon = require('../assets/images/gallery.png');
const deleteIcon = require('../assets/images/delete_icon.png');
const editPencilIcon = require('../assets/images/edit_icon.png');
const defaultAvatar = require('../assets/images/edit_profile.png');

const { width } = Dimensions.get('window');

// API endpoints
const USER_API = 'https://api.arinnovate.io/getUser/668b843dec65884f31c54252';
const UPDATE_API = 'https://api.arinnovate.io/api/updateCandidateUser';

const UPLOAD_PROFILE_IMAGE_API =
  'https://api.arinnovate.io/api/candidate/upload-profile-image';
const EditProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');

  const [profileImage, setProfileImage] = useState(null); // local image file
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // 🔹 FETCH USER DATA
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(USER_API);
      const json = await res.json();

      if (json?.success && json?.User) {
        const user = json.User;

        setFullName(user.fullName || user.firstName || '');
        setEmail(user.email || '');
        setUserId(user._id || '');

        // Job title from experience
        const experience = user.newExperience?.[0];
        setJobTitle(experience?.job_title || '');

        // Profile photo
        const photo = user.profpicFileLocation?.photo;
        if (photo) {
          setProfileImageUrl(`https://your-s3-or-cdn-url/${photo}`);
        }
      }
    } catch (err) {
      console.log('Fetch user error:', err);
      Alert.alert('Error', 'Failed to fetch user data');
    } finally {
      setIsLoading(false);
    }
  };

  const options = {
    mediaType: 'photo',
    quality: 0.8,
  };

  const pickFromGallery = () => {
    launchImageLibrary(options, response => {
      if (response?.assets?.[0]) {
        const asset = response.assets[0];

        setProfileImage({
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `profile_${Date.now()}.jpg`,
        });
      }
      setShowPhotoOptions(false);
    });
  };

  const pickFromCamera = () => {
    launchCamera(options, response => {
      if (response?.assets?.[0]) {
        const asset = response.assets[0];

        setProfileImage({
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `profile_${Date.now()}.jpg`,
        });
      }
      setShowPhotoOptions(false);
    });
  };

  const uploadProfileImage = async () => {
    if (!profileImage || !userId) return;

    const formData = new FormData();

    // Create the file object
    const fileToUpload = {
      uri: Platform.OS === 'android' ? profileImage.uri : profileImage.uri.replace('file://', ''),
      type: 'image/jpeg', // Try hardcoding this first to test
      name: 'profile_picture.jpg',
    };

    // The key 'file' MUST match your backend upload.single("file")
    formData.append("file", fileToUpload);

    try {
      const response = await fetch(
        `${API_BASE}/user/upload-profile-image/${userId}`,
        {
          method: "POST", // backend + frontend both POST
          body: formData,
          headers: {
            Accept: 'application/json',
          },
        }
      );


      const result = await response.json();
      console.log("📥 Result:", result);
    } catch (error) {
      console.log("❌ Frontend Error:", error);
    }
  };

  // The key 'file' MUST match your backend upload.single("file")
  formData.append("file", fileToUpload);

  try {
    const response = await fetch(
      `${API_BASE}/user/upload-profile-image/${userId}`,
      {
        method: "POST", // Make sure backend and frontend are both POST
        body: formData,
        headers: {
          'Accept': 'application/json',
          // IMPORTANT: DO NOT add 'Content-Type': 'multipart/form-data'
          // React Native sets the boundary automatically if you leave this out
        },
      }
    );

    const result = await response.json();
    console.log("📥 Result:", result);
  } catch (error) {
    console.log("❌ Frontend Error:", error);
  }
};



  // 🔹 UPDATE PROFILE FUNCTION
  const updateProfile = async () => {
    try {
      const payload = {
        _id: userId,
        firstName,
        lastName,
        email,
        newExperience: [{ job_title: jobTitle }],
      };

      await fetch(UPDATE_API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (profileImage?.uri) {
        await uploadProfileImage();
      }

      Alert.alert("Success", "Profile updated successfully");
      fetchUser();
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };



  // 🔹 HANDLE SAVE SUBMIT
  const handleSaveSubmit = () => {
    // Validation
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Validation Error', 'First name and last name are required');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    // Show confirmation alert
    Alert.alert(
      'Confirm Update',
      'Are you sure you want to update your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Update',
          onPress: updateProfile,
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0069FF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarRow}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  profileImage?.uri
                    ? { uri: profileImage.uri } // local preview
                    : profileImageUrl
                      ? { uri: profileImageUrl } // server image
                      : defaultAvatar
                }
                style={styles.avatar}
              />

              <TouchableOpacity
                style={styles.editIconOverlay}
                onPress={() => setShowPhotoOptions(true)}
              >
                <Image source={editPencilIcon} style={styles.editPencil} />
              </TouchableOpacity>
            </View>

            <View style={styles.nameJobContainer}>
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
              <Text style={styles.job}>{jobTitle}</Text>
            </View>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <Text style={styles.label}>First name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            placeholderTextColor="#999"
          />

          {/* <Text style={styles.label}>Last name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter last name"
            placeholderTextColor="#999"
          /> */}

          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="Enter job title"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </ScrollView>

      <View style={styles.saveButtonContainer}>
        <TouchableOpacity
          style={[styles.saveButton, isUpdating && styles.saveButtonDisabled]}
          onPress={handleSaveSubmit}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save & Submit</Text>
          )}
        </TouchableOpacity>
      </View>

      {showPhotoOptions && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowPhotoOptions(false)}
          activeOpacity={1}
        >
          <View style={styles.bottomSection}>
            <View style={styles.divider} />
            <View style={styles.photoOptionsRow}>
              <TouchableOpacity style={styles.photoOption} onPress={pickFromCamera}>
                <Image source={cameraIcon} style={styles.optionIcon} />
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.photoOption} onPress={pickFromGallery}>
                <Image source={galleryIcon} style={styles.optionIcon} />
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}

      <RemovePhotoModal
        visible={showRemoveModal}
        onCancel={() => setShowRemoveModal(false)}
        onRemove={() => {
          setProfileImage(null);
          setShowRemoveModal(false);
          // You might want to call API to remove profile photo here
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: '#666',
  },
  profileHeader: {
    paddingHorizontal: 21,
    marginTop: 24,
    marginBottom: 32,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editIconOverlay: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#fff',
    borderRadius: 12.5,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  editPencil: {
    width: 12,
    height: 12,
  },
  nameJobContainer: {
    flex: 1,
  },
  name: {
    fontFamily: Fonts.Bold,
    fontSize: 20,
    color: '#03130C',
  },
  job: {
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: '#03130C',
    marginTop: 4,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    lineHeight: 26,
    color: '#03130C',
    marginBottom: 16,
  },
  label: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
    lineHeight: 24,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    maxWidth: 327,
    alignSelf: 'center',
    height: 40,
    backgroundColor: '#EFF6FF',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    marginBottom: 16,
    color: '#000',
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  saveButton: {
    width: '100%',
    maxWidth: 335,
    height: 48,
    backgroundColor: '#0069FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  saveButtonDisabled: {
    backgroundColor: '#99C2FF',
  },
  saveButtonText: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  bottomSection: {
    width: width,
    height: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  divider: {
    width: 40,
    height: 4,
    backgroundColor: '#0A0A0C',
    borderRadius: 2,
    marginBottom: 16,
    alignSelf: 'center',
  },
  photoOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
  },
  photoOption: {
    alignItems: 'center',
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  optionText: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: '#0069FF',
  },
});

export default EditProfileScreen;