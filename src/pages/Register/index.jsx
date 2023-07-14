import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar, Button, Portal, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  greyColor,
  primaryColor,
  primaryColorSelection,
} from '../../values/colors';
import * as IcOutlined from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Input, RegAccount, RegProfile} from '../../components';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Register = () => {
  const navigation = useNavigation();
  const [page, setPage] = useState('regAccount');
  const [username, setUsername] = useState(null);

  const onSubmit = (page, username) => {
    setPage(page);
    setUsername(username);
  };

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
        <View style={{marginTop: 20}}>
          {page === 'regAccount' ? (
            <RegAccount onSubmit={onSubmit} />
          ) : (
            <RegProfile user={username} />
          )}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
