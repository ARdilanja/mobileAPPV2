import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigation from '../stackNavigation/StackNavigation';
import CustomDrawerContent from '../../components/CustomDrawerContent'

const Drawer = createDrawerNavigator();

// const DrawerNavigation = () => {
//     return (
//         <Drawer.Navigator
//             screenOptions={{ headerShown: false }}
//             drawerContent={(props) => <CustomDrawerContent {...props} />}
//         >
//             <Drawer.Screen
//                 name="MainApp"
//                 component={StackNavigation}
//             />
//         </Drawer.Navigator>
//     );
// };



const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="StackNavigation"
        component={StackNavigation}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
