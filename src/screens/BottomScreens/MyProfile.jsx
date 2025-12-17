import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MyProfile = ({navigation}) => {
  return (
    <View>
      <TouchableOpacity onPress={() =>{navigation.navigate('Dashboard')}}>
        <Text>Saamyy</Text> 
      </TouchableOpacity>
    </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({})