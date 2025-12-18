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
import DrawerHeader from '../../components/DrawerHeader';
import Dashboard from '../../screens/Dashboard';
import LiveRoomScreen from '../../screens/LiveRoomScreen';
import MicCheckScreen from '../../screens/MicCheckScreen';
import CameraCheckScreen from '../../screens/CameraCheckScreen';
import InterviewScreen from '../../screens/InterviewScreen';

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

      {/* 5️⃣ Other Screens */}
      <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="EmployerInterviewScreen" component={EmployerInterviewScreen} />
      <Stack.Screen name="CompletedInterviewsScreen" component={CompletedInterviewsScreen} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="MicCheckScreen" component={MicCheckScreen} />
      <Stack.Screen name="CameraCheckScreen" component={CameraCheckScreen} />
      <Stack.Screen name="LiveRoomScreen" component={LiveRoomScreen} />
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
