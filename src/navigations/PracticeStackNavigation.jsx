// src/navigations/PracticeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PracticeStartScreen from '../screens/practiceInterview/PracticeStartScreen';
import PracticeConversationScreen from '../screens/practiceInterview/PracticeConversationScreen';
import PracticeInterviewInfoScreen from '../screens/practiceInterview/PracticeInterviewInfoScreen';
import { StatusBar } from 'react-native';
import { Fonts } from '../constants/fonts';

const Stack = createNativeStackNavigator();

const PracticeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: "#0178FF", },
                headerTitleStyle: {
                    fontSize: 18,
                    fontFamily: Fonts.Medium,
                },
                headerTintColor: '#F5F5F5',
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="PracticeStart"
                component={PracticeStartScreen}
                options={{ title: 'Start Practice' }}
            />
            <Stack.Screen
                name="PracticeConversationScreen"
                component={PracticeConversationScreen}
                options={{ title: 'Practice' }}
            />
            <Stack.Screen
                name="PracticeInterviewInfoScreen"
                component={PracticeInterviewInfoScreen}
                options={{ title: 'Interview Info' }}
            />
        </Stack.Navigator>
    );
};

export default PracticeStack;