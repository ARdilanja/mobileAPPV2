import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import Home from '../../screens/BottomScreens/Home'
import StartInterview from '../../screens/BottomScreens/StartInterview'
import CompletedInterview from '../../screens/BottomScreens/CompletedInterview'
import MyProfile from '../../screens/BottomScreens/MyProfile'

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="Bottom"
        component={Home}
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
        component={MyProfile}
       options={{
          headerShown:false,
          title: 'MyProfile',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;