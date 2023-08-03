import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CardRecipe, FABAddRecipe} from '../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Searchbar} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor, greyColor, greyColor50} from '../../values/colors';
import axios from 'axios';
import config from '../../../config';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const ListRecipe = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dataRecipe, setDataRecipe] = useState([]);
  const [dataStatus, setDataStatus] = useState(false);
  const [offset, setOffset] = useState(1);

  const getDataRecipe = async () => {
    setLoading(true);
    await axios
      .get(`${config.REACT_APP_RECIPE}?page=${offset}`)
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

  useEffect(() => {
    getDataRecipe();
  }, []);

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <>
      <View>
        <Searchbar
          placeholder="Search Pasta, Bread, etc"
          placeholderTextColor={greyColor50}
          icon={() => <IcOutlined.MagnifyingGlassIcon color={greyColor50} />}
          clearIcon={
            searchQuery
              ? () => <IcOutlined.XCircleIcon color={greyColor50} size={26} />
              : null
          }
          elevation={2}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            borderRadius: 15,
            backgroundColor: '#EAEAEA',
            position: 'absolute',
            margin: 30,
            start: 0,
            end: 0,
            top: 0,
            zIndex: 2,
          }}
        />
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
                {dataRecipe
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
                {dataRecipe
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
              onPress={getDataRecipe}
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
    </>
  );
};

export default ListRecipe;

const styles = StyleSheet.create({});
