import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {REHYDRATE} from 'redux-persist';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/'}),
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    getAllRecipes: builder.query({
      query: () => 'recipe',
    }),
    getNewRecipes: builder.query({
      query: limit => (limit ? `recipe/new?limit=${limit}` : 'recipe/new'),
    }),
  }),
});

export const {useGetAllRecipesQuery, useGetNewRecipesQuery} = recipesApi;
