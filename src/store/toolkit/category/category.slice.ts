import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Category from '../../../types/category-types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase.config';
import { categoryConverter } from '../../../converters/firebase.converters';

export const fetchCategories = createAsyncThunk('category/fetch', async () => {
  const categoriesFromFirestore: Category[] = [];

  const querySnapshot = await getDocs(
    collection(db, 'categories').withConverter(categoryConverter),
  );

  querySnapshot.forEach((doc) => {
    categoriesFromFirestore.push(doc.data());
  });

  return categoriesFromFirestore;
});

interface IInitialState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: IInitialState = {
  categories: [],
  isLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Inicio da operação
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    // Sucesso da operação
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    // Erro da operação
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default categorySlice.reducer;
