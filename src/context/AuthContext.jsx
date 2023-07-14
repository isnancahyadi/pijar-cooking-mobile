import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const login = async data => {
    setIsLoading(true);
    await axios
      .post('http://localhost:3000/auth/login', {
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
        EncryptedStorage.setItem('user_session', JSON.stringify({_t: token}));
      })
      .catch(error => {
        console.log(JSON.stringify(error?.response, null, 2));
      });

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    EncryptedStorage.removeItem('user_info');
    EncryptedStorage.removeItem('user_session');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await EncryptedStorage.getItem('user_info');
      const userToken = await EncryptedStorage.getItem('user_session');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(`isLogged in error ${error}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{login, logout, isLoading, userToken, userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};
