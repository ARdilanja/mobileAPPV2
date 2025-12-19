import React, { useEffect, useState } from 'react';
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
  Platform,
} from 'react-native';
import { Fonts } from '../constants/fonts';
import RemovePhotoModal from '../components/RemovePhotoModal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Icons & Assets
const cameraIcon = require('../assets/images/camera.png');
const galleryIcon = require('../assets/images/gallery.png');
const deleteIcon = require('../assets/images/delete_icon.png');
const editPencilIcon = require('../assets/images/edit_icon.png');
const defaultAvatar = require('../assets/images/edit_profile.png');

const { width, height } = Dimensions.get('window');

const USER_API =
  'https://api.arinnovate.io/getUser/668b843dec65884f31c54252';

const EditProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  // const handleBack = () => navigation?.goBack();

  const handleEditPhotoPress = () => {
    setShowPhotoOptions(true);
  };

  const closePhotoOptions = () => {
    setShowPhotoOptions(false);
  };

  const handleSaveSubmit = () => {
    Alert.alert('Success', 'Profile saved successfully!');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch(USER_API);
      const json = await res.json();

      if (json?.success && json?.User) {
        const user = json.User;

        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setEmail(user.email || '');

        // Job title from experience
        const experience = user.newExperience?.[0];
        setJobTitle(experience?.job_title || '');

        // Profile photo
        const photo = user.profpicFileLocation?.photo;
        if (photo) {
          setProfileImage(photo);
        }
      }
    } catch (err) {
      console.log('Fetch user error:', err);
    }
  };



const options = {
  mediaType: 'photo',
  quality: 0.8,
};


 const pickFromCamera = () => {
  launchCamera(options, response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else {
      const uri = response.assets?.[0]?.uri;
      if (uri) setProfileImage(uri);
    }
    closePhotoOptions();
  });
};


const pickFromGallery = () => {
  launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled gallery');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else {
      const uri = response.assets?.[0]?.uri;
      if (uri) setProfileImage(uri);
    }
    closePhotoOptions();
  });
};


  const deletePhoto = () => {
    closePhotoOptions();
    setShowRemoveModal(true);
  };

  const confirmRemove = () => {
    setProfileImage(null);
    setShowRemoveModal(false);
    Alert.alert('Success', 'Profile photo removed.');
  };

  const cancelRemove = () => {
    setShowRemoveModal(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
            ></TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={{ width: 40 }} />
          </View> */}

          <View style={styles.profileHeader}>
            <View style={styles.avatarRow}>
              <View style={styles.avatarContainer}>
                <Image
                  source={profileImage ? { uri: profileImage } : defaultAvatar}
                  style={styles.avatar}
                />

                <TouchableOpacity
                  style={styles.editIconOverlay}
                  onPress={handleEditPhotoPress}
                  activeOpacity={0.7}
                >
                  <Image source={editPencilIcon} style={styles.editPencil} />
                </TouchableOpacity>
              </View>

              <View style={styles.nameJobContainer}>
                <Text style={styles.name}> {firstName} {lastName}</Text>
                <Text style={styles.job}>{jobTitle}</Text>
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Personal Information</Text>

            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />

            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
            />

            <Text style={styles.label}>Job Title</Text>
            <TextInput
              style={styles.input}
              value={jobTitle}
              onChangeText={setJobTitle}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
        </ScrollView>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSubmit}
          >
            <Text style={styles.saveButtonText}>Save & Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showPhotoOptions && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closePhotoOptions}
        >
          <View
            style={styles.bottomSection}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.divider} />

            <View style={styles.titleRow}>
              <Text style={styles.bottomTitle}>Profile photo</Text>
              <TouchableOpacity
                onPress={deletePhoto}
                style={styles.deleteTopButton}
              >
                <Image source={deleteIcon} style={styles.deleteTopIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.photoOptionsRow}>
              <TouchableOpacity
                style={styles.photoOption}
                onPress={pickFromCamera}
              >
                <View style={styles.iconCircle}>
                  <Image source={cameraIcon} style={styles.optionIcon} />
                </View>
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.photoOption}
                onPress={pickFromGallery}
              >
                <View style={styles.iconCircle}>
                  <Image source={galleryIcon} style={styles.optionIcon} />
                </View>
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <RemovePhotoModal
        visible={showRemoveModal}
        onCancel={cancelRemove}
        onRemove={confirmRemove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: '#000',
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  bottomTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    color: '#000',
  },
  deleteTopButton: {
    padding: 8,
  },
  deleteTopIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: '#666',
  },
  photoOptionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 60,
  },
  photoOption: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A5A5A5',
    marginBottom: 8,
  },
  optionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  optionText: {
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: '#0069FF',
  },
});

export default EditProfileScreen;



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
