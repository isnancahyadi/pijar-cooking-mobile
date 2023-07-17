import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

const Chat = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const people = firestore()
      .collection('chats')
      .doc(route?.params?.id + route?.params?.data?.username)
      .collection('messages')
      .orderBy('createdAt', 'desc');

    people.onSnapshot(querySnapshot => {
      const allMessages = querySnapshot.docs.map(item => {
        return {...item._data, createdAt: item._data.createdAt};
      });
      setMessageList(allMessages);
    });
    return () => people;
  }, []);

  //   console.log(route?.params?.data?.username);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMessage = {
      ...msg,
      sendBy: route?.params?.id,
      sendTo: route?.params?.data?.username,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessageList(previousMessages =>
      GiftedChat.append(previousMessages, myMessage),
    );
    firestore()
      .collection('chats')
      .doc('' + route?.params?.data?.username + route?.params?.id)
      .collection('messages')
      .add(myMessage);
    firestore()
      .collection('chats')
      .doc('' + route?.params?.id + route?.params?.data?.username)
      .collection('messages')
      .add(myMessage);
  }, []);

  return (
    <GiftedChat
      messages={messageList}
      onSend={messages => onSend(messages)}
      user={{
        _id: route?.params?.id,
      }}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({});
