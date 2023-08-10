import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {primaryColor} from '../../values/colors';
import {Avatar} from 'react-native-paper';
import {Logo} from '../../assets/icon';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Avatar.Icon
        icon={() => <Logo />}
        size={screenWidth * 0.45}
        style={{backgroundColor: 'transparent'}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
