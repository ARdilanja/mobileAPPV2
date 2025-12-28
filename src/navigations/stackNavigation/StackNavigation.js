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
import SignIn from '../../screens/authentication/SignIn';
import SignUp from '../../screens/authentication/SignUp';
import EmailInput from '../../screens/authentication/EmailInput';
import Password from '../../screens/authentication/Password';
import MobileInput from '../../screens/authentication/MobileInput';
import OtpVerification from '../../screens/authentication/OtpVerification';
import GetStarted from '../../screens/authentication/GetStarted';
import CreatePassword from '../../screens/authentication/CreatePassword';
import JourneyGetStartScreen from '../../screens/authentication/JourneyGetStart';
import NotificationsScreen from '../../screens/NotificationsScreen';
import SubscriptionAgreementScreen from '../../screens/SubscriptionSection';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="LoginLoaderPage">

      {/* 1️⃣ Loader (Initial Screen) */}
      <Stack.Screen
        name="LoginLoaderPage"
        component={LoginLoaderPage}
      />

      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="EmailInput" component={EmailInput} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="MobileInput" component={MobileInput} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} />
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="NotificationScreen" component={NotificationsScreen} />
      <Stack.Screen name="JourneyGetStartScreen" component={JourneyGetStartScreen} />
      <Stack.Screen name="SubscriptionAgreement" component={SubscriptionAgreementScreen} />

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
      <Stack.Screen
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
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{ headerShown: true, headerTitle: 'Delete Account', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="TermsofServiceScreen"
        component={TermsOfServiceScreen}
        options={{ headerShown: true, headerTitle: 'Terms of Service', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SettingsSecurityScreen"
        component={SettingsSecurityScreen}
        options={{ headerShown: true, headerTitle: 'Settings and Security', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{ headerShown: true, headerTitle: 'Recroot', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
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
