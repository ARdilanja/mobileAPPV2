// import React from 'react';
// import {
//     View,
//     Text,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
// } from 'react-native';
// import { DrawerContentScrollView } from '@react-navigation/drawer';

// const CustomDrawerContent = ({ navigation }) => {
//     return (
//         <DrawerContentScrollView contentContainerStyle={styles.container}>

//             {/* 🔵 TOP IMAGE SECTION */}
//             <View style={styles.header}>
//                 <Image
//                     source={require('../assets/images/profile.png')} // your image
//                     style={styles.profileImage}
//                 />
//                 <Text style={styles.name}>Kaviyarasan</Text>
//                 <Text style={styles.subText}>Digital Marketing</Text>
//             </View>

//             {/* 🔵 MENU ITEMS */}
//             <TouchableOpacity
//                 style={styles.item}
//                 onPress={() => {
//                     navigation.closeDrawer();
//                     navigation.navigate('MainApp', {
//                         screen: 'DeleteAccountScreen',
//                     });
//                 }}
//             >
//                 <Text style={styles.itemText}>Delete Account</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={styles.item}
//                 onPress={() => navigation.navigate('StartInterview')}
//             >
//                 <Text style={styles.itemText}>Start Interview</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={styles.item}
//                 onPress={() => navigation.navigate('CompletedInterview')}
//             >
//                 <Text style={styles.itemText}>Completed Interview</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={styles.item}
//                 onPress={() => navigation.navigate('MyProfile')}
//             >
//                 <Text style={styles.itemText}>My Profile</Text>
//             </TouchableOpacity>

//         </DrawerContentScrollView>
//     );
// };

// export default CustomDrawerContent;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },

//     header: {
//         paddingVertical: 30,
//         alignItems: 'center',
//         backgroundColor: '#2563EB',
//         marginBottom: 20,
//     },

//     profileImage: {
//         width: 80,
//         height: 80,
//         borderRadius: 50,
//         marginBottom: 10,
//         borderWidth: 2,
//         borderColor: '#fff',
//     },

//     name: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },

//     subText: {
//         color: '#E5E7EB',
//         fontSize: 12,
//         marginTop: 2,
//     },

//     item: {
//         paddingVertical: 14,
//         paddingHorizontal: 20,
//     },

//     itemText: {
//         fontSize: 14,
//         color: '#111827',
//     },
// });



