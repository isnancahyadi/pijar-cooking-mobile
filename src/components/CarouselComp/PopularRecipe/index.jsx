import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import React, {useEffect, useRef, useState} from 'react';

const ENTRIES1 = [
  {
    title: 'American Shrimp Fried Rice with Chili Fish Sauce',
    image: require('../../../assets/img/american-shrimp-fried-rice-with-chili-fish-sauce.jpg'),
  },
  {
    title: 'Chicken Curry Black Cup with Rice Noodles',
    image: require('../../../assets/img/chicken-curry-black-cup-with-rice-noodles.jpg'),
  },
  {
    title: 'Chicken Green Curry Bowl',
    image: require('../../../assets/img/chicken-green-curry-bowl.jpg'),
  },
  {
    title: 'Crispy Fried Chicken',
    image: require('../../../assets/img/crispy-fried-chicken.jpg'),
  },
  {
    title: 'Penne Pasta Tomato Sauce with Chicken Tomatoes',
    image: require('../../../assets/img/penne-pasta-tomato-sauce-with-chicken-tomatoes.jpg'),
  },
];

const {width: screenWidth} = Dimensions.get('window');

const PopularRecipe = () => {
  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(ENTRIES1);
  }, []);

  const renderItem = ({item, index}, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={item.image}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>
      </View>
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
