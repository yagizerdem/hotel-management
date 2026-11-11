import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@domain/user";

// "unknown" until the session has been checked, so the UI can tell
// "not signed in" apart from "not loaded yet".
export type AuthStatus = "unknown" | "authenticated" | "unauthenticated";

type AuthState = {
  user: User | null;
  status: AuthStatus;
};

const initialState: AuthState = {
  user: null,
  status: "unknown",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = "authenticated";
    },
    clearUser(state) {
      state.user = null;
      state.status = "unauthenticated";
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectAuthStatus: (state) => state.status,
    selectIsAuthenticated: (state) => state.status === "authenticated",
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const { selectUser, selectAuthStatus, selectIsAuthenticated } =
  authSlice.selectors;
export default authSlice;
