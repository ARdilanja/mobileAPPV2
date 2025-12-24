// import React from 'react';
// import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native';
// import AuthHeader from '../../components/auth/AuthHeader';
// import AuthButton from '../../components/auth/AuthButton';
// import Gradient from '../../constants/Gradient';

// const screenWidth = Dimensions.get("window").width;

// const EmailInput = ({ navigation }) => {
//   return (
//     <Gradient>
//       <AuthHeader
//         title="Sign in"
//         subtitle="Sign in and find your dream job"
//         showBack={true}
//         showLogo={true}
//       />
//       <TextInput
//         placeholderTextColor="#242424"
//         placeholderT="#242424"
//         placeholder="Email id"
//         style={styles.input}
//         keyboardType="email-address"
//       />

//       <AuthButton
//         text="Next"
//         signupText={true}
//         onPress={() => navigation.navigate('Password')}
//         onFooterPress={() => navigation.navigate('SignUp')}
//       />
      
//     </Gradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 48,
//   },
//   input: {
//     width: screenWidth - 32,
//     marginHorizontal: 'auto',
//     borderWidth: 1,
//     borderColor: 'white',
//     backgroundColor: '#fff',
//     borderRadius: 48,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,

//     elevation: 4,

//     fontSize: 18,
//     lineHeight: 28,
//     fontWeight: '400',
//     padding: 14,
//     paddingVertical: 16,
//     paddingLeft: 24
//   },
//   footer: {
//     position: 'fixed',  
//     bottom: 60,           
//     alignSelf: 'center',
//     fontSize: 18,
//     lineHeight: 28,
//     fontWeight: 400,
//     color: '#2A2A2A',
//     textAlign: 'center',
//     marginTop: 24,
//   },
//   link: {
//     color: '#1a73e8',
//     fontWeight: '400',
//   },
// });

// export default EmailInput;




import React from 'react';
import { 
  View, TextInput, StyleSheet, Dimensions, 
  KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';

const screenWidth = Dimensions.get("window").width;

const EmailInput = ({ navigation }) => {
  return (
    <Gradient>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              
              {/* TOP SECTION: Header + Input */}
              <View style={styles.topSection}>
                <AuthHeader
                  title="Sign in"
                  subtitle="Sign in and find your dream job"
                  showBack={true}
                  showLogo={true}
                />
                <TextInput
                  placeholderTextColor="#242424"
                  placeholder="Email id"
                  style={styles.input}
                  keyboardType="email-address"
                />
              </View>

              {/* BOTTOM SECTION: Pushed to bottom by space-between */}
              <View style={styles.bottomSection}>
                <AuthButton
                  text="Next"
                  signupText={true}
                  onPress={() => navigation.navigate('Password')}
                  onFooterPress={() => navigation.navigate('SignUp')}
                />
              </View>

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Gradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content fills the screen height
  },
  topSection: {
    // alignItems: 'center',
    flex: 1, // Takes up remaining space pushing bottomSection down
  },
  bottomSection: {
    marginBottom: 20, // Space from very bottom of device
    alignItems: 'center',
  },
  input: {
    width: screenWidth - 32,
    backgroundColor: '#fff',
    marginHorizontal:'auto',
    borderRadius: 48,
    paddingVertical: 16,
    color:'#242424',
    paddingLeft: 24,
    fontSize: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default EmailInput;