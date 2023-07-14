import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {
  greyColor,
  primaryColor,
  primaryColorSelection,
  primaryColorTransparent,
} from '../../values/colors';
import * as IcOutlined from 'react-native-heroicons/outline';
import {Logo} from '../../assets/icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Input} from '../../components';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&]).{8,32}/;

const Login = () => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();

  const [loading, setLoading] = useState(false);

  const storeUserSession = async (username, email, token) => {
    try {
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          _u: username,
          _e: email,
          _t: token,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = async data => {
    setLoading(true);
    await axios
      .post('http://localhost:3000/auth/login', {
        username: data.user,
        password: data.password,
      })
      .then(response => {
        const token = response?.data?.payload?.token;
        const username = response?.data?.payload?.username;
        const email = response?.data?.payload?.email;

        storeUserSession(username, email, token);
        navigation.navigate('BottomNavbar');
        setLoading(false);
      })
      .catch(error => {
        console.log(JSON.stringify(error?.response, null, 2));
        setLoading(false);
      });
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          height: screenHeight,
          width: screenWidth,
          backgroundColor: '#FFFFFF',
          paddingHorizontal: 25,
          paddingVertical: 50,
        }}>
        <View style={{alignItems: 'center'}}>
          <Avatar.Icon
            icon={() => <Logo />}
            size={200}
            style={{
              backgroundColor: primaryColor,
              padding: 30,
            }}
          />
        </View>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text style={{fontSize: 29, fontWeight: 500, color: primaryColor}}>
            Welcome
          </Text>
          <Text>Log in to your exiting account.</Text>
        </View>
        <View style={{marginTop: 20, rowGap: 15}}>
          <Input
            name="user"
            control={control}
            placeholder="Username or email"
            icon={
              <TextInput.Icon
                icon={({color}) => (
                  <IcOutlined.UserIcon size={27} color={color} />
                )}
                color={isTextInputFocused =>
                  isTextInputFocused ? primaryColor : greyColor
                }
              />
            }
            rules={{
              required: 'Username or email is required',
            }}
          />

          <Input
            name="password"
            control={control}
            placeholder="Password"
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

          <Text style={{alignSelf: 'flex-end'}}>Forgot Password ?</Text>
          <Button
            mode="contained"
            buttonColor={primaryColor}
            labelStyle={{fontSize: 19}}
            contentStyle={{paddingVertical: 10}}
            style={{borderRadius: 15, marginTop: 20}}
            onPress={handleSubmit(onLogin)}
            disabled={loading ? true : false}>
            {loading ? 'Please Wait...' : 'Log In'}
          </Button>
          <Text style={{alignSelf: 'center', marginTop: 5}}>
            Don’t have an account?{' '}
            <Text
              style={{color: primaryColor}}
              onPress={() => {
                navigation.navigate('Register');
              }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
