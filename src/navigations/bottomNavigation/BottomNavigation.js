import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
import DrawerHeader from '../../components/DrawerHeader';
import Home from '../../screens/Home';
import ProfileTopScreen from '../../screens/topUpdatedrofile/ProfileTopScreen';
// import PracticeStack from '../PracticeStackNavigation.jsx';
import PracticeStartScreen from '../../screens/practiceInterview/PracticeStartScreen';
import PracticeConversationScreen from '../../screens/practiceInterview/PracticeConversationScreen';
import PracticeInterviewInfoScreen from '../../screens/practiceInterview/PracticeInterviewInfoScreen';
import StartInterviewScreen from '../../screens/StartInterviewScreen';
import JDInputScreen from '../../screens/PracticeStartFlow/JDInputScreen';
import SpeakingInPracticeScreen from '../../screens/SpeakingInPracticeScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomTabBar {...props} />}>

      <Tab.Screen
        name="Bottom"
        component={Home}
        options={{
          title: 'Home',
          headerShown: false, // Enable header here instead
          headerTitle: '',
          headerLeft: () => <DrawerHeader />, // Move the drawer button here
          headerShadowVisible: false, // Removes the thin line under header
          headerStyle: {
            elevation: 0, // Removes shadow on Android
            shadowOpacity: 0, // Removes shadow on iOS
          }
        }}
      />
      <Tab.Screen
        name="Practice"
        component={SpeakingInPracticeScreen}

      />
      {/* <Tab.Screen
        name="Practice"
        component={JDInputScreen}
        // options={{
        //   headerTitle: 'Start Practice',
        //   headerTitleAlign: 'center',
        //   headerShown: true,
        //   headerStyle: {
        //     backgroundColor: "#0178FF",
        //   },
        //   headerTintColor: '#F5F5F5'
        // }}
      /> */}

      <Tab.Screen
        name="PracticeConversationScreen"
        component={PracticeConversationScreen}
        options={{
          headerTitle: 'Practice',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0178FF",
          },
          headerTintColor: '#F5F5F5'
        }}
      />

      <Tab.Screen
        name="PracticeInterviewInfoScreen"
        component={PracticeInterviewInfoScreen}
        options={{
          headerTitle: 'Practice',
          headerTitleAlign: 'center',
          headerShown: true,
          headerStyle: {
            backgroundColor: "#0178FF",
          },
          headerTintColor: '#F5F5F5'
        }}
      />

      <Tab.Screen
        name="Action"
        component={EmployerInterviewScreen}
        options={{
          headerTitle: 'Start Interview',
          headerTitleAlign: 'center',
          headerShown: true, headerStyle: {
            backgroundColor: "#0178FF",
          },
          headerTintColor: '#F5F5F5'
        }}
      />
      <Tab.Screen
        name="StartInterviewScreen"
        component={StartInterviewScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTopScreen}
        options={{
          headerShown: false
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomNavigation;





// // src/navigations/bottomNavigation/BottomNavigation.js
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CustomTabBar from '../../components/CustomTabBar';

// import HomeStack from '../stacks/HomeStack';
// import PracticeStack from '../stacks/PracticeStack';
// import ActionStack from '../stacks/ActionStack';
// import ProfileStack from '../stacks/ProfileStack';

// const Tab = createBottomTabNavigator();

// export default function BottomNavigation() {
//   return (
//     <Tab.Navigator
//       screenOptions={{ headerShown: false }}
//       tabBar={props => <CustomTabBar {...props} />}
//     >
//       <Tab.Screen name="Bottom" component={HomeStack} />
//       <Tab.Screen name="Practice" component={PracticeStack} />
//       <Tab.Screen name="Action" component={ActionStack} />
//       <Tab.Screen name="Profile" component={ProfileStack} />
//     </Tab.Navigator>
//   );
// }
