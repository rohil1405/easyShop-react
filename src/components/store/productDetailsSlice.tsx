import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../ProductData/ProductData';

interface ProductDetailsState {
  product: ProductData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailsState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    fetchProductStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess(state, action: PayloadAction<ProductData>) {
      state.product = action.payload;
      state.loading = false;
    },
    fetchProductFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailure } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
