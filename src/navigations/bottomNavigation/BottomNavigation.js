import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import Home from '../../screens/BottomScreens/Home'
import StartInterview from '../../screens/BottomScreens/StartInterview'
import CompletedInterview from '../../screens/BottomScreens/CompletedInterview'
import MyProfile from '../../screens/BottomScreens/MyProfile'
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
import CompletedInterviewsScreen from '../../screens/CompletedInterviewsScreen';
import Dashboard from '../../screens/Dashboard';
import FeedbackScreen from '../../screens/FeedbackScreen'
import TermsOfServiceScreen from '../../screens/TermsOfServiceScreen'

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Bottom"
        component={Dashboard}
        options={{
            headerShown: false, 
            title: 'Home'
        }}
      />
      <Tab.Screen
        name="StartInterview"
        component={EmployerInterviewScreen}
        options={{
          headerShown:true,
          title: 'Interviews',
          headerTitleAlign:'center',
        }}
      />
      <Tab.Screen
        name="CompletedInterview"
        component={CompletedInterviewsScreen}
        options={{
          headerShown:true,
          title: 'Completed Interview',
          headerTitleAlign:'center',
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={EditProfileScreen}
       options={{
          headerShown:true,
          title: 'MyProfile',
          headerTitleAlign:'center'
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;