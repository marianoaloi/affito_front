import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

export interface User {
  email: string;
  name: string;
  photoURL: string;
}

export interface AuthState {
  token: string | undefined;
  user: User | undefined;
}

function getInitialTokenByCookie(): AuthState  {
  const cookie = Cookies.get('affito_token');
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch {
      return {} as AuthState;
    }
  }
  return {} as AuthState;
}

const initialState: AuthState = getInitialTokenByCookie();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set('affito_token', JSON.stringify(state), 
      { 
        expires: new Date(new Date().getTime() + 3600_000) 
      });
    },
    clearToken: (state) => {
      state.token = undefined;
      state.user = undefined;
      Cookies.remove('affito_token');
    },
  },
  selectors: {
    getToken: (state: AuthState) => {
      return state.token
    },
    getUser: (state: AuthState) => {
      return state.user
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const authReduce = authSlice.reducer;
export const getToken = authSlice.selectors.getToken;
export const getUser = authSlice.selectors.getUser;


