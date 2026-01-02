// import React from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import Gradient from '../../constants/Gradient';
// import AuthButton from '../../components/auth/AuthButton';
// import LinearGradient from 'react-native-linear-gradient';

// const GetStartScreen = ({ navigation }) => {
//   return (
//     <Gradient>
//       <View style={styles.container}>

//         {/* Illustration */}
//         <View style={styles.topSection}>
//         <View style={styles.imageWrapper}>
//           <Image
//             source={require('../../assets/images/getstarted-illustrate.png')}
//             style={styles.image}
//             resizeMode="contain"
//           />

//           {/* Gradient Overlay */}
//           <LinearGradient
//             colors={[
//               'rgba(255,255,255,0)',
//               'rgba(255,255,255,0.5)',
//               'rgba(255,255,255,0.85)',
//               'rgba(255, 255, 255, 1)',
//               '#FFFFFF',
//             ]}
//             locations={[0,0.25, 0.5, 0.76, 1]}
//             style={styles.imageGradient}
//           />
//         </View>

//         {/* Text Content */}
//         <View style={styles.textContainer}>
//           <Text style={styles.title}>
//             Build <Text style={styles.highlight}>confidence</Text>.
//           </Text>
//           <Text style={styles.title}>
//             Speak <Text style={styles.highlight}>up</Text>.
//           </Text>
//           <Text style={styles.title}>
//             Grow <Text style={styles.highlight}>your career</Text>.
//           </Text>
//         </View>
//         </View>

//         <View style={styles.bottomSection}> {/* Button */}
//         <AuthButton
//           text="Get Started"
//           onPress={() => navigation.navigate('SignIn')}
//         />
// </View>
//       </View>

//     </Gradient>
//   );
// };

// export default GetStartScreen;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1, justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//  topSection: {
//     width: '100%',
//   },
//   bottomSection: {
//     width: '100%',
//     alignItems: 'center',
//     paddingBottom: 20, // Final gap from the bottom of the phone
//   },
//   imageWrapper: {
//     width: 420,
//     height: '50%',
//     marginTop: 0,
//     position:'relative'
//   },

//   image: {
//     width: '100%',
//     height: '90%',
//   },

//   imageGradient: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     height: 200, // fade height
//   },
//   gradient: {
//     height: 440,
//     width: '100%',
//   },

//   textContainer: {
//     width: '100%',
//     paddingLeft:16,
//     backgroundColor:'#fff'
//   },

//   title: {
//     fontSize: 40,
//     fontWeight: '700',
//     color: '#000',
//     lineHeight: 56,
//   },

//   highlight: {
//     color: 'rgba(1, 120, 255, 1)',
//   },
// });



import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Gradient from '../../constants/Gradient';
import AuthButton from '../../components/auth/AuthButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const scale = screenWidth / 390;

const GetStartScreen = () => {
  const navigation = useNavigation()

  return (
    <Gradient>
      <StatusBar barStyle="dark-content" backgroundColor="transparent"
        translucent={true} />
      <View style={styles.container}>

        {/* TOP SECTION: Illustration + Text */}
        <View style={styles.topSection}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../../assets/images/getstarted-illustrate.png')}
              style={styles.image}
              resizeMode="contain"
            />

            {/* Smoother Gradient Overlay to fade the image into the background */}
            <LinearGradient
              colors={[
                'rgba(255,255,255,0)',
                'rgba(255,255,255,0.5)',
                'rgba(255,255,255,0.85)',
                'rgba(255, 255, 255, 1)',
                '#FFFFFF',
              ]}
              locations={[0, 0.25, 0.5, 0.76, 1]}
              style={styles.imageGradient}
            />
          </View>

          {/* Text Content - Removed white background to let the gradient flow */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Build <Text style={styles.highlight}>confidence.</Text>
            </Text>
            <Text style={styles.title}>
              Speak <Text style={styles.highlight}>up.</Text>
            </Text>
            <Text style={styles.title}>
              Grow <Text style={styles.highlight}>your career.</Text>
            </Text>
          </View>
        </View>

        {/* BOTTOM SECTION: Stays at the bottom */}
        <View style={styles.bottomSection}>
          <AuthButton
            text="Get started"
            onPress={() => navigation.navigate('SignIn')}
          />
        </View>
      </View>
    </Gradient>
  );
};

export default GetStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  topSection: {
    width: '100%',
  },
  imageWrapper: {
    width: screenWidth,
    height: screenHeight * 0.50,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 120,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 0,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 40 * scale,
    color: '#2A2A2A',
    lineHeight: 56 * scale,
    fontFamily: Fonts.Medium
  },
  highlight: {
    color: '#0178FF',
    fontSize: 40 * scale,
    lineHeight: 56 * scale,
    fontFamily: Fonts.Medium
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 110,
  },
});