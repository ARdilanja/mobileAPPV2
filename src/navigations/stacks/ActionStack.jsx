// // src/navigations/stacks/ActionStack.js
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import EmployerInterviewScreen from '../../screens/EmployerInterviewScreen';
// import CreateRoomScreen from '../../screens/CreateRoomScreen';

// const Stack = createNativeStackNavigator();

// export default function ActionStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="EmployerInterview"
//                 component={EmployerInterviewScreen}
//                 options={{
//                     headerShown: true,
//                     headerTitle: 'Start Interview',
//                     headerStyle: { backgroundColor: '#0178FF' },
//                     headerTintColor: '#F5F5F5',
//                 }}
//             />

//             {/* TAB MUST STAY VISIBLE HERE */}
//             <Stack.Screen
//                 name="CreateRoom"
//                 component={CreateRoomScreen}
//                 options={{
//                     headerShown: true,
//                     headerTitle: 'Create Room',
//                 }}
//             />
//         </Stack.Navigator>
//     );
// }
