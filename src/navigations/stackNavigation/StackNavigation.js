import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from '../bottomNavigation/BottomNavigation';
import DeleteAccountScreen from '../../screens/DeleteAccountScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
import CompletedInterviewsScreen from '../../screens/CompletedInterviewsScreen';
import DrawerHeader from '../../components/DrawerHeader';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import MyProfile from '../../screens/BottomScreens/MyProfile';
import Dashboard from '../../screens/Dashboard';
import InterviewScreen from '../../screens/InterviewScreen';
import ProfileHeader from '../../components/ProfileHeader';
import MicCheckScreen from '../../components/Livekit/MicCheckScreen'
import CameraCheckScreen from '../../components/Livekit/CameraCheckScreen'


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? "Bottom";

          const isHome = routeName === "Bottom";

          return {
            headerShown: isHome,
            headerTitle: "Dashboard",          // ✅ CENTER TITLE
            headerTitleAlign: "center",         // ✅ FORCE CENTER
            headerLeft: isHome ? () => <DrawerHeader /> : undefined,
            headerRight: isHome ? () => <ProfileHeader /> : undefined,
          };
        }}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{ headerShown: true, 
        headerTitle:'Delete My Account',
        headerTitleAlign: "center"}}
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
        name="CompletedInterviewsScreen"
        component={CompletedInterviewsScreen}
      />
      <Stack.Screen
        name="MicCheckScreen"
        component={MicCheckScreen}
      />
      <Stack.Screen
        name="CameraCheckScreen"
        component={CameraCheckScreen}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: true,
          headerTitle: "Dashboard"
        }}
      />
      <Stack.Screen
        name="InterviewScreen"
        component={InterviewScreen}
        options={{
          headerShown: true,
          headerTitle: "Report",
          headerTitleAlign: "center"
        }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})