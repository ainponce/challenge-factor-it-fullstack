import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';
import { getProducts } from '../../services/productService';

export const fetchProducts = createAsyncThunk('products/fetch', getProducts);

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [] as Product[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;