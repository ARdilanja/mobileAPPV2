import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Pressable } from 'react-native';

const NotificationItem = ({ item, isLast }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false);
  
   const openBottomMenu = () => {
    setMenuVisible(false);         
    setBottomMenuVisible(true);  
  };
  return (
    <View style={[
          styles.container,
          isLast && { borderBottomWidth: 0 }, 
        ]}>

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
      <TouchableOpacity style={{width:16}} onPress={() => setMenuVisible(prev => !prev)}>
        <Image
          style={styles.dots}
          source={require('../assets/icons/three-dots.png')}
        />
      </TouchableOpacity>

      {/* Popup */}
      {menuVisible && (
        <View style={styles.popup}>
          <TouchableOpacity style={styles.popupItem} onPress={openBottomMenu}>
            <Image
              style={{ width: 16, height: 16, marginRight: 8 }}
              source={require('../assets/icons/trash.png')}
            />
            <Text style={styles.popupText}>Delete this notification</Text>
          </TouchableOpacity>
        </View>
      )}
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
                style={{ width: 16, height: 16, marginRight: 8, marginLeft:16 }}
                source={require('../assets/icons/trash.png')}
              />
              <Text style={styles.popupText}>
                Delete this notification
              </Text>
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
    position: 'relative',
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
    fontWeight:400,
    color: '#000',
  },
  time: {
    marginTop: 4,
    lineHeight: 16,
    fontWeight:400,
    fontSize: 12,
    color: '#2A2A2A',
  },
  dots: {
    width: 3.3,
    height: 16,
    marginTop: 12,
  },
  popup: {
    position: 'absolute',
    right: 8,
    top: 36,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  popupItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 14,
    lineHeight:20,
    fontWeight:400,
    color: '#000',
    
  },
  overlay: {
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0.2)',
},
bottomPopup: {
  backgroundColor: '#FFF',
  marginHorizontal:16,
  height:60,
//   padding: 16,
  marginBottom:9,
  justifyContent:'center',
  
  borderRadius: 12,
},
});
