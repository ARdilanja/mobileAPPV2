import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from '../bottomNavigation/BottomNavigation';
import DeleteAccountScreen from '../../screens/DeleteAccountScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={{ headerShown: false }}
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
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})