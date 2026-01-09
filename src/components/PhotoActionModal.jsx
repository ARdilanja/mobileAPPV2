import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function PhotoActionModal({
  visible,
  onClose,
  onDelete,
  onGallery,
  onCamera,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}   // 🔥 ANDROID FIX
    >
      {/* BACKDROP */}
      <Pressable style={styles.backdrop} onPress={onClose} />

      {/* MODAL */}
      <View style={styles.modalWrapper}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.item} onPress={onDelete}>
            <Text style={styles.text}>Delete photo</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={onGallery}>
            <Text style={styles.text}>Choose from gallery</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={onCamera}>
            <Text style={styles.text}>Take photo</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.item} onPress={onClose}>
            <Text style={[styles.text, styles.cancel]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  modalWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: 320 * scale,
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
  },

  item: {
    paddingVertical: 14,
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    color: '#000',
  },

  cancel: {
    color: '#007AFF',
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
  },
});
