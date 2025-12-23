import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../../components/CustomTabBar';
import EditProfileScreen from '../../screens/EditProfileScreen';
import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
import CompletedInterviewsScreen from '../../screens/CompletedInterviewsScreen';
import Dashboard from '../../screens/Dashboard';
import DrawerHeader from '../../components/DrawerHeader';

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
        component={Dashboard}
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