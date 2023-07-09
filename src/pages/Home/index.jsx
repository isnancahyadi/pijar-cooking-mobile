import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar, Surface} from 'react-native-paper';

import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor, greyColor, greyColor50} from '../../values/colors';
import {PopularRecipe, RecommRecipe} from '../../components';
import {IcChicken, IcDessert, IcSeafood} from '../../assets/icon';
import * as IcSolid from 'react-native-heroicons/solid';

const Home = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          paddingVertical: 30,
        }}>
        {/* Search Bar */}
        <View style={{paddingHorizontal: 30}}>
          <Searchbar
            placeholder="Search Pasta, Bread, etc"
            placeholderTextColor={greyColor50}
            icon={() => <IcOutlined.MagnifyingGlassIcon color={greyColor50} />}
            clearIcon={
              searchQuery
                ? () => <IcOutlined.XCircleIcon color={greyColor50} size={26} />
                : null
            }
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={{
              borderRadius: 15,
              backgroundColor: '#EAEAEA',
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
              More
            </Text>
          </View>
          <PopularRecipe props={props} />
        </View>
        {/* ============== */}

        {/* New Recipe */}
        <View style={{marginTop: 30, paddingHorizontal: 30}}>
          <View style={{alignContent: 'center', marginBottom: 15}}>
            <Text style={{fontSize: 21, fontWeight: '700'}}>Category</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                  backgroundColor: '#FE8761',
                }}>
                <IcChicken height={35} />
              </Surface>
              <Text style={{fontWeight: '700'}}>Chicken</Text>
            </View>
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
                  backgroundColor: '#98D8AA',
                }}>
                <IcDessert height={35} />
              </Surface>
              <Text style={{fontWeight: '700'}}>Dessert</Text>
            </View>
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
                  backgroundColor: '#F7D060',
                }}>
                <IcSeafood height={35} />
              </Surface>
              <Text style={{fontWeight: '700'}}>Seafood</Text>
            </View>
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
          </View>
        </View>
        {/* ========== */}

        {/* Recommended */}
        <View style={{marginTop: 30}}>
          <View style={{alignContent: 'center', marginBottom: 15}}>
            <Text
              style={{fontSize: 21, fontWeight: '700', paddingHorizontal: 30}}>
              Popular For you
            </Text>
          </View>
          <RecommRecipe />
        </View>
        {/* =========== */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
