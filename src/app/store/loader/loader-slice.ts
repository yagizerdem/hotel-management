import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@store/store";

interface LoaderState {
  keys: string[];
}

const initialState: LoaderState = {
  keys: [],
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<string>) => {
      if (!state.keys.includes(action.payload)) {
        state.keys.push(action.payload);
      }
    },
    stopLoading: (state, action: PayloadAction<string>) => {
      state.keys = state.keys.filter((key) => key !== action.payload);
    },
  },
});

export const { startLoading, stopLoading } = loaderSlice.actions;

export const selectIsLoading = (state: RootState) =>
  state.loader.keys.length > 0;

export const selectIsKeyLoading = (key: string) => (state: RootState) =>
  state.loader.keys.includes(key);

export default loaderSlice.reducer;
