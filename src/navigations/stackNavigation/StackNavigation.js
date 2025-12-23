// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BottomNavigation from '../bottomNavigation/BottomNavigation';
// import DeleteAccountScreen from '../../screens/DeleteAccountScreen';
// import EditProfileScreen from '../../screens/EditProfileScreen';
// import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
// import CompletedInterviewsScreen from '../../screens/CompletedInterviewsScreen';
// import DrawerHeader from '../../components/DrawerHeader';
// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import MyProfile from '../../screens/BottomScreens/MyProfile';
// import Dashboard from '../../screens/Dashboard';
// import LiveRoomScreen from '../../screens/LiveRoomScreen'
// import MicCheckScreen from '../../screens/MicCheckScreen'
// import CameraCheckScreen from '../../screens/CameraCheckScreen'
// import InterviewScreen from '../../screens/InterviewScreen';


// const Stack = createNativeStackNavigator();

// const StackNavigation = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="BottomDash"
//         component={BottomNavigation}
//         options={({ route }) => {
//           const routeName =
//             getFocusedRouteNameFromRoute(route) ?? 'Bottom';

//           const isHome = routeName === 'Bottom';

//           return {
//             headerShown: isHome,
//             headerTitle: '',
//             headerLeft: isHome ? () => <DrawerHeader /> : undefined,
//           };
//         }}
//       />
//       <Stack.Screen
//         name="DeleteAccountScreen"
//         component={DeleteAccountScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="EditProfileScreen"
//         component={EditProfileScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="EmployerInterviewScreen"
//         component={EmployerInterviewScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CompletedInterviewsScreen"
//         component={CompletedInterviewsScreen}
//       />
//       <Stack.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="MicCheckScreen"
//         component={MicCheckScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="CameraCheckScreen"
//         component={CameraCheckScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="LiveRoomScreen"
//         component={LiveRoomScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="InterviewScreen"
//         component={InterviewScreen}
//         options={{ headerShown: true,
//         headerTitle:"Interview Report",
//         headerTitleAlign:'center' }}
//       />
//     </Stack.Navigator>
//   )
// }

// export default StackNavigation

// const styles = StyleSheet.create({})



// src/navigations/stackNavigation/StackNavigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import LoginLoaderPage from '../../screens/LoginLoaderPage';
import LoginScreen from '../../screens/auth/LoginScreen';
import SignupFlowScreen from '../../screens/auth/SignupFlowScreen';

import BottomNavigation from '../bottomNavigation/BottomNavigation';
import DeleteAccountScreen from '../../screens/DeleteAccountScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
import CompletedInterviewsScreen from '../../screens/CompletedInterviewsScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';
import DrawerHeader from '../../components/DrawerHeader';
import Dashboard from '../../screens/Dashboard';
import LiveRoomScreen from '../../screens/LiveRoomScreen';
import MicCheckScreen from '../../screens/MicCheckScreen';
import CameraCheckScreen from '../../screens/CameraCheckScreen';
import InterviewScreen from '../../screens/InterviewScreen';
import CreateRoomScreen from '../../screens/CreateRoomScreen';
import VerificationScreen from '../../screens/auth/VerificationScreen';
import TermsOfServiceScreen from '../../screens/TermsOfServiceScreen';
import SettingsSecurityScreen from '../../screens/SettingsSecurityScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* 1️⃣ Loader (Initial Screen) */}
      <Stack.Screen
        name="LoginLoaderPage"
        component={LoginLoaderPage}
      />

      {/* 2️⃣ Login */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        name="VerificationScreen"
        component={VerificationScreen}
      />

      {/* 3️⃣ Signup */}
      <Stack.Screen
        name="Signup"
        component={SignupFlowScreen}
      />

      {/* 4️⃣ Bottom Tabs */}
      {/* <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? 'Bottom';

          const isHome = routeName === 'Bottom';

          return {
            headerShown: isHome,
            headerTitle: '',
            headerLeft: isHome ? () => <DrawerHeader /> : undefined,
          };
        }}
      /> */}

      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={{ headerShown: false }} // Disable stack header entirely
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{ headerShown: true, headerTitle: 'Delete Account', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="TermsofServiceScreen"
        component={TermsOfServiceScreen}
        options={{ headerShown: true, headerTitle: 'Terms of Service', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="SettingsSecurityScreen"
        component={SettingsSecurityScreen}
        options={{ headerShown: true, headerTitle: 'Settings and Security', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{ headerShown: true, headerTitle: 'Recroot', headerTitleAlign: 'center'}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EmployerInterviewScreen"
        component={EmployerInterviewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CompletedInterview"
        component={CompletedInterviewsScreen}

      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRoomScreen"
        component={CreateRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MicCheckScreen"
        component={MicCheckScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraCheckScreen"
        component={CameraCheckScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LiveRoomScreen"
        component={LiveRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InterviewScreen"
        component={InterviewScreen}
        options={{
          headerShown: true,
          headerTitle: 'Interview Report',
          headerTitleAlign: 'center',
        }}
      />

    </Stack.Navigator>
  );
};

export default StackNavigation;
