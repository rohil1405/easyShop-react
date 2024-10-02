import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../ProductData/ProductData';

interface ProductState {
  products: ProductData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentPage: number;
  limit: number;
}

const initialState: ProductState = {
  products: [],
  status: 'idle',
  error: null,
  currentPage: 1,
  limit: 8,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductData[]>) {
      state.products = action.payload;
    },
    setLoading(state, action: PayloadAction<'loading' | 'succeeded' | 'failed'>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setPage, setLimit } = productSlice.actions;

export default productSlice.reducer;
