import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DetailRecipe} from '../pages';
import {BottomNavbar} from '../components';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: '#FCFCFC'},
        headerShown: false,
      }}>
      <Stack.Screen name="BottomNavbar" component={BottomNavbar} />
      <Stack.Screen name="DetailRecipe" component={DetailRecipe} />
    </Stack.Navigator>
  );
};

export default AppStack;
