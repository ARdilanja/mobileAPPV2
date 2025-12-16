import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './stackNavigation/StackNavigation'
import DrawerNavigation from '../navigations/drawerNavigation/DrawerNavigation'

const AppNavigation = () => {
    return (
        <NavigationContainer>
           <DrawerNavigation />
        </NavigationContainer>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})