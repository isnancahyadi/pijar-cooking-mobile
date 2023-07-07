import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AddRecipe, Home, Message, Profile} from '../../pages';
import NavbarItem from './NavbarItem';

const Tab = createBottomTabNavigator();

const ButtomNavbar = () => {
  return (
    <Tab.Navigator
      screenOptions={{tabBarShowLabel: false, headerShown: false}}
      tabBar={props => <NavbarItem {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add Recipe" component={AddRecipe} />
      <Tab.Screen name="Message" component={Message} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default ButtomNavbar;

const styles = StyleSheet.create({});
