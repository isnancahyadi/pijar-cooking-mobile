import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../../components';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {greyColor, primaryColor} from '../../values/colors';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&]).{8,32}/;

const RegAccount = ({onSubmit}) => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const [loading, setLoading] = useState(false);

  const submitAccount = async data => {
    setLoading(true);
    await axios
      .post('http://localhost:3000/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
      })
      .then(response => {
        firestore()
          .collection('accounts')
          .doc(response?.data?.payload[0].username)
          .set({
            username: response?.data?.payload[0].username,
            email: data.email,
            password: data.password,
          })
          .then(res => {
            console.log('account created');
          })
          .catch(error => {
            console.log(error);
          });
        onSubmit('regProfile', response?.data?.payload[0].username);
        setLoading(false);
      })
      .catch(error => {
        console.log(JSON.stringify(error?.response, null, 2));
        setLoading(false);
      });
  };

  return (
    <View style={{rowGap: 20}}>
      <Input
        name="username"
        control={control}
        placeholder="Username"
        icon={
          <TextInput.Icon
            icon={({color}) => <IcOutlined.UserIcon size={27} color={color} />}
            color={isTextInputFocused =>
              isTextInputFocused ? primaryColor : greyColor
            }
          />
        }
        rules={{
          required: 'Username is required',
        }}
      />

      <Input
        name="email"
        control={control}
        placeholder="Email"
        icon={
          <TextInput.Icon
            icon={({color}) => (
              <IcOutlined.EnvelopeIcon size={27} color={color} />
            )}
            color={isTextInputFocused =>
              isTextInputFocused ? primaryColor : greyColor
            }
          />
        }
        keyboardType="email-address"
        rules={{
          required: 'Email is required',
          pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
        }}
      />

      <Input
        name="password"
        control={control}
        placeholder="Create New Password"
        icon={
          <TextInput.Icon
            icon={({color}) => (
              <IcOutlined.LockClosedIcon size={27} color={color} />
            )}
            color={isTextInputFocused =>
              isTextInputFocused ? primaryColor : greyColor
            }
          />
        }
        secureTextEntry={true}
        rules={{
          required: 'Password is required',
          pattern: {
            value: PASS_REGEX,
            message:
              'Password must include number, lowercase, upercase, special character (@$%^&), min. 8 character, max. 32 character',
          },
        }}
      />

      <Input
        name="rePassword"
        control={control}
        placeholder="Confirm Password"
        icon={
          <TextInput.Icon
            icon={({color}) => (
              <IcOutlined.LockClosedIcon size={27} color={color} />
            )}
            color={isTextInputFocused =>
              isTextInputFocused ? primaryColor : greyColor
            }
          />
        }
        secureTextEntry={true}
        rules={{
          validate: value =>
            value === watch('password') || "Password don't match",
        }}
      />

      <Button
        mode="contained"
        buttonColor={primaryColor}
        labelStyle={{fontSize: 19}}
        contentStyle={{paddingVertical: 10}}
        style={{borderRadius: 15, marginTop: 20}}
        onPress={handleSubmit(submitAccount)}
        disabled={loading ? true : false}>
        {loading ? 'Please Wait...' : 'Sign Up'}
      </Button>
      <Text style={{alignSelf: 'center', marginTop: 5}}>
        Already have account?{' '}
        <Text
          style={{color: primaryColor}}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Log in Here
        </Text>
      </Text>
    </View>
  );
};

export default RegAccount;

const styles = StyleSheet.create({});
