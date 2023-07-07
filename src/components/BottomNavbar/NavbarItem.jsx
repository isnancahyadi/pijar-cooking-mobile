import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import * as IcOutlined from 'react-native-heroicons/outline';
import {primaryColor, greyColor} from '../../values/colors';

const MenuIcon = ({route, focused, navigation}) => {
  let icon;

  if (route.name === 'Home') {
    icon = (
      <IcOutlined.HomeIcon
        color={focused ? primaryColor : greyColor}
        size={29}
      />
    );
  } else if (route.name === 'Add Recipe') {
    icon = (
      <IcOutlined.PlusCircleIcon
        color={focused ? primaryColor : greyColor}
        size={29}
      />
    );
  } else if (route.name === 'Message') {
    icon = (
      <IcOutlined.ChatBubbleOvalLeftIcon
        color={focused ? primaryColor : greyColor}
        size={29}
      />
    );
  } else if (route.name === 'Profile') {
    icon = (
      <IcOutlined.UserIcon
        color={focused ? primaryColor : greyColor}
        size={29}
      />
    );
  }

  const onTap = () => {
    navigation.navigate(route.name);
  };

  return (
    <Pressable
      onPress={onTap}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: focused ? 'rgba(97, 157, 242, 0.05)' : 'transparent',
          paddingVertical: 10,
          paddingHorizontal: 17,
          borderRadius: 50,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {icon}
          {focused && (
            <Text
              style={{
                color: primaryColor,
                fontWeight: '500',
                fontSize: 14,
                marginStart: 5,
              }}>
              {route.name}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const NavbarItem = ({state, descriptors, navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 13,
        gap: 15,
      }}>
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        return (
          <MenuIcon
            key={index}
            route={route}
            focused={isActive}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

export default NavbarItem;

const styles = StyleSheet.create({});
