import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import PracticeTitle from './PracticeTitle';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import Header from '../../components/Header';

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const JDInputScreen = () => {
  const navigation = useNavigation();
  const [jobDesc, setJobDesc] = useState('');

  const handleNext = () => {
    navigation.navigate('PracticeRequiredSkills', { jobDesc });
  };

  return (
    <>

    <View style={styles.container}>
      
                <Header title="Practice interviews" showNotification={true}/>

      {/* Top Spacer */}
      <View style={{ flex: 1 }} />

      {/* Center Title */}
      <PracticeTitle
        title="Copy paste the job description, or just enter the job role and experience."
      />

      {/* Middle Spacer */}
      <View style={{ flex: 1 }} />

      {/* Bottom Section */}
      <View style={styles.bottomWrapper}>

        {/* Info Banner */}
        {jobDesc.trim().length === 0 && (
          <View style={styles.infoBox}>
            <Image
              source={require('../../assets/icons/warning-icon.png')}
              style={styles.infoIcon}
            />
            <Text style={styles.infoText}>
              You can copy paste the full job description, or just enter the job role.
            </Text>
          </View>
        )}

        {/* Chat Input Card */}
        <View style={styles.chatCard}>
          <TextInput
            placeholder="Type here..."
            value={jobDesc}
            onChangeText={setJobDesc}
            multiline
            style={styles.chatInput}
            placeholderTextColor="#9CA3AF"
          />

          <View style={styles.divider} />

          <View style={styles.chatActions}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/icons/circle-microphone.png')}
                style={styles.chatIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleNext}
              disabled={jobDesc.trim().length === 0}
            >
              <Image
                source={
                  jobDesc.trim().length === 0
                    ? require('../../assets/icons/arrow-circle-up.png')
                    : require('../../assets/icons/arrow-circle-up-active.png')
                }
                style={styles.chatIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </View>
</>
  );
};

export default JDInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: '#235DFF',
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-end',
    paddingHorizontal: 40,
    marginTop: 16,
  },
  bottomWrapper: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
  },
  optionText: {
    color: '#2A2A2A',
    fontSize: 18 * scale,
    lineHeight: 24 * scale,
    fontFamily: Fonts.Regular
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#FFEDCF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },

  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },

  infoText: {
    flex: 1,
    fontSize: 14 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    color: '#000',
  },

  chatCard: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingBottom:16,
    paddingTop:10,
    backgroundColor: '#ff',
  },

  chatInput: {
    maxHeight: 168,
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    color: '#111827',
    textAlignVertical: 'top',
    margin:0
    // marginTop:16
  },

  divider: {
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 12,
  },

  chatActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  chatIcon: {
    width: 28,
    height: 28,
    marginLeft: 12,
  },

  nextBtn: {
    backgroundColor: '#2F66FF',
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabled: {
    backgroundColor: '#B0B7FF',
  },

  nextText: {
    color: '#fff',
    fontSize: 16 * scale,
    fontFamily: Fonts.Medium,
  },

});
