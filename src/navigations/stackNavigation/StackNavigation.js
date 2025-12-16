import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from '../bottomNavigation/BottomNavigation';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomDash"
        component={BottomNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})