import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Surface} from 'react-native-paper';
import {
  IcBread,
  IcCereal,
  IcChicken,
  IcDessert,
  IcDrink,
  IcEastern,
  IcEgg,
  IcFish,
  IcIndonesian,
  IcMeat,
  IcNoodle,
  IcRice,
  IcSalad,
  IcSeafood,
  IcSoup,
  IcSpicy,
  IcVegetable,
  IcWestern,
} from '../../assets/icon';
import {useNavigation} from '@react-navigation/native';

const CardCategory = ({item, hideCatList}) => {
  const navigation = useNavigation();

  const propertyCheck = param => {
    switch (param) {
      case 'chicken':
        return {
          icon: <IcChicken height={35} />,
          color: '#FE8761',
        };

      case 'dessert':
        return {
          icon: <IcDessert height={35} />,
          color: '#98D8AA',
        };

      case 'seafood':
        return {
          icon: <IcSeafood height={35} />,
          color: '#F7D060',
        };

      case 'noodle':
        return {
          icon: <IcNoodle height={35} />,
          color: '#FFABAB',
        };

      case 'rice':
        return {
          icon: <IcRice height={35} />,
          color: '#FCC8D1',
        };

      case 'soup':
        return {
          icon: <IcSoup height={35} />,
          color: '#FA7070',
        };

      case 'drink':
        return {
          icon: <IcDrink height={35} />,
          color: '#FBF2CF',
        };

      case 'salad':
        return {
          icon: <IcSalad height={35} />,
          color: '#FCC2FC',
        };

      case 'bread':
        return {
          icon: <IcBread height={35} />,
          color: '#DDF7E3',
        };

      case 'cereal':
        return {
          icon: <IcCereal height={35} />,
          color: '#D7E9F7',
        };

      case 'fish':
        return {
          icon: <IcFish height={35} />,
          color: '#FFE17B',
        };

      case 'meat':
        return {
          icon: <IcMeat height={35} />,
          color: '#B5F1CC',
        };

      case 'egg':
        return {
          icon: <IcEgg height={35} />,
          color: '#FFC6AC',
        };

      case 'spicy':
        return {
          icon: <IcSpicy height={35} />,
          color: '#AEE6E6',
        };

      case 'western':
        return {
          icon: <IcWestern height={35} />,
          color: '#B9E6D3',
        };

      case 'eastern':
        return {
          icon: <IcEastern height={35} />,
          color: '#DDF7E3',
        };

      case 'indonesian':
        return {
          icon: <IcIndonesian height={35} />,
          color: '#FFC6AC',
        };

      case 'vegetable':
        return {
          icon: <IcVegetable height={35} />,
          color: '#F9FBE7',
        };

      default:
        break;
    }
  };

  return (
    <Pressable
      onPress={() => {
        hideCatList();
        navigation.navigate('Recipes', {
          categorySlug: item?.slug,
          dataRecipe: [],
          dataRecipeByCat: [],
          offset: 1,
        });
      }}>
      <View style={{alignItems: 'center', rowGap: 5}}>
        <Surface
          mode="flat"
          elevation={4}
          style={{
            height: 70,
            width: 70,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: propertyCheck(item?.slug)?.color,
          }}>
          {propertyCheck(item?.slug)?.icon}
        </Surface>
        <Text style={{fontWeight: '700'}}>{item?.name}</Text>
      </View>
    </Pressable>
  );
};

export default CardCategory;

const styles = StyleSheet.create({});
