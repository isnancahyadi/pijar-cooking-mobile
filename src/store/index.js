import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import {userSlice} from './reducers';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

const storage = createSensitiveStorage({
  keychainService: '@J0K4M313354ICUI4CUj4m4h',
  sharedPreferencesName: 'PijarFoodApp',
});

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
