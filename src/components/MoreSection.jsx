import { useNavigation, CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function MoreSection() {
  const navigation = useNavigation();
  const [showLogout, setShowLogout] = React.useState(false);

  const handleLogout = async () => {
   
    await AsyncStorage.clear(); 
    console.log('cleared all');
    setShowLogout(false);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>More</Text>


        <MoreItem
          text="Send feedback"
          icon={require('../assets/images/feedback-alt.png')}
          // onPress={() => navigation.navigate('ProfileFeedbackSummar')}
          onPress={() => navigation.navigate('FeedbackScreen')}
        />

        <Divider />

        <MoreItem
          text="About"
          icon={require('../assets/images/info.png')}
          onPress={() => navigation.navigate('AboutScreen')}
        />

        <Divider />
        <MoreItem
          text="Invoice"
          icon={require('../assets/images/terms-check.png')}
          onPress={() => navigation.navigate('SpeakInMeetingsScreen')}
        />

        <Divider />

        <MoreItem
          text="Settings"
          icon={require('../assets/images/settings.png')}
          onPress={() => navigation.navigate('SettingsScreen')}
        />

        <Divider />

        <MoreItem
          text="Log out"
          icon={require('../assets/images/power.png')}
          onPress={() => setShowLogout(true)}
          isLogout
        />
      </View>

      {/* Logout Modal */}
      <Modal
        visible={showLogout}
        transparent
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Log out?</Text>
            <View style={styles.divider} />

            <TouchableOpacity style={styles.actionBtn} onPress={handleLogout}>
              <Text style={styles.yesText}>Yes</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setShowLogout(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MoreItem = ({ text, onPress, icon, isLogout }) => (
  <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.leftRow}>
      <Image source={icon} style={styles.leftIcon} />
      <Text style={[styles.rowText, isLogout && styles.logoutText]}>
        {text}
      </Text>
    </View>

    <Image
      source={require('../assets/images/Arrow_3.png')}
      style={styles.arrow}
    />
  </TouchableOpacity>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 18 * scale,
    fontWeight: '500',
    color: '#000',
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#2F80ED',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 0,
    shadowColor: 'transparent',
    elevation: 0,
    paddingTop: 20,
    width: width - 35,

  },

  row: {
    height: 54 * scale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,

  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  leftIcon: {
    width: 18 * scale,
    height: 18 * scale,
    marginRight: 12,
    resizeMode: 'contain',
  },

  rowText: {
    fontSize: 14 * scale,
    color: '#000',
  },

  logoutText: {
    color: '#000',
  },

  arrow: {
    width: 10,
    height: 14,
  },

  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginHorizontal: 0,
    width: "90%",
    alignSelf: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: width - 80,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    paddingHorizontal: 16,
    marginBottom: 12,
    textAlign: 'center',
  },

  actionBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },

  yesText: {
    fontSize: 15,
    color: '#0178FF',
    fontWeight: '600',
  },

  cancelText: {
    fontSize: 15,
    color: '#000',
  },
});
