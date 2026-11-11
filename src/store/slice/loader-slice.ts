import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// The active keys as an object rather than a Set: Redux state has to be
// plain, serializable data, and a Set makes it warn on every action.
type LoaderState = {
  keys: Record<string, true>;
};

const initialState: LoaderState = {
  keys: {},
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<string>) {
      state.keys[action.payload] = true;
    },
    stopLoading(state, action: PayloadAction<string>) {
      delete state.keys[action.payload];
    },
    resetLoading(state) {
      state.keys = {};
    },
  },
  selectors: {
    selectIsLoading: (state) => Object.keys(state.keys).length > 0,
    selectIsLoadingKey: (state, key: string) => key in state.keys,
  },
});

export const { startLoading, stopLoading, resetLoading } = loaderSlice.actions;
export const { selectIsLoading, selectIsLoadingKey } = loaderSlice.selectors;
export default loaderSlice;
