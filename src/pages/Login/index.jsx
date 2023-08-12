import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Avatar, Button, Modal, Portal, TextInput} from 'react-native-paper';
import {greyColor, primaryColor} from '../../values/colors';
import * as IcOutlined from 'react-native-heroicons/outline';
import {Logo} from '../../assets/icon';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Input} from '../../components';
import {AuthContext} from '../../context/AuthContext';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import config from '../../../config';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$%^&]).{8,32}/;

const Login = () => {
  const {login, isLoading, isAlert, hideAlert, errorMsg, errorStat} =
    useContext(AuthContext);

  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertRegProfile, setAlertRegprofile] = useState(false);
  const [msgAlertRegProfile, setMsgAlertRegprofile] = useState('');
  const [titleAlertRegProfile, setTitleAlertRegprofile] = useState('');
  const [user, setUser] = useState(null);
  const [regStat, setRegStat] = useState(null);

  const visibleModal = () => setShowModal(true);
  const hideModal = () => setShowModal(false);

  const submitProfile = async data => {
    setLoading(true);
    await axios
      .post(config.REACT_APP_USER, {
        fullname: data.fullname,
        phoneNumber: data.phoneNumber,
        username: user,
      })
      .then(response => {
        firestore()
          .collection('users')
          .doc(response?.data?.payload[0].id.toString())
          .set({
            id: response?.data?.payload[0].id.toString(),
            fullname: data.fullname,
            phone_number: data.phoneNumber,
            profile_picture: response?.data?.payload[0].profile_picture,
            username: response?.data?.payload[0].username,
          })
          .then(res => {
            console.log('user created');
          })
          .catch(error => {
            // console.log(error);
            setAlertRegprofile(true);
            console.log('masuk sini');
            setTitleAlertRegprofile('Register Failed');

            if (error) {
              setMsgAlertRegprofile("Can't connect to database");
            } else {
              setMsgAlertRegprofile('Something wrong with our app');
            }
            setLoading(false);
          });

        setRegStat(200);

        setAlertRegprofile(true);
        setTitleAlertRegprofile('Register Success');
        setMsgAlertRegprofile('Please login to app.');

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

        setAlertRegprofile(true);
        setTitleAlertRegprofile('Register Failed');

        if (error?.response?.status === 409) {
          setMsgAlertRegprofile(msgProperty.toString().split('.,').join(', '));
        } else if (error?.status === undefined) {
          setMsgAlertRegprofile("Can't connect to database");
        } else {
          setMsgAlertRegprofile('Something wrong with our app');
        }
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
                  <IcOutlined.UserIcon size={28} color={color} />
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
                  <IcOutlined.LockClosedIcon size={28} color={color} />
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
            onPress={handleSubmit(data => {
              setUser(data.user);
              login(data);
            })}
            disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Log In'}
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
      <AwesomeAlert
        show={isAlert}
        showProgress={false}
        title="Login Failed"
        message={
          errorStat === 401
            ? `${errorMsg}. Please register your profile first before login.`
            : errorMsg
        }
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Oke"
        confirmButtonColor={primaryColor}
        titleStyle={{
          fontWeight: 700,
          fontSize: 29,
          alignItems: 'center',
          textAlign: 'center',
        }}
        messageStyle={{
          fontSize: 18,
          marginTop: screenHeight * 0.02,
          textAlign: 'center',
        }}
        confirmButtonTextStyle={{fontSize: 16}}
        confirmButtonStyle={{paddingHorizontal: screenWidth * 0.1}}
        contentContainerStyle={{width: screenWidth}}
        onConfirmPressed={() => {
          hideAlert();
          if (errorStat === 401) {
            visibleModal();
          }
        }}
      />
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 40,
            marginHorizontal: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 29, fontWeight: 500, color: primaryColor}}>
              Let’s Get Started
            </Text>
            <Text style={{textAlign: 'center'}}>
              Create your profile for user {user} to access all feautures
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <View style={{rowGap: 20}}>
              <Input
                name="fullname"
                control={control}
                placeholder="Fullname"
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
                  required: 'Fullname is required',
                }}
              />

              <Input
                name="phoneNumber"
                control={control}
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
                rules={{
                  required: 'Phone number is required',
                  minLength: {
                    value: 10,
                    message: 'Phone number is invalid',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Phone number is invalid',
                  },
                }}
              />

              <Button
                mode="contained"
                buttonColor={primaryColor}
                labelStyle={{fontSize: 19}}
                contentStyle={{paddingVertical: 10}}
                style={{borderRadius: 15, marginTop: 20}}
                onPress={handleSubmit(submitProfile)}
                disabled={loading ? true : false}>
                {loading ? 'Please Wait...' : 'Submit'}
              </Button>

              <AwesomeAlert
                show={alertRegProfile}
                showProgress={false}
                title={titleAlertRegProfile}
                message={msgAlertRegProfile}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="Oke"
                confirmButtonColor={primaryColor}
                titleStyle={{
                  fontWeight: 700,
                  fontSize: 29,
                  textAlign: 'center',
                }}
                messageStyle={{
                  fontSize: 18,
                  marginTop: screenHeight * 0.02,
                  textAlign: 'center',
                }}
                confirmButtonTextStyle={{fontSize: 16}}
                confirmButtonStyle={{paddingHorizontal: screenWidth * 0.1}}
                contentContainerStyle={{width: screenWidth}}
                onConfirmPressed={() => {
                  if (regStat === 200) {
                    setShowModal(false);
                    setRegStat(null);
                  }
                  setAlertRegprofile(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
