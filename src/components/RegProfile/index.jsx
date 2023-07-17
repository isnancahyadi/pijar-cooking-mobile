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

const RegProfile = ({user}) => {
  const navigation = useNavigation();
  const {control, handleSubmit} = useForm();
  const [loading, setLoading] = useState(false);

  const submitProfile = async data => {
    setLoading(true);
    await axios
      .post('http://localhost:3000/user', {
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
            console.log(error);
          });

        navigation.navigate('Login');
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
    </View>
  );
};

export default RegProfile;

const styles = StyleSheet.create({});
