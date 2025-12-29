import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View , Image} from 'react-native';

const screenWidth = Dimensions.get("window").width;

const AuthButton = ({ text, onPress, style, icon ,iconWidth = 22,}) => {
  return (
   <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.content}>
         {icon && (
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconWidth }}
            // resizeMode="contain"
          />
        )}
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 48,
    paddingVertical: 14,
    // paddingHorizontal: 16,
    width: screenWidth - 32,
    marginHorizontal: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
    marginTop: 16,
  },
   
   content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10, 
  },
  text: {
    color: '#000',
    fontSize: 18,
    lineHeight:28,
    fontWeight: '400',
  },
});

export default AuthButton;
