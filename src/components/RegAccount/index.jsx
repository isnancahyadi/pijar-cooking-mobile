import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Input} from '../../components';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {Button, TextInput} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {greyColor, primaryColor} from '../../values/colors';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import config from '../../../config';
import AwesomeAlert from 'react-native-awesome-alerts';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&]).{8,32}/;

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const RegAccount = ({onSubmit}) => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const [loading, setLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hideAlert = () => {
    setIsAlert(false);
  };

  const submitAccount = async data => {
    setLoading(true);
    await axios
      .post(config.REACT_APP_REGISTER, {
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
            // console.log(error);
            setIsAlert(true);

            if (error) {
              setErrorMsg("Can't connect to database");
            } else {
              setErrorMsg('Something wrong with our app');
            }
            setLoading(false);
          });
        onSubmit('regProfile', response?.data?.payload[0].username);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);

        const getRes = Object.keys(error?.response?.data?.message);

        let msgProperty = [];

        getRes.map((item, key) => {
          const {
            [item]: {message},
          } = error?.response?.data?.message;

          msgProperty[key] = message;
        });

        setIsAlert(true);

        if (error?.response?.status === 409) {
          setErrorMsg(msgProperty.toString().split('.,').join(', '));
        } else if (error?.status === undefined) {
          setErrorMsg("Can't connect to database");
        } else {
          setErrorMsg('Something wrong with our app');
        }
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

      <AwesomeAlert
        show={isAlert}
        showProgress={false}
        title="Register Failed"
        message={errorMsg}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Oke"
        confirmButtonColor={primaryColor}
        titleStyle={{fontWeight: 700, fontSize: 29}}
        messageStyle={{fontSize: 18, marginTop: screenHeight * 0.02}}
        confirmButtonTextStyle={{fontSize: 16}}
        confirmButtonStyle={{paddingHorizontal: screenWidth * 0.1}}
        contentContainerStyle={{width: screenWidth}}
        onConfirmPressed={() => {
          hideAlert();
        }}
      />
    </View>
  );
};

export default RegAccount;

const styles = StyleSheet.create({});
