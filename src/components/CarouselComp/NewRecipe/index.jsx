import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Carousel} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {useGetNewRecipesQuery} from '../../../store/apislice/recipesApi';
import {useDispatch} from 'react-redux';
import {
  getSelectedRecipe,
  storeRecipe,
} from '../../../store/reducers/recipeSlice';

const {width: screenWidth} = Dimensions.get('window');

const NewRecipe = () => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);
  const dispatch = useDispatch();

  const {data: newRecipeData} = useGetNewRecipesQuery('5');

  useEffect(() => {
    setEntries(newRecipeData?.payload?.metadata);
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(storeRecipe(item));
          dispatch(getSelectedRecipe(item.id));

          navigation.navigate('DetailRecipe');
        }}>
        <View style={styles.container} key={index}>
          <Image source={{uri: item.image}} style={styles.image} />
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            Ini deskripsi
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <Carousel
        layout="default"
        ref={carouselRef}
        data={entries}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 130}
      />
    </View>
  );
};

export default NewRecipe;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: screenWidth - 130,
    paddingBottom: 20,
    marginBottom: 5,
    elevation: 2,
  },
  image: {
    width: screenWidth - 130,
    height: 125,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
    marginBottom: 3,
  },
  description: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});
