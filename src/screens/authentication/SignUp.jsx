import React, { useState } from 'react';
import { TextInput, StyleSheet, Dimensions, View, Image, ScrollView, Alert, Text, StatusBar } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const SignUp = () => {
    const navigation = useNavigation()
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupData, setSignupData] = useState(null)


    // Handle signup API call
    // const handleSignUp = async () => {
    //     if (!fullName || !phone || !email || !password) {
    //         Alert.alert(
    //             'Missing Details',
    //             'Please fill all the fields'
    //         );
    //         return;
    //     }
    //     const payload = {
    //         email: email,
    //         firstName: fullName,
    //         lastName: '',
    //         password: password,
    //         phone: phone,
    //         recrootUserType: 'Candidate',
    //         country: 'in',
    //     };
    //     try {
    //         const response = await axios.post(
    //             'https://api.arinnovate.io/auth/register',
    //             payload
    //         );
    //         setSignupData(response.data)

    //         Alert.alert(
    //             'Success',
    //             'Signup successful. Please verify OTP.',
    //             [
    //                 {
    //                     text: 'OK',
    //                     onPress: () =>
    //                         navigation.navigate('OtpVerification', {
    //                             email,
    //                             phone,
    //                             serverOtp: response.data.referral_code,
    //                             otpType: 'email',
    //                         }),
    //                 },
    //             ]
    //         );
    //     } catch (error) {
    //         const errorMsg =
    //             error.response?.data?.message ||
    //             'Something went wrong. Please try again.';

    //         Alert.alert('Signup Failed', errorMsg);
    //     }
    // };
    const handleSignUp = async () => {
        if (!fullName || !phone || !email || !password) {
            Alert.alert('Missing Details', 'Please fill all the fields');
            return;
        }

        const payload = {
            firstName: fullName,
            lastName: 'Test',
            email,
            phone,
            password,
            recrootUserType: 'Candidate',
            countryDetails: {
                country: 'India',
                dialCode: '+91',
            },
        };
        console.log('payload', payload)
        try {
            const res = await axios.post(
                'http://192.168.0.7:3000/api/auth/register',
                payload
            );

            console.log('res signup', res)

            Alert.alert('Success', 'OTP sent to your email', [
                {
                    text: 'OK',
                    onPress: () =>
                        navigation.navigate('OtpVerification', {
                            email,
                            userId: res.data.userID,
                            serverOtp: res.data.referral_code,
                        }),
                },
            ]);
        } catch (error) {
            Alert.alert(
                'Signup Failed',
                error.response?.data?.message || 'Something went wrong'
            );
        }
    };


    return (
        <Gradient>
            <StatusBar barStyle="dark-content" backgroundColor="transparent"
                translucent={true} />
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

                            {/* Signup form section */}
                            <View style={styles.topSection}>

                                <AuthHeader title="Sign up"
                                    subtitle="Sign up and own your career journey"
                                    showBack={true}
                                    showLogo={true}
                                />

                                {/* Full name input */}
                                <TextInput
                                    placeholderTextColor="#242424"
                                    placeholderT="#242424"
                                    placeholder="Full Name"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    style={styles.input}
                                />

                                {/* Mobile number input with country code */}
                                <View style={styles.content}>
                                    <Image
                                        source={require('../../assets/images/india-flag.png')}
                                        style={styles.flag}
                                        resizeMode="contain"
                                    />

                                    <View style={styles.countryCodeBox}>
                                        <Text style={styles.countryCodeText}>+91</Text>
                                    </View>

                                    <TextInput
                                        style={styles.mob_input}
                                        keyboardType="phone-pad"
                                        maxLength={10}
                                        value={phone}
                                        onChangeText={(text) =>
                                            setPhone(text.replace(/[^0-9]/g, ''))
                                        }
                                        placeholderTextColor="#9CA3AF"
                                    />
                                </View>

                                {/* Email input */}
                                <TextInput
                                    placeholderTextColor="#242424"
                                    placeholderT="#242424"
                                    placeholder="Email id"
                                    style={styles.input}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                />


                                {/* Password input */}
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
                            {/* Bottom signup action section */}
                            <View style={styles.bottomSection}>

                                <AuthButton text="Sign up" signinText={true} onPress={handleSignUp} onFooterPress={() => navigation.navigate('SignIn')} />
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    },
    topSection: {
        flex: 1,
    },
    bottomSection: {
        marginBottom: 60,
        alignItems: 'center',
    },
    countryCodeBox: {
        marginRight: 8 * scale,
    },
    countryCodeText: {
        fontSize: 18 * scale,
        lineHeight: 28,
        fontFamily: Fonts.Regular,
        color: '#242424',
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

        fontSize: 18 * scale,
        lineHeight: 28 * scale,
        fontFamily: Fonts.Regular,
        color: '#242424',
        paddingLeft: 24 * scale,
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