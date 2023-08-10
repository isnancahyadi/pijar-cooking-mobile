import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Input} from '../../components';
import {Text, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {greyColor, primaryColor} from '../../values/colors';
import * as IcOutlined from 'react-native-heroicons/outline';

const AddRecipe = () => {
  const {control, handleSubmit, watch} = useForm();

  return (
    <View
      style={{
        padding: 25,
      }}>
      <Text
        variant="headlineMedium"
        style={{fontWeight: 700, marginBottom: 25}}>
        Add Recipe
      </Text>
      <Input
        name="tittle"
        control={control}
        placeholder="Tittle"
        icon={
          <TextInput.Icon
            icon={({color}) => (
              <IcOutlined.PencilIcon size={27} color={color} />
            )}
            color={isTextInputFocused =>
              isTextInputFocused ? primaryColor : greyColor
            }
          />
        }
        rules={{
          required: 'Username is required',
        }}
      />
    </View>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({});
