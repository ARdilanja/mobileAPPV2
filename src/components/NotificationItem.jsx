
import React, { useState, useRef } from 'react'; // Added useRef
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable, Dimensions } from 'react-native';
import { Fonts } from '../constants/fonts';

const { width: screenWidth } = Dimensions.get('window');

const NotificationItem = ({ item, isLast }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
  
  // 1. Create a ref and state for positioning
  const dotsRef = useRef(null);
  const [popupTop, setPopupTop] = useState(0);

  const openMenu = () => {
    // 2. Measure the position of the dots on the screen
    dotsRef.current?.measure((x, y, width, height, pageX, pageY) => {
      // pageY is the vertical position relative to the whole screen
      setPopupTop(pageY + height - 35); 
      setMenuVisible(true);
    });
  };

  const openBottomMenu = () => {
    setMenuVisible(false);
    setBottomMenuVisible(true);
  };

  return (
    <View
      style={[
        styles.container,
        isLast && { borderBottomWidth: 0 },
        menuVisible && { zIndex: 10 },
      ]}
    >
      {/* Icon */}
      <View style={styles.iconWrapper}>
        <Image
          style={{ width: 16, height: 16 }}
          source={require('../assets/icons/badget-check2.png')}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.text}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>

      {/* Three dots */}
      <TouchableOpacity
        ref={dotsRef} // 3. Attach Ref here
        style={styles.dotsTouchArea}
        onPress={openMenu}
      >
        <Image
          style={styles.dots}
          source={require('../assets/icons/three-dots.png')}
        />
      </TouchableOpacity>

      {/* Small Popup Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          {/* 4. Use the dynamic 'top' position */}
          <View style={[styles.popup, { top: popupTop }]}>
            <TouchableOpacity style={styles.popupItem} onPress={openBottomMenu}>
              <Image
                style={{ width: 16, height: 16, marginRight: 8 }}
                source={require('../assets/icons/trash.png')}
              />
              <Text style={styles.popupText}>Delete this notification</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Bottom Delete Confirmation */}
      <Modal
        visible={bottomMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBottomMenuVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setBottomMenuVisible(false)}
        >
          <View style={styles.bottomPopup}>
            <TouchableOpacity style={styles.popupItem} onPress={() => setBottomMenuVisible(false)}>
              <Image
                style={{ width: 16, height: 16, marginRight: 8, marginLeft: 16 }}
                source={require('../assets/icons/trash.png')}
              />
              <Text style={styles.popupText}>Delete this notification</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    backgroundColor: '#FFF',
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.Regular,
    color: '#000',
  },
  time: {
    marginTop: 4,
    lineHeight: 16,
    fontFamily: Fonts.Regular,
    fontSize: 12,
    color: '#2A2A2A',
  },
  dotsTouchArea: {
    width: 30,
    height: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  dots: {
    width: 3.33,
    height: 16,
    marginTop: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  popup: {
    position: 'absolute',
    right: 25, // Fixed distance from right edge of screen
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: '#F0F0F0',
    minWidth: 180, // Ensure it looks like a menu
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: Fonts.Regular,
    color: '#000',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomPopup: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    height: 60,
    marginBottom: 20,
    justifyContent: 'center',
    borderRadius: 12,
  },
});