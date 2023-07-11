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
import {Input} from '../../components';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Login = () => {
  const navigation = useNavigation();

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
            placeholder="Email"
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
            keyboardType="email-address"
          />

          <Input
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
            secureTextEntry
          />

          <Text style={{alignSelf: 'flex-end'}}>Forgot Password ?</Text>
          <Button
            mode="contained"
            buttonColor={primaryColor}
            labelStyle={{fontSize: 19}}
            contentStyle={{paddingVertical: 10}}
            style={{borderRadius: 15, marginTop: 20}}
            onPress={() => {
              navigation.navigate('BottomNavbar');
            }}>
            Log In
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
