import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getSelectedRecipe, storeRecipe} from '../../store/reducers/recipeSlice';

const CardRecipe = ({data, height}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(storeRecipe(data));
        dispatch(getSelectedRecipe(data.id));

        navigation.navigate('DetailRecipe');
      }}>
      <View
        style={{
          height: height,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 15,
          elevation: 5,
          paddingHorizontal: 15,
          paddingVertical: 10,
          justifyContent: 'flex-end',
        }}>
        <Image
          source={{
            uri: data?.image,
          }}
          resizeMode="cover"
          style={{
            position: 'absolute',
            start: 0,
            end: 0,
            top: 0,
            bottom: 0,
          }}
        />
        <Text
          style={{
            fontSize: 19,
            color: '#FFFFFF',
            fontWeight: 600,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
          }}>
          {data?.title}
        </Text>
        <Text
          style={{
            color: '#FFFFFF',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: -1, height: 1},
            textShadowRadius: 10,
          }}>
          By {data?.created_by !== null ? data?.created_by : 'Unknow'}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardRecipe;

const styles = StyleSheet.create({});
