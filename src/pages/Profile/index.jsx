import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Avatar, TouchableRipple} from 'react-native-paper';
import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor, greyColor} from '../../values/colors';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const Profile = () => {
  const {logout} = useContext(AuthContext);

  const user = useSelector(state => state?.user?.data[0]);

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
          <Avatar.Image source={{uri: user?.profile_picture}} size={120} />
          <Text style={{color: '#FFFFFF', fontSize: 23, fontWeight: 600}}>
            {user?.fullname}
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
          // paddingHorizontal: 30,
          paddingTop: 30,
        }}>
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              paddingHorizontal: 30,
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
              paddingVertical: 10,
              paddingHorizontal: 30,
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
              paddingVertical: 10,
              paddingHorizontal: 30,
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
              paddingVertical: 10,
              paddingHorizontal: 30,
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
            rippleColor="rgba(97, 157, 242, 0.1)"
            style={{paddingVertical: 10, paddingHorizontal: 30}}
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
