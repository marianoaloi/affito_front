import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
}

function getInitialTokenByCookie(): string | null {
  const cookie = Cookies.get('affito_token');
  if (cookie) {
    try {
      return JSON.parse(cookie);
    } catch {
      return null;
    }
  }
  return null;
}

const initialState: AuthState = {
  token: getInitialTokenByCookie(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
  selectors: {
    getToken: (state: AuthState) => {
      return state.token
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const authReduce = authSlice.reducer;
export const getToken = authSlice.selectors.getToken;


