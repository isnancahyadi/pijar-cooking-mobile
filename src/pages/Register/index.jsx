import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  greyColor,
  primaryColor,
  primaryColorSelection,
} from '../../values/colors';
import * as IcOutlined from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../components';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Register = () => {
  const navigation = useNavigation();
  const [focus, setFocus] = useState(false);

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          height: screenHeight,
          width: screenWidth,
          paddingHorizontal: 25,
          paddingVertical: 50,
        }}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <Text style={{fontSize: 29, fontWeight: 500, color: primaryColor}}>
            Let’s Get Started
          </Text>
          <Text>Create new account to access all feautures</Text>
        </View>
        <View style={{marginTop: 20, rowGap: 15}}>
          <Input
            placeholder="Name"
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
          />

          <Input
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
          />

          <Input
            placeholder="Phone Number"
            icon={
              <TextInput.Icon
                icon={({color}) => (
                  <IcOutlined.PhoneIcon size={27} color={color} />
                )}
                color={isTextInputFocused =>
                  isTextInputFocused ? primaryColor : greyColor
                }
              />
            }
            keyboardType="phone-pad"
          />

          <Input
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
            secureTextEntry
          />

          <Input
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
            secureTextEntry
          />

          <Button
            mode="contained"
            buttonColor={primaryColor}
            labelStyle={{fontSize: 19}}
            contentStyle={{paddingVertical: 10}}
            style={{borderRadius: 15, marginTop: 20}}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Sign Up
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
