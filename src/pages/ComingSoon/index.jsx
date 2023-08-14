import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';

const ComingSoon = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text variant="headlineLarge">Coming Soon</Text>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({});
