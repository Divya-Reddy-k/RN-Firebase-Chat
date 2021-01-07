import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import UserRoutes from '../utils/UserRoutes';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name={UserRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={UserRoutes.REGISTRATION} component={SignupScreen} />
    </Stack.Navigator>
  );
}
