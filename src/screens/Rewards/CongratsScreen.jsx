import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  StatusBar,
} from 'react-native';
import { Dimensions } from 'react-native';
import { Fonts } from '../../constants/fonts';
import GiftScreenGradient from '../../constants/GiftScreenGradient';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function CongratsScreen() {
  const navigation = useNavigation();

  //  STATUS BAR RESET WHEN SCREEN IS FOCUSED
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []),
  );

  return (
    <GiftScreenGradient>
    <View style={styles.container}>
      {/* Trophy Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/trophy-grped-img.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.subtitle}>You earned 5 points</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('RewardUnlockedScreen')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
    </GiftScreenGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32 * scale,
  },

  imageWrapper: {
    width: 392 * scale,
    height: 370 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 38 * scale,
    marginBottom: 24 * scale,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
    marginTop: 10 * scale,
  },
  title: {
    fontSize: 32 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 48 * scale,
    color: '#000',
    marginBottom: 16 * scale,
  },

  subtitle: {
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
    color: '#000',
  },

  button: {
    width: width - 16 * scale,
    height: 56 * scale,
    borderRadius: 48 * scale,
    backgroundColor: '#2F5BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16 * scale,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
    lineHeight: 24 * scale,
  },
});
