import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import PracticeTitle from './PracticeTitle';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { extractSkillsFromJD, clearJdData } from '../../redux/slices/jdSlice';
import { getNextScreen } from "../../utils/PracticeHelper.js";
import { useCallback } from 'react';

const screenWidth = Dimensions.get("window").width;
const scale = screenWidth / 390;

const JDInputScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(clearJdData());
      setJobDesc('');
      setHasSubmittedJD(false); // 👈 reset
    }, [dispatch])
  );


  const { loading, jobRole, experience, skills, error } = useSelector(
    (state) => state.jobDesc
  );

  const [jobDesc, setJobDesc] = useState('');
  const [hasSubmittedJD, setHasSubmittedJD] = useState(false);


  const handleNext = () => {
    if (!jobDesc.trim() || loading) return;
    setHasSubmittedJD(true);
    dispatch(extractSkillsFromJD(jobDesc));
  };


  // This effect handles navigation based on missing items
  useEffect(() => {
    if (!hasSubmittedJD || loading) return;

    const hasAnyData =
      (jobRole && jobRole.trim() !== '') ||
      (Array.isArray(skills) && skills.length > 0) ||
      (experience && experience.trim() !== '');

    if (!hasAnyData) {
     
      return;
    }

    const nextScreen = getNextScreen({
      role: jobRole,
      skills,
      experience,
    });

    navigation.navigate(nextScreen);
  }, [hasSubmittedJD, loading, jobRole, skills, experience]);


  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleClear = () => {
    dispatch(clearJdData());
    setJobDesc('');
  };

  return (
    <>

      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <Header title="Practice interviews" showNotification={true} />

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
          {hasSubmittedJD && !loading && !jobRole && skills.length === 0 && !experience && (
            <View style={styles.infoBox}>
              <Image
                source={require('../../assets/icons/warning-icon.png')}
                style={styles.infoIcon}
              />
              <Text style={styles.infoText}>
                The job description seems unrelated. Please check or edit.
              </Text>
            </View>
          )}
          {/* {hasSubmittedJD && !loading && !jobRole && skills.length === 0 && !experience && (
  <Text style={{ color: 'red', marginTop: 8 }}>
    ⚠ The job description seems unrelated. Please check or edit.
  </Text>
)} */}


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
                disabled={jobDesc.trim().length === 0 || loading}
              >
                <Image
                  source={
                    jobDesc.trim().length === 0 || loading
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
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  chatInput: {
    maxHeight: 168,
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    color: '#111827',
    textAlignVertical: 'top',
    margin: 0
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
