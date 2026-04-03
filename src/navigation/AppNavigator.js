import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../utils/theme';

import SplashScreen       from '../screens/SplashScreen';
import AuthLoadingScreen  from '../screens/AuthLoadingScreen';
import LoginScreen        from '../screens/LoginScreen';
import RegisterScreen     from '../screens/RegisterScreen';
import HomeScreen         from '../screens/HomeScreen';
import UploadScreen       from '../screens/UploadScreen';
import AnalysisScreen     from '../screens/AnalysisScreen';
import CertificateScreen  from '../screens/CertificateScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.bgPrimary },
  animation: 'slide_from_right',
};

function MainStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home"        component={HomeScreen} />
      <Stack.Screen name="Upload"      component={UploadScreen} />
      <Stack.Screen name="Analysis"    component={AnalysisScreen} />
      <Stack.Screen name="Certificate" component={CertificateScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Splash">
        <Stack.Screen name="Splash"       component={SplashScreen} />
        <Stack.Screen name="AuthLoading"  component={AuthLoadingScreen} />
        <Stack.Screen name="Login"        component={LoginScreen} />
        <Stack.Screen name="Register"     component={RegisterScreen} />
        <Stack.Screen name="Main"         component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
