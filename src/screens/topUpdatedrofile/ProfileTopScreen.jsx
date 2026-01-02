import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BoostOfferCard from '../../components/BoostOfferCard';
import MoreSection from '../../components/MoreSection';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import Header from '../../components/Header';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function ProfileTopScreen() {
  const navigation = useNavigation()

  useFocusEffect(
      useCallback(() => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }, []),
    );
  
  return (
    <View style={styles.wrapper}>
    <StatusBar  barStyle="dark-content" backgroundColor="#F6F6F6" />
    <Header title="Profile" />
      <View style={{ alignItems: 'center' }}>
        <View style={styles.topCard}>
          <Image
            source={require('../../assets/images/bardge_bg.png')}
            style={styles.goldBg}
            resizeMode="contain"
          />

          <View style={styles.profileRow}>
            <Image
              source={require('../../assets/images/profile_update.png')}
              style={styles.profileImage}
            />

            <View style={styles.profileText}>
              <Text style={styles.name}>Claire henry</Text>
              <Text style={styles.email}>clairehenry@gmail.com</Text>
              <Text style={styles.editprofile} onPress={() => navigation.navigate('UpdateProfileScreen')}>Edit Profile</Text>
            </View>

            <Image
              source={require('../../assets/images/batch.png')}
              style={styles.batchImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.bottomSection}>
          <View style={styles.premiumRow}>
            <View style={styles.premiumLeft}>
              <LinearGradient
                colors={['#966F30', '#FFE6B8', '#966F30']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.premiumIcon}
              />

              <Text style={styles.premiumText}>Premium plan</Text>
            </View>

            <View style={styles.renewBadge}>
              <Text style={styles.renewText}>Renews 31/12/2025</Text>
            </View>

            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('PricingScreen')}>
              <Image
                source={require('../../assets/images/Arrow-icon.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </View>

      <BoostOfferCard />
      <MoreSection />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // paddingTop: 20,
  },

  topCard: {
    width: width - 35,
    height: 170 * scale,
    backgroundColor: '#202126',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    overflow: 'hidden',
  },

  goldBg: {
    position: 'absolute',
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileImage: {
    width: 48 * scale,
    height: 48 * scale,
    borderRadius: 24 * scale,
  },

  batchImage: {
    width: 98 * scale,
    height: 71 * scale,
  },

  profileText: {
    flex: 1,
    marginLeft: 12,
    lineHeight:20
  },

  name: {
    fontSize: 18 * scale,
    fontWeight: '500',
    color: '#FFFFFF',
    fontFamily:Fonts.Medium
  },

  email: {
    fontSize: 14 * scale,
    color: '#FFFFFF',
    marginTop: 2,
    fontFamily:Fonts.Regular,
    fontWeight:400
  },
  editprofile: {
    fontSize: 14,
    color: '#ffffff',
    paddingVertical: 3,
    fontFamily:Fonts.Medium,
    fontWeight:500
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 14,
    marginHorizontal: -12,
  },

  bottomSection: {
  flex: 1,                     
  justifyContent: 'center',    
},

premiumRow: {
  flexDirection: 'row',
  alignItems: 'center',       
  justifyContent: 'space-between',
},
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },

  premiumIcon: {
    width: 24 * scale,
    height: 24 * scale,
    borderRadius: 12 * scale,
  },

  premiumText: {
    fontSize: 14 * scale,
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight:500,
    fontFamily:Fonts.Medium
  },

  renewBadge: {
    height: 32 * scale,
    paddingHorizontal: 12,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#F9EAD2',
    backgroundColor: '#827157',
    justifyContent: 'center',
    alignItems: 'center',
  },

  renewText: {
    fontSize: 12 * scale,
    color: '#FFFFFF',
  },

  arrowIcon: {
    width: 14 * scale,
    height: 14 * scale,
    marginLeft: 6,
  },
});
