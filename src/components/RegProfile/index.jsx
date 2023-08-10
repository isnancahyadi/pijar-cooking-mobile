import {StyleSheet, View} from 'react-native';
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

const RegProfile = ({user}) => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const hideAlert = () => {
    setIsAlert(false);
  };

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
            username: user,
          })
          .then(res => {
            console.log('user created');
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

        navigation.navigate('Login');
        setLoading(false);
      })
      .catch(error => {
        // console.log(JSON.stringify(error?.response, null, 2));
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
        name="fullname"
        control={control}
        placeholder="Fullname"
        icon={
          <TextInput.Icon
            icon={({color}) => <IcOutlined.UserIcon size={27} color={color} />}
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
            icon={({color}) => <IcOutlined.PhoneIcon size={27} color={color} />}
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

export default RegProfile;

const styles = StyleSheet.create({});
