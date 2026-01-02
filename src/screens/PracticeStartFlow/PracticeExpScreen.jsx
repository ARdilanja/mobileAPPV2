import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import PracticeTitle from './PracticeTitle';
import { Fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 390;

const experienceOptions = [
  'Student',
  'Fresher',
  '1 - 3 years',
  '3 - 5 years',
  '5+ years',
];

const PracticeExpScreen = () => {
      const navigation = useNavigation();
    

  const [experience, setExperience] = useState('');
  const [inputValue, setInputValue] = useState('');

  const isEnabled = experience.trim().length > 0;

  const handleChipPress = (value) => {
    setExperience(value);
    setInputValue(value);
  };

  const handleInputChange = (text) => {
    setInputValue(text);
    setExperience(text.trim());
  };

  const handleSubmit = () => {
    console.log('Selected Experience:', experience);
    navigation.navigate('PracticeInterviewStart');

  };

  return (
    <View style={styles.container}>
       {/* <StatusBar
          barStyle="dark-content" 
        /> */}
                <Header title="Practice interviews" showNotification={true}/>

      {/* Top Spacer */}
      <View style={{ flex: 1 }} />

      {/* Title */}
      <PracticeTitle
        title="The experience level isn’t mentioned. What should this role target?"
      />

      <View style={{ flex: 1 }} />

      {/* Chips */}
      <View style={styles.chipsContainer}>
        <View style={styles.chipsWrapper}>
          {experienceOptions.map(item => {
            const selected = experience === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() => handleChipPress(item)}
                style={[
                  styles.chip,
                  selected && styles.chipSelected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selected && styles.chipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Bottom Input */}
      <View style={styles.bottomWrapper}>
        <View style={styles.chatCard}>
          <TextInput
            placeholder="Type here..."
            value={inputValue}
            onChangeText={handleInputChange}
            style={styles.chatInput}
            placeholderTextColor="#2A2A2A"
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
              disabled={!isEnabled}
              onPress={handleSubmit}
            >
              <Image
                source={
                  isEnabled
                    ? require('../../assets/icons/arrow-circle-up-active.png')
                    : require('../../assets/icons/arrow-circle-up.png')
                }
                style={styles.chatIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );
};

export default PracticeExpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  chipsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  chipsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  chip: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  chipSelected: {
    backgroundColor: '#235DFF',
    borderColor: '#235DFF',
  },

  chipText: {
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    color: '#2A2A2A',
  },

  chipTextSelected: {
    color: '#FFFFFF',
  },

  bottomWrapper: {
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingBottom: 18,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
  },

  chatCard: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },

  chatInput: {
    fontSize: 18 * scale,
    lineHeight: 28 * scale,
    fontFamily: Fonts.Regular,
    color: '#2A2A2A',
    paddingBottom: 12,
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
});
