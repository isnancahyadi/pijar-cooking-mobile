import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {TextInput} from 'react-native-paper';
import {primaryColor, primaryColorSelection} from '../../values/colors';
import {Controller} from 'react-hook-form';

const Input = ({
  control,
  name,
  placeholder,
  icon,
  rules = {},
  secureTextEntry,
  multiline,
  numberOfLines = 1,
  onPressIn = null,
  keyboardType = 'default',
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <View>
          <TextInput
            mode="outlined"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            activeOutlineColor={primaryColor}
            outlineColor={error ? 'red' : 'transparent'}
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            multiline={multiline}
            numberOfLines={numberOfLines}
            left={icon}
            onPressIn={onPressIn}
            style={{
              fontSize: 17,
              paddingVertical: 5,
              paddingHorizontal: 5,
              backgroundColor: 'rgba(245, 245, 245, 1)',
            }}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default Input;

const styles = StyleSheet.create({});
