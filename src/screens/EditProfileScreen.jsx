import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Fonts } from '../constants/fonts';

// Icons & Assets
const cameraIcon = require('../assets/images/camera.png');
const galleryIcon = require('../assets/images/gallery.png');
const deleteIcon = require('../assets/images/delete_icon.png');
const editPencilIcon = require('../assets/images/edit_icon.png');
const defaultAvatar = require('../assets/images/edit_profile.png');

const { width, height } = Dimensions.get('window');

const EditProfileScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [email, setEmail] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [showPhotoOptions, setShowPhotoOptions] = useState(false);

  const handleBack = () => navigation?.goBack();

  const handleEditPhotoPress = () => {
    setShowPhotoOptions(true);
  };

  const closePhotoOptions = () => {
    setShowPhotoOptions(false);
  };

  const handleSaveSubmit = () => {
    Alert.alert('Success', 'Profile saved successfully!');
  };

  const options = {
    title: 'Select Profile Photo',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: false,
  };

  const pickFromCamera = () => {
    ImagePicker.launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        setProfileImage(response.uri || response.assets?.[0]?.uri);
      }
      closePhotoOptions();
    });
  };

  const pickFromGallery = () => {
    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled gallery');
      } else if (response.error) {
        Alert.alert('Error', response.error);
      } else {
        setProfileImage(response.uri || response.assets?.[0]?.uri);
      }
      closePhotoOptions();
    });
  };

  const deletePhoto = () => {
    setProfileImage(null);
    closePhotoOptions();
    Alert.alert('Success', 'Profile photo removed.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Keyboard Avoiding + Scrollable Content */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }} // Space for fixed button
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              {/* Add your back arrow icon here if needed */}
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Profile</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarRow}>
              <TouchableOpacity
                onPress={handleEditPhotoPress}
                style={styles.avatarContainer}
              >
                <Image
                  source={profileImage ? { uri: profileImage } : defaultAvatar}
                  style={styles.avatar}
                  resizeMode="cover"
                />
                <View style={styles.editIconOverlay}>
                  <Image source={editPencilIcon} style={styles.editPencil} />
                </View>
              </TouchableOpacity>

              <View style={styles.nameJobContainer}>
                <Text style={styles.name}>Jacob Jones</Text>
                <Text style={styles.job}>React Native Developer</Text>
              </View>
            </View>
          </View>

          {/* Personal Information Form */}
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

        {/* Fixed Save Button at Bottom */}
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSubmit}
          >
            <Text style={styles.saveButtonText}>Save & Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Bottom Photo Options Modal */}
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
    </SafeAreaView>
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
