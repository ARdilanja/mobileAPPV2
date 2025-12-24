import React from 'react';
import { TextInput, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';

const screenWidth = Dimensions.get("window").width;

const Password = ({ navigation }) => {
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

              <View style={styles.topSection}>
                <AuthHeader title="Sign in"
                  subtitle="Sign in and find your dream job"
                  showBack={true}
                  showLogo={true}
                />

                <TextInput
                  placeholderTextColor="#242424"
                  placeholder="Password"
                  style={styles.input}
                /></View>
              <View style={styles.bottomSection}>
                <AuthButton text="Sign in"
                  onPress={() => navigation.navigate('CreatePassword')}
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
    flexGrow: 1,
  },
  topSection: {
    // alignItems: 'center',
    flex: 1,
  },
  bottomSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    width: screenWidth - 32,
    marginHorizontal: 'auto',
    borderWidth: 1,
    color:'#242424',
    borderColor: 'white',
    backgroundColor: '#fff',
    borderRadius: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignSelf: 'center',
    elevation: 4,

    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400',
    padding: 14,
    paddingVertical: 16,
    paddingLeft: 24
  },
});

export default Password;
