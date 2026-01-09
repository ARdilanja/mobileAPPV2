// // src/navigations/stacks/PracticeStack.js
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import PracticeStartScreen from '../../screens/practiceInterview/PracticeStartScreen';
// import PracticeConversationScreen from '../../screens/practiceInterview/PracticeConversationScreen';
// import PracticeInterviewInfoScreen from '../../screens/practiceInterview/PracticeInterviewInfoScreen';

// const Stack = createNativeStackNavigator();

// export default function PracticeStack() {
//     return (
//         <Stack.Navigator>
//             <Stack.Screen
//                 name="PracticeStart"
//                 component={PracticeStartScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="PracticeConversation"
//                 component={PracticeConversationScreen}
//                 options={{ headerShown: false }}
//             />
//             <Stack.Screen
//                 name="PracticeInterviewInfo"
//                 component={PracticeInterviewInfoScreen}
//                 options={{ headerShown: false }}
//             />
//         </Stack.Navigator>
//     );
// }
