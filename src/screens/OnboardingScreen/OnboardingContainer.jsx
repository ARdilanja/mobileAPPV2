// src/screens/OnboardingScreen/OnboardingContainer.jsx
import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import StepOneOnboard from './StepOneOnboard';
import StepTwoOnboard from './StepTwoOnboard';
import StepThreeOnboard from './StepThreeOnboard';
import StepFourOnboard from './StepFourOnboard';
import ProgressBar from '../../components/OnboardingContainer/ProgressBar';
import Header from '../../components/Header';

const TOTAL_STEPS = 4;
const { width } = Dimensions.get('window');
const scale = width / 390;

export default function OnboardingContainer() {
  const [step, setStep] = useState(1);

  const [stepOneValue, setStepOneValue] = useState([]);
  const [stepTwoValue, setStepTwoValue] = useState([]);
  const [stepThreeValue, setStepThreeValue] = useState('');
  const [stepFourValue, setStepFourValue] = useState('');

  const canGoNext = () => {
    if (step === 1) return stepOneValue.length > 0;
    if (step === 2) return stepTwoValue.length > 0;
    if (step === 3) return stepThreeValue !== '';
    if (step === 4) return stepFourValue !== '';
    return false;
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />

      {step > 1 && <Header title="" onBack={goBack} />}

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        {/* Content + Input + Footer in one column */}
        <View style={styles.mainWrapper}>
          {/* Scrollable content */}
          <View style={[styles.content, step === 1 && styles.contentNoHeader]}>
            {step === 1 && (
              <StepOneOnboard value={stepOneValue} onChange={setStepOneValue} />
            )}
            {step === 2 && (
              <StepTwoOnboard value={stepTwoValue} onChange={setStepTwoValue} />
            )}
            {step === 3 && (
              <StepThreeOnboard
                value={stepThreeValue}
                onChange={setStepThreeValue}
              />
            )}
            {step === 4 && (
              <StepFourOnboard
                value={stepFourValue}
                onChange={setStepFourValue}
              />
            )}
          </View>

          {/* Footer with Next button + ProgressBar */}
          <View style={styles.footer}>
            <Pressable
              disabled={!canGoNext()}
              onPress={goNext}
              style={[styles.button, !canGoNext() && styles.disabled]}
            >
              <Text style={styles.btnText}>
                {step === TOTAL_STEPS ? 'Finish' : 'Next'}
              </Text>
            </Pressable>
            <ProgressBar
              currentPage={step}
              isCurrentStepCompleted={canGoNext()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  mainWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: 16,
    paddingTop: 0,
  },
  contentNoHeader: {
    marginTop: 68 * scale,
  },
  footer: {
    marginTop:2*scale,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 16,
  },
  disabled: {
    backgroundColor: '#A3A3A3',
  },
  btnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
