import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import MoodSelectionScreen from '../screens/MoodSelectionScreen';
import MoodGraphScreen from '../screens/MoodGraphScreen';
import NoteScreen from '../screens/NoteScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import TipsScreen from '../screens/TipsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="MoodSelection" component={MoodSelectionScreen} />
      <Stack.Screen name="MoodGraph" component={MoodGraphScreen} />
      <Stack.Screen name="Note" component={NoteScreen} />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="Tips" component={TipsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
