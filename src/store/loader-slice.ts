import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

// Immer needs this to draft and update a Set inside the state.
enableMapSet();

type LoaderState = {
  keys: Set<string>;
};

const initialState: LoaderState = {
  keys: new Set(),
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    startLoading(state, action: PayloadAction<string>) {
      state.keys.add(action.payload);
    },
    stopLoading(state, action: PayloadAction<string>) {
      state.keys.delete(action.payload);
    },
    resetLoading(state) {
      state.keys.clear();
    },
  },
  selectors: {
    selectIsLoading: (state) => state.keys.size > 0,
    selectIsLoadingKey: (state, key: string) => state.keys.has(key),
  },
});

export const { startLoading, stopLoading, resetLoading } = loaderSlice.actions;
export const { selectIsLoading, selectIsLoadingKey } = loaderSlice.selectors;
export default loaderSlice;
