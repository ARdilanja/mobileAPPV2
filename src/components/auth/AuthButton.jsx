// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

// const screenWidth = Dimensions.get("window").width;

// const AuthButton = ({ text, onPress, onFooterPress, hasbottomText = false, bottomText, signupText = false, signinText = false }) => {
//   return (
//     <>
//       <TouchableOpacity style={[styles.button]} onPress={onPress}>
//         <Text style={styles.text}>{text}</Text>
//       </TouchableOpacity>
//       {signupText && (
//         <Text style={styles.footer} onPress={onFooterPress}>
//           Don’t have an account? <Text style={styles.link}>Sign up</Text>
//         </Text>
//       )}
//       {signinText && (
//         <Text style={styles.footer} onPress={onFooterPress}>
//           Already have an account? <Text style={styles.link}>Sign in</Text>
//         </Text>
//       )}
//       {hasbottomText && (
//         <Text style={styles.footer}>
//           {bottomText}
//         </Text>
//       )}

//     </>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     // position: 'absolute',   // ✅ FIXED AT BOTTOM
//     // bottom: 110,             // distance from bottom
//     alignSelf: 'center',    // replaces marginHorizontal:'auto'
//     width: screenWidth - 32,

//     backgroundColor: 'rgba(1, 120, 255, 1)',
//     borderRadius: 48,
//     paddingVertical: 16,

//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,

//     alignItems: 'center',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: '500',
//     lineHeight: 32
//   },
//   footer: {
//     position: 'absolute', 
//     bottom: 60,           
//     alignSelf: 'center',

//     fontSize: 18,
//     lineHeight: 28,
//     fontWeight: 400,
//     color: '#2A2A2A',
//     textAlign: 'center',
//     // marginTop: 'auto',
//     // marginBottom:60
//   },
//   link: {
//     color: '#1a73e8',
//     fontWeight: '400',
//   },
// });

// export default AuthButton;





import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get("window").width;

const AuthButton = ({ text, onPress, onFooterPress, signupText = false, signinText = false }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
      
      {signupText && (
        <Text style={styles.footer} onPress={onFooterPress}>
          Don’t have an account? <Text style={styles.link}>Sign up</Text>
        </Text>
      )}
      {signinText && (
        <Text style={styles.footer} onPress={onFooterPress}>
          Already have an account? <Text style={styles.link}>Sign in</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20, // Distance from the very bottom
  },
  button: {
    width: screenWidth - 32,
    backgroundColor: 'rgba(1, 120, 255, 1)',
    borderRadius: 48,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4,
  },
  text: { color: '#fff', fontSize: 24, fontWeight: '500' },
  footer: { marginTop: 15, fontSize: 16, color: '#2A2A2A', textAlign: 'center' },
  link: { color: '#1a73e8', fontWeight: '600' },
});

export default AuthButton;