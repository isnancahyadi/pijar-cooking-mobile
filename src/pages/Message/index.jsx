import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import firestore from '@react-native-firebase/firestore';
import {Avatar, Surface} from 'react-native-paper';
import {greyColor} from '../../values/colors';

const Message = () => {
  const navigation = useNavigation();
  const [id, setId] = useState(null);
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let username = await EncryptedStorage.getItem('user_info');
    username = JSON.parse(username);
    setId(username?._u);

    let tempData = [];

    firestore()
      .collection('users')
      .where('username', '!=', username?._u)
      .get()
      .then(res => {
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        setUser(tempData);
      });
  };

  return (
    <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
      <FlatList
        data={user}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => navigation.navigate('Chat', {data: item, id: id})}>
            <Surface
              key={index}
              mode="flat"
              elevation={3}
              style={{
                alignItems: 'flex-start',
                justifyContent: 'center',
                borderRadius: 15,
                paddingHorizontal: 20,
                paddingVertical: 13,
                backgroundColor: 'white',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 20,
                }}>
                <Avatar.Image source={{uri: item?.profile_picture}} size={50} />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                  }}>
                  <Text
                    style={{color: greyColor, fontWeight: 500, fontSize: 21}}>
                    {item?.fullname}
                  </Text>
                  <Text style={{color: greyColor, fontSize: 16}}>Message</Text>
                </View>
              </View>
            </Surface>
          </Pressable>
        )}
      />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
