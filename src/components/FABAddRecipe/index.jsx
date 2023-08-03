import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FAB} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor} from '../../values/colors';
import {useNavigation} from '@react-navigation/native';

const FABAddRecipe = () => {
  const navigation = useNavigation();
  return (
    <FAB
      icon={() => <IcOutlined.PlusIcon color={'white'} />}
      style={styles.fab}
      onPress={() => navigation.navigate('AddRecipe')}
    />
  );
};

export default FABAddRecipe;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: primaryColor,
  },
});
