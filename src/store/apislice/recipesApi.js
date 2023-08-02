import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REHYDRATE} from 'redux-persist';
import config from '../../../config';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({baseUrl: config.REACT_APP_BASE_URL}),
  endpoints: builder => ({
    getAllRecipes: builder.query({
      query: limit => (limit ? `/recipe?limit=${limit}` : '/recipe'),
    }),
    getNewRecipes: builder.query({
      query: limit => (limit ? `/recipe/new?limit=${limit}` : '/recipe/new'),
    }),
  }),
});

export const {useGetAllRecipesQuery, useGetNewRecipesQuery} = recipesApi;
