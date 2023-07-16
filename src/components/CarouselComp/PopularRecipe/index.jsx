import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGetAllRecipesQuery} from '../../../store/apislice/recipesApi';

const {width: screenWidth} = Dimensions.get('window');

const PopularRecipe = () => {
  const navigation = useNavigation();
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const {data: popularRecipeData} = useGetAllRecipesQuery('5');

  useEffect(() => {
    setEntries(popularRecipeData?.payload);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('DetailRecipe');
        }}>
        <View style={styles.item}>
          <ParallaxImage
            source={{uri: item.image}}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={entries}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

export default PopularRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 175,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 0,
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 21,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowRadius: 8,
    marginHorizontal: 25,
    marginVertical: 25,
  },
});
