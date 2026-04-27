import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCount } from './counterTrunk';
import { CounterItem } from './counterTypes';

interface CounterState {
  data: CounterItem[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CounterState = {
  data: [],
  loading: 'idle',
  error: null,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCount.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCount.fulfilled, (state, action: PayloadAction<CounterItem[]>) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCount.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const counterActions = counterSlice.actions;
export const counterReducer = counterSlice.reducer;
export const counterSelectors = counterSlice.selectors;
