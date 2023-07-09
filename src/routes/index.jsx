import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Login, Register, Profile, DetailRecipe} from '../pages';
import {BottomNavbar} from '../components';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{contentStyle: {backgroundColor: '#FCFCFC'}}}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomNavbar"
        component={BottomNavbar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailRecipe"
        component={DetailRecipe}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
