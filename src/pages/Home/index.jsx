import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Modal, Searchbar, Surface} from 'react-native-paper';

import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor, greyColor, greyColor50} from '../../values/colors';
import {
  PopularRecipe,
  NewRecipe,
  FABAddRecipe,
  CardCategory,
} from '../../components';
import * as IcSolid from 'react-native-heroicons/solid';
import axios from 'axios';
import config from '../../../config';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [isFetchCat, setIsFetchCat] = useState(false);

  const getCategory = async () => {
    setIsFetchCat(true);
    await axios
      .get(config.REACT_APP_CATEGORY)
      .then(({data}) => {
        setCategory(data?.payload);
        setIsFetchCat(false);
      })
      .catch(error => {
        console.log('error');
        setIsFetchCat(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onChangeSearch = query => setSearchQuery(query);

  const handleSearch = search => {
    navigation.navigate('Recipes', {
      search: {
        keyword: search,
        dataRecipe: [],
        dataRecipeByCat: [],
        offset: 1,
      },
    });
  };

  const visibleCatList = () => setShowCategory(true);
  const hideCatList = () => setShowCategory(false);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView
          style={{
            paddingVertical: 30,
          }}>
          {/* Search Bar */}
          <View style={{paddingHorizontal: 30}}>
            <Searchbar
              placeholder="Search Pasta, Bread, etc"
              placeholderTextColor={greyColor50}
              icon={() => (
                <IcOutlined.MagnifyingGlassIcon color={greyColor50} />
              )}
              clearIcon={
                searchQuery
                  ? () => (
                      <IcOutlined.XCircleIcon color={greyColor50} size={26} />
                    )
                  : null
              }
              elevation={2}
              onChangeText={onChangeSearch}
              value={searchQuery}
              onSubmitEditing={event => {
                handleSearch(event.nativeEvent.text);
              }}
              style={{
                borderRadius: 15,
                backgroundColor: 'white',
              }}
            />
          </View>
          {/* ========== */}

          {/* Popular Recipe */}
          <View style={{marginTop: 20}}>
            <View
              style={{
                paddingHorizontal: 30,
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 21, fontWeight: '700'}}>
                Popular Recipes
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: primaryColor,
                }}>
                View All
              </Text>
            </View>
            <PopularRecipe />
          </View>
          {/* ============== */}

          {/* Category */}
          <View style={{marginTop: 30, paddingHorizontal: 30}}>
            <View style={{alignContent: 'center', marginBottom: 15}}>
              <Text style={{fontSize: 21, fontWeight: '700'}}>Category</Text>
            </View>

            {isFetchCat ? (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 23,
                }}>
                <ActivityIndicator
                  animating={isFetchCat}
                  size={'large'}
                  color={primaryColor}
                />
              </View>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {[...new Array(3)].map((item, key) => (
                  <CardCategory
                    key={key}
                    item={category[key]}
                    hideCatList={hideCatList}
                  />
                ))}

                <Pressable onPress={visibleCatList}>
                  <View style={{alignItems: 'center', rowGap: 5}}>
                    <Surface
                      mode="flat"
                      elevation={4}
                      style={{
                        height: 70,
                        width: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        backgroundColor: '#EFD9D1',
                      }}>
                      <IcSolid.Squares2X2Icon color={greyColor} size={45} />
                    </Surface>
                    <Text style={{fontWeight: '700'}}>More</Text>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
          {/* ========== */}

          {/* New Recipe */}
          <View style={{marginTop: 30}}>
            <View
              style={{
                paddingHorizontal: 30,
                marginBottom: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 21, fontWeight: '700'}}>New Recipe</Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '500',
                  color: primaryColor,
                }}>
                View All
              </Text>
            </View>
            <NewRecipe />
          </View>
          {/* =========== */}
        </SafeAreaView>
      </ScrollView>

      {/* Floating Action Button */}
      <FABAddRecipe />
      {/* ====================== */}

      {/* <Portal> */}
      <Modal
        visible={showCategory}
        onDismiss={hideCatList}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          marginHorizontal: 20,
        }}>
        <View
          style={{
            gap: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {category.map((item, key) => (
            <CardCategory key={key} item={item} hideCatList={hideCatList} />
          ))}
        </View>
      </Modal>
      {/* </Portal> */}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});
