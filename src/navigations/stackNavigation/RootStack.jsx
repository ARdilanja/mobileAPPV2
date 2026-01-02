
// // // src/navigations/stackNavigation/RootStack.js
// // import React from 'react';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // import LoginLoaderPage from '../../screens/LoginLoaderPage';
// // import LoginScreen from '../../screens/auth/LoginScreen';
// // import SignupFlowScreen from '../../screens/auth/SignupFlowScreen';

// // import BottomNavigation from '../bottomNavigation/BottomNavigation';

// // // FULLSCREEN (NO TAB)
// // import LiveRoomScreen from '../../screens/LiveRoomScreen';
// // import MicCheckScreen from '../../screens/MicCheckScreen';
// // import CameraCheckScreen from '../../screens/CameraCheckScreen';
// // import InterviewScreen from '../../screens/InterviewScreen';

// // const Stack = createNativeStackNavigator();

// // export default function RootStack() {
// //     return (
// //         <Stack.Navigator screenOptions={{ headerShown: false }}>

// //             {/* AUTH FLOW */}
// //             <Stack.Screen name="LoginLoaderPage" component={LoginLoaderPage} />
// //             <Stack.Screen name="Login" component={LoginScreen} />
// //             <Stack.Screen name="Signup" component={SignupFlowScreen} />

// //             {/* MAIN APP (TABS) */}
// //             <Stack.Screen name="MainTabs" component={BottomNavigation} />

// //             {/* FULLSCREEN FLOW (NO TABS) */}
// //             <Stack.Screen name="MicCheckScreen" component={MicCheckScreen} />
// //             <Stack.Screen name="CameraCheckScreen" component={CameraCheckScreen} />
// //             <Stack.Screen name="LiveRoomScreen" component={LiveRoomScreen} />
// //             <Stack.Screen
// //                 name="InterviewScreen"
// //                 component={InterviewScreen}
// //                 options={{ headerShown: true, headerTitle: 'Interview Report' }}
// //             />

// //         </Stack.Navigator>
// //     );
// // }



// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import LoginLoaderPage from '../../screens/LoginLoaderPage';
// import LoginScreen from '../../screens/auth/LoginScreen';
// import SignupFlowScreen from '../../screens/auth/SignupFlowScreen';
// import SignIn from '../../screens/authentication/SignIn';

// import BottomNavigation from '../bottomNavigation/BottomNavigation';

// const Stack = createNativeStackNavigator();

// export default function RootStack() {
//     return (
//         <Stack.Navigator
//             screenOptions={{ headerShown: false }}
//             initialRouteName="SignIn"   // 🔥 FORCE sign-in for now
//         >
//             {/* AUTH */}
//             <Stack.Screen name="SignIn" component={SignIn} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//             <Stack.Screen name="Signup" component={SignupFlowScreen} />

//             {/* MAIN APP */}
//             <Stack.Screen name="MainTabs" component={BottomNavigation} />

//         </Stack.Navigator>
//     );
// }
