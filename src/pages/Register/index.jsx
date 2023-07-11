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
          <TextInput
            mode="outlined"
            placeholder="Name"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => <IcOutlined.UserIcon size={27} color={greyColor} />}
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
            placeholder="Email"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => (
                  <IcOutlined.EnvelopeIcon size={27} color={greyColor} />
                )}
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
            placeholder="Phone Number"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => (
                  <IcOutlined.PhoneIcon size={27} color={greyColor} />
                )}
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
            placeholder="Create New Password"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => (
                  <IcOutlined.LockClosedIcon size={27} color={greyColor} />
                )}
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
          <TextInput
            mode="outlined"
            placeholder="Confirm Password"
            activeOutlineColor={primaryColor}
            outlineColor="transparent"
            selectionColor={primaryColorSelection}
            cursorColor={primaryColor}
            outlineStyle={{borderRadius: 15}}
            left={
              <TextInput.Icon
                icon={() => (
                  <IcOutlined.LockOpenIcon size={27} color={greyColor} />
                )}
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
