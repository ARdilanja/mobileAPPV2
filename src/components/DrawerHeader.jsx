import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = require('../assets/images/burger-menu.png');

const DrawerHeader = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.openDrawer()}
      style={styles.container}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Image
        source={Menu}
        resizeMode="contain"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  icon: {
    width: 22,
    height: 22,
  },
});