import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Fonts } from '../constants/fonts';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
const CustomDrawerContent = ({ navigation }) => {
    const [interviewData, setInterviewData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);
const [candidateId, setCandidateId] = useState(null);

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjY4Yjg0M2RlYzY1ODg0ZjMxYzU0MjUyIiwiZW1haWwiOiJnb3BhbC5kaGFnZTU0QGdtYWlsLmNvbSIsImlhdCI6MTc2NjEyNTY4MSwiZXhwIjoxNzY2MjEyMDgxfQ.GOKZhwTgH4NM9JSmbm8ybe54gmajh9w-gEM0Aej981k'
//     const CANDIDATE_ID = '6672592aa821dc12db9fc26e'
// const USER_API = 'https://api.arinnovate.io/getUser/668b843dec65884f31c54252';

useEffect(() => {
  loadAuth();
}, []);

const loadAuth = async () => {
  try {
    const storedToken = await AsyncStorage.getItem("token");
    const storedUser = await AsyncStorage.getItem("user");

    if (!storedToken || !storedUser) return;

    const user = JSON.parse(storedUser);

    setToken(storedToken);
    setCandidateId(user?._id);

    fetchUser(user?._id, storedToken);
    fetchInterviewDetails(user?._id, storedToken);

  } catch (e) {
    console.log("Auth load error", e);
  }
};

 const fetchInterviewDetails = async (userId, token) => {
  if (!userId || !token) return;

  try {
    const response = await axios.post(
      "https://api.arinnovate.io/api/getStudentDetailsInterview",
      { id: userId },
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    setInterviewData(response.data);
  } catch (error) {
    console.log("Interview error", error);
  }
};

    const fetchUser = async (userId, token) => {
  if (!userId || !token) return;

  setIsLoading(true);
  try {
    const res = await fetch(
      `https://api.arinnovate.io/getUser/${userId}`,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
      }
    );

    // 🔴 important safety check
    const text = await res.text();

    // If HTML came, log it
    if (text.startsWith("<")) {
      console.log("HTML response instead of JSON:", text);
      return;
    }

    const json = JSON.parse(text);
    console.log("User JSON:", json);

    if (json?.success && json?.User) {
      setUserData(json.User);
    }

  } catch (err) {
    console.log("Fetch user error:", err);
  } finally {
    setIsLoading(false);
  }
};


    const logout = async () => {
  await AsyncStorage.multiRemove(["token", "refreshToken", "user"]);
  navigation.replace("Login");
};
    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>

            {/* 🔵 PROFILE SECTION */}
            <View style={styles.profileSection}>
                <Image
                    source={require('../assets/icons/profile-icon.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>{userData?.firstName} {userData?.lastName}</Text>
                <Text style={styles.role}>{userData?.newExperience[0]?.job_title}</Text>

                {/* 🔵 STATS */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <View style={styles.statCircle}>
                            <Text style={styles.statNumber}>{interviewData?.completedInterviews || 0}</Text>
                        </View>
                        <Text style={styles.statLabel}>Invited Interviews</Text>
                    </View>

                    <View style={styles.statItem}>
                        <View style={styles.statCircle}>
                            <Text style={styles.statNumber}>{interviewData?.completedInterviews || 0}</Text>
                        </View>
                        <Text style={styles.statLabel}>Completed Interviews</Text>
                    </View>

                    <View style={styles.statItem}>
                        <View style={styles.statCircle}>
                            <Text style={styles.statNumber}>{interviewData?.availableInterviews || 0}</Text>
                        </View>
                        <Text style={styles.statLabel}>Available</Text>
                    </View>
                </View>
            </View>

            {/* 🔵 MENU */}
            <View style={styles.menuSection}>
                <DrawerItem
                    icon={require('../assets/icons/unknown-user.png')}
                    label="Profile"
                    onPress={() => navigation.navigate('MyProfile')}
                />

                <DrawerItem
                    icon={require('../assets/icons/interview.png')}
                    label="Interviews"
                    onPress={() => navigation.navigate('MainApp', {
                        screen: 'CreateRoomScreen',
                    })}
                />

                <DrawerItem
                    icon={require('../assets/icons/chat.png')}
                    label="Chat"
                    onPress={() => navigation.navigate('Chat')}
                />
            </View>

            {/* 🔵 FOOTER */}
            <View style={styles.footer}>
                <FooterItem
                    label="Settings & Security"
                     onPress={() => navigation.navigate('MainApp', {
                        screen: 'SettingsSecurityScreen',
                    })}
                />
                <FooterItem
                    label="Terms of Service"
                     onPress={() => navigation.navigate('MainApp', {
                        screen: 'TermsofServiceScreen',
                    })}
                />
                <FooterItem
                    label="Delete My Account"
                    // danger
                    onPress={() => navigation.navigate('MainApp', {
                        screen: 'DeleteAccountScreen',
                    })}
                />
                <FooterItem
                    label="Feedback"
                    // danger
                    onPress={() => navigation.navigate('MainApp', {
                        screen: 'FeedbackScreen',
                    })}
                />
            </View>

            {/* 🔵 LOGOUT */}
            <TouchableOpacity style={styles.logout} onPress={logout}>
                <Image
                    source={require('../assets/icons/logout.png')}
                    style={styles.logoutIcon}
                />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

/* 🔵 REUSABLE COMPONENTS */
const DrawerItem = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
        <Image source={icon} style={styles.menuIcon} />
        <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
);

const FooterItem = ({ label, onPress, danger }) => (
    <TouchableOpacity style={styles.footerItem} onPress={onPress}>
        <Text style={[styles.menuText, danger && { color: '#DC2626' }]}>
            {label}
        </Text>
    </TouchableOpacity>
);

/* 🔵 STYLES */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    profileSection: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        alignItems: 'left',
        borderBottomWidth: 1,
        borderColor: '#EDEFEF',
    },

    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 35,
        marginBottom: 10,
    },

    name: {
        fontSize: 16,
        lineHeight: 26,
        fontFamily: Fonts.SemiBold,
        // fontWeight: '600',
        color: '#111827',
    },

    role: {
        fontSize: 14,
        lineHeight: 26,
        fontFamily: Fonts.Bold,
        color: '#5C6363',
        marginTop: 2,
    },

    statsRow: {
        flexDirection: 'row',
        marginTop: 20,
        // paddingHorizontal: 10,
    },

    statItem: {
        alignItems: 'center',
        marginHorizontal: 10,
        width: 80,
    },

    statCircle: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        backgroundColor: '#115CC7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 6,
    },

    statNumber: {
        color: '#fff',
        fontSize: 16,
        fontFamily: Fonts.Bold,
        lineHeight: 22,
    },

    statLabel: {
        fontSize: 13,
        fontFamily: Fonts.Regular,
        lineHeight: 22,
        textAlign: 'center',
        color: '#374151',
    },

    menuSection: {
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderColor: '#EDEFEF',
    },

    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        paddingHorizontal: 20,
    },

    menuIcon: {
        width: 24,
        height: 24,
        marginRight: 14,
        resizeMode: 'contain',
    },

    menuText: {
        fontSize: 16,
        fontFamily: Fonts.Regular,
        lineHeight: 26,
        color: '#111827',
    },

    footer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },

    footerItem: {
        paddingVertical: 12,
    },

    footerText: {
        fontSize: 13,
        color: '#374151',
    },

    logout: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginTop: 'auto',
        borderTopWidth: 1,
        borderColor: '#EDEFEF',
    },

    logoutIcon: {
        width: 18,
        height: 18,
        marginRight: 10,
    },

    logoutText: {
        fontSize: 14,
        color: '#111827',
        fontWeight: '500',
    },
});
