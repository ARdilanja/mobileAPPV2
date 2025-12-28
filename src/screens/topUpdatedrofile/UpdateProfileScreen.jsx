import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import PhotoActionModal from '../../components/PhotoActionModal';
import { TextInput } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const scale = width / 390;
const defaultAvatar = require('../../assets/images/profile_update1.png');
const editPencilIcon = require('../../assets/images/edit_icon1.png');

export default function UpdateProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* PROFILE IMAGE */}
        <View style={styles.imageWrapper}>
          <Image source={defaultAvatar} style={styles.profileImage} />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => setModalVisible(true)}
          >
            <Image source={editPencilIcon} style={styles.editPencil} />
          </TouchableOpacity>
        </View>

        {/* INPUT CARDS */}
        <View style={styles.card}>
          <TextInput
            value="Claire henry"
            style={styles.value}
            placeholder="Name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.card}>
          <TextInput
            value="🇮🇳  +91  86325 92563"
            style={styles.value}
            placeholder="Phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.card}>
          <TextInput
            value="clairehenry@gmail.com"
            style={styles.value}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.card}>
          <TextInput
            value="********"
            style={styles.value}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* PHOTO ACTION MODAL */}
      <PhotoActionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={() => setModalVisible(false)}
        onGallery={() => setModalVisible(false)}
        onCamera={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  back: {
    fontSize: 28,
    marginRight: 8,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },

  imageWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },

  //   profileImage: {
  //     width: 90 * scale,
  //     height: 90 * scale,
  //     borderRadius: 45 * scale,
  //   },

  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: width / 2 - 45 * scale,
    backgroundColor: '#fff',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  editText: {
    fontSize: 14,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  value: {
    fontSize: 15,
    color: '#000',
    padding: 0,
  },

  button: {
    backgroundColor: '#0A66FF',
    marginHorizontal: 16,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
