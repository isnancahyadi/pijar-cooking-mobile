import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CardCategory, CardRecipe, FABAddRecipe} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Modal, Searchbar, Surface} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import * as IcSolid from 'react-native-heroicons/solid';
import {primaryColor, greyColor, greyColor50} from '../../values/colors';
import axios from 'axios';
import config from '../../../config';
import {useRoute} from '@react-navigation/native';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const ListRecipe = () => {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataStatus, setDataStatus] = useState(false);

  const [dataRecipe, setDataRecipe] = useState([]);
  const [keyword, setKeyword] = useState('');

  const [offset, setOffset] = useState(1);

  const [showCategory, setShowCategory] = useState(false);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [dataRecipeByCat, setDataRecipeByCat] = useState([]);

  const getDataRecipe = async () => {
    setLoading(true);
    await axios
      .get(`${config.REACT_APP_RECIPE}?page=${offset}&search=${keyword}`)
      .then(({data}) => {
        setOffset(offset + 1);
        setDataRecipe([...dataRecipe, ...data?.payload?.metadata]);
        setLoading(false);
        setDataStatus(true);
      })
      .catch(({response}) => {
        setLoading(false);
        if (response?.status === 404) {
          setDataStatus(false);
        }
      });
  };

  const onChangeSearch = query => setSearchQuery(query);

  const handleSearch = search => {
    setOffset(1);
    setDataRecipe([]);
    setDataRecipeByCat([]);
    setKeyword(search);
  };

  useEffect(() => {
    getDataRecipe();
  }, [keyword]);

  const getCategory = async () => {
    await axios
      .get(config.REACT_APP_CATEGORY)
      .then(({data}) => {
        setCategory(data?.payload);
      })
      .catch(error => {
        console.log('error');
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    let param = route?.params;
    if (param?.search) {
      setSearchQuery(param?.search?.keyword);
      handleSearch(param?.search?.keyword);
    } else if (param) {
      if (param?.categorySlug === '') {
        setOffset(1);
      } else {
        setDataRecipe(param?.dataRecipe);
        setDataRecipeByCat(param?.dataRecipeByCat);
        setOffset(param?.offset);
      }
      setSelectedCategory(param?.categorySlug);
    } else {
      return;
    }
  }, [route]);

  const getDataRecipeByCat = async () => {
    setLoading(true);
    if (selectedCategory === '') {
      setOffset(1);
      getDataRecipe();
    } else {
      await axios
        .get(`${config.REACT_APP_CATEGORY}/${selectedCategory}?page=${offset}`)
        .then(({data}) => {
          setOffset(offset + 1);
          setDataRecipeByCat([...dataRecipeByCat, ...data?.payload?.metadata]);
          setLoading(false);
          setDataStatus(true);
        })
        .catch(({response}) => {
          setLoading(false);
          if (response?.status === 404) {
            setDataStatus(false);
          }
        });
    }
  };

  useEffect(() => {
    getDataRecipeByCat();
  }, [selectedCategory]);

  const visibleCatList = () => setShowCategory(true);
  const hideCatList = () => setShowCategory(false);

  return (
    <>
      <View>
        <View
          style={{
            position: 'absolute',
            margin: 30,
            start: 0,
            end: 0,
            top: 0,
            zIndex: 2,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              gap: 7,
            }}>
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
                flex: 1,
                borderRadius: 15,
                backgroundColor: 'white',
              }}
            />
            <Pressable onPress={visibleCatList}>
              <Surface
                mode="elevated"
                elevation={2}
                style={{
                  height: screenWidth * 0.14,
                  width: screenWidth * 0.14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  backgroundColor: '#FFFFFF',
                }}>
                <IcOutlined.FunnelIcon color={primaryColor} size={26} />
              </Surface>
            </Pressable>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{paddingHorizontal: 15}}>
            <View
              style={{
                flexDirection: 'row',
                gap: 15,
                marginTop: 110,
                marginBottom: 15,
              }}>
              <View style={{flex: 1, gap: 15}}>
                {selectedCategory !== ''
                  ? dataRecipeByCat
                      .filter((_, i) => i % 2 === 0)
                      .map((item, index) => (
                        <CardRecipe
                          key={index}
                          data={item}
                          height={
                            index % 2 === 0
                              ? screenHeight * 0.26
                              : screenHeight * 0.28
                          }
                        />
                      ))
                  : dataRecipe
                      .filter((_, i) => i % 2 === 0)
                      .map((item, index) => (
                        <CardRecipe
                          key={index}
                          data={item}
                          height={
                            index % 2 === 0
                              ? screenHeight * 0.26
                              : screenHeight * 0.28
                          }
                        />
                      ))}
              </View>
              <View style={{flex: 1, gap: 15}}>
                {selectedCategory !== ''
                  ? dataRecipeByCat
                      .filter((_, i) => i % 2 !== 0)
                      .map((item, index) => (
                        <CardRecipe
                          key={index}
                          data={item}
                          height={
                            index % 2 !== 0
                              ? screenHeight * 0.3
                              : screenHeight * 0.28
                          }
                        />
                      ))
                  : dataRecipe
                      .filter((_, i) => i % 2 !== 0)
                      .map((item, index) => (
                        <CardRecipe
                          key={index}
                          data={item}
                          height={
                            index % 2 !== 0
                              ? screenHeight * 0.3
                              : screenHeight * 0.28
                          }
                        />
                      ))}
              </View>
            </View>
            <Button
              onPress={
                selectedCategory !== '' ? getDataRecipeByCat : getDataRecipe
              }
              rippleColor="transparent"
              disabled={!dataStatus}
              style={{marginBottom: 10}}>
              {loading ? (
                <>Loading...</>
              ) : dataStatus ? (
                <>Klik to Load More</>
              ) : (
                <>Data not Found</>
              )}
            </Button>
          </SafeAreaView>
        </ScrollView>
      </View>
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
          <Pressable
            onPress={() => {
              setSelectedCategory('');
              setDataRecipe([]);
              setDataRecipeByCat([]);
              setOffset(1);
              hideCatList();
            }}>
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
                <IcSolid.RectangleGroupIcon color={greyColor} size={45} />
              </Surface>
              <Text style={{fontWeight: '700'}}>All</Text>
            </View>
          </Pressable>
          {category.map((item, key) => (
            <CardCategory key={key} item={item} hideCatList={hideCatList} />
          ))}
        </View>
      </Modal>
      {/* </Portal> */}
    </>
  );
};

export default ListRecipe;

const styles = StyleSheet.create({});
