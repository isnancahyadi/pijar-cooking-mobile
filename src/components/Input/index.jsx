import {StyleSheet} from 'react-native';
import React from 'react';

import {TextInput} from 'react-native-paper';
import {primaryColor, primaryColorSelection} from '../../values/colors';

const Input = ({
  placeholder,
  icon,
  secureTextEntry,
  keyboardType = 'default',
}) => {
  return (
    <TextInput
      mode="outlined"
      placeholder={placeholder}
      activeOutlineColor={primaryColor}
      outlineColor="transparent"
      selectionColor={primaryColorSelection}
      cursorColor={primaryColor}
      outlineStyle={{borderRadius: 15}}
      left={icon}
      style={{
        fontSize: 17,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'rgba(245, 245, 245, 1)',
      }}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});
