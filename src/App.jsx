import React from 'react';
import Router from './routes';
import {AuthProvider} from './context/AuthContext';
import {Provider} from 'react-native-paper';

const App = () => {
  return (
    <Provider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </Provider>
  );
};

export default App;
