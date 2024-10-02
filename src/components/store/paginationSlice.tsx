import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const initialState: PaginationState = {
  currentPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setHasNextPage(state, action: PayloadAction<boolean>) {
      state.hasNextPage = action.payload;
    },
    setHasPrevPage(state, action: PayloadAction<boolean>) {
      state.hasPrevPage = action.payload;
    },
    goToNextPage(state) {
      if (state.hasNextPage) {
        state.currentPage += 1;
      }
    },
    goToPrevPage(state) {
      if (state.hasPrevPage) {
        state.currentPage -= 1;
      }
    },
  },
});

export const {
  setCurrentPage,
  setHasNextPage,
  setHasPrevPage,
  goToNextPage,
  goToPrevPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
