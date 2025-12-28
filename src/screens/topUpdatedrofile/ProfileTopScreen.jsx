import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BoostOfferCard from '../../components/BoostOfferCard';
import MoreSection from '../../components/MoreSection';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function ProfileTopScreen() {
  return (
    <View style={styles.wrapper}>
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
              <Text style={styles.editprofile}>Edit Profile</Text>
            </View>

            <Image
              source={require('../../assets/images/batch.png')}
              style={styles.batchImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.divider} />

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

            <TouchableOpacity activeOpacity={0.7}>
              <Image
                source={require('../../assets/images/Arrow-icon.png')}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
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
    paddingTop: 20,
  },

  topCard: {
    width: width - 32,
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
  },

  name: {
    fontSize: 18 * scale,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  email: {
    fontSize: 14 * scale,
    color: '#A1A1A1',
    marginTop: 2,
  },
  editprofile: {
    fontSize: 14,
    color: '#ffffff',
    paddingVertical: 3,
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 14,
  },

  premiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
