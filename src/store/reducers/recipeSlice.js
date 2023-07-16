import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  recipeList: [],
  currentRecipe: null,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    storeRecipe: (state, action) => {
      const check = state.recipeList.find(res => res.id == action.payload.id);

      if (!check) {
        state.recipeList.push(action.payload);
      }
    },
    getSelectedRecipe: (state, action) => {
      const check = state.recipeList.find(res => res.id == action.payload);

      if (check) {
        state.currentRecipe = action.payload;
      } else {
        state.currentRecipe = null;
      }
    },
  },
});

export const {storeRecipe, getSelectedRecipe} = recipeSlice.actions;

export default recipeSlice.reducer;
