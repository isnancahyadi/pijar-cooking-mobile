import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Searchbar} from 'react-native-paper';

import * as IcOutlined from 'react-native-heroicons/outline';
import {greyColor50} from '../../values/colors';
import {PopularRecipe} from '../../components';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <ScrollView>
      <SafeAreaView
        style={{
          paddingVertical: 20,
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
        <View style={{marginTop: 30}}>
          <View style={{paddingHorizontal: 30, marginBottom: 10}}>
            <Text style={{fontSize: 21, fontWeight: '700'}}>
              Popular Recipes
            </Text>
            <Text>Popular check</Text>
          </View>
          <PopularRecipe />
        </View>
        {/* ============== */}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({});
