import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {getUser, reset} from '../store/reducers/userSlice';
import config from '../../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAlert, setIsAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorStat, setErrorStat] = useState(null);
  const [checkSession, setCheckSession] = useState(false);

  const hideAlert = () => {
    setIsAlert(false);
  };

  const login = async data => {
    setIsLoading(true);
    await axios
      .post(config.REACT_APP_LOGIN, {
        username: data.user,
        password: data.password,
      })
      .then(response => {
        const userInfo = {
          _u: response?.data?.payload?.username,
          _e: response?.data?.payload?.email,
        };
        const token = response?.data?.payload?.token;

        setUserInfo(userInfo);
        setUserToken(token);

        EncryptedStorage.setItem('user_info', JSON.stringify(userInfo));
        EncryptedStorage.setItem('user_session', token);

        dispatch(getUser());
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);

        const getRes = Object.keys(error?.response?.data?.message);

        let msgProperty = [];

        getRes.map((item, key) => {
          const {
            [item]: {message},
          } = error?.response?.data?.message;

          msgProperty[key] = message;
        });

        setIsAlert(true);

        if (
          error?.response?.status === 404 ||
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          setErrorMsg(msgProperty.toString().split('.,').join(', '));
          setErrorStat(error?.response?.status);
        } else if (error?.status === undefined) {
          setErrorMsg("Can't connect to database");
        } else {
          setErrorMsg('Something wrong with our app');
        }
      });
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    EncryptedStorage.removeItem('user_info');
    EncryptedStorage.removeItem('user_session');
    dispatch(reset());
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setCheckSession(true);
      let userInfo = await EncryptedStorage.getItem('user_info');
      const userToken = await EncryptedStorage.getItem('user_session');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setCheckSession(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        isAlert,
        hideAlert,
        errorMsg,
        errorStat,
        checkSession,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
