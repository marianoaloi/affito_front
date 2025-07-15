import { configureStore } from "@reduxjs/toolkit";
import { affitoReducer } from "./services/affito/affitoSlice";


export const store = configureStore({
    reducer: {
      affiti: affitoReducer,
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 