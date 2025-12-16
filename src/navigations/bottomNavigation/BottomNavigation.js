import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import Home from '../../screens/BottomScreens/Home'
import StartInterview from '../../screens/BottomScreens/StartInterview'
import CompletedInterview from '../../screens/BottomScreens/CompletedInterview'
import MyProfile from '../../screens/BottomScreens/MyProfile'
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Bottom"
        component={EmployerInterviewScreen}
        options={{
            headerShown: false, 
            title: 'Home'
        }}
      />
      <Tab.Screen
        name="StartInterview"
        component={StartInterview}
        options={{
          headerShown:false,
          title: 'Start Interview',
        }}
      />
      <Tab.Screen
        name="CompletedInterview"
        component={CompletedInterview}
        options={{
          headerShown:false,
          title: 'Completed Interview',
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={EditProfileScreen}
       options={{
          headerShown:false,
          title: 'MyProfile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;