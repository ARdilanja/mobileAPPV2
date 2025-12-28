import React, { useState } from 'react';
import { TextInput, StyleSheet, Dimensions, View, Image, ScrollView, Alert } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
const screenWidth = Dimensions.get("window").width;

const SignUp = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupData, setSignupData] = useState(null)

    const handleSignUp = async () => {
        if (!fullName || !phone || !email || !password) {
            Alert.alert(
                'Missing Details',
                'Please fill all the fields'
            );
            return;
        }
        const payload = {
            email: email,
            firstName: fullName,
            lastName: 'Test',
            password: password,
            phone: phone,
            recrootUserType: 'Candidate',
            country: 'in',
        };
        console.log('payload', payload)
        try {
            const response = await axios.post(
                'https://api.arinnovate.io/auth/register',
                payload
            );
            setSignupData(response.data)
            console.log('Signup Success:', response.data);

            Alert.alert(
                'Success',
                'Signup successful. Please verify OTP.',
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.navigate('OtpVerification', {
                                email,
                                phone,
                                serverOtp: response.data.referral_code, 
                            }),
                    },
                ]
            );
        } catch (error) {
            const errorMsg =
                error.response?.data?.message ||
                'Something went wrong. Please try again.';

            Alert.alert('Signup Failed', errorMsg);
        }
    };

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
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={{ flex: 1 }}>

                            {/* TOP SECTION */}
                            <View style={styles.topSection}>
                                <AuthHeader title="Create password"
                                    subtitle="Sign in and find your dream job"
                                    showBack={true}
                                    showLogo={true}
                                />

                                <TextInput
                                    placeholderTextColor="#242424"
                                    placeholderT="#242424"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    style={styles.input}
                                // keyboardType="New password"
                                />
                                <View style={styles.content}>
                                    <Image
                                        source={require('../../assets/images/india-flag.png')}
                                        style={styles.flag}
                                        resizeMode="contain"
                                    />
                                    <TextInput
                                        placeholder="+91"
                                        keyboardType="phone-pad"
                                        style={styles.mob_input}
                                        placeholderTextColor="#242424"
                                        value={phone}
                                        onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                                    />
                                </View>

                                <TextInput
                                    placeholderTextColor="#242424"
                                    placeholderT="#242424"
                                    placeholder="Email id"
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />

                                <TextInput
                                    placeholderTextColor="#242424"
                                    placeholderT="#242424"
                                    placeholder="Password"
                                    style={styles.input}
                                    value={password}
                                    onChangeText={setPassword}
                                    // secureTextEntry
                                />
                            </View>
                            <View style={styles.bottomSection}>

                                <AuthButton text="Sign up" signinText={true} onPress={handleSignUp} onFooterPress={() => navigation.navigate('SignUp')} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </Gradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 48,
    },
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
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#fff',
        borderRadius: 48,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,

        elevation: 4,

        fontSize: 18,
        lineHeight: 28,
        fontWeight: '400',
        // padding: 14,
        paddingVertical: 16,
        paddingLeft: 24,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        height: 60,
        borderColor: '#D1D5DB',
        width: screenWidth - 32,
        marginHorizontal: 'auto',
        marginBottom: 16,
        borderRadius: 48,
        paddingHorizontal: 16,
        // paddingVertical: 10,
        // paddingVertical: 12,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    flag: {
        width: 24,
        height: 18,
        marginRight: 12,
    },
    mob_input: {
        flex: 1,
        lineHeight: 28,
        fontSize: 18,
        fontWeight: 400,
        color: '#242424',
    },
});

export default SignUp;