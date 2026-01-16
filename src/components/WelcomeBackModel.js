import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  Image,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Fonts } from "../constants/fonts";

const { width } = Dimensions.get("window");
const scale = width / 390;

export default function WelcomeBackModel({
  visible,
  icon,
  title,
  content,
  buttonText,
  onPress,
  secondaryButtonText,
  onSecondaryPress,
  onClose,
}) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} />

       <View style={styles.card}>
  <Image
    source={require('../assets/images/rounded-gradient.png')}
    style={styles.gradientImage}
    resizeMode="cover"
  />

  <View style={styles.contentWrapper}>
          {/* Icon bubble */}
           {icon && <Image source={icon} style={styles.icon} />}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>

         <View style={styles.buttonGroup}>
  <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
    <Text style={styles.primaryText}>{buttonText}</Text>
  </TouchableOpacity>

  {secondaryButtonText && (
    <TouchableOpacity
      style={styles.secondaryButton}
      onPress={onSecondaryPress || onClose}
    >
      <Text style={styles.secondaryText}>{secondaryButtonText}</Text>
    </TouchableOpacity>
  )}
</View>

        </View>
      </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
     zIndex: 1,
  },

  card: {
    width: width - (50 * scale),
    borderRadius: 28,
    paddingHorizontal: 16,
    overflow: "hidden", 
    paddingVertical: 20,
    zIndex: 2,
    backgroundColor: "#fff",
  },
gradientImage: {
  position: "absolute",
  top: 0,
  right: 0,
  width: "100%",
  height: "100%",
},

  icon: {
    width: 48 * scale,
    height: 48 * scale,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16 * scale,

  },

  title: {
    fontSize: 18 * scale,
    lineHeight:24 * scale,
   fontFamily:Fonts.Medium,
    color: "#000",
    marginBottom: 12 * scale,
  },

  content: {
 fontSize: 18 * scale,
    lineHeight:24 * scale,
   fontFamily:Fonts.Regular,
      //  color: "#4B5563",
    marginBottom: 24 * scale,
  },

  button: {
    width: '100%',
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 48,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
     fontSize: 18 * scale,
    lineHeight:24 * scale,
   fontFamily:Fonts.Medium,
  },
  buttonGroup: {
  width: "100%",
  gap: 12 * scale,
},

primaryButton: {
  backgroundColor: "#2563EB",
  paddingVertical: 12 * scale,
  borderRadius: 48,
  alignItems: "center",
},

primaryText: {
  color: "#fff",
   fontSize: 18 * scale,
    lineHeight:24 * scale,
   fontFamily:Fonts.Medium,
},

secondaryButton: {
  borderWidth: 1,
  borderColor: "#D5D7DA",
  paddingVertical: 12 * scale,
  borderRadius: 48,
  alignItems: "center",
},

secondaryText: {
  color: "#111827",
   fontSize: 18 * scale,
    lineHeight:24 * scale,
   fontFamily:Fonts.Medium,
},

});
