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

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>

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
        name="StartInterviewScreen"
        component={StartInterviewScreen}
       options={{
    headerShown: false, // hide header
    tabBarLabel: () => null, // hide the label if needed
  }}
      />
      <Tab.Screen
        name="StartInterview"
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
      {/* <Tab.Screen
        name="Practice"
        component={PracticeStack}
        options={{

          headerShown: false,

        }}
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
        name="PracticeStartScreen"
        component={PracticeStartScreen}
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
        name="ProfileTopScreen"
        component={ProfileTopScreen}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;