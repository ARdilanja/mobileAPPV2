import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions, View , Image} from 'react-native';
import { Fonts } from '../../constants/fonts';

const screenWidth = Dimensions.get("window").width;

const AuthButton = ({ text, onPress, style, icon ,iconWidth = 22,}) => {
  return (
   <TouchableOpacity style={[styles.socialbutton, style]} onPress={onPress}>
      <View style={styles.socialcontent}>
         {icon && (
          <Image
            source={icon}
            style={{ width: iconWidth, height: iconWidth }}
            // resizeMode="contain"
          />
        )}
        <Text style={styles.socialtext}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialbutton: {
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
   
   socialcontent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10, 
  },
  socialtext: {
    color: '#000',
    fontSize: 18,
    lineHeight:28,
    fontWeight: '400',
     fontFamily:Fonts.Regular,
  },
});

export default AuthButton;
