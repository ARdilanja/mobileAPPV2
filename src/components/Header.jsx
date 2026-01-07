// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Platform,
//   Dimensions,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Fonts } from '../constants/fonts';

// const screenWidth = Dimensions.get('window').width;
// const scale = screenWidth / 390;

// const Header = ({ title }) => {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       {/* Back Arrow */}
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backBtn}
//         hitSlop={{ top: 0, bottom: 10, left: 10, right: 10 }}
//       >
//         <Image
//           source={require('../assets/icons/header-backarrow.png')}
//           style={styles.backIcon}
//         />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text style={styles.title}>{title}</Text>

// <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backBtn}
//         hitSlop={{ top: 0, bottom: 10, left: 10, right: 10 }}
//       >
//         <Image
//           source={require('../assets/icons/Header-notification.png')}
//           style={styles.notificationIcon}
//         />
//       </TouchableOpacity>
//       {/* Right spacer to center title */}
//       {/* <View style={styles.rightSpace} /> */}
//     </View>
//   );
// };

// export default Header;
// const styles = StyleSheet.create({
//   container: {
//     height: 56,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // paddingHorizontal: 16,
//     marginTop:30,
//   },

//   backBtn: {
//     padding: 6,
//     paddingHorizontal:20
//   },

//   backIcon: {
//     width: 22,
//     height: 22,
//   },

//   title: {
//     flex: 1,
//     textAlign: 'center',
//     fontSize: 18 * scale,
//     lineHeight: 24 * scale,
//     color: '#000000',
//     fontFamily:Fonts.Medium,
//     paddingRight:30
//   },

//   notificationIcon: {
//     width: 16,
//     height:16,
//   }
// });

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../constants/fonts';

const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 390;

const Header = ({
  title,
  showBack = true,
  showTitle = true,
  showNotification = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      {/* Back Button */}
      {showBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.leftBtn}
          hitSlop={{ top: 8, bottom: 8, left: 16 }}
        >
          <Image
            source={require('../assets/icons/header-backarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      )}

      {/* Title (Always Centered) */}
      {showTitle && (
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      )}

      {/* Notification */}
      {showNotification && (
        <TouchableOpacity
          onPress={() => console.log('Notification')}
          style={styles.rightBtn}
          hitSlop={{ top: 8, bottom: 80, right: 16 }}
        >
          <Image
            source={require('../assets/icons/Header-notification.png')}
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      )}

    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  container: {
    // height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  leftBtn: {
    position: 'absolute',
    left: 16,
    // padding: 6,
  },

  rightBtn: {
    position: 'absolute',
    right: 16,
    padding: 6,
  },

  backIcon: {
    width: 24,
    height: 24,
  },

  notificationIcon: {
    width: 16,
    height: 16,
  },

  title: {
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    color: '#000',
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
});
