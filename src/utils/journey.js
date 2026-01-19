import AsyncStorage from "@react-native-async-storage/async-storage";

export function getJourneyStep(state) {
  if (!state.onboarding4Done)
    return { screen: "OnboardingContainer", stage: "onboarding" };

  if (!state.trialSessionDone)
    return { screen: "CreateRoomScreen", stage: "startTrial" };

  if (state.trialSessionDone && state.wantsPlan && !state.planCreated)
    return { screen: "SpeakingInPracticeScreen", stage: "createPlanning" };

  if (state.planCreated && !state.planCompleted)
    return { screen: "BottomDash", stage: "practice" };

  if (state.planCompleted)
    return { screen: "BottomDash", stage: "thirtyDayCompleted" };

  return { screen: "BottomDash", stage: "dashboard" };
}

export const modalContent = {
  onboarding: {
    title: "Welcome back 👋",
     icon: require('../assets/icons/welcome-hi.png'),
    content: "Your journey’s just getting started. Pick up where you left off!",
    button: "Start your first trial session"
  },
  startTrial: {
   title: "Welcome back 👋",
     icon: require('../assets/icons/welcome-hi.png'),
    content: "Your journey’s just getting started. Pick up where you left off!",
    button: "Start your first trial session"
  },
  createPlanning: {
    title: "Plan your growth!",
     icon: require('../assets/icons/plan-growth.png'),
    content: "Create your 30-Day Plan to make your progress consistent and focused.",
    button: "Create my plan",
    home_button:"Create 90 day plan"
  },
  thirtyDayCompleted: {
    title: "Congratulations! 🎉",
     icon: require('../assets/icons/clap.png'),
    content: "You’ve completed your 30-day journey. Let’s start your next plan and keep the momentum going.",
    button: "Start New 30-Day Plan",
    home_button:"Start New 30-Day Plan"
  },
  resetCurrentPlan: {
    title: "Heads up! ⚡",
     icon: require('../assets/icons/switch-plan.png'),
    content: "Switching plans will reset your current one. Ready to start fresh?",
    button: "Yes, Start New",
    secondary_button:"Cancel"
  },
   pauseRenewal: {
    title: "Pause renewal now?",
     icon: require('../assets/icons/switch-plan.png'),
    content: "Switching plans will reset your current one. Ready to start fresh?",
    button: "Yes, Start New",
    secondary_button:"Cancel"
  }

};
// utils/userState.ts

export const getUserState = async () => {
  const raw = await AsyncStorage.getItem("userState");

  if (!raw) {
    return {
      onboarding4Done: false,
      trialSessionDone: false,
      planCreated: false,
      wantsPlan: true,
      planCompleted: false,
    };
  }

  return JSON.parse(raw);
};

export const setUserState = async (state) => {
  await AsyncStorage.setItem("userState", JSON.stringify(state));
};
