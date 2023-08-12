import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input} from '../../components';
import {Avatar, Button, Text, TextInput} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {greyColor, primaryColor} from '../../values/colors';
import * as IcOutlined from 'react-native-heroicons/outline';
import DropDownPicker from 'react-native-dropdown-picker';
import config from '../../../config';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const ITEM_CATEGORY = [
  {label: 'Apple', value: 'apple'},
  {label: 'Banana', value: 'banana'},
];

const AddRecipe = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();

  const [isAlert, setIsAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [alertStat, setAlertStat] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [photoType, setPhotoType] = useState(null);
  const [photoSize, setPhotoSize] = useState(null);

  const [pickerOpen, setPisckerOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const hideAlert = () => {
    setIsAlert(false);
  };

  // const test = () => {
  //   console.log('hanya test');
  // };

  const getCategory = async () => {
    await axios.get(config.REACT_APP_CATEGORY).then(response => {
      // console.log(JSON.stringify(response?.data?.payload, null, 2));
      setCategory(response?.data?.payload);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const choosePhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      res => {
        if (res.didCancel) {
          return;
        } else if (res.errorCode) {
          return;
        } else {
          // console.log(JSON.stringify(res, null, 2));
          setPhoto(res);
          setPhotoUri(res?.assets[0]?.uri);
          setPhotoName(res?.assets[0]?.fileName);
          setPhotoType(res?.assets[0]?.type);
          setPhotoSize(res?.assets[0]?.fileSize);
        }
      },
    );
  };

  const handleAddRecipe = async data => {
    setIsLoading(true);

    if (photo === null) {
      console.log('Photo required');
      setIsLoading(false);
      setIsAlert(true);
      setAlertTitle('Add Failed');
      setAlertMsg('Photo is required');
      return;
    }

    if (photoSize > 2000000) {
      console.log('Image is too big');
      setIsLoading(false);
      setIsAlert(true);
      setAlertTitle('Add Failed');
      setAlertMsg('Image is too big');
      return;
    }

    if (
      photoType !== 'image/jpeg' &&
      photoType !== 'image/png' &&
      photoType !== 'image/jpg' &&
      photoType !== 'image/webp'
    ) {
      console.log(
        'Image not support. Please insert with extension jpeg/png/jpg/webp.',
      );
      setIsLoading(false);
      setIsAlert(true);
      setAlertTitle('Add Failed');
      setAlertMsg(
        'Image not support. Please insert with extension jpeg/png/jpg/webp.',
      );
      return;
    }

    const payload = new FormData();
    payload.append('title', data?.title);
    payload.append('ingredients', data?.ingredients);
    payload.append('video', data?.video);
    payload.append('direction', data?.direction);
    payload.append('category', data?.category);
    payload.append('description', data?.description);
    payload.append('image', {
      uri: photoUri,
      type: photoType,
      name: photoName,
    });

    await axios
      .post(config.REACT_APP_RECIPE, payload, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then(response => {
        setIsAlert(true);
        setAlertTitle('Add Success');
        setAlertMsg('Success add recipe');
        setAlertStat(200);
        setIsLoading(false);
      })
      .catch(({response}) => {
        setIsLoading(false);

        const getRes = Object.keys(response?.data?.message);

        let msgProperty = [];

        getRes.map((item, key) => {
          const {
            [item]: {message},
          } = response?.data?.message;

          msgProperty[key] = message;
        });

        setIsAlert(true);
        setAlertTitle('Add Failed');
        setAlertMsg(
          msgProperty.toString().split('.,').join(', ') ??
            'Something wrong with our app',
        );
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <View
          style={{
            padding: 25,
          }}>
          <Text
            variant="headlineMedium"
            style={{fontWeight: 700, marginBottom: 25}}>
            Add Recipe
          </Text>
          <View style={{rowGap: 15}}>
            <Pressable onPress={() => choosePhoto()}>
              <View
                style={{
                  height: screenHeight * 0.25,
                  // backgroundColor: 'red',
                  borderColor: greyColor,
                  borderWidth: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {photoUri ? (
                  <Image
                    source={{
                      uri: photoUri,
                    }}
                    resizeMode="cover"
                    style={{
                      position: 'absolute',
                      start: 0,
                      end: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <IcOutlined.PhotoIcon
                      size={screenWidth * 0.23}
                      color={greyColor}
                    />
                    <Text variant="bodyMedium">Click to add photo</Text>
                  </View>
                )}
              </View>
            </Pressable>
            <Input
              name="title"
              control={control}
              placeholder="Title"
              icon={
                <TextInput.Icon
                  icon={({color}) => (
                    <IcOutlined.PencilIcon size={27} color={color} />
                  )}
                  color={isTextInputFocused =>
                    isTextInputFocused ? primaryColor : greyColor
                  }
                />
              }
              rules={{
                required: 'Title is required',
              }}
            />
            <Input
              name="description"
              control={control}
              placeholder="Description"
              multiline={true}
              numberOfLines={7}
              icon={
                <TextInput.Icon
                  icon={({color}) => (
                    <IcOutlined.DocumentTextIcon size={27} color={color} />
                  )}
                  color={isTextInputFocused =>
                    isTextInputFocused ? primaryColor : greyColor
                  }
                />
              }
              rules={{
                required: 'Description is required',
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Input
                name="category"
                control={control}
                placeholder="Category Number"
                // onPressIn={() => test()}
                icon={
                  <TextInput.Icon
                    icon={({color}) => (
                      <IcOutlined.TagIcon size={27} color={color} />
                    )}
                    color={isTextInputFocused =>
                      isTextInputFocused ? primaryColor : greyColor
                    }
                  />
                }
                rules={{
                  required: 'Category is required',
                }}
              />
              <Text variant="labelMedium">
                *Please fill category with this number below.
              </Text>
              <Text variant="labelMedium">
                {category.map(
                  (item, index) => `(${item?.id}. ${item?.name})${'    '}`,
                )}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Input
                name="ingredients"
                control={control}
                placeholder="Ingredients"
                multiline={true}
                numberOfLines={7}
                icon={
                  <TextInput.Icon
                    icon={({color}) => (
                      <IcOutlined.RectangleStackIcon size={27} color={color} />
                    )}
                    color={isTextInputFocused =>
                      isTextInputFocused ? primaryColor : greyColor
                    }
                  />
                }
                rules={{
                  required: 'Ingredients is required',
                }}
              />
              <Text variant="labelMedium">
                *please use commas (,) and space ( ) to separate ingredient.
                i.e. onion, salt, sugar.
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Input
                name="direction"
                control={control}
                placeholder="How to Make"
                multiline={true}
                numberOfLines={7}
                icon={
                  <TextInput.Icon
                    icon={({color}) => (
                      <IcOutlined.DocumentCheckIcon size={27} color={color} />
                    )}
                    color={isTextInputFocused =>
                      isTextInputFocused ? primaryColor : greyColor
                    }
                  />
                }
                rules={{
                  required: 'Direction is required',
                }}
              />
              <Text variant="labelMedium">
                *please use semicolon (;) and space ( ) to separate step. i.e.
                chop onion; add salt; add sugar.
              </Text>
            </View>
            <Input
              name="video"
              control={control}
              placeholder="Link Video (Only Youtube)"
              icon={
                <TextInput.Icon
                  icon={({color}) => (
                    <IcOutlined.VideoCameraIcon size={27} color={color} />
                  )}
                  color={isTextInputFocused =>
                    isTextInputFocused ? primaryColor : greyColor
                  }
                />
              }
              rules={{
                required: 'Link video is required',
              }}
            />
            <Button
              mode="contained"
              buttonColor={primaryColor}
              labelStyle={{fontSize: 19}}
              contentStyle={{paddingVertical: 10}}
              style={{borderRadius: 15, marginTop: 20}}
              onPress={handleSubmit(handleAddRecipe)}
              disabled={isLoading}>
              {isLoading ? 'Please Wait...' : 'Add Recipe'}
            </Button>
            {/* <DropDownPicker
          open={pickerOpen}
          value={categoryValue}
          items={ITEM_CATEGORY}
          setValue={setCategoryValue}
          setOpen={setPisckerOpen}
        /> */}
          </View>
        </View>
        <AwesomeAlert
          show={isAlert}
          showProgress={false}
          title={alertTitle}
          message={alertMsg}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Oke"
          confirmButtonColor={primaryColor}
          titleStyle={{fontWeight: 700, fontSize: 29}}
          messageStyle={{fontSize: 18, marginTop: screenHeight * 0.02}}
          confirmButtonTextStyle={{fontSize: 16}}
          confirmButtonStyle={{paddingHorizontal: screenWidth * 0.1}}
          contentContainerStyle={{width: screenWidth}}
          onConfirmPressed={() => {
            if (alertStat === 200) {
              navigation.navigate('Recipes');
              hideAlert();
            }
            hideAlert();
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddRecipe;

const styles = StyleSheet.create({});
