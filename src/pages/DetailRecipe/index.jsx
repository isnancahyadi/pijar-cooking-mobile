import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  greyColor,
  primaryColor,
  primaryColorTransparent,
} from '../../values/colors';
import {Button, Surface} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

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

const DetailRecipe = () => {
  const navigation = useNavigation();
  const [type, setType] = useState('ingredients');
  const [detailRecipe, setDetailRecipe] = useState(null);

  const {recipeList, currentRecipe} = useSelector(state => state?.recipe);

  useEffect(() => {
    if (currentRecipe) {
      setDetailRecipe(recipeList.find(res => res.id === currentRecipe));
    }
  }, [currentRecipe, recipeList]);

  return (
    <View style={{height: screenHeight, width: screenWidth}}>
      {detailRecipe && detailRecipe?.image && (
        <ImageBackground
          source={{uri: detailRecipe?.image}}
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
                {detailRecipe?.title}
              </Text>
              <Text
                style={{
                  color: '#FFFFFF',
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: {width: -1, height: 1},
                  textShadowRadius: 10,
                }}>
                By{' '}
                {detailRecipe?.created_by !== null
                  ? detailRecipe?.created_by
                  : 'Unknow'}
              </Text>
              <Pressable onPress={() => navigation.navigate('Chat')}>
                <Surface
                  mode="flat"
                  elevation={3}
                  style={{
                    height: 40,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    borderRadius: 15,
                    paddingHorizontal: 15,
                    backgroundColor: primaryColor,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      columnGap: 10,
                    }}>
                    <IcOutlined.ChatBubbleOvalLeftEllipsisIcon
                      color={'#FFFFFF'}
                      size={30}
                    />
                    <Text
                      style={{color: 'white', fontWeight: 500, fontSize: 17}}>
                      Message
                    </Text>
                  </View>
                </Surface>
              </Pressable>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                rowGap: 10,
              }}>
              <Pressable onPress={() => Linking.openURL(detailRecipe?.video)}>
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
              </Pressable>
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
      )}
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
            <FlatList
              data={detailRecipe?.ingredients
                ?.split(', ')
                .map(ingred => ingred)}
              renderItem={IngredientsItem}
            />
          ) : (
            <FlatList
              data={detailRecipe?.direction?.split('; ').map(step => step)}
              renderItem={StepsItem}
            />
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
