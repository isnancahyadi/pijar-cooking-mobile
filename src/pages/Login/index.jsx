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

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Login = props => {
  const {navigation} = props;
  const [focus, setFocus] = useState(false);

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
          <TextInput
            mode="outlined"
            placeholder="Email"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => (
                  <IcOutlined.UserIcon
                    size={27}
                    color={focus ? primaryColor : greyColor}
                  />
                )}
                color={isTextInputFocused => setFocus(isTextInputFocused)}
              />
            }
            style={{
              fontSize: 17,
              paddingVertical: 5,
              paddingHorizontal: 5,
              backgroundColor: 'rgba(245, 245, 245, 1)',
            }}
          />
          <TextInput
            mode="outlined"
            placeholder="Password"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => (
                  <IcOutlined.LockClosedIcon
                    size={27}
                    color={focus ? primaryColor : greyColor}
                  />
                )}
                color={isTextInputFocused => setFocus(isTextInputFocused)}
              />
            }
            style={{
              fontSize: 17,
              paddingVertical: 5,
              paddingHorizontal: 5,
              backgroundColor: 'rgba(245, 245, 245, 1)',
            }}
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
