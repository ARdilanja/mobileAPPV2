// // src/screens/OnboardingScreen/OnboardingContainer.jsx
// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   StyleSheet,
//   Pressable,
//   Text,
//   StatusBar,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';

// import StepOneOnboard from './StepOneOnboard';
// import StepTwoOnboard from './StepTwoOnboard';
// import StepThreeOnboard from './StepThreeOnboard';
// import StepFourOnboard from './StepFourOnboard';
// import ProgressBar from '../../components/OnboardingContainer/ProgressBar';
// import Header from '../../components/Header';
// import { Fonts } from '../../constants/fonts';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   setStepOne,
//   setStepTwo,
//   setStepThree,
//   setStepFour,
// } from '../../redux/slices/onboardingSlice';

// const TOTAL_STEPS = 4;
// const { width } = Dimensions.get('window');
// const scale = width / 390;

// export default function OnboardingContainer() {
//   const navigation = useNavigation();
//   const [step, setStep] = useState(1);

//   // const [stepOneValue, setStepOneValue] = useState([]);
//   // const [stepTwoValue, setStepTwoValue] = useState([]);
//   // const [stepThreeValue, setStepThreeValue] = useState('');
//   // const [stepFourValue, setStepFourValue] = useState('');
//   const dispatch = useDispatch();

//   const { stepOne, stepTwo, stepThree, stepFour } = useSelector(
//     state => state.onboarding,
//   );

// const canGoNext = () => {
//   if (step === 1) return stepOne.length > 0;

//   if (step === 2) {
//     return stepTwo.some(item => {
//       // Option cards (strings)
//       if (typeof item === 'string') return true;

//       // Text / Audio cards
//       if (typeof item === 'object') return item.selected === true;

//       return false;
//     });
//   }

//   if (step === 3) return stepThree !== '';
//   if (step === 4) return stepFour !== '';

//   return false;
// };


//   const goNext = () => {
//     if (step < TOTAL_STEPS) {
//       setStep(step + 1);
//     } else {
//       console.log('ONBOARDING DATA FROM REDUX:', {
//         stepOne,
//         stepTwo,
//         stepThree,
//         stepFour,
//       });

//       // ✅ Navigate only on last step
//       navigation.navigate('CreateRoomScreen');
//     }
//   };


//   const goBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       StatusBar.setBarStyle('dark-content');
//       if (Platform.OS === 'android') {
//         StatusBar.setBackgroundColor('transparent');
//         StatusBar.setTranslucent(true);
//       }
//     }, []),
//   );
//   const cleanText = value =>
//     typeof value === 'string' ? value.replace(/\s*\n\s*/g, ' ').trim() : value;
//   const cleanedData = {
//     stepOne,
//     stepTwo: stepTwo.map(cleanText),
//     stepThree: cleanText(stepThree),
//     stepFour: cleanText(stepFour),
//   };

//   console.log('✅ CLEAN ONBOARDING DATA:', cleanedData);

//   return (
//     <View style={styles.container}>
//       <StatusBar
//         backgroundColor="transparent"
//         translucent={true}
//         barStyle="dark-content"
//       />

//       {step > 1 && (
//         <View style={styles.headerWrapper}>
//           <Header title="" />
//           <Pressable style={StyleSheet.absoluteFill} onPress={goBack} />
//         </View>
//       )}

//       <KeyboardAvoidingView
//         style={styles.keyboardView}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
//       >
//         {/* Content + Input + Footer in one column */}
//         <View style={styles.mainWrapper}>
//           {/* Scrollable content */}
//           <View style={[styles.content, step === 1 && styles.contentNoHeader]}>
//             {step === 1 && (
//               <StepOneOnboard
//                 value={stepOne}
//                 onChange={v => dispatch(setStepOne(v))}
//               />
//             )}

//             {step === 2 && (
//               <StepTwoOnboard
//                 value={stepTwo}
//                 onChange={v => dispatch(setStepTwo(v))}
//               />
//             )}

//             {step === 3 && (
//               <StepThreeOnboard
//                 value={stepThree}
//                 onChange={v => dispatch(setStepThree(v))}
//               />
//             )}

//             {step === 4 && (
//               <StepFourOnboard
//                 value={stepFour}
//                 onChange={v => dispatch(setStepFour(v))}
//               />
//             )}
//           </View>

//           {/* Footer with Next button + ProgressBar */}
//           <View style={styles.footer}>
//             <Pressable
//               disabled={!canGoNext()}
//               onPress={goNext}
//               style={[styles.button, !canGoNext() && styles.disabled]}
//             >
//               <Text style={styles.btnText}>
//                 {step === TOTAL_STEPS
//                   ? 'Start your first trial session'
//                   : 'Next'}
//               </Text>
//             </Pressable>
//             <ProgressBar
//               currentPage={step}
//               isCurrentStepCompleted={canGoNext()}
//             />
//           </View>
//         </View>
//       </KeyboardAvoidingView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   mainWrapper: {
//     flex: 1,
//     // justifyContent: 'space-between',
//   },
//   headerWrapper: {
//     marginTop: Platform.OS === 'ios' ? 40 : 1,
//     // marginBottom: 10, // controls gap between header & content
//   },

