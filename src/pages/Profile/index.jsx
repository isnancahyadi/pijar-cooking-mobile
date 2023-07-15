import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Avatar, TouchableRipple} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor, greyColor} from '../../values/colors';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Profile = () => {
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    axios
      .get('http://localhost:3000/user')
      .then(result => {
        console.log(JSON.stringify(result, null, 2));
      })
      .catch(error => {
        console.log(JSON.stringify(error?.response, null, 2));
      });
  }, []);

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
      }}>
      <View
        style={{
          height: screenWidth,
          backgroundColor: primaryColor,
          justifyContent: 'center',
        }}>
        <View style={{alignItems: 'center', rowGap: 20}}>
          <Avatar.Image
            source={require('../../assets/img/profile.jpg')}
            size={120}
          />
          <Text style={{color: '#FFFFFF', fontSize: 23, fontWeight: 600}}>
            John Doe
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          height: screenHeight - screenWidth + 60,
          bottom: 0,
          start: 0,
          end: 0,
          marginHorizontal: 20,
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          paddingHorizontal: 30,
          paddingTop: 30,
        }}>
        <View style={{flexDirection: 'column', rowGap: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 13,
              }}>
              <IcOutlined.UserIcon size={29} color={primaryColor} />
              <Text style={{fontSize: 17, fontWeight: 500}}>Edit Profile</Text>
            </View>
            <IcOutlined.ChevronRightIcon size={29} color={greyColor} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 13,
              }}>
              <IcOutlined.BookOpenIcon size={29} color={primaryColor} />
              <Text style={{fontSize: 17, fontWeight: 500}}>My Recipe</Text>
            </View>
            <IcOutlined.ChevronRightIcon size={29} color={greyColor} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 13,
              }}>
              <IcOutlined.BookmarkIcon size={29} color={primaryColor} />
              <Text style={{fontSize: 17, fontWeight: 500}}>Saved Recipe</Text>
            </View>
            <IcOutlined.ChevronRightIcon size={29} color={greyColor} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 13,
              }}>
              <IcOutlined.HandThumbUpIcon size={29} color={primaryColor} />
              <Text style={{fontSize: 17, fontWeight: 500}}>Liked Recipe</Text>
            </View>
            <IcOutlined.ChevronRightIcon size={29} color={greyColor} />
          </View>

          <TouchableRipple
            rippleColor="rgba(0, 0, 0, .32)"
            onPress={() => {
              logout();
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 13,
                }}>
                <IcOutlined.ArrowRightOnRectangleIcon
                  size={29}
                  color={primaryColor}
                />
                <Text style={{fontSize: 17, fontWeight: 500}}>Logout</Text>
              </View>
            </View>
          </TouchableRipple>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
