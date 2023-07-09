import {
  Dimensions,
  FlatList,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  greyColor,
  primaryColor,
  primaryColorTransparent,
} from '../../values/colors';
import {Button, Surface} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const DATA_INGREDIENTS = [
  'Sesame oil',
  'Vegetable oil',
  'Fresh shrimp',
  'Frozen peas and carrots',
  'Frozen corn',
  'Garlic',
  'Ground ginger',
  'Eggs',
  'Cooked rice',
  'Green onions',
  'Low-sodium soy sauce',
  'Salt and pepper',
];

const DATA_STEPS = [
  'To a large non-stick skillet, add the oils, shrimp, and cook over medium-high heat for about 3 minutes, flipping halfway through.',
  'Remove the shrimp with a slotted spoon and place on a plate; set aside.',
  'Add the peas, carrots, corn, and cook for about 2 minutes, or until vegetables begin to soften, stir intermittently.',
  'Add the garlic, ginger, and cook until fragrant.',
  'Push the vegetables to one side of the skillet, add the eggs to the other side, and cook to scramble.',
  'Add the shrimp, rice, and green onions to the pan. Evenly drizzle with soy sauce and stir to combine.',
  'Cook just until the shrimp are reheated.',
];

const IngredientsItem = ({item, index}) => (
  <View style={{marginVertical: 5}} key={index}>
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 16}}>{index + 1}. </Text>
      <Text style={{flex: 1, textAlign: 'justify', fontSize: 16}}>{item}</Text>
    </View>
  </View>
);

const StepsItem = ({item, index}) => (
  <View style={{marginVertical: 5}} key={index}>
    <View style={{flexDirection: 'row'}}>
      <Text style={{fontSize: 16}}>{index + 1}. </Text>
      <Text style={{flex: 1, textAlign: 'justify', fontSize: 16}}>{item}</Text>
    </View>
  </View>
);

const DetailRecipe = props => {
  const {navigation} = props;
  const [type, setType] = useState('ingredients');
  return (
    <View style={{height: screenHeight, width: screenWidth}}>
      <ImageBackground
        source={require('../../assets/img/american-shrimp-fried-rice-with-chili-fish-sauce.jpg')}
        resizeMode="cover"
        style={{
          height: screenWidth + 30,
          backgroundColor: '#EFEFEF',
          justifyContent: 'space-between',
          paddingBottom: 55,
          paddingTop: 15,
          paddingHorizontal: 20,
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <IcOutlined.ArrowSmallLeftIcon color={'#FFFFFF'} size={41} />
        </Pressable>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View
            style={{
              maxWidth: '65%',
              flexDirection: 'column',
              rowGap: 5,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontSize: 27,
                color: '#FFFFFF',
                fontWeight: 700,
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
              }}>
              American Shrimp Fried Rice with Chili Fish Sauce
            </Text>
            <Text
              style={{
                color: '#FFFFFF',
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: -1, height: 1},
                textShadowRadius: 10,
              }}>
              By Chef John Doe
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              rowGap: 10,
            }}>
            <Surface
              mode="flat"
              elevation={3}
              style={{
                height: 47,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: primaryColor,
              }}>
              <IcOutlined.PlayPauseIcon color={'#FFFFFF'} size={35} />
            </Surface>
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <Surface
                mode="flat"
                elevation={3}
                style={{
                  height: 47,
                  width: 47,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: '#FFFFFF',
                }}>
                <IcOutlined.BookmarkIcon color={primaryColor} size={32} />
              </Surface>
              <Surface
                mode="flat"
                elevation={3}
                style={{
                  height: 47,
                  width: 47,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: '#FFFFFF',
                }}>
                <IcOutlined.HandThumbUpIcon color={primaryColor} size={32} />
              </Surface>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          height: screenWidth + 50,
          width: screenWidth,
          bottom: -20,
          borderTopStartRadius: 25,
          borderTopEndRadius: 25,
          paddingHorizontal: 25,
          paddingTop: 20,
          paddingBottom: 50,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Button
            labelStyle={
              type === 'ingredients'
                ? styles.buttonActive
                : styles.buttonNonActive
            }
            onPress={() => setType('ingredients')}>
            Ingredients
          </Button>
          <Button
            labelStyle={
              type === 'howto' ? styles.buttonActive : styles.buttonNonActive
            }
            onPress={() => setType('howto')}>
            How to Make
          </Button>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 20,
            marginTop: 10,
            backgroundColor: primaryColorTransparent,
          }}>
          {type === 'ingredients' ? (
            <FlatList data={DATA_INGREDIENTS} renderItem={IngredientsItem} />
          ) : (
            <FlatList data={DATA_STEPS} renderItem={StepsItem} />
          )}
        </View>
      </View>
    </View>
  );
};

export default DetailRecipe;

const styles = StyleSheet.create({
  buttonActive: {
    color: '#18172B',
    borderBottomWidth: 2,
    borderBottomColor: primaryColor,
    fontSize: 18,
  },
  buttonNonActive: {
    color: '#666666',
    fontSize: 18,
  },
});