//   content: {
//     flexGrow: 1,
//     padding: 16,
//     paddingTop: 0,
//   },
//   contentNoHeader: {
//     marginTop: 65 * scale,
//   },
//   footer: {
//     marginTop: 1 * scale,
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   button: {
//     height: 52,
//     borderRadius: 26,
//     backgroundColor: '#2563EB',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 16 * scale,
//   },
//   disabled: {
//     backgroundColor: '#A3A3A3',
//   },
//   btnText: {
//     color: '#FFF',
//     fontSize: 18 * scale,
//     fontWeight: '500',
//     fontFamily: Fonts.Medium,
//     lineHeight: 24,
//   },
// });


import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  AppState,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import StepOneOnboard from './StepOneOnboard';
import StepTwoOnboard from './StepTwoOnboard';
import StepThreeOnboard from './StepThreeOnboard';
import StepFourOnboard from './StepFourOnboard';
import ProgressBar from '../../components/OnboardingContainer/ProgressBar';
import Header from '../../components/Header';
import { Fonts } from '../../constants/fonts';

import {
  setStepOne,
  setStepTwo,
  setStepThree,
  setStepFour,
} from '../../redux/slices/onboardingSlice';

/* 🔊 AI VOICE */
import {
  speak,
  stopSpeaking,
  allowSpeaking,
  blockSpeaking,
} from '../../utils/aiVoice';

const TOTAL_STEPS = 4;
const { width } = Dimensions.get('window');
const scale = width / 390;

export default function OnboardingContainer() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const { stepOne, stepTwo, stepThree, stepFour } = useSelector(
    state => state.onboarding,
  );

  /* ----------------------------------
     SCREEN FOCUS CONTROL (CRITICAL)
  ---------------------------------- */
  useFocusEffect(
    useCallback(() => {
      console.log('🟢 [ONBOARDING] Screen focused');
      allowSpeaking();

      return () => {
        console.log('🔴 [ONBOARDING] Screen unfocused');
        blockSpeaking();
        stopSpeaking();
      };
    }, [])
  );

  /* ----------------------------------
     APP BACKGROUND / CLOSE CONTROL
  ---------------------------------- */
  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        console.log('🔴 [APP] Background/Closed');
        blockSpeaking();
        stopSpeaking();
      }
    });

    return () => sub.remove();
  }, []);

  /* ----------------------------------
     STEP BASED VOICE
  ---------------------------------- */
  useEffect(() => {
    console.log('🟡 [ONBOARDING] Step changed:', step);

    stopSpeaking();

    if (step === 1) {
      speak(
        "Before we start, we just want to understand what’s going on for you at work,so we can personalise this for you. What’s your biggest challenge at work right now?"
      );
    }

    if (step === 2) {
      speak(
        "When you think about these situations, what worries you the most?"
      );
    }

    if (step === 3) {
      speak("How would you describe your current level at work?");
    }

    if (step === 4) {
      speak(
        "One last thing. What’s your working situation like right now?"
      );
    }
  }, [step]);

  /* ---------------------------------- */
  const canGoNext = () => {
    if (step === 1) return stepOne.length > 0;

    if (step === 2) {
      return stepTwo.some(
        item =>
          typeof item === 'string' ||
          (typeof item === 'object' && item.selected),
      );
    }

    if (step === 3) return stepThree !== '';
    if (step === 4) return stepFour !== '';

    return false;
  };

  const goNext = () => {
    stopSpeaking();

    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      navigation.navigate('CreateRoomScreen');
    }
  };

  const goBack = () => {
    stopSpeaking();
    if (step > 1) setStep(step - 1);
  };

  /* ---------------------------------- */
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle="dark-content" />

      {step > 1 && (
        <View style={styles.headerWrapper}>
          <Header title="" />
          <Pressable style={StyleSheet.absoluteFill} onPress={goBack} />
        </View>
      )}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.mainWrapper}>
          <View style={[styles.content, step === 1 && styles.contentNoHeader]}>
            {step === 1 && (
              <StepOneOnboard
                value={stepOne}
                onChange={v => dispatch(setStepOne(v))}
              />
            )}
            {step === 2 && (
              <StepTwoOnboard
                value={stepTwo}
                onChange={v => dispatch(setStepTwo(v))}
              />
            )}
            {step === 3 && (
              <StepThreeOnboard
                value={stepThree}
                onChange={v => dispatch(setStepThree(v))}
              />
            )}
            {step === 4 && (
              <StepFourOnboard
                value={stepFour}
                onChange={v => dispatch(setStepFour(v))}
              />
            )}
          </View>

          <View style={styles.footer}>
            <Pressable
              disabled={!canGoNext()}
              onPress={goNext}
              style={[styles.button, !canGoNext() && styles.disabled]}
            >
              <Text style={styles.btnText}>
                {step === TOTAL_STEPS
                  ? 'Start your first trial session'
                  : 'Next'}
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

/* ----------------------------------
   STYLES
---------------------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5',marginTop:20  },
  mainWrapper: { flex: 1 },
  headerWrapper: { marginTop: Platform.OS === 'ios' ? 40 : 1 },
  content: { flexGrow: 1, padding: 16, paddingTop: 0 },
  contentNoHeader: { marginTop: 65 * scale },
  footer: { paddingHorizontal: 16, paddingBottom: 16 },
  button: {
    height: 52,
    borderRadius: 26,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16 * scale,
  },
  disabled: { backgroundColor: '#A3A3A3' },
  btnText: {
    color: '#FFF',
    fontSize: 18 * scale,
    fontFamily: Fonts.Medium,
  },
});
