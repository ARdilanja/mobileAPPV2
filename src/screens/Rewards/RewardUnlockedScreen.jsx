import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import GiftScreenGradient from '../../constants/GiftScreenGradient';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function RewardUnlockedScreen() {
  const navigation = useNavigation();

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
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/images/gift_Box_reward.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Reward Unlocked!</Text>
          <Text style={styles.subtitle}>Disagreeing with Authority</Text>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('BadgesEarnedScreen')}
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
    width: 320 * scale,
    height: 320 * scale,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 68 * scale,
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
