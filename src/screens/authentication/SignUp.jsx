import React, { useEffect, useState } from 'react';
import { TextInput, StyleSheet, Dimensions, View, Image, ScrollView, Alert, Text, StatusBar } from 'react-native';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthButton from '../../components/auth/AuthButton';
import Gradient from '../../constants/Gradient';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import { API_BASE } from '@env';
import MessagePopup from '../../components/MessagePopup';
import { validatePassword, validateEmail } from '../../utils/ValidationHelper'
import { getDeviceCountry } from '../../utils/getDeviceCountry'
const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const SignUp = () => {
    const navigation = useNavigation()
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signupData, setSignupData] = useState(null)
    const [errors, setErrors] = useState({});
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupType, setPopupType] = useState('info');

    const [country, setCountry] = useState({
        code: "IN",
        dialCode: "+91",
        flag: "🇮🇳",
    });
    const showPopup = (message, type = 'info') => {
        setPopupMessage(message);
        setPopupType(type);
        setPopupVisible(true);
    };
    useEffect(() => {
        const deviceCountry = getDeviceCountry();
        console.log("🌍 Device locale detected:", deviceCountry);
        setCountry(deviceCountry);
    }, []);
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
        let newErrors = {};

        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
        }

        if (!email.trim()) {
            newErrors.email = 'Email address is required.';
        } else if (!validateEmail(email)) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else {
            const passwordError = validatePassword(password);
            if (passwordError) {
                newErrors.password = passwordError;
            }
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            Alert.alert('Validation Error', Object.values(newErrors)[0]);
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
                country: country.code,
                dialCode: country.dialCode,
            },
        };
        console.log('payload', payload)
        try {
            const res = await axios.post(
                `${API_BASE}/auth/register`,
                payload
            );


            console.log('res signup', res)
            await AsyncStorage.setItem(
                "userState",
                JSON.stringify({
                    onboarding4Done: false,
                    trialSessionDone: false,
                    planCreated: false,
                    wantsPlan: true,
                    planCompleted: false,
                })
            ); 
            // ✅ Success popup
            Alert.alert(
                'Success',
                'Account created successfully',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            navigation.navigate('OtpVerification', {
                                email,
                                userId: res.data.userID,
                                serverOtp: res.data.referral_code,
                            });
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert(
                'Signup Failed',
                error.response?.data?.message || 'Signup failed. Please try again.'
            );
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <MessagePopup
                visible={popupVisible}
                message={popupMessage}
                type={popupType}
                onClose={() => setPopupVisible(false)}
            />

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
                                    <View style={{ marginBottom: 16 }}>
                                        <TextInput
                                            placeholderTextColor="#242424"
                                            placeholderT="#242424"
                                            placeholder="Full Name"
                                            value={fullName}
                                            onChangeText={(text) => {
                                                setFullName(text);
                                                setErrors(prev => ({ ...prev, fullName: null }));
                                            }}
                                            style={styles.input}
                                        />
                                        {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}
                                    </View>
                                    {/* Mobile number input with country code */}
                                    <View style={{ marginBottom: 16 }}>
                                        {/* <View style={styles.content}>
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
                                                onChangeText={(text) => {
                                                    const clean = text.replace(/[^0-9]/g, '');
                                                    setPhone(clean);
                                                    setErrors(prev => ({ ...prev, phone: null }));
                                                }}
                                                placeholderTextColor="#9CA3AF"
                                            />
                                        </View> */}
                                        <View style={styles.content}>
                                            <Text style={styles.flagEmoji}>{country.flag}</Text>

                                            <View style={styles.countryCodeBox}>
                                                <Text style={styles.countryCodeText}>{country.dialCode}</Text>
                                            </View>

                                            <TextInput
                                                style={styles.mob_input}
                                                keyboardType="phone-pad"
                                                maxLength={15}
                                                value={phone}
                                                // onChangeText={(text) => {
                                                //   const clean = text.replace(/[^0-9]/g, "");
                                                //   setPhone(clean);
                                                //   setErrors(prev => ({ ...prev, phone: null }));
                                                // }}
                                                onChangeText={(text) => {
                                                    const clean = text.replace(/[^0-9]/g, "");
                                                    setPhone(clean);

                                                    console.log("📞 Phone typed:", clean);
                                                    console.log("📞 Country code:", country.dialCode);

                                                    setErrors(prev => ({ ...prev, phone: null }));
                                                }}
                                                placeholder="Phone number"
                                                placeholderTextColor="#9CA3AF"
                                            />
                                        </View>

                                        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                                    </View>

                                    {/* Email input */}
                                    <View style={{ marginBottom: 16 }}><TextInput
                                        placeholderTextColor="#242424"
                                        placeholderT="#242424"
                                        placeholder="Email id"
                                        style={styles.input}
                                        value={email}
                                        onChangeText={(text) => {
                                            setEmail(text);
                                            setErrors(prev => ({ ...prev, email: null }));
                                        }}
                                        keyboardType="email-address"
                                    />
                                        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
                                    </View>
                                    {/* Password input */}
                                    <View style={{ marginBottom: 16 }}><TextInput
                                        placeholderTextColor="#242424"
                                        placeholderT="#242424"
                                        placeholder="Password"
                                        style={styles.input}
                                        value={password}
                                        onChangeText={(text) => {
                                            setPassword(text);
                                            setErrors(prev => ({ ...prev, password: null }));
                                        }}
                                    // secureTextEntry
                                    />
                                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
                                    </View> </View>
                                {/* Bottom signup action section */}
                                <View style={styles.bottomSection}>

                                    <AuthButton text="Sign up" signinText={true} onPress={handleSignUp} onFooterPress={() => navigation.navigate('SignIn')} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Gradient></View>
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
    error: {
        color: 'red',
        fontSize: 14,
        marginLeft: 24,
        // marginBottom: 8,
        fontFamily: Fonts.Regular,
    },

    input: {
        width: screenWidth - 32,
        marginHorizontal: 'auto',
        // marginBottom: 16,
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
        // marginBottom: 16,
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
    flagEmoji: {
        fontSize: 22,
        marginRight: 8,
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