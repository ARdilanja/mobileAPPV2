

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from '../navigations/stackNavigation/StackNavigation';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;




// // src/navigations/AppNavigation.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import RootStack from './stackNavigation/RootStack';

// export default function AppNavigation() {
//     return (
//         <NavigationContainer>
//             <RootStack />
//         </NavigationContainer>
//     );
// }