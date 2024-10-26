import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../components/Home';
import Welcome from '../components/screens/Welcome';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer
      
    >
      <Stack.Navigator
      initialRouteName='Welcome'
        screenOptions={{headerShown:false}}
      >
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={Welcome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation