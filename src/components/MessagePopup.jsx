// import React from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// const screenWidth = Dimensions.get("window").width;

// const MessagePopup = ({ visible, message, onClose, type = 'info' }) => {
//   if (!message) return null;


//   return (
//     <Modal
//       transparent
//       animationType="fade"
//       visible={visible}
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View
//           style={[
//             styles.popup,
//             type === 'error' && styles.error,
//             type === 'success' && styles.success,
//           ]}
//         >
//           <Text style={styles.message}>{message}</Text>

//           <TouchableOpacity style={styles.button} onPress={onClose}>
//             <Text style={styles.buttonText}>OK</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   popup: {
//     width: screenWidth - 32,
//     marginHorizontal:'auto',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     alignItems: 'center',
//   },
//   success: {
//     // borderLeftWidth: 5,
//     // borderLeftColor: '#22c55e',
//     color:'#22c55e'
//   },
//   error: {
//     color:'#ef4444',
//     // borderLeftWidth: 5,
//     // borderLeftColor: '#ef4444',
//   },
//   message: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#000',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//     borderRadius: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default MessagePopup;
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { Fonts } from '../constants/fonts';

const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 390;

const MessagePopup = ({
  visible,
  message,
  type = 'error', // 'error' | 'success'
  duration = 3000,
  onHide,
}) => {
  const slideAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hidePopup();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hidePopup = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onHide && onHide();
    });
  };

  if (!visible) return null;

  const icon =
    type === 'error'
      ? require('../assets/icons/error-emoji.png')
      : require('../assets/images/success.png');

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateY: slideAnim }] },
            type === 'error' ? styles.errorBg : styles.successBg,
          ]}
        >
          <Image source={icon} style={styles.icon} />
          <View style={{ paddingVertical: 6 }}>
            <Text style={styles.title}>
              {type === 'error' ? 'Something went wrong!' : 'Success'}
            </Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>

  );
};

const styles = StyleSheet.create({
   modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent', // keeps UI visible but uninteractive
  },
  
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    width: screenWidth - 32,
    flexDirection: 'row',
    // padding: 14,
    borderRadius: 60,
    alignItems: 'center',
    elevation: 20,
  },

  errorBg: {
    backgroundColor: '#FEE2E2',
  },
  successBg: {
    backgroundColor: '#DCFCE7',
  },
  icon: {
    width: 24 * scale,
    height: 24 * scale,
    marginRight: 16,
    marginLeft: 16,
  },
  title: {
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Medium,
    color: '#000',
  },
  message: {
    fontSize: 14 * scale,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Regular,
    color: '#2A2A2A',
    marginTop: 4 * scale,
  },
});

export default MessagePopup;
