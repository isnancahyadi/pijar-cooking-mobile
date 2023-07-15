/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import App from './src/App';
import {name as appName} from './app.json';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function Main() {
  axios.interceptors.request.use(async config => {
    if (await EncryptedStorage.getItem('user_session')) {
      config.headers[
        'Authorization'
      ] = `Bearer ${await EncryptedStorage.getItem('user_session')}`;
    }
    return config;
  });

  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
