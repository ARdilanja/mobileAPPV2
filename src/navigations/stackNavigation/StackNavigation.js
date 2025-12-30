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
import ChatOnboardingScreen from '../../screens/ChatScreen/ChatOnboardingScreen';
import PracticeStartScreen from '../../screens/practiceInterview/PracticeStartScreen';
import PracticeConversationScreen from '../../screens/practiceInterview/PracticeConversationScreen';
import PracticeInterviewInfoScreen from '../../screens/practiceInterview/PracticeInterviewInfoScreen';
import Home from '../../screens/Home';
// import ProfileTopScreen from '../../screens/topUpdatedrofile/ProfileTopScreen';
import AboutScreen from '../../screens/topUpdatedrofile/AboutScreen';
import TermsScreen from '../../screens/topUpdatedrofile/TermsScreen';
import ProfileFeedbackScreen from '../../screens/topUpdatedrofile/FeedbackScreen';
import SettingsScreen from '../../screens/topUpdatedrofile/SettingsScreen';
import DeleteAccountReasonScreen from '../../screens/topUpdatedrofile/DeleteAccountReasonScreen';
import DeleteAccountConfirmScreen from '../../screens/topUpdatedrofile/DeleteAccountConfirmScreen';
import UpdateProfileScreen from '../../screens/topUpdatedrofile/UpdateProfileScreen';
import PricingScreen from '../../screens/PricingScreen';
import PaymentStatusScreen from '../../screens/PaymentStatusScreen';
import StartDayOne from '../../screens/StartDayOne';
import ProfileTopScreen from '../../screens/topUpdatedrofile/ProfileTopScreen';

// import MyProfile from '../../screens/BottomScreens/MyProfile';

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

      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={{ headerShown: false }} // Disable stack header entirely
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
        options={{ headerShown: true, headerTitle: 'EditProfile', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ChatOnboardingScreen"
        component={ChatOnboardingScreen}
        options={{ headerShown: true, headerTitle: 'ChatOnboardingScreen', headerTitleAlign: 'center' }}
      />
      <Stack.Screen name="startDayOne" component={StartDayOne} options={{ headerShown: false }} />

      <Stack.Screen
        name="EmployerInterviewScreen"
        component={EmployerInterviewScreen}
        options={{ headerShown: true, headerTitle: 'Employer Interviews', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="CompletedInterview"
        component={CompletedInterviewsScreen}

      />
      {/* <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      /> */}
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
        name="PracticeStartScreen"
        component={PracticeStartScreen}
        options={{ headerShown: true, headerTitle: 'Practice Interview', headerTitleAlign: 'center' }}

      />
      <Stack.Screen
        name="PracticeConversationScreen"
        component={PracticeConversationScreen}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: "#0178FF",
          },
          headerTintColor: '#F5F5F5'
        }}
      />
      <Stack.Screen
        name="PracticeInterviewInfoScreen"
        component={PracticeInterviewInfoScreen}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: "#0178FF",
          },
          headerTintColor: '#F5F5F5',
        }}
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
      <Stack.Screen
        name="ProfileTopScreen"
        component={ProfileTopScreen}
        options={{ headerShown: true, headerTitle: 'Employer Interviews', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerShown: false, headerTitle: 'About', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ProfileFeedbackSummar"
        component={ProfileFeedbackScreen}
        options={{ headerShown: false, headerTitle: 'Terms of service', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false, headerTitle: 'Settings', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="DeleteAccountReasonScreen"
        component={DeleteAccountReasonScreen}
        options={{ headerShown: false, headerTitle: 'Settings', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="DeleteAccountConfirmScreen"
        component={DeleteAccountConfirmScreen}
        options={{ headerShown: false, headerTitle: 'Settings', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="PricingScreen"
        component={PricingScreen}
        options={{ headerShown: false, headerTitle: 'Pricing', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="PaymentStatusScreen"
        component={PaymentStatusScreen}
        options={{ headerShown: true, headerTitle: 'PaymentStatusScreen', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{ headerShown: true, headerTitle: 'Your Profile', headerTitleAlign: 'center' }}
      />



    </Stack.Navigator>
  );
};

export default StackNavigation;
