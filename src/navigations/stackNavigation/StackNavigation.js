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
import LiveRoomScreen from '../../screens/LiveRoomScreen'
import MicCheckScreen from '../../screens/MicCheckScreen'
import CameraCheckScreen from '../../screens/CameraCheckScreen'
import InterviewScreen from '../../screens/InterviewScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
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
        options={{ headerShown: false }}
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
        name="Dashboard"
        component={Dashboard}
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
        options={{ headerShown: true,
        headerTitleAlign:'center' }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})