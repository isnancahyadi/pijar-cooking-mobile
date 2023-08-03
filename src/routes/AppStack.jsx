import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddRecipe, Chat, DetailRecipe} from '../pages';
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
      <Stack.Screen name="AddRecipe" component={AddRecipe} />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
