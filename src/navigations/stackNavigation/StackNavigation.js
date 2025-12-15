import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabScreen from '../../screens/TabScreen';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name='TabScreen'
            component={TabScreen}
        />
    </Stack.Navigator>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})