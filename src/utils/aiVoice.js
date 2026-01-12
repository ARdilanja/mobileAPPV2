// import Tts from 'react-native-tts';

// let isReady = false;

// /* ----------------------------------
//    INIT AI VOICE (DEBUG)
// ---------------------------------- */
// export const initAIVoice = async () => {
//   console.log('🟡 [TTS] initAIVoice called');
//   console.log('🟡 [TTS] Native module:', Tts);

//   if (!Tts) {
//     console.log('🔴 [TTS] Tts module is NULL');
//     return;
//   }

//   try {
//     const status = await Tts.getInitStatus();
//     console.log('🟢 [TTS] getInitStatus:', status);

//     await Tts.setDefaultLanguage('en-US');
//     await Tts.setDefaultRate(0.45);
//     await Tts.setDefaultPitch(1.0);

//     isReady = true;
//     console.log('🟢 [TTS] AI Voice READY');
//   } catch (e) {
//     console.log('🔴 [TTS] init error:', e);
//     isReady = false;
//   }
// };

// /* ----------------------------------
//    SPEAK (DEBUG)
// ---------------------------------- */
// export const speak = text => {
//   console.log('🟡 [TTS] speak() called with:', text);

//   if (!isReady) {
//     console.log('🔴 [TTS] speak blocked → isReady = false');
//     return;
//   }

//   if (!Tts) {
//     console.log('🔴 [TTS] speak blocked → Tts is null');
//     return;
//   }

//   try {
//     Tts.stop();
//     Tts.speak(text);
//     console.log('🟢 [TTS] speak() executed');
//   } catch (e) {
//     console.log('🔴 [TTS] speak error:', e);
//   }
// };

// /* ----------------------------------
//    STOP (DEBUG)
// ---------------------------------- */
// export const stopSpeaking = () => {
//   console.log('🟡 [TTS] stopSpeaking called');

//   if (!isReady || !Tts) {
//     console.log('🟠 [TTS] stop skipped');
//     return;
//   }

//   try {
//     Tts.stop();
//     console.log('🟢 [TTS] stop executed');
//   } catch (e) {
//     console.log('🔴 [TTS] stop error:', e);
//   }
// };


import Tts from 'react-native-tts';

let isReady = false;
let isSpeakingAllowed = false;

/* ----------------------------------
   INIT AI VOICE
---------------------------------- */
export const initAIVoice = async () => {
  console.log('🟡 [TTS] initAIVoice called');

  if (!Tts) {
    console.log('🔴 [TTS] Tts module is NULL');
    return;
  }

  try {
    await Tts.getInitStatus();
    await Tts.setDefaultLanguage('en-US');
    await Tts.setDefaultRate(0.45);
    await Tts.setDefaultPitch(1.0);

    isReady = true;
    console.log('🟢 [TTS] AI Voice READY');
  } catch (e) {
    console.log('🔴 [TTS] init error:', e);
    isReady = false;
  }
};

/* ----------------------------------
   CONTROL FLAGS
---------------------------------- */
export const allowSpeaking = () => {
  console.log('🟢 [TTS] Speaking ALLOWED');
  isSpeakingAllowed = true;
};

export const blockSpeaking = () => {
  console.log('🔴 [TTS] Speaking BLOCKED');
  isSpeakingAllowed = false;
};

/* ----------------------------------
   SPEAK
---------------------------------- */
export const speak = text => {
  console.log('🟡 [TTS] speak() called:', text);

  if (!isReady || !isSpeakingAllowed || !Tts) {
    console.log('🔴 [TTS] speak blocked');
    return;
  }

  try {
    Tts.stop();
    Tts.speak(text);
    console.log('🟢 [TTS] speak executed');
  } catch (e) {
    console.log('🔴 [TTS] speak error:', e);
  }
};

/* ----------------------------------
   STOP
---------------------------------- */
export const stopSpeaking = () => {
  console.log('🟡 [TTS] stopSpeaking called');

  if (!isReady || !Tts) return;

  try {
    Tts.stop();
    console.log('🟢 [TTS] stopped');
  } catch (e) {
    console.log('🔴 [TTS] stop error:', e);
  }
};
