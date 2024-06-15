import { IStoreUser } from "@/types/common";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();
interface IInitialState {
  auth: boolean;
  user: IStoreUser | null;
  access_token: string | null;
  loading: boolean;
}
const initialState: IInitialState = {
  auth: false,
  user: null,
  access_token: null,
  loading: true,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth: (state, action: PayloadAction<IInitialState>) => {
      state.auth = action.payload.auth;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.loading = action.payload.loading;
      if (action.payload.access_token) {
        const decoded = jwtDecode(action.payload.access_token);
        cookies.set("access_token", action.payload.access_token, {
          expires: decoded.exp
            ? new Date(
                new Date().setMilliseconds(
                  new Date().getMilliseconds() + (decoded.exp || 0)
                )
              )
            : undefined,
          path: "/",
        });
      }
    },
    logout: (state) => {
      state.auth = false;
      state.user = null;
      state.access_token = null;
      cookies.remove("access_token");
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
