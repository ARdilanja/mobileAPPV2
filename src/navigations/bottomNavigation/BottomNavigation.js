import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
import CompletedInterviewsScreen from '../../screens/CompletedInterviewsScreen';
import Dashboard from '../../screens/Dashboard';
import DrawerHeader from '../../components/DrawerHeader';
import Home from '../../screens/Home';
import UpdateProfileScreen from '../../screens/topUpdatedrofile/UpdateProfileScreen';
import ProfileTopScreen from '../../screens/topUpdatedrofile/ProfileTopScreen';
import PracticeStartScreen from '../../screens/practiceInterview/PracticeStartScreen';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      {/* <Tab.Screen
        name="Bottom"
        component={Dashboard}
        options={{
            headerShown: false, 
            title: 'Home'
        }}
      /> */}

      <Tab.Screen
        name="Bottom"
        component={Home}
        options={{
          title: 'Home',
          headerShown: true, // Enable header here instead
          headerTitle: '',
          headerLeft: () => <DrawerHeader />, // Move the drawer button here
          headerShadowVisible: false, // Removes the thin line under header
          headerStyle: {
             elevation: 0, // Removes shadow on Android
             shadowOpacity: 0, // Removes shadow on iOS
          }
        }}
      />
      {/* <Tab.Screen
        name="PracticeStartScreen"
        component={PracticeStartScreen}
        options={{
          title: 'Practice',
          headerShown: true, // Enable header here instead
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
        name="Actions"
        component={Home}
        options={{
          title: 'Actions',
          headerShown: true, // Enable header here instead
          headerTitle: 'Actions',
          // headerLeft: () => <DrawerHeader />, // Move the drawer button here
          headerShadowVisible: false, // Removes the thin line under header
          headerStyle: {
             elevation: 0, // Removes shadow on Android
             shadowOpacity: 0, // Removes shadow on iOS
          }
        }}
      />
      <Tab.Screen
        name="ProfileTopScreen"
        component={ProfileTopScreen}
        options={{
          title: 'Profile',
          headerShown: true, // Enable header here instead
          headerTitle: 'Profile',
          
        }}
      /> */}
      <Tab.Screen
        name="StartInterview"
        component={EmployerInterviewScreen}
        options={{
          headerShown:true,
          title: 'start Interviews',
          headerTitleAlign:'center',
        }}
      />
      <Tab.Screen
        name="PracticeStartScreen"
        component={PracticeStartScreen}
        options={{
          headerShown:true,
          title: 'Practice',
          headerTitleAlign:'center',
        }}
      />
       <Tab.Screen
         name="ProfileTopScreen"
         component={ProfileTopScreen}
         options={{
           headerShown:true,
           headerTitle: 'Profile',
           headerTitleAlign:'center'
         }}
       />
    </Tab.Navigator>
  );
};

export default BottomNavigation;