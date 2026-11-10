import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import loaderSlice from "./loader-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [loaderSlice.reducerPath]: loaderSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        // The loader keeps its keys in a Set, which is not serializable.
        serializableCheck: { ignoredPaths: ["loader.keys"] },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
